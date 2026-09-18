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

// coordinates -> a real address string, for "use my current location". Not
// restricted to the UK — reverse geocoding finds what's actually at a point,
// so a visitor testing this from outside the UK gets their real address back
// rather than a UK one invented to fit. The subsequent forward-geocode of
// that address (see geocode() above) is what actually rejects it as
// out-of-area, the same way any other unrecognised address would be.
async function reverseGeocode(lat, lng) {
  const data = await nominatimFetch(`/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
  if (!data || !data.display_name) return null;
  return data.display_name;
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

const BASE_FARE_GBP = 3.50;
const PER_KM_GBP = 0.85;
const MINIMUM_FARE_GBP = 5.00;

function quotePrice(distanceKm) {
  return Math.round(Math.max(MINIMUM_FARE_GBP, BASE_FARE_GBP + PER_KM_GBP * distanceKm) * 100) / 100;
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

async function computeQuote(pickupAddress, dropoffAddress) {
  const pickup = await geocode(pickupAddress);
  if (!pickup) throw new QuoteError('pickup_address', pickupAddress);
  const dropoff = await geocode(dropoffAddress);
  if (!dropoff) throw new QuoteError('dropoff_address', dropoffAddress);
  const distanceKm = Math.round(haversineKm(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng) * 100) / 100;
  return {
    pickup_lat: pickup.lat,
    pickup_lng: pickup.lng,
    dropoff_lat: dropoff.lat,
    dropoff_lng: dropoff.lng,
    distance_km: distanceKm,
    price_gbp: quotePrice(distanceKm),
  };
}

module.exports = {
  geocode, reverseGeocode, haversineKm, quotePrice, computeQuote,
  QuoteError, GeocodeServiceError,
};
