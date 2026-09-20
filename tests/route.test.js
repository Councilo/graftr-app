// drivingRoute: two routing servers tried in turn, twice round, on a dropped connection / 429 / 5xx;
// definitive answers are not retried. Network stubbed.
const REPO = require('path').resolve(__dirname, '..');
const { drivingRoute } = require(REPO + '/lib/geocode.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 200) : '')); }
};

const GOOD = { code: 'Ok', routes: [{ distance: 25400, geometry: { coordinates: [[-2.43, 53.58], [-2.33, 53.53], [-2.24, 53.48]] } }] };
const res = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body });
const realFetch = global.fetch;
let calls = 0;
const stub = (fn) => { calls = 0; global.fetch = async (...a) => { calls++; return fn(calls, ...a); }; };
const P = { lat: 53.58, lng: -2.43 }, D = { lat: 53.48, lng: -2.24 };

(async () => {
  console.log('[drivingRoute]');
  stub(() => res(200, GOOD));
  let r = await drivingRoute(P, D);
  ok('a good answer is used, one request', r && calls === 1, [r, calls]);
  ok('distance in km and geometry as [lat, lng]', r && r.distance_km === 25.4 && r.geometry[0][0] === 53.58 && r.geometry[0][1] === -2.43, r);

  stub((n) => { if (n === 1) throw new TypeError('fetch failed'); return res(200, GOOD); });
  r = await drivingRoute(P, D);
  ok('a dropped connection is retried and succeeds', r && calls === 2, [!!r, calls]);

  stub((n) => (n === 1 ? res(429, {}) : res(200, GOOD)));
  r = await drivingRoute(P, D);
  ok('429 (busy) is retried and succeeds', r && calls === 2, [!!r, calls]);

  stub((n) => (n === 1 ? res(503, {}) : res(200, GOOD)));
  r = await drivingRoute(P, D);
  ok('a 5xx is retried and succeeds', r && calls === 2, [!!r, calls]);

  stub(() => { throw new TypeError('fetch failed'); });
  r = await drivingRoute(P, D);
  ok('every server failing, twice round -> null after four attempts', r === null && calls === 4, [r, calls]);

  stub(() => res(500, {}));
  r = await drivingRoute(P, D);
  ok('a persistent 5xx -> null after four attempts', r === null && calls === 4, [r, calls]);

  stub(() => res(400, {}));
  r = await drivingRoute(P, D);
  ok('a 4xx is definitive: null, not retried', r === null && calls === 1, [r, calls]);

  stub(() => res(200, { code: 'NoRoute', routes: [] }));
  r = await drivingRoute(P, D);
  ok('"no route" is definitive: null, not retried', r === null && calls === 1, [r, calls]);

  stub(() => ({ ok: true, status: 200, json: async () => { throw new Error('bad json'); } }));
  r = await drivingRoute(P, D);
  ok('an unreadable body -> null without throwing', r === null, r);

  const urls = [];
  global.fetch = async (url) => { urls.push(String(url)); return String(url).includes('router.project-osrm.org') ? Promise.reject(new TypeError('fetch failed')) : res(200, GOOD); };
  r = await drivingRoute(P, D);
  ok('the first server being down falls over to the second', r && r.distance_km === 25.4 && urls.length === 2 && urls[1].includes('routing.openstreetmap.de'), [!!r, urls]);

  global.fetch = realFetch;
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
