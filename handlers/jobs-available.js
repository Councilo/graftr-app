const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { serializeJob } = require('../lib/jobs');
const { publicJobView } = require('../lib/areas');
const { expireStaleJobs } = require('../lib/expiry');
const { sendError } = require('../lib/respond');

// The marketplace: open jobs, oldest first, so a courier scrolling down sees
// whoever has been waiting longest at the top. Couriers see the area only —
// full addresses arrive with the job once it is accepted (see lib/areas.js).
// Capped so the response can never outgrow what the platform will send.
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
    // A walker (no car or bike) only ever sees walker jobs, and a driver only ever sees the rest —
    // a driver offered a mile-long walking job, or a walker offered a 40-mile drive, helps nobody.
    const mode = courier.courier_mode === 'walker' ? 'walker' : 'standard';
    const { rows } = await sql`
      SELECT * FROM jobs WHERE status = 'OPEN' AND delivery_mode = ${mode} ORDER BY created_at ASC LIMIT 100
    `;
    res.status(200).json(rows.map((row) => publicJobView(serializeJob(row))));
  } catch (err) {
    sendError(res, err);
  }
};
