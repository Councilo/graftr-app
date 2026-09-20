// Admin: the trail of what admins have done, newest first — who decided which
// refund, recorded which payment, suspended which account, and when.
const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin } = require('../lib/auth');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    await ensureSchema();
    const { rows } = await sql`
      SELECT a.id, a.action, a.target, a.details, a.created_at, u.email AS actor_email
      FROM audit_log a
      LEFT JOIN users u ON u.id = a.actor_id
      ORDER BY a.id DESC
      LIMIT 200
    `;
    res.status(200).json(rows);
  } catch (err) {
    sendError(res, err);
  }
};
