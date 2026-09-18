const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { computeQuote, QuoteError, GeocodeServiceError } = require('../lib/geocode');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const customer = await requireRole(req, res, 'customer');
    if (!customer) return;

    const { pickup_address, dropoff_address, pickup_window_start, pickup_window_end } = req.body || {};
    if (typeof pickup_address !== 'string' || pickup_address.trim().length < 3
      || typeof dropoff_address !== 'string' || dropoff_address.trim().length < 3) {
      res.status(422).json({ detail: 'pickup_address and dropoff_address are required' });
      return;
    }
    const start = new Date(pickup_window_start);
    const end = new Date(pickup_window_end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      res.status(422).json({ detail: 'pickup_window_start and pickup_window_end must be valid dates' });
      return;
    }
    if (end <= start) {
      res.status(422).json({ detail: 'pickup_window_end must be after pickup_window_start' });
      return;
    }

    let q;
    try {
      q = await computeQuote(pickup_address, dropoff_address);
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

    await ensureSchema();
    const { rows } = await sql`
      INSERT INTO jobs (
        customer_id, pickup_address, dropoff_address,
        pickup_lat, pickup_lng, dropoff_lat, dropoff_lng,
        pickup_window_start, pickup_window_end, distance_km, price_gbp, status
      ) VALUES (
        ${customer.id}, ${pickup_address}, ${dropoff_address},
        ${q.pickup_lat}, ${q.pickup_lng}, ${q.dropoff_lat}, ${q.dropoff_lng},
        ${start.toISOString()}, ${end.toISOString()}, ${q.distance_km}, ${q.price_gbp}, 'OPEN'
      )
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
