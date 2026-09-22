// "Start order": a courier's location is only shared, and only shown to the customer, once the
// courier presses Start order. Accepting a job at home must not put a home address on a map.
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
  return { token: l.body.access_token, id: m.body.id };
}
const jpeg = () => new (require('buffer').Blob)([Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0xff, 0xd9])], { type: 'image/jpeg' });
async function photo(token, endpoint, jobId) {
  const f = new FormData(); f.append('photo', jpeg(), 'p.jpg');
  const r = await fetch(`${BASE}/api/${endpoint}?jobId=${jobId}`, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'X-Forwarded-For': IP }, body: f });
  return { status: r.status, body: await r.json().catch(() => null) };
}

(async () => {
  const cust = await user('customer', 'stcust');
  const cour = await user('courier', 'stcour');
  const other = await user('courier', 'stother');
  // A fresh courier defaults to walker mode now; this file's jobs are ordinary long-haul ones.
  await call('POST', '/api/account-courier-mode', cour.token, { mode: 'driver' });
  await call('POST', '/api/account-courier-mode', other.token, { mode: 'driver' });
  const PA = '12 Start Street, Bolton BL1 1AA, UK', DA = '4 Finish Road, Leeds LS1 2HT, UK';
  const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.8, dropoff_lng: -1.55, distance_km: 60, price_gbp: 40 };
  const make = async () => (await call('POST', '/api/jobs-create', cust.token, {
    pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date().toISOString(), quote_token: signQuote(cust.id, PA, DA, Q),
  })).body;
  const mineOf = async (id) => (await call('GET', '/api/jobs-mine', cust.token)).body.find((j) => j.id === id);

  console.log('[accepting a job shares nothing]');
  const a = await make();
  let r = await call('POST', '/api/jobs-start', cour.token, { jobId: a.id });
  ok('an OPEN job (assigned to nobody) cannot be started -> 403', r.status === 403, r);
  await call('POST', '/api/jobs-accept', cour.token, { jobId: a.id });
  let seen = await mineOf(a.id);
  ok('accepted but not started: started_at is null and the customer sees no courier position', seen.status === 'ACCEPTED' && seen.started_at === null && seen.courier_lat === null && seen.courier_lng === null, seen);
  r = await call('POST', '/api/jobs-location', cour.token, { jobId: a.id, lat: 53.5, lng: -2.4 });
  ok('a location sent before Start order is refused (409, not_started)', r.status === 409 && r.body.not_started === true, r);
  seen = await mineOf(a.id);
  ok('and nothing was stored', seen.courier_lat === null, seen);

  console.log('\n[who can press Start order]');
  r = await call('POST', '/api/jobs-start', other.token, { jobId: a.id });
  ok("another courier can't start it -> 403", r.status === 403, r);
  r = await call('POST', '/api/jobs-start', cust.token, { jobId: a.id });
  ok('a customer cannot -> 403', r.status === 403, r);
  r = await call('POST', '/api/jobs-start', cour.token, {});
  ok('no job id -> 422', r.status === 422, r);
  r = await call('POST', '/api/jobs-start', cour.token, { jobId: 999999 });
  ok('an unknown job -> 404', r.status === 404, r);
  r = await call('GET', '/api/jobs-start', cour.token);
  ok('GET is not allowed -> 405', r.status === 405, r);

  console.log('\n[after Start order]');
  r = await call('POST', '/api/jobs-start', cour.token, { jobId: a.id });
  ok('the assigned courier starts it -> 200 with started_at', r.status === 200 && !!r.body.started_at && r.body.status === 'ACCEPTED', r);
  const firstStart = r.body.started_at;
  r = await call('POST', '/api/jobs-start', cour.token, { jobId: a.id });
  ok('pressing it again is harmless and keeps the first start time', r.status === 200 && r.body.started_at === firstStart, r);
  r = await call('POST', '/api/jobs-location', cour.token, { jobId: a.id, lat: 53.5, lng: -2.4 });
  ok('now a location is accepted -> 200', r.status === 200, r);
  seen = await mineOf(a.id);
  ok('and the customer can see the courier on their way to the pickup', seen.started_at && Number(seen.courier_lat) === 53.5 && Number(seen.courier_lng) === -2.4, seen);

  console.log('\n[handing a started job back]');
  r = await call('POST', '/api/jobs-cancel', cour.token, { jobId: a.id });
  ok('the courier hands it back -> relisted, started_at and position cleared', r.status === 200 && r.body.outcome === 'relisted' && r.body.started_at === null && r.body.courier_lat === null, r);
  await call('POST', '/api/jobs-accept', other.token, { jobId: a.id });
  seen = await mineOf(a.id);
  ok('the next courier to accept it has not started it: no position, no started_at', seen.status === 'ACCEPTED' && seen.started_at === null && seen.courier_lat === null, seen);

  console.log('\n[collecting a parcel starts an order too]');
  const b = await make();
  await call('POST', '/api/jobs-accept', cour.token, { jobId: b.id });
  r = await photo(cour.token, 'jobs-pickup', b.id);
  ok('a courier who collects without pressing Start is treated as started', r.status === 200 && r.body.status === 'COLLECTED' && !!r.body.started_at, r);
  r = await call('POST', '/api/jobs-location', cour.token, { jobId: b.id, lat: 53.6, lng: -2.3 });
  ok('and can share their position for the trip to the drop-off', r.status === 200, r);
  r = await call('POST', '/api/jobs-start', cour.token, { jobId: b.id });
  ok('a COLLECTED job has nothing left to start -> 409', r.status === 409, r);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
