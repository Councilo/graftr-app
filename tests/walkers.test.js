// Walker delivery end to end: quote, create, the marketplace split between driver and walker
// couriers, and accept. Needs the real walking-route service (routing.openstreetmap.de/routed-foot),
// so it's registered in run-all.js as needing the network and is skipped under --offline.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret';
const REPO = require('path').resolve(__dirname, '..');
const { signQuote } = require(REPO + '/lib/quote-token.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 240) : '')); }
};
const BASE = 'http://localhost:5500';
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
async function call(method, path, token, body) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}
const stamp = Date.now();
async function user(role, tag) {
  const email = `${tag}_${stamp}@example.com`;
  await call('POST', '/api/register', null, { email, password: 'password123', full_name: `${tag} Tester`, role, accept_terms: true, accept_courier_terms: true, location_consent: true });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  const m = await call('GET', '/api/me', l.body.access_token);
  return { token: l.body.access_token, id: m.body.id, email };
}
async function outboxFor(email) { const r = await fetch(`${BASE}/__outbox?to=${encodeURIComponent(email)}`); return r.json(); }

// Real addresses, checked directly against Nominatim (geocoding) and routing.openstreetmap.de
// (walking distance): NEAR is a few streets away, comfortably under the 1-mile / 1609 m cap; FAR is a
// Preston suburb a few kilometres out, comfortably over it — with margin either way, so a slightly
// different point on the same street from a Nominatim update on another day doesn't flip the result.
const PA = 'Fishergate, Preston PR1 3AA, UK';
const DA_NEAR = 'Lowthian Street, Preston PR1 3AA, UK';
const DA_FAR = 'Bamber Bridge, Preston PR5 8AN, UK';
// Car-quote coordinates: irrelevant to a walker order (the server always recomputes its own from
// pickup_lat/lng and dropoff_lat/lng), used only so signQuote hands jobs-create something signed.
const Q_NEAR = { pickup_lat: 53.7573, pickup_lng: -2.7048, dropoff_lat: 53.7605, dropoff_lng: -2.7010, distance_km: 1, price_gbp: 5 };
const Q_FAR = { pickup_lat: 53.7573, pickup_lng: -2.7048, dropoff_lat: 53.7254, dropoff_lng: -2.6432, distance_km: 5, price_gbp: 12 };

function makeJob(custToken, custId, pa, da, q, extra) {
  return call('POST', '/api/jobs-create', custToken, {
    pickup_address: pa, dropoff_address: da, pickup_window_start: new Date(Date.now() + 3600e3).toISOString(),
    quote_token: signQuote(custId, pa, da, q), ...extra,
  });
}

(async () => {
  const cust = await user('customer', 'walkcust');
  const driver = await user('courier', 'walkdriver');
  const walker = await user('courier', 'walkwalker');
  const sw = await call('POST', '/api/account-courier-mode', walker.token, { mode: 'walker' });
  ok('a courier switches to walker mode', sw.status === 200 && sw.body.courier_mode === 'walker', sw);
  const me = await call('GET', '/api/me', walker.token);
  ok('and /api/me reflects it', me.body.courier_mode === 'walker', me.body);
  const meDriver = await call('GET', '/api/me', driver.token);
  ok('a fresh courier defaults to driver mode', meDriver.body.courier_mode === 'driver', meDriver.body);

  console.log('\n[quote: the walker option, only when it genuinely qualifies]');
  let r = await call('POST', '/api/jobs-quote', cust.token, { pickup_address: PA, dropoff_address: DA_NEAR });
  const wo = r.body && r.body.walker_option;
  ok('a short trip is offered walker delivery', r.status === 200 && wo && wo.eligible === true, wo);
  ok('with a low-high minute range and a price under the courier price', wo && wo.eligible
    && wo.minutes.low < wo.minutes.high && wo.price_gbp < r.body.price_gbp, wo && [wo, r.body.price_gbp]);
  r = await call('POST', '/api/jobs-quote', cust.token, { pickup_address: PA, dropoff_address: DA_FAR });
  ok('a trip over a mile is not offered it, and says why', r.status === 200 && r.body.walker_option && r.body.walker_option.eligible === false && r.body.walker_option.reason === 'too_far', r.body && r.body.walker_option);

  console.log('\n[create: the server checks eligibility and the ack itself, never trusts the phone]');
  r = await makeJob(cust.token, cust.id, PA, DA_NEAR, Q_NEAR, { delivery_mode: 'walker', package_size: 'small' });
  ok('no acknowledgement -> refused', r.status === 422, r);
  r = await makeJob(cust.token, cust.id, PA, DA_NEAR, Q_NEAR, { delivery_mode: 'walker', walker_ack: true, package_size: 'medium' });
  ok('not a small parcel -> refused', r.status === 422, r);
  r = await makeJob(cust.token, cust.id, PA, DA_FAR, Q_FAR, { delivery_mode: 'walker', walker_ack: true, package_size: 'small' });
  ok('a real quote_token for a >1-mile trip is still refused for walker delivery — the server re-measures, it does not trust the token', r.status === 422, r);

  // Tomorrow at 23:00 UTC is either 23:00 GMT or 00:00 BST depending on the time of year — either
  // way, well outside the 7am-9pm UK-local window, so this is never a seasonal false pass.
  const nightUtc = new Date(Date.now() + 24 * 3600e3); nightUtc.setUTCHours(23, 0, 0, 0);
  r = await makeJob(cust.token, cust.id, PA, DA_NEAR, Q_NEAR, { delivery_mode: 'walker', walker_ack: true, package_size: 'small', pickup_window_start: nightUtc.toISOString() });
  ok('a genuinely short trip after dark is still refused — the hours check runs whatever the phone claims', r.status === 422 && /7am|9pm/.test(r.body.detail), r);
  ok('an ordinary (non-walker) order at the same late hour is unaffected', (await makeJob(cust.token, cust.id, PA, DA_NEAR, Q_NEAR, { pickup_window_start: nightUtc.toISOString() })).status === 201);

  const wj = await makeJob(cust.token, cust.id, PA, DA_NEAR, Q_NEAR, { delivery_mode: 'walker', walker_ack: true, package_size: 'small' });
  ok('a genuinely short, small, acknowledged order is created', wj.status === 201 && wj.body.delivery_mode === 'walker', wj.body);
  ok('its price and distance are the walking ones, not the signed (car) quote\'s', Math.abs(wj.body.price_gbp - Q_NEAR.price_gbp) > 0.01 || Math.abs(wj.body.distance_km - Q_NEAR.distance_km) > 0.01, [wj.body.price_gbp, wj.body.distance_km, Q_NEAR]);
  ok('it carries a minute range and when the acknowledgement was given', typeof wj.body.walk_minutes_low === 'number' && wj.body.walk_minutes_high > wj.body.walk_minutes_low && !!wj.body.walker_ack_at, wj.body);
  ok('its own route is the real walking route (more than 2 points, not a straight line)', Array.isArray(wj.body.route_geometry) && wj.body.route_geometry.length > 2, wj.body.route_geometry && wj.body.route_geometry.length);

  const sj = await makeJob(cust.token, cust.id, PA, DA_FAR, Q_FAR, {});
  ok('an ordinary order defaults to standard delivery', sj.status === 201 && sj.body.delivery_mode === 'standard', sj.body);

  console.log('\n[the confirmation email mentions the wait]');
  const mails = await outboxFor(cust.email);
  const placed = mails.filter((m) => /is listed/i.test(m.subject));
  const walkerMail = placed.find((m) => m.text.includes(`VND-${wj.body.id}`));
  const standardMail = placed.find((m) => m.text.includes(`VND-${sj.body.id}`));
  ok('the walker order\'s email says it is slower, with the same minute range', walkerMail
    && new RegExp(`${wj.body.walk_minutes_low} to ${wj.body.walk_minutes_high} minutes`).test(walkerMail.text) && /slower/i.test(walkerMail.text), walkerMail && walkerMail.text);
  ok('the standard order\'s email does not mention walking', standardMail && !/walker|slower/i.test(standardMail.text), standardMail && standardMail.text);

  console.log('\n[marketplace: driver and walker couriers see different jobs]');
  const availDriver = (await call('GET', '/api/jobs-available', driver.token)).body;
  const availWalker = (await call('GET', '/api/jobs-available', walker.token)).body;
  ok('a driver sees the standard job, not the walker job', availDriver.some((j) => j.id === sj.body.id) && !availDriver.some((j) => j.id === wj.body.id), [availDriver.map((j) => j.id), sj.body.id, wj.body.id]);
  ok('a walker sees the walker job, not the standard job', availWalker.some((j) => j.id === wj.body.id) && !availWalker.some((j) => j.id === sj.body.id), [availWalker.map((j) => j.id), sj.body.id, wj.body.id]);
  const seenWalkerJob = availWalker.find((j) => j.id === wj.body.id);
  ok('the walker offer is postcode-level, not the street, and never says "hidden"', seenWalkerJob && /Preston PR1 3AA/.test(seenWalkerJob.pickup_address) && !/hidden/i.test(seenWalkerJob.pickup_address + seenWalkerJob.dropoff_address), seenWalkerJob);
  ok('it carries the minute range but not the exact metres', seenWalkerJob && typeof seenWalkerJob.walk_minutes_low === 'number' && seenWalkerJob.walk_distance_m === undefined, seenWalkerJob);
  ok('no stored route is sent for an unaccepted job (the app draws one itself)', seenWalkerJob && seenWalkerJob.route_geometry === null, seenWalkerJob);

  console.log('\n[accept: each mode only takes its own kind of job]');
  r = await call('POST', '/api/jobs-accept', driver.token, { jobId: wj.body.id });
  ok('a driver cannot accept a walker job', r.status === 409, r);
  r = await call('POST', '/api/jobs-accept', walker.token, { jobId: sj.body.id });
  ok('a walker cannot accept a standard job', r.status === 409, r);
  r = await call('POST', '/api/jobs-accept', walker.token, { jobId: wj.body.id });
  ok('a walker accepts the walker job', r.status === 200 && r.body.status === 'ACCEPTED', r);
  ok('the accepted job\'s addresses are now the real ones', r.body.pickup_address === PA && r.body.dropoff_address === DA_NEAR, [r.body.pickup_address, r.body.dropoff_address]);
  r = await call('POST', '/api/jobs-accept', driver.token, { jobId: sj.body.id });
  ok('a driver accepts the standard job as normal', r.status === 200 && r.body.status === 'ACCEPTED', r);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
