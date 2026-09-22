const { requireRole } = require('../lib/auth');
const { computeQuote, distanceMiles, haversineKm, PRICING, QuoteError, GeocodeServiceError } = require('../lib/geocode');
const { signQuote } = require('../lib/quote-token');
const { verifyPlace } = require('../lib/place-token');
const { sendError } = require('../lib/respond');
const { hit, tooMany } = require('../lib/ratelimit');
const { walkerEligibility, WALKER_PRICING, MAX_WALK_M, WALKER_HOURS_START, WALKER_HOURS_END, WALKER_HOURS_DETAIL } = require('../lib/walking');

// A car-distance trip can never be shorter than a walking one, so this only bothers checking the
// real walking route when the trip is plausibly close — up to 1.35x the mile limit, generous
// slack for a walking route that has to go the long way round something a car doesn't. Well past
// that, asking would only spend the walking service's fair use on an answer that's always "too far".
const WALKER_PREFILTER_KM = (MAX_WALK_M / 1000) * 1.35;

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

      // Walker delivery, if this trip could plausibly qualify. Its own genuine failure (the walking
      // route service being unreachable) must not fail the whole quote — a customer can still see the
      // ordinary price even when the walking option can't be worked out right now.
      let walkerOption = { eligible: false, reason: 'too_far', detail: 'Walker delivery is only for trips of a mile or less on foot.' };
      const straightLineKm = haversineKm(q.pickup_lat, q.pickup_lng, q.dropoff_lat, q.dropoff_lng);
      if (straightLineKm <= WALKER_PREFILTER_KM) {
        try {
          walkerOption = await walkerEligibility(
            { lat: q.pickup_lat, lng: q.pickup_lng },
            { lat: q.dropoff_lat, lng: q.dropoff_lng },
          );
        } catch (err) {
          walkerOption = { eligible: false, reason: 'unavailable', detail: 'The walking option is unavailable right now.' };
        }
      }

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
        // A courier with no car or bike walking the bag over, if this trip is short enough. Never
        // trust this back from the browser: jobs-create works it out again itself. Eligibility here
        // is distance only — the pickup time isn't chosen until the review screen, after the quote —
        // so `hours` is sent separately for the app to check once a time is picked.
        walker_option: { ...walkerOption, pricing: WALKER_PRICING, hours: { start: WALKER_HOURS_START, end: WALKER_HOURS_END, detail: WALKER_HOURS_DETAIL } },
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
