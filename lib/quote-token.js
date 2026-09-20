// A quote the customer has seen, signed so it can be honoured later.
//
// Posting a job used to re-run the whole quote from scratch: two Nominatim
// lookups and an OSRM route, all over again. OSRM is a free public demo that
// sometimes says no, and when it did the job fell back to a straight-line
// distance — shorter, so cheaper — and the customer was charged a different
// price from the one on screen. Signing the quote closes that: jobs-quote
// hands back a token, jobs-create accepts it instead of quoting again, and
// the price on screen is the price posted, by construction. It also halves
// the calls to the free map services.
//
// The token can't be forged or edited (the price is inside the signature),
// is tied to one customer and to the exact address text, and expires. It has
// no `sub` or `role`, and carries `q: 1`, so it can never be mistaken for a
// login token — or a login token for it.
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { requireSecret } = require('./auth');
const { haversineKm } = require('./geocode');
const { decimateRoute } = require('./areas');

const QUOTE_TTL = '15m';

function signQuote(userId, pickupAddress, dropoffAddress, q) {
  return jwt.sign(
    {
      q: 1,
      jti: crypto.randomBytes(8).toString('hex'), // makes every quote distinct, so a job can be tied to exactly one
      uid: userId,
      pa: pickupAddress,
      da: dropoffAddress,
      plat: q.pickup_lat,
      plng: q.pickup_lng,
      dlat: q.dropoff_lat,
      dlng: q.dropoff_lng,
      km: q.distance_km,
      price: q.price_gbp,
    },
    requireSecret(),
    { expiresIn: QUOTE_TTL },
  );
}

// Returns the quote fields if the token is genuine, unexpired, this
// customer's, and for exactly these addresses; otherwise null.
function verifyQuote(token, userId, pickupAddress, dropoffAddress) {
  if (typeof token !== 'string' || !token) return null;
  let p;
  try {
    p = jwt.verify(token, requireSecret());
  } catch (err) {
    if (err && err.statusCode) throw err; // a missing secret is a config error, not a bad token
    return null;
  }
  if (!p || p.q !== 1 || Number(p.uid) !== Number(userId) || p.pa !== pickupAddress || p.da !== dropoffAddress) return null;
  return {
    pickup_lat: p.plat,
    pickup_lng: p.plng,
    dropoff_lat: p.dlat,
    dropoff_lng: p.dlng,
    distance_km: p.km,
    price_gbp: p.price,
  };
}

// The road geometry travels back from the browser rather than inside the
// token (a long route is far too big for one). It affects only how the line
// is drawn, never the price, but it is still checked before being stored:
// a sane shape and size, starting and ending near the two signed points.
const MAX_ROUTE_POINTS = 20000; // more than this is refused outright
const STORED_ROUTE_POINTS = 1500; // what is actually kept: plenty to draw a road, small enough to send
const ROUTE_END_TOLERANCE_KM = 2;

function sanitizeRoute(geometry, q) {
  if (!Array.isArray(geometry) || geometry.length < 2 || geometry.length > MAX_ROUTE_POINTS) return null;
  for (const pt of geometry) {
    if (!Array.isArray(pt) || pt.length !== 2) return null;
    const [lat, lng] = pt;
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  }
  const first = geometry[0];
  const last = geometry[geometry.length - 1];
  if (haversineKm(first[0], first[1], q.pickup_lat, q.pickup_lng) > ROUTE_END_TOLERANCE_KM) return null;
  if (haversineKm(last[0], last[1], q.dropoff_lat, q.dropoff_lng) > ROUTE_END_TOLERANCE_KM) return null;
  return decimateRoute(geometry, STORED_ROUTE_POINTS);
}

module.exports = { signQuote, verifyQuote, sanitizeRoute };
