// Real geocoding via OpenStreetMap's Nominatim — no API key, but a shared
// public service with a real usage policy (nominatim.org/release-docs/latest/api/Usage-policy/):
// a maximum of one request a second, and every request must identify the
// calling application via User-Agent. Both are honoured here: pickup and
// dropoff are geocoded one after another rather than in parallel, and every
// request carries NOMINATIM_USER_AGENT. This is the right amount of care for
// where Vendaru actually is — a low-traffic, single-instance app; a
// meaningfully busier one should move to a paid geocoder or a self-hosted
// Nominatim instance, which the usage policy asks for directly.
//
// It still never invents a location. An address Nominatim can't find comes
// back null (see QuoteError below) rather than priced from a guess — a wrong
// "can't find that" is recoverable by rephrasing; a wrong made-up distance
// is not.

const NOMINATIM_USER_AGENT = 'Vendaru/1.0 (+https://vendaru.com; peer-to-peer courier)';
const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

// Thrown for "the map service didn't answer" — a network failure, a
// non-200, or Nominatim being rate-limited. Distinct from QuoteError ("we
// asked, and there's no such place") because the right response and the
// right message are different: this one is worth retrying, that one isn't.
class GeocodeServiceError extends Error {}

async function nominatimFetch(path) {
  let res;
  try {
    res = await fetch(`${NOMINATIM_BASE}${path}`, {
      headers: { 'User-Agent': NOMINATIM_USER_AGENT, 'Accept-Language': 'en-GB' },
    });
  } catch (err) {
    throw new GeocodeServiceError(`Could not reach the map service: ${err.message}`);
  }
  if (!res.ok) {
    throw new GeocodeServiceError(`Map service returned ${res.status}`);
  }
  return res.json();
}

// address -> { lat, lng, display_name } or null if nothing matched.
// countrycodes=gb scopes results to the UK, matching what the rest of the
// product assumes (UK pickup/dropoff, GBP pricing) — an address search
// outside that just won't resolve, same as it not existing.
async function geocode(address) {
  const rows = await nominatimFetch(
    `/search?format=jsonv2&limit=1&countrycodes=gb&q=${encodeURIComponent(address)}`,
  );
  if (!Array.isArray(rows) || !rows.length) return null;
  return { lat: Number(rows[0].lat), lng: Number(rows[0].lon), display_name: rows[0].display_name };
}

// ---------------------------------------------------------------------------
// Address autocomplete (the search-as-you-type dropdown)
//
// Nominatim's usage policy says outright that its search API is not for
// as-you-type autocomplete, and it is also poor at it: half a word like
// "piccadilly gard" finds nothing at all. Photon (photon.komoot.io) is the
// OpenStreetMap geocoder built for exactly this — same data, tolerant of
// partial words, several ranked results, postcodes included. It is a free
// public demo with a fair-use expectation, so results are cached here and
// PHOTON_BASE_URL can point at a self-hosted instance (or any Photon-
// compatible service) when traffic outgrows it.
//
// Two gaps are closed around it:
//  - Photon doesn't know "Rd"/"St"/"Ave" (it answered "kings rd leeds" with a
//    barber's shop), so common abbreviations are spelled out first.
//  - If Photon is down or slow, the old Nominatim search answers instead, so
//    the box degrades to "works, just less nicely" rather than to nothing.
// Only if both fail does the caller see an error, which the endpoint turns
// into a visible "couldn't search right now" instead of a silently empty list.
// ---------------------------------------------------------------------------
const PHOTON_BASE = (process.env.PHOTON_BASE_URL || 'https://photon.komoot.io').replace(/\/$/, '');
const UK_BBOX = '-8.7,49.8,1.8,60.9'; // lon/lat box around Great Britain and Northern Ireland
const SEARCH_TIMEOUT_MS = 4000;

const ROAD_ABBREVIATIONS = {
  rd: 'road', st: 'street', ave: 'avenue', av: 'avenue', ln: 'lane', dr: 'drive',
  ct: 'court', cres: 'crescent', pl: 'place', sq: 'square', gdns: 'gardens',
  gr: 'grove', ter: 'terrace', cl: 'close', hwy: 'highway',
};

// "kings rd leeds" -> "kings road leeds". Never the first word ("St Helens",
// "Dr Foster's" are names, not abbreviations).
function expandAbbreviations(query) {
  return query
    .split(/\s+/)
    .map((word, i) => {
      if (i === 0) return word;
      const bare = word.toLowerCase().replace(/[.,]+$/, '');
      return ROAD_ABBREVIATIONS[bare] || word;
    })
    .join(' ');
}

const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const NATIONS = new Set(['england', 'scotland', 'wales', 'northern ireland', 'united kingdom', 'uk']);

// Joins the non-empty parts, dropping repeats ("London, London") and anything
// already said in the headline.
function joinParts(parts, exclude = []) {
  const seen = new Set(exclude.map((s) => String(s).toLowerCase()));
  const out = [];
  for (const part of parts) {
    if (!part) continue;
    const key = String(part).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(part);
  }
  return out;
}

// One Photon feature -> { primary, secondary, display_name, lat, lng }, or
// null when it isn't a usable UK place.
function photonToResult(feature) {
  const p = (feature && feature.properties) || {};
  if (p.countrycode !== 'GB') return null; // the bbox also catches Ireland and the French coast
  const [lng, lat] = (feature.geometry && feature.geometry.coordinates) || [];
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const streetLine = [p.housenumber, p.street].filter(Boolean).join(' ');
  let primary;
  let lead = null;
  if (p.type === 'house' && p.name) { primary = p.name; lead = streetLine; } // a named place on a street
  else if (p.type === 'house') primary = streetLine;
  else primary = p.name || streetLine;
  if (!primary) return null;

  const placeLevel = ['city', 'district', 'locality', 'county', 'state'].includes(p.type);
  const secondaryParts = joinParts(
    [lead, p.district || p.locality, p.city, placeLevel ? (p.county || p.state) : null, p.postcode],
    [primary],
  ).slice(0, 3);
  const secondary = secondaryParts.join(', ');
  return {
    primary,
    secondary,
    display_name: secondary ? `${primary}, ${secondary}` : primary,
    lat,
    lng,
    // Not sent to the browser (searchAddresses strips them); used to rank by house number.
    _kind: p.type || null,
    _housenumber: p.housenumber ? String(p.housenumber) : null,
  };
}

// One Nominatim row -> the same shape. Its long "a, b, c, County, England,
// POSTCODE, United Kingdom" string is trimmed to a headline plus a short area
// line for display, but display_name stays the full text, which is what
// geocode() above already resolves reliably.
function nominatimToResult(row) {
  const parts = String(row.display_name || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return null;
  const headParts = /^\d+[a-z]?$/i.test(parts[0]) && parts[1] ? 2 : 1;
  const primary = parts.slice(0, headParts).join(' ');
  const rest = parts.slice(headParts).filter((s) => !NATIONS.has(s.toLowerCase()));
  const postcode = rest.find((s) => UK_POSTCODE_RE.test(s));
  const area = rest.filter((s) => s !== postcode).slice(0, 2);
  return {
    primary,
    secondary: [...area, postcode].filter(Boolean).join(', '),
    display_name: row.display_name,
    lat: Number(row.lat),
    lng: Number(row.lon),
  };
}

async function fetchWithTimeout(url, options, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function photonSearch(query, near) {
  const params = new URLSearchParams({ q: query, limit: '10', lang: 'en', bbox: UK_BBOX });
  // Bias towards where the customer already is (e.g. the pickup, while they
  // type the drop-off) — "Kings Road" means the one nearby first.
  if (near) { params.set('lat', String(near.lat)); params.set('lon', String(near.lng)); }
  const url = `${PHOTON_BASE}/api/?${params}`;

  // A connection that drops outright is common enough on a free public
  // service (the first request after a quiet spell often does) and the very
  // next one works, so one fast failure is retried. A timeout is not: that
  // would double the wait for someone who is typing.
  let res;
  for (let attempt = 1; ; attempt++) {
    try {
      res = await fetchWithTimeout(url, { headers: { 'User-Agent': NOMINATIM_USER_AGENT } }, SEARCH_TIMEOUT_MS);
      break;
    } catch (err) {
      if (attempt >= 2 || (err && err.name === 'AbortError')) {
        throw new GeocodeServiceError(`Could not reach the search service: ${err.message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }
  if (!res.ok) throw new GeocodeServiceError(`Search service returned ${res.status}`);
  const data = await res.json();
  return ((data && data.features) || []).map(photonToResult).filter(Boolean);
}

async function nominatimSearch(query, limit) {
  const rows = await nominatimFetch(
    `/search?format=jsonv2&limit=${limit}&countrycodes=gb&q=${encodeURIComponent(query)}`,
  );
  return Array.isArray(rows) ? rows.map(nominatimToResult).filter(Boolean) : [];
}

function dedupeResults(results) {
  const seen = new Set();
  return results.filter((r) => {
    const key = r.display_name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// The same partial query is typed by many people and re-sent by the same
// person as they edit; a short-lived cache keeps that off the free services.
const SEARCH_CACHE_TTL_MS = 10 * 60 * 1000;
const SEARCH_CACHE_MAX = 500;
const searchCache = new Map();

function cacheGet(key) {
  const hit = searchCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > SEARCH_CACHE_TTL_MS) { searchCache.delete(key); return null; }
  return hit.results;
}

function cacheSet(key, results) {
  if (searchCache.size >= SEARCH_CACHE_MAX) searchCache.delete(searchCache.keys().next().value);
  searchCache.set(key, { at: Date.now(), results });
}

// ---- door numbers -----------------------------------------------------------
// Someone typing "22 Smithills Croft Road" wants number 22, but OpenStreetMap
// doesn't map every door: Photon then answers with the street alone, and the 22
// they typed vanishes from every suggestion. So the number is read off the front
// of what they typed, and:
//   - a result that really is that house comes first;
//   - each street found is offered WITH their number ("22 Smithills Croft Road,
//     Smithills, Bolton BL1"), pinned to the street, marked approximate so the
//     dropdown can say so.
// The pin is only a point on the street, which is plenty to price the trip; the
// courier is given the address text, number included.
const HOUSE_NUMBER_RE = /^(\d{1,4}[A-Za-z]?(?:\s*[-\u2013/]\s*\d{1,4}[A-Za-z]?)?)[\s,]+([A-Za-z].{2,})$/;

function parseHouseNumber(typed) {
  const m = HOUSE_NUMBER_RE.exec(String(typed || '').trim());
  return m ? { number: m[1].replace(/\s+/g, ''), rest: m[2] } : null;
}

// A street's result -> the same street with a door number in front. The full
// postcode belongs to the street's mapped point, not necessarily to number 22, so
// only its district ("BL1") is kept.
function withHouseNumber(number, street) {
  const parts = String(street.secondary || '').split(', ').filter(Boolean);
  const pc = parts.findIndex((part) => UK_POSTCODE_RE.test(part));
  if (pc >= 0) {
    const outward = parts[pc].replace(/\s*\d[A-Z]{2}$/i, '').toUpperCase();
    parts.splice(pc, 1);
    if (parts.length) parts[parts.length - 1] = `${parts[parts.length - 1]} ${outward}`;
    else parts.push(outward);
  }
  const primary = `${number} ${street.primary}`;
  const secondary = parts.join(', ');
  return {
    primary,
    secondary,
    display_name: secondary ? `${primary}, ${secondary}` : primary,
    lat: street.lat,
    lng: street.lng,
    approximate: true,
  };
}

const sameNumber = (a, b) => String(a || '').replace(/\s+/g, '').toLowerCase() === String(b || '').replace(/\s+/g, '').toLowerCase();

// The street a result is on, from its headline ("22 Smithall Road") or, for a
// named place, from its detail line ("4 Cross Street, Leeds").
function streetOf(result) {
  const fromPrimary = /^\d+[a-z]?\s+(.+)$/i.exec(result.primary || '');
  if (fromPrimary) return fromPrimary[1].toLowerCase();
  const fromDetail = /^\d+[a-z]?\s+([^,]+)/i.exec(result.secondary || '');
  return fromDetail ? fromDetail[1].toLowerCase() : null;
}

// Does this result sit on the street the customer typed? A prefix in either
// direction counts, so a half-typed street still matches while it is being typed.
function onTypedStreet(rest, result) {
  const typedStreet = expandAbbreviations(String(rest).split(',')[0]).toLowerCase().trim();
  const street = streetOf(result);
  if (!typedStreet || !street) return false;
  return street === typedStreet || street.startsWith(typedStreet) || typedStreet.startsWith(street);
}

function applyHouseNumber(typed, results, limit) {
  const parsed = parseHouseNumber(typed);
  if (!parsed) return results;
  // "Exact" means the right number on the street they typed — number 22 of some other
  // road with a similar name is not what they asked for.
  const exact = results.filter((r) => r._housenumber && sameNumber(r._housenumber, parsed.number) && onTypedStreet(parsed.rest, r));
  const streets = results.filter((r) => r._kind === 'street' && !r._housenumber);
  // A house on some other road (the same number, or a different one) is noise once a
  // number and street were typed; everything else (a pub, a junction) can stay.
  const others = results.filter((r) => !exact.includes(r) && !streets.includes(r) && !r._housenumber);
  const offered = streets.map((street) => withHouseNumber(parsed.number, street));
  return dedupeResults([...exact, ...offered, ...others]).slice(0, limit);
}

function stripInternal(results) {
  return results.map(({ _kind, _housenumber, ...rest }) => rest);
}

// address fragment -> up to `limit` ranked candidates for the dropdown.
// `near` ({lat, lng}, optional) biases ranking towards a place. Throws
// GeocodeServiceError only when neither service could answer.
async function searchAddresses(query, opts = {}) {
  const limit = opts.limit || 6;
  const near = opts.near || null;
  const typed = String(query || '').trim().replace(/\s+/g, ' ');
  if (!typed) return [];

  const key = `${typed.toLowerCase()}|${near ? `${near.lat.toFixed(1)},${near.lng.toFixed(1)}` : ''}|${limit}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  let results = null;
  let photonError = null;
  try {
    results = dedupeResults(await photonSearch(expandAbbreviations(typed), near));
  } catch (err) {
    photonError = err;
  }

  if (photonError || !results.length) {
    try {
      const fallback = dedupeResults(await nominatimSearch(typed, limit));
      if (fallback.length) results = fallback;
    } catch (err) {
      if (photonError) throw err; // both services failed: say so
    }
  }

  // Photon failed and Nominatim (which can't complete half-typed words)
  // found nothing: that is "we couldn't ask", not "no such place". Reporting
  // it as an empty list would tell the customer nothing matches, and caching
  // it would keep saying so.
  if (photonError && !(results && results.length)) throw photonError;

  results = stripInternal(applyHouseNumber(typed, results || [], limit)).slice(0, limit);
  // Only a real Photon answer is worth remembering; a fallback answer is
  // the second-best one and shouldn't outlive Photon coming back.
  if (!photonError) cacheSet(key, results);
  return results;
}

// coordinates -> a real address string, for "use my current location". Not
// restricted to the UK — reverse geocoding finds what's actually at a point,
// so a visitor testing this from outside the UK gets their real address back
// rather than a UK one invented to fit. The subsequent forward-geocode of
// that address (see geocode() above) is what actually rejects it as
// out-of-area, the same way any other unrecognised address would be.
async function reverseGeocode(lat, lng) {
  const data = await nominatimFetch(`/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
  if (!data || !data.display_name) return null;
  return compactAddress(data);
}

// Nominatim's display_name for a point is built for reading a map, not for
// telling a courier where to go: it can lead with whatever shop happens to be
// there ("Bunsik, 1A, Piccadilly Gardens, Piccadilly, City Centre, Manchester,
// Greater Manchester, England, M1 1AF, United Kingdom"). What a courier needs is
// the street address, so this builds that from the address parts:
// "1A Piccadilly Gardens, City Centre, Manchester, M1 1AF". Falls back to the
// long form if there's nothing usable to build from.
function compactAddress(data) {
  const d = data || {};
  const a = d.address || {};
  const road = a.road || a.pedestrian || a.footway || a.path || a.cycleway || a.residential || a.living_street;
  // A house number only means something next to its road.
  const street = road ? [a.house_number, road].filter(Boolean).join(' ') : '';
  const town = a.city || a.town || a.village || a.hamlet || a.municipality || a.county;
  const area = a.suburb || a.neighbourhood;
  // With no street (a park, a field), the place's own name is the best headline.
  const headline = street || d.name || null;
  const parts = joinParts([headline, area, town, a.postcode], []);
  return parts.length >= 2 ? parts.join(', ') : (d.display_name || null);
}

const EARTH_RADIUS_KM = 6371.0;

function haversineKm(lat1, lon1, lat2, lon2) {
  const rad = (d) => (d * Math.PI) / 180;
  const p1 = rad(lat1);
  const p2 = rad(lat2);
  const dphi = rad(lat2 - lat1);
  const dlambda = rad(lon2 - lon1);
  const a = Math.sin(dphi / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dlambda / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

// Real driving directions from OSRM, the standard free routing engine for OpenStreetMap data,
// the road-network equivalent of what Nominatim is for addresses. Two independent public
// instances run it; both are demo servers (no SLA, meant for light use) that now and then drop a
// connection or answer 429 or 5xx when busy. So they are tried in turn, twice round, and only if
// all four attempts fail is there no route: that doesn't fail the quote, it comes back without
// geometry, and the app fetches the road route itself in the browser rather than drawing a
// straight line. A definitive answer (a 4xx, or "no route") is not retried anywhere.
const ROUTE_SERVERS = ['https://router.project-osrm.org', 'https://routing.openstreetmap.de/routed-car'];
const ROUTE_TIMEOUT_MS = 2500; // four attempts must fit inside a serverless function's time limit

async function drivingRoute(pickup, dropoff) {
  const query = `/route/v1/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}`
    + '?overview=full&geometries=geojson';
  const signal = () => (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(ROUTE_TIMEOUT_MS) : undefined);

  for (let round = 1; round <= 2; round++) {
    for (const base of ROUTE_SERVERS) {
      let res = null;
      try {
        const r = await fetch(base + query, { headers: { 'User-Agent': NOMINATIM_USER_AGENT }, signal: signal() });
        if (r.ok) res = r;
        else if (r.status !== 429 && r.status < 500) return null;
      } catch {
        /* dropped connection or timeout: on to the next server */
      }
      if (!res) continue;

      let data;
      try {
        data = await res.json();
      } catch {
        continue;
      }
      const route = data && data.code === 'Ok' && data.routes && data.routes[0];
      if (route) {
        return {
          distance_km: Math.round((route.distance / 1000) * 100) / 100,
          // GeoJSON orders coordinates [lng, lat]; Leaflet wants [lat, lng] — swapped
          // here, once, so nothing downstream has to remember which order it's in.
          geometry: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
        };
      }
      if (data && data.code === 'NoRoute') return null;
    }
    if (round < 2) await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return null;
}

// Fares are per mile because miles are what the customer sees everywhere in
// the app. £1.37/mile is the same rate the app used when it priced per km
// (£0.85/km × 1.609 = £1.368), rounded to the penny.
const KM_PER_MILE = 1.609344;
const BASE_FARE_GBP = 3.50;
const PER_MILE_GBP = 1.37;
const MINIMUM_FARE_GBP = 5.00;

const PRICING = {
  base_fare_gbp: BASE_FARE_GBP,
  per_mile_gbp: PER_MILE_GBP,
  minimum_fare_gbp: MINIMUM_FARE_GBP,
};

// Distance is rounded to one decimal *before* pricing, so the price is always
// exactly base + (the miles shown on screen) × rate — a customer can check the
// sum themselves and it matches to the penny.
function distanceMiles(distanceKm) {
  return Math.round((distanceKm / KM_PER_MILE) * 10) / 10;
}

// Whole pence throughout: base + rate × tenths-of-a-mile is exact in integers,
// so a half-penny total (15.5 mi × £1.37 + £3.50 = £24.735) always rounds up
// rather than landing either side of it by floating-point luck.
function quotePrice(distanceKm) {
  const tenths = Math.round((distanceKm / KM_PER_MILE) * 10);
  const pence = Math.round((Math.round(BASE_FARE_GBP * 100) * 10 + Math.round(PER_MILE_GBP * 100) * tenths) / 10);
  return Math.max(Math.round(MINIMUM_FARE_GBP * 100), pence) / 100;
}

// Geocodes both ends of a job and returns everything a job row needs, or
// throws a QuoteError naming which address couldn't be placed. Sequential,
// not Promise.all — see the usage-policy note at the top of this file.
class QuoteError extends Error {
  constructor(field, address) {
    super(`Couldn't place '${address}' — try including a street, postcode or town so the address can be found.`);
    this.field = field; // 'pickup_address' | 'dropoff_address'
  }
}

// `resolved` ({ pickup, dropoff }, each optional) carries places the customer
// already picked from the search dropdown, verified by lib/place-token.js.
// Those are used as they are — the exact spot chosen, with no second lookup
// that could land somewhere else — and only an address that was typed by hand
// goes through geocode().
async function computeQuote(pickupAddress, dropoffAddress, resolved = {}) {
  const pickup = resolved.pickup || await geocode(pickupAddress);
  if (!pickup) throw new QuoteError('pickup_address', pickupAddress);
  const dropoff = resolved.dropoff || await geocode(dropoffAddress);
  if (!dropoff) throw new QuoteError('dropoff_address', dropoffAddress);

  // The road route is what a courier actually drives, so it's what's priced
  // and shown when it's available — a straight line under-counts every real
  // trip, since roads famously aren't straight. Falling back to it only
  // when OSRM genuinely can't answer, rather than using it by default and
  // "upgrading" to the real route later, means the price shown at quote time
  // is the same price the job is created with; the only variable is whether
  // a real route was available at all.
  const route = await drivingRoute(pickup, dropoff);
  const distanceKm = route
    ? route.distance_km
    : Math.round(haversineKm(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng) * 100) / 100;

  return {
    pickup_lat: pickup.lat,
    pickup_lng: pickup.lng,
    dropoff_lat: dropoff.lat,
    dropoff_lng: dropoff.lng,
    distance_km: distanceKm,
    price_gbp: quotePrice(distanceKm),
    // null when neither routing server could answer — the app then fetches the
    // road route itself in the browser, and shows none until it has one, rather
    // than pretending to a route it doesn't have.
    route_geometry: route ? route.geometry : null,
  };
}

module.exports = {
  geocode, searchAddresses, expandAbbreviations, photonToResult, nominatimToResult, reverseGeocode, compactAddress, haversineKm, quotePrice, distanceMiles, PRICING, drivingRoute, computeQuote,
  QuoteError, GeocodeServiceError, parseHouseNumber, withHouseNumber, applyHouseNumber };
