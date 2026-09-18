const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { serializeJobs } = require('../lib/jobs');
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
      SELECT * FROM jobs WHERE courier_id = ${courier.id} ORDER BY created_at DESC
    `;
    res.status(200).json(serializeJobs(rows));
  } catch (err) {
    sendError(res, err);
  }
};
