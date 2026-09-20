const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { getPayment } = require('../lib/payments');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const customer = await requireRole(req, res, 'customer');
    if (!customer) return;

    const jobId = Number((req.body || {}).jobId || req.query.jobId);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }

    await ensureSchema();

    const existing = await sql`SELECT * FROM jobs WHERE id = ${jobId} AND customer_id = ${customer.id}`;
    if (!existing.rows.length) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }

    const job = existing.rows[0];
    if (job.status !== 'OPEN' && job.status !== 'CANCELLED') {
      res.status(409).json({ detail: 'Cannot delete an active order in transit. Cancel it first.' });
      return;
    }

    // Deleting a job deletes its payment record with it, so an order that has
    // been paid, refunded or disputed stays in the customer's history — that is
    // a financial record, not something to remove with one click.
    const payment = await getPayment(jobId);
    const refunds = await sql`SELECT 1 FROM refund_requests WHERE job_id = ${jobId} LIMIT 1`;
    if ((payment && payment.status !== 'UNPAID' && payment.status !== 'VOID') || refunds.rows.length) {
      res.status(409).json({ detail: 'This order has payment records, so it stays in your history and can\'t be deleted.' });
      return;
    }

    await sql`DELETE FROM jobs WHERE id = ${jobId} AND customer_id = ${customer.id}`;

    res.status(200).json({ success: true, deletedJobId: jobId });
  } catch (err) {
    sendError(res, err);
  }
};
