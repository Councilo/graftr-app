// A customer asks for money back on an order. Automatic refunds (cancelling
// before a courier accepts) never come through here; this is for the cases a
// person has to decide: parcel damaged, never delivered, courier didn't turn up,
// wrong price, anything else. See the Refund & Cancellation Policy.
const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { getPayment, openRefundRequest, remaining, pence, EPS } = require('../lib/payments');
const { hit, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

const CUSTOMER_REASONS = ['damaged', 'not_delivered', 'courier_no_show', 'wrong_price', 'other'];
const MAX_DETAILS = 1500;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const customer = await requireRole(req, res, 'customer');
    if (!customer) return;

    const body = req.body || {};
    const jobId = Number(body.jobId ?? body.job_id);
    const reason = body.reason;
    const details = typeof body.details === 'string' ? body.details.trim() : '';
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }
    if (!CUSTOMER_REASONS.includes(reason)) {
      res.status(422).json({ detail: `reason must be one of: ${CUSTOMER_REASONS.join(', ')}` });
      return;
    }
    if (details.length > MAX_DETAILS) {
      res.status(422).json({ detail: `Details can be at most ${MAX_DETAILS} characters` });
      return;
    }
    if (reason === 'other' && details.length < 10) {
      res.status(422).json({ detail: 'Please tell us a little more about what went wrong' });
      return;
    }

    await ensureSchema();

    const limit = await hit(`refund-request:${customer.id}`, 10, 24 * 60 * 60);
    if (!limit.allowed) { tooMany(res, limit.retryAfter, 'refund requests'); return; }

    const found = await sql`SELECT * FROM jobs WHERE id = ${jobId} AND customer_id = ${customer.id}`;
    const job = found.rows[0];
    if (!job) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    if (job.status === 'OPEN') {
      // Nothing has happened yet, and cancelling refunds it automatically.
      res.status(409).json({ detail: 'This order hasn\'t been accepted yet — cancel it and you\'ll be refunded automatically.' });
      return;
    }

    const payment = await getPayment(jobId);
    if (!payment) {
      res.status(409).json({ detail: 'This order has no payment record' });
      return;
    }
    const refundable = remaining(payment);
    if (payment.status === 'VOID' || payment.status === 'REFUNDED' || refundable <= EPS) {
      res.status(409).json({ detail: 'There is nothing left to refund on this order' });
      return;
    }

    const open = await sql`SELECT id FROM refund_requests WHERE job_id = ${jobId} AND status = 'PENDING' LIMIT 1`;
    if (open.rows.length) {
      res.status(409).json({ detail: 'You already have a refund request open for this order' });
      return;
    }

    let amount = refundable;
    if (body.amount !== undefined && body.amount !== null && body.amount !== '') {
      amount = pence(body.amount);
      if (!Number.isFinite(amount) || amount <= 0 || amount > refundable + EPS) {
        res.status(422).json({ detail: `The amount must be more than £0 and at most £${refundable.toFixed(2)}` });
        return;
      }
    }

    const request = await openRefundRequest(job, reason, details || null, amount);
    res.status(201).json(request);
  } catch (err) {
    sendError(res, err);
  }
};
