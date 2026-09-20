// Admin: everything about one order in one place, for investigating a refund
// request or a support ticket — the job, both people, the payment and refund
// history, and the chat between them.
const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin } = require('../lib/auth');
const { sendError } = require('../lib/respond');
const { audit } = require('../lib/audit');
const { getPayment, applyApprovedRefund, reduceUnpaid, pence, EPS } = require('../lib/payments');

// Cancelling an order a courier has already accepted. The customer can't do this
// themselves (the button is locked, and handlers/jobs-cancel.js refuses), because
// it incurs a fee; they contact support, and an admin cancels it here with the
// fee that applies. Whatever isn't kept as the fee goes back to the customer:
//   PAID (or part-refunded)  -> the rest is recorded as refunded
//   UNPAID                   -> the amount owed is reduced to just the fee
async function cancelAccepted(req, res, admin) {
  const body = req.body || {};
  const id = Number(body.id);
  const fee = pence(body.fee_gbp === undefined || body.fee_gbp === null || body.fee_gbp === '' ? 0 : body.fee_gbp);
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 500) : '';
  if (!Number.isInteger(id) || body.action !== 'cancel') {
    res.status(422).json({ detail: 'id and action "cancel" are required' });
    return;
  }
  if (!Number.isFinite(fee) || fee < 0) {
    res.status(422).json({ detail: 'The fee must be £0 or more' });
    return;
  }
  await ensureSchema();
  const found = await sql`SELECT * FROM jobs WHERE id = ${id}`;
  const job = found.rows[0];
  if (!job) {
    res.status(404).json({ detail: 'No such job' });
    return;
  }
  if (job.status !== 'ACCEPTED') {
    res.status(409).json({ detail: `Only an order a courier has accepted (and not collected) can be cancelled here; this one is ${job.status}.` });
    return;
  }
  const payment = await getPayment(id);
  if (payment && fee > pence(payment.amount_gbp) + EPS) {
    res.status(422).json({ detail: `The fee can't be more than the order price (£${pence(payment.amount_gbp).toFixed(2)})` });
    return;
  }

  const claimed = await sql`
    UPDATE jobs
    SET status = 'CANCELLED', cancelled_at = now(),
        courier_lat = NULL, courier_lng = NULL, courier_location_updated_at = NULL
    WHERE id = ${id} AND status = 'ACCEPTED'
    RETURNING id
  `;
  if (!claimed.rows.length) {
    res.status(409).json({ detail: 'This order changed just now. Refresh and try again.' });
    return;
  }

  let returned = 0;
  let warning = null;
  if (payment && payment.status !== 'VOID' && payment.status !== 'REFUNDED') {
    const owed = pence(payment.amount_gbp);
    const alreadyBack = payment.status === 'UNPAID' ? 0 : pence(payment.refunded_gbp);
    returned = Math.max(0, pence(owed - fee - alreadyBack));
    if (returned > EPS) {
      const moved = payment.status === 'UNPAID' ? await reduceUnpaid(id, returned) : await applyApprovedRefund(id, returned);
      if (!moved) {
        warning = 'The order was cancelled but the payment could not be adjusted. Check it under Payments.';
        returned = 0;
      } else {
        await sql`
          INSERT INTO refund_requests
            (job_id, customer_id, reason, details, amount_gbp, status, approved_gbp, decision_note, decided_by, decided_at)
          VALUES
            (${id}, ${job.customer_id}, 'cancelled_after_accept', ${'Cancelled after a courier accepted; cancellation fee £' + fee.toFixed(2) + '.'},
             ${returned}, 'APPROVED', ${returned}, ${note || null}, ${admin.id}, now())
        `;
      }
    }
  }
  await audit(admin.id, 'job.cancel', `job:${id}`, `fee £${fee.toFixed(2)}, returned £${returned.toFixed(2)}. ${note}`);
  res.status(200).json({ id, status: 'CANCELLED', fee_gbp: fee, returned_gbp: returned, warning });
}

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    if (req.method === 'POST') {
      await cancelAccepted(req, res, admin);
      return;
    }

    const id = Number(req.query && req.query.id);
    if (!Number.isInteger(id)) {
      res.status(422).json({ detail: 'id is required' });
      return;
    }
    await ensureSchema();

    // No route geometry: it is large and irrelevant to a dispute.
    const found = await sql`
      SELECT j.id, j.status, j.pickup_address, j.dropoff_address, j.pickup_window_start, j.distance_km, j.price_gbp,
             j.pickup_photo_url, j.delivery_photo_url, j.courier_lat, j.courier_lng, j.courier_location_updated_at,
             j.created_at, j.accepted_at, j.collected_at, j.delivered_at, j.cancelled_at,
             cu.id AS customer_id, cu.full_name AS customer_name, cu.email AS customer_email,
             co.id AS courier_id, co.full_name AS courier_name, co.email AS courier_email
      FROM jobs j
      JOIN users cu ON cu.id = j.customer_id
      LEFT JOIN users co ON co.id = j.courier_id
      WHERE j.id = ${id}
    `;
    if (!found.rows.length) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    const payment = await sql`SELECT * FROM payments WHERE job_id = ${id}`;
    const refunds = await sql`SELECT * FROM refund_requests WHERE job_id = ${id} ORDER BY id`;
    const messages = await sql`
      SELECT id, sender_name, sender_role, content, created_at FROM messages WHERE job_id = ${id} ORDER BY id LIMIT 200
    `;
    const tickets = await sql`SELECT id, category, subject, status, created_at FROM support_tickets WHERE job_id = ${id} ORDER BY id`;
    res.status(200).json({
      job: found.rows[0],
      payment: payment.rows[0] || null,
      refund_requests: refunds.rows,
      messages: messages.rows,
      tickets: tickets.rows,
    });
  } catch (err) {
    sendError(res, err);
  }
};
