// Admin: the payments ledger. Payments are settled by hand (bank transfer or
// invoice), so this is where an admin records that an order has been paid.
const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin } = require('../lib/auth');
const { audit } = require('../lib/audit');
const { sendError } = require('../lib/respond');

const STATUSES = ['UNPAID', 'PAID', 'PARTIALLY_REFUNDED', 'REFUNDED', 'VOID', 'ALL'];

module.exports = async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    await ensureSchema();

    if (req.method === 'GET') {
      const status = String((req.query && req.query.status) || 'UNPAID').toUpperCase();
      if (!STATUSES.includes(status)) {
        res.status(422).json({ detail: `status must be one of: ${STATUSES.join(', ')}` });
        return;
      }
      const { rows } = await sql`
        SELECT p.id, p.job_id, p.amount_gbp, p.refunded_gbp, p.status, p.method, p.reference, p.paid_at, p.created_at,
               j.status AS job_status, j.pickup_address, j.dropoff_address,
               u.full_name AS customer_name, u.email AS customer_email
        FROM payments p
        JOIN jobs j ON j.id = p.job_id
        JOIN users u ON u.id = p.customer_id
        WHERE (${status} = 'ALL' OR p.status = ${status})
        ORDER BY p.id DESC
        LIMIT 100
      `;
      res.status(200).json(rows);
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ detail: 'Method not allowed' });
      return;
    }

    const body = req.body || {};
    const jobId = Number(body.jobId);
    const reference = typeof body.reference === 'string' ? body.reference.trim().slice(0, 100) : '';
    if (!Number.isInteger(jobId) || body.action !== 'mark_paid') {
      res.status(422).json({ detail: 'jobId and action "mark_paid" are required' });
      return;
    }
    // Only an UNPAID payment can be marked paid: the WHERE clause is the rule.
    const { rows } = await sql`
      UPDATE payments
      SET status = 'PAID', paid_at = now(), reference = ${reference || null}, updated_at = now()
      WHERE job_id = ${jobId} AND status = 'UNPAID'
      RETURNING *
    `;
    if (!rows.length) {
      res.status(409).json({ detail: 'That order is not awaiting payment' });
      return;
    }
    await audit(admin.id, 'payment.mark_paid', `job:${jobId}`, reference ? `ref ${reference}` : null);
    res.status(200).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
