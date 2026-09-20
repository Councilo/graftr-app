// Payments are TRACKED here, not processed: there is no card provider yet, so
// money is settled by hand (bank transfer or invoice) and an admin records that
// it arrived. What this module guarantees is that the record of who has paid
// what, and what has been given back, is always consistent.
//
// Every change to money is a single UPDATE whose WHERE clause carries the rule
// (a payment can only be refunded up to what was paid; only a PAID payment can
// be refunded), so two admins clicking at the same instant can't refund the
// same thing twice. There are no multi-statement transactions because the
// serverless database driver doesn't offer them across separate queries.
const { sql } = require('./db');

const EPS = 0.005; // half a penny: amounts are stored as doubles

const pence = (n) => Math.round(Number(n) * 100) / 100;
const remaining = (payment) => Math.max(0, pence(Number(payment.amount_gbp) - Number(payment.refunded_gbp)));

async function getPayment(jobId) {
  const { rows } = await sql`SELECT * FROM payments WHERE job_id = ${jobId}`;
  return rows[0] || null;
}

// One payment record per job, created when the job is. It starts UNPAID.
async function createPayment(jobId, customerId, amount) {
  await sql`
    INSERT INTO payments (job_id, customer_id, amount_gbp)
    VALUES (${jobId}, ${customerId}, ${amount})
  `;
}

// The job is cancelled and the customer gets everything back, automatically:
//   UNPAID  -> VOID (nothing was ever paid, so there is nothing to return)
//   PAID    -> REFUNDED, with an AUTO_APPROVED record explaining why
// Anything else (already refunded, already void) is left alone. Safe to call
// twice: the second call finds nothing left to do.
async function refundInFull(job, reason, note) {
  const payment = await getPayment(job.id);
  if (!payment) return { kind: 'none' };

  if (payment.status === 'UNPAID') {
    await sql`UPDATE payments SET status = 'VOID', updated_at = now() WHERE job_id = ${job.id} AND status = 'UNPAID'`;
    return { kind: 'void' };
  }

  if (payment.status === 'PAID' || payment.status === 'PARTIALLY_REFUNDED') {
    const amount = remaining(payment);
    if (amount <= EPS) return { kind: 'none' };
    const updated = await sql`
      UPDATE payments
      SET refunded_gbp = amount_gbp, status = 'REFUNDED', updated_at = now()
      WHERE job_id = ${job.id} AND status IN ('PAID', 'PARTIALLY_REFUNDED')
      RETURNING id
    `;
    if (!updated.rows.length) return { kind: 'none' }; // someone else got there first
    await sql`
      INSERT INTO refund_requests
        (job_id, customer_id, reason, details, amount_gbp, status, approved_gbp, decision_note, decided_at)
      VALUES
        (${job.id}, ${job.customer_id}, ${reason}, ${note}, ${amount}, 'AUTO_APPROVED', ${amount}, ${note}, now())
    `;
    return { kind: 'refunded', amount };
  }
  return { kind: 'none' };
}

// A request that needs a person to decide.
async function openRefundRequest(job, reason, details, amount) {
  const { rows } = await sql`
    INSERT INTO refund_requests (job_id, customer_id, reason, details, amount_gbp)
    VALUES (${job.id}, ${job.customer_id}, ${reason}, ${details}, ${amount})
    RETURNING *
  `;
  return rows[0];
}

// An admin approved `amount` on a payment that was PAID. Returns the updated
// payment, or null when the rule wasn't met (not paid, or it would refund more
// than was paid).
async function applyApprovedRefund(jobId, amount) {
  const { rows } = await sql`
    UPDATE payments
    SET refunded_gbp = refunded_gbp + ${amount},
        status = CASE WHEN refunded_gbp + ${amount} >= amount_gbp - 0.005 THEN 'REFUNDED' ELSE 'PARTIALLY_REFUNDED' END,
        updated_at = now()
    WHERE job_id = ${jobId}
      AND status IN ('PAID', 'PARTIALLY_REFUNDED')
      AND refunded_gbp + ${amount} <= amount_gbp + 0.005
    RETURNING *
  `;
  return rows[0] || null;
}

// An admin approved a refund on a payment nobody has paid yet: there is no
// money to return, so the amount owed just comes down (to VOID when it reaches
// nothing).
async function reduceUnpaid(jobId, amount) {
  const { rows } = await sql`
    UPDATE payments
    SET amount_gbp = amount_gbp - ${amount},
        status = CASE WHEN amount_gbp - ${amount} <= 0.005 THEN 'VOID' ELSE 'UNPAID' END,
        updated_at = now()
    WHERE job_id = ${jobId} AND status = 'UNPAID' AND ${amount} <= amount_gbp + 0.005
    RETURNING *
  `;
  return rows[0] || null;
}

module.exports = { EPS, pence, remaining, getPayment, createPayment, refundInFull, openRefundRequest, applyApprovedRefund, reduceUnpaid };
