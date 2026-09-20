// Endpoint tests: /api/address-search, /api/reverse-geocode tokens, and place tokens flowing into /api/jobs-quote.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret'; // same throwaway secret dev-server.js uses
const REPO = require('path').resolve(__dirname, '..');
const jwt = require(REPO + '/node_modules/jsonwebtoken');
const { signPlace, verifyPlace } = require(REPO + '/lib/place-token.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 240) : '')); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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

(async () => {
  console.log('[endpoint: /api/address-search]');
  let r = await call('GET', '/api/address-search?q=piccadilly%20gard');
  ok('200 with results', r.status === 200 && Array.isArray(r.body.results) && r.body.results.length > 0, r);
  const first = r.body.results[0];
  ok('each result carries primary, secondary, label, coordinates and a place token', first && first.primary && typeof first.secondary === 'string' && first.display_name && Number.isFinite(first.lat) && Number.isFinite(first.lng) && typeof first.token === 'string', first);
  const v = verifyPlace(first.token, first.display_name);
  ok('the token verifies for that result\'s label and carries its coordinates', v && v.lat === first.lat && v.lng === first.lng, v);
  ok('no error flag on a good search', r.body.error === undefined);
  r = await call('GET', '/api/address-search?q=ab');
  ok('under 3 characters -> empty list, no lookup', r.status === 200 && r.body.results.length === 0);
  r = await call('GET', '/api/address-search?q=' + 'x'.repeat(200));
  ok('over-long query -> empty list', r.status === 200 && r.body.results.length === 0);
  r = await call('GET', '/api/address-search?q=kings%20road&near=51.49,-0.17');
  ok('near=lat,lng accepted and biases results', r.status === 200 && r.body.results.length > 0 && /london|chelsea|westminster|kensington/i.test(r.body.results[0].display_name), r.body.results && r.body.results[0]);
  r = await call('GET', '/api/address-search?q=kings%20road&near=notanumber');
  ok('a malformed near is ignored, not an error', r.status === 200 && r.body.results.length > 0, r.status);
  r = await call('GET', '/api/address-search?q=kings%20road&near=999,999');
  ok('an out-of-range near is ignored', r.status === 200 && r.body.results.length > 0, r.status);
  r = await call('POST', '/api/address-search?q=kings%20road');
  ok('POST -> 405', r.status === 405);

  console.log('\n[endpoint: /api/reverse-geocode returns a place token]');
  await sleep(1100);
  r = await call('GET', '/api/reverse-geocode?lat=53.4808&lng=-2.2374');
  ok('200 with an address', r.status === 200 && typeof r.body.address === 'string', r);
  const rv = r.body && verifyPlace(r.body.place_token, r.body.address);
  ok('place_token verifies for the returned address with the reading\'s coordinates', rv && rv.lat === 53.4808 && rv.lng === -2.2374, rv);

  console.log('\n[handler: search failure is reported, not hidden]');
  Object.keys(require.cache).forEach((k) => { if (/lib[\\/]geocode|api[\\/]address-search/.test(k)) delete require.cache[k]; });
  process.env.PHOTON_BASE_URL = 'http://127.0.0.1:9';
  const handler = require(REPO + '/handlers/address-search.js');
  const realFetch = global.fetch;
  global.fetch = async () => { throw new TypeError('fetch failed'); }; // everything unreachable
  let out;
  await handler({ method: 'GET', query: { q: 'anything at all' } }, { setHeader() {}, status(c) { this.code = c; return this; }, json(b) { out = { code: this.code, body: b }; } });
  global.fetch = realFetch;
  delete process.env.PHOTON_BASE_URL;
  ok('both services down -> 200 with error:true and an empty list (form keeps working)', out && out.code === 200 && out.body.error === true && out.body.results.length === 0, out);

  console.log('\n[endpoint: place tokens drive /api/jobs-quote]');
  const email = `cust_${Date.now()}@example.com`;
  await call('POST', '/api/register', null, { accept_terms: true, accept_courier_terms: true, location_consent: true, email, password: 'password123', full_name: 'Place Tester', role: 'customer' });
  const login = await call('POST', '/api/login', null, { email, password: 'password123' });
  const ct = login.body.access_token;

  // Labels no geocoder could place, paired with genuine tokens: only the token can make these quote.
  const pTok = signPlace('zzqx pickup label', 53.5800, -2.4300);
  const dTok = signPlace('zzqx dropoff label', 53.4808, -2.2374);
  r = await call('POST', '/api/jobs-quote', ct, { pickup_address: 'zzqx pickup label', dropoff_address: 'zzqx dropoff label', pickup_place: pTok, dropoff_place: dTok });
  ok('quotes unplaceable labels when both carry a place token (no re-geocoding)', r.status === 200, r);
  ok('the quote uses the tokens\' exact coordinates', r.body && r.body.pickup_lat === 53.58 && r.body.pickup_lng === -2.43 && r.body.dropoff_lat === 53.4808 && r.body.dropoff_lng === -2.2374, r.body);
  ok('real road route between them, distance and price present', r.body && r.body.distance_km > 5 && r.body.price_gbp >= 5 && r.body.pricing && typeof r.body.quote_token === 'string', r.body && { km: r.body.distance_km, price: r.body.price_gbp });

  await sleep(1100);
  r = await call('POST', '/api/jobs-quote', ct, { pickup_address: 'zzqx pickup label', dropoff_address: 'Piccadilly Gardens, Manchester', pickup_place: pTok });
  ok('mixed: token for the pickup, typed text for the dropoff -> 200', r.status === 200 && r.body.pickup_lat === 53.58, r);

  await sleep(1100);
  r = await call('POST', '/api/jobs-quote', ct, { pickup_address: 'zzqx a different label', dropoff_address: 'zzqx dropoff label', pickup_place: pTok, dropoff_place: dTok });
  ok('a token only counts for the label it was issued with: edited text -> geocoded from words -> 422', r.status === 422, r);

  const forged = jwt.sign({ p: 1, l: 'zzqx pickup label', lat: 51.5, lng: -0.1 }, 'some-other-secret');
  r = await call('POST', '/api/jobs-quote', ct, { pickup_address: 'zzqx pickup label', dropoff_address: 'zzqx dropoff label', pickup_place: forged, dropoff_place: dTok });
  ok('forged place token ignored -> falls back to text -> 422', r.status === 422, r);

  const loginTok = login.body.access_token;
  r = await call('POST', '/api/jobs-quote', ct, { pickup_address: 'zzqx pickup label', dropoff_address: 'zzqx dropoff label', pickup_place: loginTok, dropoff_place: dTok });
  ok('a login token in a place slot is ignored -> 422', r.status === 422, r);

  r = await call('POST', '/api/jobs-quote', ct, { pickup_address: 'zzqx pickup label', dropoff_address: 'zzqx dropoff label', pickup_place: 12345, dropoff_place: {} });
  ok('non-string tokens ignored, no crash -> 422', r.status === 422, r);

  console.log('\n[endpoint: a search result flows through to a quote and a job at the same price]');
  await sleep(1100);
  const a = (await call('GET', '/api/address-search?q=halliwell%20road%20bolton')).body.results[0];
  const b = (await call('GET', '/api/address-search?q=piccadilly%20gardens%20manchester')).body.results[0];
  r = await call('POST', '/api/jobs-quote', ct, { pickup_address: a.display_name, dropoff_address: b.display_name, pickup_place: a.token, dropoff_place: b.token });
  ok('quote from two dropdown picks', r.status === 200 && r.body.pickup_lat === a.lat && r.body.dropoff_lat === b.lat, r);
  const q = r.body;
  const c = await call('POST', '/api/jobs-create', ct, { pickup_address: a.display_name, dropoff_address: b.display_name, pickup_window_start: new Date().toISOString(), pickup_window_end: new Date(Date.now() + 86400000).toISOString(), quote_token: q.quote_token, route_geometry: q.route_geometry });
  ok('posted at exactly the quoted price and distance', c.status === 201 && Number(c.body.price_gbp) === q.price_gbp && Number(c.body.distance_km) === q.distance_km, [c.status, c.body && c.body.price_gbp, q.price_gbp]);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
