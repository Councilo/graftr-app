const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { sendError } = require('../lib/respond');

// The customer's own refund requests, newest first, with the decision and
// the admin's note once there is one.
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
      SELECT r.id, r.job_id, r.reason, r.details, r.amount_gbp, r.status, r.approved_gbp,
             r.decision_note, r.decided_at, r.created_at,
             j.pickup_address, j.dropoff_address
      FROM refund_requests r
      JOIN jobs j ON j.id = r.job_id
      WHERE r.customer_id = ${customer.id}
      ORDER BY r.id DESC
      LIMIT 100
    `;
    res.status(200).json(rows);
  } catch (err) {
    sendError(res, err);
  }
};
