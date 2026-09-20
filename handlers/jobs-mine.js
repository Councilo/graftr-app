const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { serializeJobs, withoutFinishedRoutes } = require('../lib/jobs');
const { sendError } = require('../lib/respond');
const { expireStaleJobs } = require('../lib/expiry');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const customer = await requireRole(req, res, 'customer');
    if (!customer) return;

    await ensureSchema();
    await expireStaleJobs();
    // Alongside each job: who is carrying it, whether it has been paid or
    // refunded, and where any refund request stands — everything the order
    // card shows, in one round trip.
    const { rows } = await sql`
      SELECT j.*,
             c.full_name AS courier_name,
             p.status AS payment_status,
             p.refunded_gbp AS refunded_gbp,
             p.amount_gbp AS payment_amount_gbp
      FROM jobs j
      LEFT JOIN users c ON c.id = j.courier_id
      LEFT JOIN payments p ON p.job_id = j.id
      WHERE j.customer_id = ${customer.id}
      ORDER BY j.created_at DESC
      LIMIT 150
    `;
    // Where each job's most recent refund request stands. Fetched on its own
    // and matched up here (a customer has few) rather than as a correlated
    // subquery, which keeps the query simple enough for every SQL engine.
    const refunds = await sql`SELECT job_id, status FROM refund_requests WHERE customer_id = ${customer.id} ORDER BY id`;
    const latestRefund = new Map(refunds.rows.map((r) => [r.job_id, r.status])); // later rows overwrite earlier
    const withRefunds = rows.map((job) => ({ ...job, refund_status: latestRefund.get(job.id) || null }));
    res.status(200).json(withoutFinishedRoutes(serializeJobs(withRefunds, { forCustomer: true })));
  } catch (err) {
    sendError(res, err);
  }
};
