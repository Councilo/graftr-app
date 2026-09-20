const { requireRole } = require('../lib/auth');
const { computeQuote, distanceMiles, PRICING, QuoteError, GeocodeServiceError } = require('../lib/geocode');
const { signQuote } = require('../lib/quote-token');
const { verifyPlace } = require('../lib/place-token');
const { sendError } = require('../lib/respond');
const { hit, tooMany } = require('../lib/ratelimit');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireRole(req, res, 'customer');
    if (!user) return;
    // Every quote is two geocodes and a route on shared free services.
    const limit = await hit(`quote:${user.id}`, 40, 600);
    if (!limit.allowed) return tooMany(res, limit.retryAfter, 'price checks');

    const { pickup_address, dropoff_address, pickup_place, dropoff_place } = req.body || {};
    if (typeof pickup_address !== 'string' || pickup_address.trim().length < 3
      || typeof dropoff_address !== 'string' || dropoff_address.trim().length < 3) {
      res.status(422).json({ detail: 'pickup_address and dropoff_address are required' });
      return;
    }

    try {
      // Places picked from the search dropdown arrive with a signed token
      // and are used exactly; anything typed by hand (or with a token that
      // no longer matches its text) is geocoded from the words, as before.
      const q = await computeQuote(pickup_address, dropoff_address, {
        pickup: verifyPlace(pickup_place, pickup_address),
        dropoff: verifyPlace(dropoff_place, dropoff_address),
      });
      res.status(200).json({
        pickup_address,
        dropoff_address,
        distance_km: q.distance_km,
        distance_miles: distanceMiles(q.distance_km),
        price_gbp: q.price_gbp,
        // The rates the price was built from, so the screen can show the sum
        // instead of restating rates that could drift from the server's.
        pricing: PRICING,
        // Posting the job with this token locks in exactly this price and
        // distance — see lib/quote-token.js.
        quote_token: signQuote(user.id, pickup_address, dropoff_address, q),
        // Coordinates travel with the quote so the compose screen can draw
        // the route on a map without geocoding the same two addresses
        // again just to plot them.
        pickup_lat: q.pickup_lat,
        pickup_lng: q.pickup_lng,
        dropoff_lat: q.dropoff_lat,
        dropoff_lng: q.dropoff_lng,
        // The real road route, when OSRM had one — null falls back to a
        // straight line on the map, same as before this existed.
        route_geometry: q.route_geometry,
      });
    } catch (err) {
      if (err instanceof QuoteError) {
        res.status(422).json({ detail: err.message });
        return;
      }
      if (err instanceof GeocodeServiceError) {
        res.status(502).json({ detail: 'The map service is unavailable right now — try again in a moment.' });
        return;
      }
      throw err;
    }
  } catch (err) {
    sendError(res, err);
  }
};
