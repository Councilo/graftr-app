const { requireRole } = require('../lib/auth');
const { computeQuote, QuoteError, GeocodeServiceError } = require('../lib/geocode');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireRole(req, res, 'customer');
    if (!user) return;

    const { pickup_address, dropoff_address } = req.body || {};
    if (typeof pickup_address !== 'string' || pickup_address.trim().length < 3
      || typeof dropoff_address !== 'string' || dropoff_address.trim().length < 3) {
      res.status(422).json({ detail: 'pickup_address and dropoff_address are required' });
      return;
    }

    try {
      const q = await computeQuote(pickup_address, dropoff_address);
      res.status(200).json({
        pickup_address,
        dropoff_address,
        distance_km: q.distance_km,
        price_gbp: q.price_gbp,
        // Coordinates travel with the quote so the compose screen can draw
        // the route on a map without geocoding the same two addresses
        // again just to plot them.
        pickup_lat: q.pickup_lat,
        pickup_lng: q.pickup_lng,
        dropoff_lat: q.dropoff_lat,
        dropoff_lng: q.dropoff_lng,
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
