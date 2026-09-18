const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { sendError } = require('../lib/respond');

// The marketplace: every OPEN job, oldest first, so a courier scrolling down
// sees whoever has been waiting longest at the top.
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
      SELECT * FROM jobs WHERE status = 'OPEN' ORDER BY created_at ASC
    `;
    res.status(200).json(rows);
  } catch (err) {
    sendError(res, err);
  }
};
