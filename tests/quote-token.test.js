// Quote-token behaviour: pure unit checks, then the real endpoints on the dev server.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret'; // same throwaway secret dev-server.js uses
const REPO = require('path').resolve(__dirname, '..');
const jwt = require(REPO + '/node_modules/jsonwebtoken');
const { signQuote, verifyQuote, sanitizeRoute } = require(REPO + '/lib/quote-token.js');
const { signToken } = require(REPO + '/lib/auth.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 200) : '')); }
};

const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.48, dropoff_lng: -2.24, distance_km: 28.16, price_gbp: 27.48 };
const PA = 'Halliwell Road, Bolton', DA = 'Manchester';

console.log('[unit: verifyQuote]');
const tok = signQuote(7, PA, DA, Q);
ok('round-trips every field', JSON.stringify(verifyQuote(tok, 7, PA, DA)) === JSON.stringify(Q), verifyQuote(tok, 7, PA, DA));
ok('wrong customer -> null', verifyQuote(tok, 8, PA, DA) === null);
ok('different pickup text -> null', verifyQuote(tok, 7, PA + ' ', DA) === null);
ok('different dropoff text -> null', verifyQuote(tok, 7, PA, 'Leeds') === null);
const parts = tok.split('.');
const forged = jwt.sign({ q: 1, uid: 7, pa: PA, da: DA, plat: Q.pickup_lat, plng: Q.pickup_lng, dlat: Q.dropoff_lat, dlng: Q.dropoff_lng, km: Q.distance_km, price: 1.0 }, 'some-other-secret');
ok('cheaper price signed with a different secret -> null', verifyQuote(forged, 7, PA, DA) === null);
const edited = parts[0] + '.' + Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(parts[1], 'base64url')), price: 1.0 })).toString('base64url') + '.' + parts[2];
ok('payload edited after signing (price -> 1.00) -> null', verifyQuote(edited, 7, PA, DA) === null);
const expired = jwt.sign({ q: 1, uid: 7, pa: PA, da: DA, plat: 1, plng: 1, dlat: 1, dlng: 1, km: 1, price: 5 }, process.env.JWT_SECRET, { expiresIn: -5 });
ok('expired token -> null', verifyQuote(expired, 7, PA, DA) === null);
ok('a LOGIN token is not a quote -> null', verifyQuote(signToken({ id: 7, role: 'customer' }), 7, PA, DA) === null);
ok('empty / non-string token -> null', verifyQuote('', 7, PA, DA) === null && verifyQuote(undefined, 7, PA, DA) === null && verifyQuote(12345, 7, PA, DA) === null);

console.log('\n[unit: sanitizeRoute]');
const good = [[53.5801, -2.4301], [53.53, -2.33], [53.4801, -2.2401]];
ok('valid road geometry kept', sanitizeRoute(good, Q) === good);
ok('non-array -> null', sanitizeRoute('x', Q) === null && sanitizeRoute(null, Q) === null && sanitizeRoute({}, Q) === null);
ok('single point -> null', sanitizeRoute([[53.58, -2.43]], Q) === null);
ok('non-numeric coordinate -> null', sanitizeRoute([[53.58, -2.43], ['a', 'b'], [53.48, -2.24]], Q) === null);
ok('malformed point -> null', sanitizeRoute([[53.58, -2.43], [1, 2, 3], [53.48, -2.24]], Q) === null);
ok('out-of-range latitude -> null', sanitizeRoute([[53.58, -2.43], [999, 0], [53.48, -2.24]], Q) === null);
ok('starts far from the signed pickup -> null', sanitizeRoute([[51.5, -0.12], [53.53, -2.33], [53.4801, -2.2401]], Q) === null);
ok('ends far from the signed dropoff -> null', sanitizeRoute([[53.5801, -2.4301], [53.53, -2.33], [51.5, -0.12]], Q) === null);
ok('absurdly long geometry -> null', sanitizeRoute(new Array(20001).fill([53.58, -2.43]), Q) === null);

// ---- endpoints ----
const BASE = 'http://localhost:5500';
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`; // own rate-limit bucket per script run

async function call(method, path, token, body) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}
const stamp = Date.now();
async function login(role, n) {
  const email = `${role}${n}_${stamp}@example.com`;
  await call('POST', '/api/register', null, { accept_terms: true, accept_courier_terms: true, location_consent: true, email, password: 'password123', full_name: `${role} ${n}`, role });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  const me = await call('GET', '/api/me', l.body.access_token);
  return { token: l.body.access_token, id: me.body.id };
}
const window_ = () => ({ pickup_window_start: new Date().toISOString(), pickup_window_end: new Date(Date.now() + 86400000).toISOString() });

(async () => {
  const a = await login('customer', 1);
  const b = await login('customer', 2);

  console.log('\n[endpoint: a quote token cannot be used as a login]');
  const me = await call('GET', '/api/me', tok);
  ok('quote token as Bearer -> 401 (not a 500)', me.status === 401, me);

  console.log('\n[endpoint: jobs-create honours the signed quote — WITHOUT re-quoting]');
  // Addresses no geocoder could place. A re-quote would 422; only the token can make this succeed.
  const ghostQ = { pickup_lat: 53.5800, pickup_lng: -2.4300, dropoff_lat: 53.4800, dropoff_lng: -2.2400, distance_km: 28.16, price_gbp: 31.99 };
  const ghostTok = signQuote(a.id, 'zzqx nowhere one', 'zzqx nowhere two', ghostQ);
  const geom = [[53.5801, -2.4301], [53.53, -2.33], [53.4801, -2.2401]];
  let r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'zzqx nowhere two', ...window_(), quote_token: ghostTok, route_geometry: geom });
  ok('created (201) with unplaceable addresses — no re-geocoding happened', r.status === 201, r);
  ok('posted price is EXACTLY the signed price (31.99)', r.body && Number(r.body.price_gbp) === 31.99, r.body && r.body.price_gbp);
  ok('posted distance is exactly the signed distance', r.body && Number(r.body.distance_km) === 28.16, r.body && r.body.distance_km);
  ok('road geometry stored as sent', r.body && JSON.stringify(r.body.route_geometry) === JSON.stringify(geom), r.body && r.body.route_geometry);

  console.log('\n[endpoint: refused / degraded cases]');
  r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'zzqx nowhere two', ...window_(), quote_token: signQuote(a.id, 'zzqx nowhere one', 'zzqx nowhere two', ghostQ), route_geometry: [[51.5, -0.12], [51.6, -0.1]] });
  ok('token ok + geometry far from the points -> job still posted at the signed price, no line stored', r.status === 201 && Number(r.body.price_gbp) === 31.99 && r.body.route_geometry === null, r);
  r = await call('POST', '/api/jobs-create', b.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'zzqx nowhere two', ...window_(), quote_token: ghostTok });
  ok("another customer can't use it -> 409", r.status === 409, r);
  r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'changed dropoff', ...window_(), quote_token: ghostTok });
  ok('token for different addresses -> 409', r.status === 409, r);
  r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'zzqx nowhere two', ...window_(), quote_token: 'not-a-token' });
  ok('garbage token -> 409 (refreshed quote), never a silent re-price', r.status === 409, r);
  const stale = jwt.sign({ q: 1, uid: a.id, pa: 'zzqx nowhere one', da: 'zzqx nowhere two', plat: 1, plng: 1, dlat: 1, dlng: 1, km: 1, price: 5 }, process.env.JWT_SECRET, { expiresIn: -5 });
  r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'zzqx nowhere two', ...window_(), quote_token: stale });
  ok('expired token -> 409 with a clear message', r.status === 409 && /expired/i.test(r.body.detail), r);
  r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'zzqx nowhere two', ...window_(), quote_token: signToken({ id: a.id, role: 'customer' }) });
  ok('a login token in the quote slot -> 409', r.status === 409, r);

  console.log('\n[endpoint: without a token it still quotes fresh (unchanged behaviour)]');
  r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'zzqx nowhere one', dropoff_address: 'zzqx nowhere two', ...window_() });
  ok('no token + unplaceable address -> 422 as before', r.status === 422, r);

  console.log('\n[endpoint: real quote -> real create, end to end]');
  await new Promise((res) => setTimeout(res, 1200));
  const q = await call('POST', '/api/jobs-quote', a.token, { pickup_address: 'Halliwell Road, Bolton', dropoff_address: 'Piccadilly Gardens, Manchester' });
  ok('quote returns a token', q.status === 200 && typeof q.body.quote_token === 'string', q);
  r = await call('POST', '/api/jobs-create', a.token, { pickup_address: 'Halliwell Road, Bolton', dropoff_address: 'Piccadilly Gardens, Manchester', ...window_(), quote_token: q.body.quote_token, route_geometry: q.body.route_geometry });
  ok('posted price === quoted price', r.status === 201 && Number(r.body.price_gbp) === q.body.price_gbp, [r.status, r.body && r.body.price_gbp, q.body.price_gbp]);
  ok('posted distance === quoted distance', Number(r.body.distance_km) === q.body.distance_km);
  ok('the road route came through to the job', Array.isArray(r.body.route_geometry) && r.body.route_geometry.length === (q.body.route_geometry || []).length && r.body.route_geometry.length > 10, r.body.route_geometry && r.body.route_geometry.length);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
