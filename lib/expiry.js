// Jobs nobody accepts don't stay on the marketplace forever.
//
// A job whose pickup window ended a while ago and which is still OPEN has, in practice, been
// abandoned: the courier who took it would arrive long after it was wanted. It is cancelled and
// refunded automatically (an unpaid one simply becomes "not charged"), the same as if the customer
// had cancelled it. Half an hour for an ordinary job; a walker job gets a shorter 15 minutes — it's a
// short, casual trip, not worth sitting on the marketplace as long as a real cross-town parcel run.
//
// There is no scheduler on the free hosting plan, so this runs opportunistically:
// whenever the marketplace or a customer's orders are loaded, at most once a
// minute per running instance. It is safe to run from several places at once,
// because each job is claimed with a single UPDATE ... WHERE status = 'OPEN'.
const { sql, ensureSchema } = require('./db');
const { refundInFull } = require('./payments');
const { WALKER_EXPIRY_GRACE_MS } = require('./walking');

const GRACE_MS = 30 * 60 * 1000;
const EVERY_MS = 60 * 1000;
const BATCH = 25;
let lastRun = 0;

async function expireStaleJobs() {
  if (Date.now() - lastRun < EVERY_MS) return 0;
  lastRun = Date.now();
  try {
    await ensureSchema();
    // A walker job's grace period is shorter than an ordinary one's (see lib/walking.js) — it's a
    // short, casual, nearby trip, not worth leaving on the marketplace as long as a real parcel run.
    // Both cutoffs are plain timestamps compared in SQL, never date arithmetic done in SQL itself, so
    // this works the same against the real database and the in-memory one the dev server uses.
    const cutoff = new Date(Date.now() - GRACE_MS).toISOString();
    const walkerCutoff = new Date(Date.now() - WALKER_EXPIRY_GRACE_MS).toISOString();
    const stale = await sql`
      SELECT id, customer_id FROM jobs
      WHERE status = 'OPEN' AND (
        (delivery_mode = 'walker' AND pickup_window_end < ${walkerCutoff})
        OR (delivery_mode <> 'walker' AND pickup_window_end < ${cutoff})
      )
      ORDER BY id LIMIT ${BATCH}
    `;
    let expired = 0;
    for (const job of stale.rows) {
      const claimed = await sql`
        UPDATE jobs SET status = 'CANCELLED', cancelled_at = now()
        WHERE id = ${job.id} AND status = 'OPEN'
        RETURNING id
      `;
      if (!claimed.rows.length) continue; // accepted or cancelled in the meantime
      await refundInFull(job, 'expired_unaccepted', 'No courier accepted this order in time, so it was cancelled automatically.');
      expired += 1;
    }
    return expired;
  } catch (err) {
    // Housekeeping must never break the request that happened to trigger it.
    console.warn('expireStaleJobs failed —', err && err.message);
    return 0;
  }
}

module.exports = { expireStaleJobs };
