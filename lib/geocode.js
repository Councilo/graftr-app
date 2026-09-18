// A tiny offline stand-in for a geocoding API.
//
// Real geocoding needs an API key and a network call. Distance and price are
// instead computed from a fixed table of UK city/town centres, matched
// against whichever one appears in the submitted address text — this places
// an address at its town, not its street, and says so rather than pretending
// to street-level precision it doesn't have.
//
// It never invents a location: an address that doesn't name a known place is
// rejected by the caller (geocode() returns null) rather than priced from a
// guess — a wrong "can't find that" is recoverable by rephrasing; a wrong
// made-up distance is not.

// lowercase name -> [latitude, longitude]
const UK_PLACES = {
  london: [51.5074, -0.1278],
  birmingham: [52.4862, -1.8904],
  manchester: [53.4808, -2.2426],
  leeds: [53.8008, -1.5491],
  glasgow: [55.8642, -4.2518],
  liverpool: [53.4084, -2.9916],
  newcastle: [54.9783, -1.6178],
  sheffield: [53.3811, -1.4701],
  bristol: [51.4545, -2.5879],
  edinburgh: [55.9533, -3.1883],
  cardiff: [51.4816, -3.1791],
  belfast: [54.5973, -5.9301],
  nottingham: [52.9548, -1.1581],
  leicester: [52.6369, -1.1398],
  coventry: [52.4068, -1.5197],
  bradford: [53.7960, -1.7594],
  'stoke-on-trent': [53.0027, -2.1794],
  wolverhampton: [52.5870, -2.1288],
  plymouth: [50.3755, -4.1427],
  southampton: [50.9097, -1.4044],
  reading: [51.4543, -0.9781],
  derby: [52.9225, -1.4746],
  portsmouth: [50.8198, -1.0880],
  brighton: [50.8225, -0.1372],
  hull: [53.7457, -0.3367],
  preston: [53.7632, -2.7031],
  'milton keynes': [52.0406, -0.7594],
  oxford: [51.7520, -1.2577],
  cambridge: [52.2053, 0.1218],
  york: [53.9600, -1.0873],
  norwich: [52.6309, 1.2974],
  exeter: [50.7184, -3.5339],
  bath: [51.3811, -2.3590],
  bolton: [53.5769, -2.4282],
  bury: [53.5933, -2.2966],
  salford: [53.4875, -2.2901],
  stockport: [53.4083, -2.1494],
  oldham: [53.5409, -2.1114],
  rochdale: [53.6097, -2.1561],
  warrington: [53.3900, -2.5970],
  luton: [51.8787, -0.4200],
  swindon: [51.5558, -1.7797],
  swansea: [51.6214, -3.9436],
  aberdeen: [57.1497, -2.0943],
  dundee: [56.4620, -2.9707],
  middlesbrough: [54.5742, -1.2350],
  sunderland: [54.9069, -1.3838],
  ipswich: [52.0567, 1.1482],
  northampton: [52.2405, -0.9027],
};

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

// Longest place name first, so "Milton Keynes" wins over a stray "London"
// elsewhere in the string, and a two-word town isn't shadowed by a one-word
// city that happens to prefix one of its words.
const PLACE_NAMES_LONGEST_FIRST = Object.keys(UK_PLACES).sort((a, b) => b.length - a.length);

function geocode(address) {
  const text = String(address || '').toLowerCase();
  for (const name of PLACE_NAMES_LONGEST_FIRST) {
    if (text.includes(name)) return UK_PLACES[name];
  }
  return null;
}

const BASE_FARE_GBP = 3.50;
const PER_KM_GBP = 0.85;
const MINIMUM_FARE_GBP = 5.00;

function quotePrice(distanceKm) {
  return Math.round(Math.max(MINIMUM_FARE_GBP, BASE_FARE_GBP + PER_KM_GBP * distanceKm) * 100) / 100;
}

// Geocodes both ends of a job and returns everything a job row needs, or
// throws a QuoteError naming which address couldn't be placed.
class QuoteError extends Error {
  constructor(field, address) {
    super(`Couldn't place '${address}' — include a UK town or city name so the quote reflects a real distance, not a guess.`);
    this.field = field; // 'pickup_address' | 'dropoff_address'
  }
}

function computeQuote(pickupAddress, dropoffAddress) {
  const pickup = geocode(pickupAddress);
  if (!pickup) throw new QuoteError('pickup_address', pickupAddress);
  const dropoff = geocode(dropoffAddress);
  if (!dropoff) throw new QuoteError('dropoff_address', dropoffAddress);
  const distanceKm = Math.round(haversineKm(pickup[0], pickup[1], dropoff[0], dropoff[1]) * 100) / 100;
  return {
    pickup_lat: pickup[0],
    pickup_lng: pickup[1],
    dropoff_lat: dropoff[0],
    dropoff_lng: dropoff[1],
    distance_km: distanceKm,
    price_gbp: quotePrice(distanceKm),
  };
}

module.exports = { geocode, haversineKm, quotePrice, computeQuote, QuoteError, UK_PLACES };
