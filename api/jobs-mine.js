const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const customer = await requireRole(req, res, 'customer');
    if (!customer) return;

    await ensureSchema();
    const { rows } = await sql`
      SELECT * FROM jobs WHERE customer_id = ${customer.id} ORDER BY created_at DESC
    `;
    res.status(200).json(rows);
  } catch (err) {
    sendError(res, err);
  }
};
