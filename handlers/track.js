// The public tracking link a customer can hand to whoever is receiving the
// parcel. No account, no login — so it is deliberately narrow.
//
// What it reveals, and why:
//   - the job's status and timestamps
//   - the drop-off as a broad area plus rounded coordinates (~100 m): enough for
//     a map, not enough to name the house to a stranger who found the link
//   - the courier's first name and live position, ONLY while the parcel is with
//     them (COLLECTED) — before that the courier is on their way to someone
//     else's address and there is nothing for the recipient to watch
// What it never reveals: the pickup address or coordinates (the sender's
// location), the road route (it starts at the pickup), names of anyone but the
// courier's first name, prices, photos, or anything that lets you find other jobs.
//
// The link is 144 bits of randomness, is looked up by exact match only, is rate
// limited by address, and stops working a day after the job ends.
const { sql, ensureSchema } = require('../lib/db');
const { haversineKm } = require('../lib/geocode');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

const TOKEN_RE = /^[A-Za-z0-9_-]{24}$/;
const LINK_LIFETIME_AFTER_END_MS = 24 * 60 * 60 * 1000;

const round = (n, places) => Math.round(Number(n) * 10 ** places) / 10 ** places;

// "10 Downing Street, Westminster, London, SW1A 2AA" -> "Westminster, London"
function areaOf(address) {
  const parts = String(address || '').split(',').map((s) => s.trim()).filter(Boolean);
  const rest = parts.length >= 3 ? parts.slice(1) : parts;
  return rest.filter((p) => !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(p)).slice(0, 2).join(', ');
}

const STAGES = {
  OPEN: 'Waiting for a courier to accept',
  ACCEPTED: 'A courier has accepted and is heading to collect it',
  COLLECTED: 'Your parcel is on its way',
  DELIVERED: 'Delivered',
  CANCELLED: 'This delivery was cancelled',
};

module.exports = async (req, res) => {
  // A link is a secret: keep it out of caches, referrers and search results.
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Referrer-Policy', 'no-referrer');

  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    // The token normally arrives in the X-Track-Token header — unlike a query
    // string, a header is not written to the host's request logs. The query form
    // still works so a link can be tested by hand.
    const token = String((req.headers && req.headers['x-track-token']) || (req.query && req.query.token) || '');
    if (!TOKEN_RE.test(token)) {
      res.status(404).json({ detail: 'This tracking link is not valid' });
      return;
    }

    await ensureSchema();

    // Someone trying token after token gets cut off long before it could matter.
    const limit = await hit(`track:${clientIp(req)}`, 120, 15 * 60);
    if (!limit.allowed) { tooMany(res, limit.retryAfter, 'requests'); return; }

    const { rows } = await sql`
      SELECT j.status, j.dropoff_address, j.dropoff_lat, j.dropoff_lng,
             j.courier_lat, j.courier_lng, j.courier_location_updated_at,
             j.created_at, j.accepted_at, j.collected_at, j.delivered_at, j.cancelled_at,
             c.full_name AS courier_name
      FROM jobs j
      LEFT JOIN users c ON c.id = j.courier_id
      WHERE j.tracking_token = ${token}
    `;
    const job = rows[0];
    if (!job) {
      res.status(404).json({ detail: 'This tracking link is not valid' });
      return;
    }

    const ended = job.delivered_at || job.cancelled_at;
    if (ended && Date.now() - new Date(ended).getTime() > LINK_LIFETIME_AFTER_END_MS) {
      res.status(410).json({ detail: 'This tracking link has expired' });
      return;
    }

    const live = job.status === 'COLLECTED' && job.courier_lat != null && job.courier_lng != null;
    const out = {
      status: job.status,
      stage: STAGES[job.status] || job.status,
      dropoff_area: areaOf(job.dropoff_address),
      dropoff_lat: round(job.dropoff_lat, 3),
      dropoff_lng: round(job.dropoff_lng, 3),
      created_at: job.created_at,
      accepted_at: job.accepted_at,
      collected_at: job.collected_at,
      delivered_at: job.delivered_at,
      cancelled_at: job.cancelled_at,
      courier: null,
    };
    if (job.status === 'COLLECTED') {
      out.courier = {
        first_name: String(job.courier_name || '').split(/\s+/)[0] || null,
        lat: live ? round(job.courier_lat, 4) : null,
        lng: live ? round(job.courier_lng, 4) : null,
        updated_at: live ? job.courier_location_updated_at : null,
        distance_remaining_km: live
          ? round(haversineKm(Number(job.courier_lat), Number(job.courier_lng), Number(job.dropoff_lat), Number(job.dropoff_lng)), 1)
          : null,
      };
    }
    res.status(200).json(out);
  } catch (err) {
    sendError(res, err);
  }
};
