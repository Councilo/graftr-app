// Backs the "use my current location" button on the customer's pickup
// field. Server-side rather than called straight from the browser so it
// shares lib/geocode.js's User-Agent and error handling with the forward
// geocoder — one place that knows how to talk to Nominatim, not two.
// No auth: turning a lat/lng into an address string touches no account
// data and needs no database, so there's nothing here worth gating.
const { reverseGeocode, GeocodeServiceError } = require('../lib/geocode');
const { signPlace } = require('../lib/place-token');
const { sendError } = require('../lib/respond');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      res.status(422).json({ detail: 'lat and lng query parameters are required' });
      return;
    }

    const limit = await hit(`revgeo:${clientIp(req)}`, 30, 60);
    if (!limit.allowed) return tooMany(res, limit.retryAfter, 'location lookups');

    try {
      const address = await reverseGeocode(lat, lng);
      if (!address) {
        res.status(404).json({ detail: "Couldn't find an address for that location" });
        return;
      }
      // The token pins the address to the reading it came from, so the quote
      // can use these exact coordinates instead of looking the text up again.
      res.status(200).json({ address, lat, lng, place_token: signPlace(address, lat, lng) });
    } catch (err) {
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
