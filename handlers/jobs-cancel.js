// Cancelling a job. What happens depends on who cancels and how far it got —
// the same rules the Refund & Cancellation Policy publishes:
//
//   Customer, job still OPEN (no courier yet)   -> CANCELLED, automatic full refund
//   Customer, courier ACCEPTED but not collected -> LOCKED: cancelling now incurs a fee, so the
//                                                   customer contacts support, who cancel it with
//                                                   the fee applied (handlers/admin-job.js)
//   Customer, parcel already COLLECTED           -> refused: use "Report a problem"
//   Courier (assigned), not yet collected        -> the job goes back to OPEN so another
//                                                   courier can take it; the customer is not
//                                                   left stranded and owes/loses nothing
//   Courier, parcel already COLLECTED            -> refused: use "Report a problem"
//   Anyone, already DELIVERED                    -> refused
//
// Each state change is one UPDATE with the expected status in its WHERE clause,
// so cancelling while someone else accepts (or two cancels at once) can only go
// one way.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { serializeJob } = require('../lib/jobs');
const { refundInFull } = require('../lib/payments');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const body = req.body || {};
    const jobId = Number(body.jobId ?? body.job_id ?? req.query?.jobId ?? req.query?.job_id);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }

    await ensureSchema();

    const existing = await sql`SELECT * FROM jobs WHERE id = ${jobId}`;
    if (!existing.rows.length) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    const job = existing.rows[0];

    const isCustomer = user.role === 'customer' && job.customer_id === user.id;
    const isAssignedCourier = user.role === 'courier' && job.courier_id === user.id;
    if (!isCustomer && !isAssignedCourier) {
      // Deliberately the same answer for "not yours" and "not assigned to you".
      res.status(403).json({ detail: user.role === 'customer' ? 'You do not have permission to cancel this job' : 'This job is not assigned to you' });
      return;
    }

    if (job.status === 'DELIVERED') {
      res.status(409).json({ detail: 'Cannot cancel an order that has already been delivered' });
      return;
    }
    if (job.status === 'CANCELLED') {
      res.status(200).json({ ...serializeJob(job, { forCustomer: isCustomer }), outcome: 'cancelled' });
      return;
    }
    if (job.status === 'COLLECTED') {
      res.status(409).json({
        detail: 'The parcel has already been collected, so it can\'t be cancelled here. Use "Report a problem" and support will help.',
      });
      return;
    }

    // The button is locked on screen; this is the same rule enforced here, so it
    // can't be got round by calling the API directly. Support cancels on the
    // customer's behalf and applies the fee.
    if (isCustomer && job.status === 'ACCEPTED') {
      res.status(409).json({
        locked: true,
        detail: 'A courier has already accepted this order, so cancelling it incurs a fee. Contact support and we\'ll cancel it for you.',
      });
      return;
    }

    // ---------------------------------------------------------------- courier
    if (isAssignedCourier) {
      // job.status is ACCEPTED here. Back to the marketplace, position wiped.
      const relisted = await sql`
        UPDATE jobs
        SET status = 'OPEN', courier_id = NULL, accepted_at = NULL,
            courier_lat = NULL, courier_lng = NULL, courier_location_updated_at = NULL
        WHERE id = ${jobId} AND courier_id = ${user.id} AND status = 'ACCEPTED'
        RETURNING *
      `;
      if (!relisted.rows.length) {
        res.status(409).json({ detail: 'This job has changed — refresh and try again' });
        return;
      }
      res.status(200).json({ ...serializeJob(relisted.rows[0]), outcome: 'relisted' });
      return;
    }

    // --------------------------------------------------------------- customer
    const cancelled = await sql`
      UPDATE jobs
      SET status = 'CANCELLED', cancelled_at = now(),
          courier_lat = NULL, courier_lng = NULL, courier_location_updated_at = NULL
      WHERE id = ${jobId} AND customer_id = ${user.id} AND status = ${job.status}
      RETURNING *
    `;
    if (!cancelled.rows.length) {
      res.status(409).json({ detail: 'This order has just changed (a courier may have accepted it). Refresh and try again.' });
      return;
    }

    // Nobody has accepted it, so nothing was spent: back in full, automatically.
    const refund = await refundInFull(job, 'cancelled_before_accept', 'Cancelled by the customer before a courier accepted.');

    res.status(200).json({ ...serializeJob(cancelled.rows[0], { forCustomer: true }), outcome: 'cancelled', refund });
  } catch (err) {
    sendError(res, err);
  }
};
