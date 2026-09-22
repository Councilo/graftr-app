const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { serializeJob } = require('../lib/jobs');
const { publicJobView } = require('../lib/areas');
const { expireStaleJobs } = require('../lib/expiry');
const { sendError } = require('../lib/respond');
const { detourM, detourMinutes } = require('../lib/geo');

// The marketplace: open jobs, oldest first, so a courier scrolling down sees
// whoever has been waiting longest at the top. Couriers see the area only —
// full addresses arrive with the job once it is accepted (see lib/areas.js).
// Capped so the response can never outgrow what the platform will send.
// Walkers with an active route get jobs ranked and filtered by detour distance.
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const courier = await requireRole(req, res, 'courier');
    if (!courier) return;

    await ensureSchema();
    await expireStaleJobs();
    // A walker (no car or bike) can only ever do a walker job — offering them a 40-mile drive helps
    // nobody. A driver isn't limited the same way: driving somewhere a mile away is trivial, so they
    // see every open job, walker ones included (the app marks those with a walker icon; the price and
    // route on a walker job are unchanged by who accepts it, still worked out for someone on foot).
    const walkerOnly = courier.courier_mode === 'walker';
    const { rows } = walkerOnly
      ? await sql`SELECT * FROM jobs WHERE status = 'OPEN' AND delivery_mode = 'walker' ORDER BY created_at ASC LIMIT 100`
      : await sql`SELECT * FROM jobs WHERE status = 'OPEN' ORDER BY created_at ASC LIMIT 100`;
    let jobs = rows.map((row) => publicJobView(serializeJob(row)));

    // Route-aware ranking, walkers only — a driver has no declared walking route for this to rank
    // against, and isn't limited to what's "on the way" the way a walker's own two feet are.
    if (walkerOnly) {
      const routeRows = await sql`
        SELECT * FROM walker_routes
        WHERE walker_id = ${courier.id} AND expires_at > now()
      `;
      const walkerRoute = routeRows.rows[0] || null;

      if (walkerRoute && walkerRoute.geometry) {
        const polyline = JSON.parse(walkerRoute.geometry);
        const maxDetour = walkerRoute.max_detour_m || 400;

        jobs = jobs
          .map((job) => {
            const shopPt = [job.pickup_lat, job.pickup_lng];
            const custPt = [job.dropoff_lat, job.dropoff_lng];
            const dm = detourM(polyline, shopPt, custPt);
            const dmins = detourMinutes(polyline, shopPt, custPt);
            return { ...job, detour_m: isFinite(dm) ? Math.round(dm) : null, detour_minutes: isFinite(dmins) ? dmins : null, _detourM: dm };
          })
          .filter((job) => job._detourM <= maxDetour)
          .sort((a, b) => a._detourM - b._detourM)
          .map(({ _detourM, ...job }) => job);
      }
    }

    res.status(200).json(jobs);
  } catch (err) {
    sendError(res, err);
  }
};
