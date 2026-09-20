// Admin: list refund requests, and approve (in full or in part) or deny them.
//
// Approving moves the money record (see lib/payments.js). The order of events
// is chosen so two admins can't both act on one request: the request is CLAIMED
// first with a single UPDATE that only matches while it is still PENDING; only
// the claim's winner touches the payment; and if the payment can't take the
// refund after all, the claim is released again.
const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin } = require('../lib/auth');
const { getPayment, remaining, pence, applyApprovedRefund, reduceUnpaid, EPS } = require('../lib/payments');
const { audit } = require('../lib/audit');
const { sendError } = require('../lib/respond');

const STATUSES = ['PENDING', 'APPROVED', 'PARTIALLY_APPROVED', 'DENIED', 'AUTO_APPROVED', 'ALL'];

module.exports = async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    await ensureSchema();

    if (req.method === 'GET') {
      const status = String((req.query && req.query.status) || 'PENDING').toUpperCase();
      if (!STATUSES.includes(status)) {
        res.status(422).json({ detail: `status must be one of: ${STATUSES.join(', ')}` });
        return;
      }
      const { rows } = await sql`
        SELECT r.id, r.job_id, r.reason, r.details, r.amount_gbp, r.status, r.approved_gbp,
               r.decision_note, r.decided_at, r.created_at,
               j.status AS job_status, j.pickup_address, j.dropoff_address, j.price_gbp,
               u.full_name AS customer_name, u.email AS customer_email,
               p.status AS payment_status, p.amount_gbp AS payment_amount_gbp, p.refunded_gbp
        FROM refund_requests r
        JOIN jobs j ON j.id = r.job_id
        JOIN users u ON u.id = r.customer_id
        LEFT JOIN payments p ON p.job_id = r.job_id
        WHERE (${status} = 'ALL' OR r.status = ${status})
        ORDER BY r.id DESC
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
    const id = Number(body.id);
    const decision = body.decision;
    const note = typeof body.note === 'string' ? body.note.trim().slice(0, 1000) : '';
    if (!Number.isInteger(id) || !['approve', 'deny'].includes(decision)) {
      res.status(422).json({ detail: 'id and decision ("approve" or "deny") are required' });
      return;
    }
    if (decision === 'deny' && note.length < 3) {
      res.status(422).json({ detail: 'Give the customer a reason when denying a request' });
      return;
    }

    const found = await sql`SELECT * FROM refund_requests WHERE id = ${id}`;
    const request = found.rows[0];
    if (!request) {
      res.status(404).json({ detail: 'No such refund request' });
      return;
    }
    if (request.status !== 'PENDING') {
      res.status(409).json({ detail: `This request was already decided (${request.status})` });
      return;
    }

    // ------------------------------------------------------------------ deny
    if (decision === 'deny') {
      const denied = await sql`
        UPDATE refund_requests
        SET status = 'DENIED', decision_note = ${note}, decided_by = ${admin.id}, decided_at = now()
        WHERE id = ${id} AND status = 'PENDING' RETURNING *
      `;
      if (!denied.rows.length) {
        res.status(409).json({ detail: 'Someone else decided this request just now' });
        return;
      }
      await audit(admin.id, 'refund.deny', `refund:${id}`, note);
      res.status(200).json(denied.rows[0]);
      return;
    }

    // --------------------------------------------------------------- approve
    const payment = await getPayment(request.job_id);
    if (!payment || payment.status === 'VOID' || payment.status === 'REFUNDED') {
      res.status(409).json({ detail: 'There is nothing left to refund on this order' });
      return;
    }
    const refundable = payment.status === 'UNPAID' ? pence(payment.amount_gbp) : remaining(payment);
    let amount = pence(request.amount_gbp);
    if (body.amount !== undefined && body.amount !== null && body.amount !== '') amount = pence(body.amount);
    if (!Number.isFinite(amount) || amount <= 0 || amount > pence(request.amount_gbp) + EPS || amount > refundable + EPS) {
      res.status(422).json({ detail: `Approve more than £0 and at most £${Math.min(pence(request.amount_gbp), refundable).toFixed(2)}` });
      return;
    }
    const newStatus = amount >= pence(request.amount_gbp) - EPS ? 'APPROVED' : 'PARTIALLY_APPROVED';

    const claimed = await sql`
      UPDATE refund_requests
      SET status = ${newStatus}, approved_gbp = ${amount}, decision_note = ${note || null},
          decided_by = ${admin.id}, decided_at = now()
      WHERE id = ${id} AND status = 'PENDING' RETURNING *
    `;
    if (!claimed.rows.length) {
      res.status(409).json({ detail: 'Someone else decided this request just now' });
      return;
    }

    const moved = payment.status === 'UNPAID'
      ? await reduceUnpaid(request.job_id, amount)
      : await applyApprovedRefund(request.job_id, amount);
    if (!moved) {
      // The payment couldn't take it after all: release the claim.
      await sql`
        UPDATE refund_requests
        SET status = 'PENDING', approved_gbp = 0, decision_note = NULL, decided_by = NULL, decided_at = NULL
        WHERE id = ${id}
      `;
      res.status(409).json({ detail: 'The payment changed while you were deciding. Refresh and try again.' });
      return;
    }

    await audit(admin.id, 'refund.approve', `refund:${id}`, `£${amount.toFixed(2)} of £${pence(request.amount_gbp).toFixed(2)} requested. ${note}`);
    res.status(200).json({ ...claimed.rows[0], payment_status: moved.status, refunded_gbp: moved.refunded_gbp });
  } catch (err) {
    sendError(res, err);
  }
};
