// Start a voice call to the other person on a delivery. The caller's phone sends
// its "offer" (how to reach it); the other person's app finds it by polling
// call-poll and answers with call-answer. See lib/calls.js.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { hit, tooMany } = require('../lib/ratelimit');
const { expireStaleCalls, MAX_SDP_LENGTH } = require('../lib/calls');
const { sendError } = require('../lib/respond');

const CALLS_PER_HOUR = 10;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res); // a suspended account can't start calls
    if (!user) return;

    const body = req.body || {};
    const jobId = Number(body.jobId ?? body.job_id);
    const offer = body.offer;
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }
    if (typeof offer !== 'string' || offer.length < 20 || offer.length > MAX_SDP_LENGTH) {
      res.status(422).json({ detail: 'The call could not be set up (invalid offer)' });
      return;
    }

    await ensureSchema();
    await expireStaleCalls();

    const found = await sql`SELECT id, customer_id, courier_id, status FROM jobs WHERE id = ${jobId}`;
    const job = found.rows[0];
    if (!job) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    if (job.customer_id !== user.id && job.courier_id !== user.id) {
      res.status(403).json({ detail: 'Access denied' });
      return;
    }
    if (job.status !== 'ACCEPTED' && job.status !== 'COLLECTED') {
      res.status(409).json({ detail: 'You can only call while a delivery is under way' });
      return;
    }
    const calleeId = user.id === job.customer_id ? job.courier_id : job.customer_id;

    const limit = await hit(`call:${user.id}`, CALLS_PER_HOUR, 60 * 60);
    if (!limit.allowed) return tooMany(res, limit.retryAfter, 'calls');

    const busy = await sql`SELECT id FROM calls WHERE job_id = ${jobId} AND status IN ('RINGING', 'ACTIVE') LIMIT 1`;
    if (busy.rows.length) {
      res.status(409).json({ detail: 'A call is already in progress on this delivery' });
      return;
    }

    const created = await sql`
      INSERT INTO calls (job_id, caller_id, callee_id, offer, heartbeat_at)
      VALUES (${jobId}, ${user.id}, ${calleeId}, ${offer}, now())
      RETURNING id, status
    `;
    const mine = created.rows[0];

    // Both people pressing Call in the same instant: the earlier call wins, the
    // other is withdrawn.
    const live = await sql`SELECT id FROM calls WHERE job_id = ${jobId} AND status IN ('RINGING', 'ACTIVE') ORDER BY id LIMIT 1`;
    if (live.rows.length && live.rows[0].id !== mine.id) {
      await sql`UPDATE calls SET status = 'CANCELLED', ended_at = now() WHERE id = ${mine.id}`;
      res.status(409).json({ detail: 'A call is already in progress on this delivery' });
      return;
    }

    res.status(201).json({ id: mine.id, status: mine.status });
  } catch (err) {
    sendError(res, err);
  }
};
