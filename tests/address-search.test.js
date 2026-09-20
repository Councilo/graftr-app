// Address search: pure unit checks, live Photon, location bias, cache, and the Photon->Nominatim fallback.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret'; // same throwaway secret dev-server.js uses
const REPO = require('path').resolve(__dirname, '..');
const jwt = require(REPO + '/node_modules/jsonwebtoken');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 220) : '')); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const geo = require(REPO + '/lib/geocode.js');
const { signPlace, verifyPlace } = require(REPO + '/lib/place-token.js');

console.log('[unit: expandAbbreviations]');
const ex = geo.expandAbbreviations;
ok('kings rd leeds -> kings road leeds', ex('kings rd leeds') === 'kings road leeds', ex('kings rd leeds'));
ok('oxford st london -> oxford street london', ex('oxford st london') === 'oxford street london');
ok('first word never expanded: "St Helens"', ex('St Helens') === 'St Helens', ex('St Helens'));
ok('first word never expanded: "Rd"', ex('Rd') === 'Rd');
ok('trailing punctuation handled: "park ln., leeds"', ex('park ln., leeds') === 'park lane leeds', ex('park ln., leeds'));
ok('several at once: "10 rose ave cl"', ex('10 rose ave cl') === '10 rose avenue close', ex('10 rose ave cl'));
ok('postcodes untouched', ex('bl1 3pj') === 'bl1 3pj');

console.log('\n[unit: photonToResult]');
const feat = (props, coords = [-2.24, 53.48]) => ({ properties: props, geometry: { coordinates: coords } });
let r = geo.photonToResult(feat({ type: 'street', name: 'Sefton Street', city: 'Manchester', postcode: 'M8 5AH', countrycode: 'GB' }));
ok('street: primary / secondary / label', r && r.primary === 'Sefton Street' && r.secondary === 'Manchester, M8 5AH' && r.display_name === 'Sefton Street, Manchester, M8 5AH', r);
ok('keeps lat/lng in the right order', r && r.lat === 53.48 && r.lng === -2.24, r);
r = geo.photonToResult(feat({ type: 'house', housenumber: '10', street: 'Downing Street', city: 'London', postcode: 'SW1A 2AA', countrycode: 'GB' }));
ok('house without a name: "10 Downing Street"', r && r.primary === '10 Downing Street' && r.secondary === 'London, SW1A 2AA', r);
r = geo.photonToResult(feat({ type: 'house', name: 'Kings Barber', housenumber: '4', street: 'Cross Street', city: 'Leeds', postcode: 'LS22 6RD', countrycode: 'GB' }));
ok('named place: name is the headline, street in the detail line', r && r.primary === 'Kings Barber' && r.secondary === '4 Cross Street, Leeds, LS22 6RD', r);
r = geo.photonToResult(feat({ type: 'house', name: '10 Downing Street', housenumber: '10', street: 'Downing Street', city: 'London', postcode: 'SW1A 2AA', countrycode: 'GB' }));
ok('a name repeated by the street line is not shown twice', r && r.primary === '10 Downing Street' && r.secondary === 'London, SW1A 2AA', r);
r = geo.photonToResult(feat({ type: 'city', name: 'Manchester', county: 'Greater Manchester', state: 'England', countrycode: 'GB' }));
ok('place-level result gets its county', r && r.primary === 'Manchester' && r.secondary === 'Greater Manchester', r);
r = geo.photonToResult(feat({ type: 'city', name: 'Leeds', city: 'Leeds', countrycode: 'GB' }));
ok('no "Leeds, Leeds"', r && r.secondary === '' && r.display_name === 'Leeds', r);
ok('non-UK dropped (Dublin)', geo.photonToResult(feat({ type: 'city', name: 'Dublin', countrycode: 'IE' })) === null);
ok('missing coordinates dropped', geo.photonToResult({ properties: { name: 'x', countrycode: 'GB' }, geometry: {} }) === null);
ok('nameless and streetless dropped', geo.photonToResult(feat({ type: 'other', countrycode: 'GB' })) === null);

console.log('\n[unit: nominatimToResult]');
r = geo.nominatimToResult({ display_name: 'Kings Road, Bramhope, Leeds, West Yorkshire, England, LS16 9JN, United Kingdom', lat: '53.9', lon: '-1.6' });
ok('trimmed headline and area line', r && r.primary === 'Kings Road' && r.secondary === 'Bramhope, Leeds, LS16 9JN', r);
ok('display_name stays the full text', r && r.display_name.startsWith('Kings Road, Bramhope, Leeds, West Yorkshire'), r);
ok('lat / lng numeric', r && r.lat === 53.9 && r.lng === -1.6);
r = geo.nominatimToResult({ display_name: '10, Downing Street, Westminster, London, England, SW1A 2AA, United Kingdom', lat: '51.5', lon: '-0.12' });
ok('numbered address keeps the number with the street', r && r.primary === '10 Downing Street', r);

console.log('\n[unit: door numbers]');
const pn = geo.parseHouseNumber;
ok('"22 Smithills Croft Road, Smithills," -> 22 + the rest', JSON.stringify(pn('22 Smithills Croft Road, Smithills,')) === JSON.stringify({ number: '22', rest: 'Smithills Croft Road, Smithills,' }), pn('22 Smithills Croft Road, Smithills,'));
ok('letters and ranges: 4b, 22-24', pn('4b Kings Rd').number === '4b' && pn('22-24 High St, Leeds').number === '22-24');
ok('no number, a postcode, or too little street -> null', pn('Kings Road') === null && pn('BL1 6LH') === null && pn('22 sm') === null && pn('') === null);
const mk = (o) => ({ primary: '', secondary: '', display_name: '', lat: 53.6, lng: -2.45, _kind: null, _housenumber: null, ...o });
const street = mk({ primary: 'Smithills Croft Road', secondary: 'Smithills, Bolton, BL1 6LH', display_name: 'Smithills Croft Road, Smithills, Bolton, BL1 6LH', _kind: 'street' });
const wh = geo.withHouseNumber('22', street);
ok('the typed number goes on the street, marked approximate, pinned to the street', wh.primary === '22 Smithills Croft Road' && wh.approximate === true && wh.lat === 53.6 && wh.lng === -2.45, wh);
ok("only the postcode DISTRICT is kept (the street's full postcode may not be number 22's)", wh.secondary === 'Smithills, Bolton BL1' && !/6LH/.test(wh.display_name), wh);
ok('display_name reads like an address', wh.display_name === '22 Smithills Croft Road, Smithills, Bolton BL1', wh.display_name);
ok('a street with no area line still works', geo.withHouseNumber('7', mk({ primary: 'High Street', secondary: 'LS1 4AB', _kind: 'street' })).secondary === 'LS1');
const house22 = mk({ primary: '22 Smithills Croft Road', secondary: 'Bolton, BL1 6LN', display_name: '22 Smithills Croft Road, Bolton, BL1 6LN', _kind: 'house', _housenumber: '22' });
const wrongRoad = mk({ primary: '22 Smithall Road', secondary: 'Beverley, HU17 9GU', display_name: '22 Smithall Road, Beverley, HU17 9GU', _kind: 'house', _housenumber: '22' });
const pub = mk({ primary: 'The Crown', secondary: 'Smithills, Bolton', display_name: 'The Crown, Smithills, Bolton', _kind: 'house', _housenumber: null });
let out = geo.applyHouseNumber('22 Smithills Croft Road, Smithills,', [wrongRoad, street, house22, pub], 6);
ok('a real number 22 on the typed street comes first, unmarked', out[0] === house22 && !out[0].approximate, out.map((x) => x.display_name));
ok('the bare street is offered with the number after it', out[1].primary === '22 Smithills Croft Road' && out[1].approximate === true, out.map((x) => x.display_name));
ok('number 22 of a different road is dropped', !out.some((x) => /Smithall/.test(x.display_name)), out.map((x) => x.display_name));
ok('the bare street is not also listed without its number', !out.some((x) => x.primary === 'Smithills Croft Road'), out.map((x) => x.primary));
out = geo.applyHouseNumber('22 Smithills Croft Road', [street], 6);
ok('when the door is not mapped, the street still becomes "22 …"', out.length === 1 && out[0].primary === '22 Smithills Croft Road' && out[0].approximate, out);
out = geo.applyHouseNumber('22 smith', [street, wrongRoad], 6);
ok('a half-typed street still keeps the number', out.some((x) => x.primary === '22 Smithills Croft Road'), out.map((x) => x.primary));
out = geo.applyHouseNumber('Smithills Croft Road', [street, pub], 6);
ok('no number typed: results untouched', out.length === 2 && out[0] === street && !out[0].approximate, out);
ok('the limit is respected', geo.applyHouseNumber('22 Smithills Croft Road', [street, street, mk({ primary: 'Back Smithills Croft Road', secondary: 'Bolton', display_name: 'Back Smithills Croft Road, Bolton', _kind: 'street' })], 1).length === 1);

console.log('\n[unit: place tokens]');
const tok = signPlace('Piccadilly Gardens, Manchester', 53.4808, -2.2374);
ok('round-trips coordinates for the same label', JSON.stringify(verifyPlace(tok, 'Piccadilly Gardens, Manchester')) === JSON.stringify({ lat: 53.4808, lng: -2.2374, display_name: 'Piccadilly Gardens, Manchester' }), verifyPlace(tok, 'Piccadilly Gardens, Manchester'));
ok('edited label -> null (token stops applying)', verifyPlace(tok, 'Piccadilly Gardens, Manchester ') === null && verifyPlace(tok, 'Leeds') === null);
const forged = jwt.sign({ p: 1, l: 'Piccadilly Gardens, Manchester', lat: 51.5, lng: -0.1 }, 'another-secret');
ok('coordinates forged with another secret -> null', verifyPlace(forged, 'Piccadilly Gardens, Manchester') === null);
const tp = tok.split('.');
const edited = tp[0] + '.' + Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(tp[1], 'base64url')), lat: 51.5 })).toString('base64url') + '.' + tp[2];
ok('coordinates edited after signing -> null', verifyPlace(edited, 'Piccadilly Gardens, Manchester') === null);
ok('expired -> null', verifyPlace(jwt.sign({ p: 1, l: 'x', lat: 1, lng: 1 }, process.env.JWT_SECRET, { expiresIn: -5 }), 'x') === null);
ok('a login token is not a place token', verifyPlace(jwt.sign({ sub: 1, role: 'customer' }, process.env.JWT_SECRET), 'x') === null);
ok('a place token has no sub/role/q (cannot pass as login or quote)', jwt.decode(tok).q === undefined && jwt.decode(tok).sub === undefined && jwt.decode(tok).role === undefined);
ok('garbage / empty -> null', verifyPlace('nope', 'x') === null && verifyPlace('', 'x') === null && verifyPlace(undefined, 'x') === null);
const saved = process.env.JWT_SECRET; delete process.env.JWT_SECRET;
ok('no JWT_SECRET: signing yields no token instead of throwing', signPlace('x', 1, 1) === null);
process.env.JWT_SECRET = saved;

(async () => {
  console.log('\n[live: Photon search through lib/geocode.js]');
  let res = await geo.searchAddresses('piccadilly gard');
  ok('partial word finds Piccadilly Gardens', res.length > 0 && /piccadilly gardens/i.test(res[0].primary), res.slice(0, 2));
  ok('every result has primary, label and coordinates', res.every((x) => x.primary && x.display_name && Number.isFinite(x.lat) && Number.isFinite(x.lng)));
  ok('no duplicate labels', new Set(res.map((x) => x.display_name.toLowerCase())).size === res.length);
  ok('at most 6 results', res.length <= 6);
  res = await geo.searchAddresses('kings rd leeds');
  ok('"Rd" abbreviation now finds Kings Road, Leeds', res.length > 0 && /kings road/i.test(res[0].primary) && /leeds/i.test(res[0].secondary + res[0].display_name), res.slice(0, 2));
  res = await geo.searchAddresses('bl1 3pj');
  ok('a postcode finds the postcode', res.length > 0 && /BL1 3PJ/i.test(res[0].display_name), res.slice(0, 2));
  res = await geo.searchAddresses('sefton street manchester');
  ok('sefton street manchester', res.length > 0 && /sefton street/i.test(res[0].primary), res.slice(0, 2));

  console.log('\n[live: location bias]');
  const nearLondon = await geo.searchAddresses('kings road', { near: { lat: 51.49, lng: -0.17 } });
  const nearLeeds = await geo.searchAddresses('kings road', { near: { lat: 53.80, lng: -1.55 } });
  ok('"kings road" ranks differently near London vs near Leeds', nearLondon.length && nearLeeds.length && nearLondon[0].display_name !== nearLeeds[0].display_name, [nearLondon[0], nearLeeds[0]]);
  ok('near London: the top result is in London', /london|chelsea|westminster|kensington/i.test(nearLondon[0].display_name), nearLondon[0]);
  ok('near Leeds: the top result is in Leeds', /leeds|bramhope|headingley|yorkshire/i.test(nearLeeds[0].display_name), nearLeeds[0]);

  console.log('\n[live: cache]');
  const t0 = Date.now(); await geo.searchAddresses('piccadilly gard'); const cachedMs = Date.now() - t0;
  ok('a repeated query is served from cache (<5ms)', cachedMs < 5, cachedMs);

  console.log('\n[fallback: Photon unreachable -> Nominatim answers]');
  Object.keys(require.cache).forEach((k) => { if (/lib[\\/]geocode/.test(k)) delete require.cache[k]; });
  process.env.PHOTON_BASE_URL = 'http://127.0.0.1:9'; // a port nothing listens on
  const geo2 = require(REPO + '/lib/geocode.js');
  await sleep(1100);
  res = await geo2.searchAddresses('halliwell road bolton');
  ok('still returns results, via Nominatim', res.length > 0 && /halliwell/i.test(res[0].primary), res.slice(0, 2));
  ok('fallback results have the same shape', res[0] && res[0].primary && res[0].display_name && Number.isFinite(res[0].lat));
  await sleep(1100);
  let threw = null;
  try { await geo2.searchAddresses('zzqxjv nowhere at all'); } catch (e) { threw = e; }
  ok('Photon down + Nominatim finds nothing -> an ERROR (we could not ask), not "no matches"', threw && threw.constructor.name === 'GeocodeServiceError', threw && threw.message);
  delete process.env.PHOTON_BASE_URL;

  console.log('\n[stubbed network: transient failures, errors and caching]');
  Object.keys(require.cache).forEach((k) => { if (/lib[\\/]geocode/.test(k)) delete require.cache[k]; });
  const geo3 = require(REPO + '/lib/geocode.js');
  const realFetch = global.fetch;
  const PHOTON_OK = { features: [{ properties: { type: 'street', name: 'Piccadilly Gardens', city: 'Manchester', postcode: 'M1 1AF', countrycode: 'GB' }, geometry: { coordinates: [-2.2374, 53.4808] } }] };
  const jsonRes = (body, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => body });
  let photonCalls = 0, nominatimCalls = 0;
  const stub = (photonBehaviour, nominatimBody) => {
    photonCalls = 0; nominatimCalls = 0;
    global.fetch = async (url) => {
      if (String(url).includes('nominatim')) { nominatimCalls++; return jsonRes(nominatimBody || []); }
      photonCalls++;
      return photonBehaviour(photonCalls);
    };
  };

  // 1. The exact failure seen live: first connection drops, the next works.
  stub((n) => { if (n === 1) throw new TypeError('fetch failed'); return jsonRes(PHOTON_OK); });
  res = await geo3.searchAddresses('stub one');
  ok('one dropped connection is retried and the search succeeds', res.length === 1 && res[0].primary === 'Piccadilly Gardens' && photonCalls === 2, [res.length, photonCalls]);
  ok('...without needing the fallback', nominatimCalls === 0, nominatimCalls);

  // 2. Both Photon attempts fail, Nominatim finds nothing: error, and NOT cached.
  stub(() => { throw new TypeError('fetch failed'); }, []);
  threw = null; try { await geo3.searchAddresses('stub two'); } catch (e) { threw = e; }
  ok('Photon failing twice + empty fallback -> error thrown', threw && threw.constructor.name === 'GeocodeServiceError', threw && threw.message);
  ok('Photon was tried twice, not more', photonCalls === 2, photonCalls);
  stub(() => jsonRes(PHOTON_OK));
  res = await geo3.searchAddresses('stub two');
  ok('the failure was not cached: the next attempt gets real results', res.length === 1 && photonCalls === 1, [res.length, photonCalls]);

  // 3. A timeout is not retried (doubling the wait for someone typing).
  stub(() => { const e = new Error('aborted'); e.name = 'AbortError'; throw e; }, [{ display_name: 'Deansgate, City Centre, Manchester, Greater Manchester, England, M3 4LY, United Kingdom', lat: '53.4', lon: '-2.2' }]);
  res = await geo3.searchAddresses('stub three');
  ok('a timeout is tried once only, then falls back', photonCalls === 1 && nominatimCalls === 1 && res.length === 1, [photonCalls, nominatimCalls]);
  ok('fallback answers are not cached (Photon may be back next time)', (stub(() => jsonRes(PHOTON_OK)), (await geo3.searchAddresses('stub three')).length === 1 && photonCalls === 1));

  // 4. Photon answering "no matches" is a real answer: cached, no fallback needed to be correct.
  stub(() => jsonRes({ features: [] }), []);
  res = await geo3.searchAddresses('stub four');
  ok('Photon empty + fallback empty -> [] (a genuine no-match), not an error', Array.isArray(res) && res.length === 0, res);
  const before = photonCalls;
  await geo3.searchAddresses('stub four');
  ok('a genuine no-match is cached', photonCalls === before, [before, photonCalls]);

  // 5. Non-200 from Photon (e.g. rate limited) is a failure, then the fallback answers.
  stub(() => jsonRes({}, 429), [{ display_name: 'Deansgate, City Centre, Manchester, Greater Manchester, England, M3 4LY, United Kingdom', lat: '53.4', lon: '-2.2' }]);
  res = await geo3.searchAddresses('stub five');
  ok('Photon 429 -> fallback answers', res.length === 1 && nominatimCalls === 1, [res.length, nominatimCalls]);

  // 6. Non-GB features are filtered from what Photon returns.
  stub(() => jsonRes({ features: [{ properties: { type: 'city', name: 'Dublin', countrycode: 'IE' }, geometry: { coordinates: [-6.2, 53.3] } }, ...PHOTON_OK.features] }));
  res = await geo3.searchAddresses('stub six');
  ok('Irish result filtered out, UK one kept', res.length === 1 && res[0].primary === 'Piccadilly Gardens', res);
  global.fetch = realFetch;

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
