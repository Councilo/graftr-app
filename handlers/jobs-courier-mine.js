const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { serializeJobs, withoutFinishedRoutes } = require('../lib/jobs');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const courier = await requireRole(req, res, 'courier');
    if (!courier) return;

    await ensureSchema();
    const { rows } = await sql`
      SELECT j.*, u.full_name AS customer_name
      FROM jobs j
      LEFT JOIN users u ON u.id = j.customer_id
      WHERE j.courier_id = ${courier.id}
      ORDER BY j.created_at DESC
      LIMIT 150
    `;
    res.status(200).json(withoutFinishedRoutes(serializeJobs(rows)));
  } catch (err) {
    sendError(res, err);
  }
};
