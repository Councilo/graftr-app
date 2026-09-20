const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { sendError } = require('../lib/respond');
const { hit, tooMany } = require('../lib/ratelimit');

// A chat message is a sentence or two; the cap keeps a thread small enough to
// always load, and a burst limit stops a flood.
const MAX_MESSAGE_LENGTH = 2000;
const MESSAGES_PER_MINUTE = 20;

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
    const content = typeof body.content === 'string' ? body.content.trim() : '';

    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }
    if (!content) {
      res.status(422).json({ detail: 'Message content cannot be empty' });
      return;
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      res.status(422).json({ detail: `Messages can be at most ${MAX_MESSAGE_LENGTH} characters` });
      return;
    }

    await ensureSchema();

    const jobRes = await sql`SELECT customer_id, courier_id, status FROM jobs WHERE id = ${jobId}`;
    if (!jobRes.rows.length) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }

    const job = jobRes.rows[0];
    if (job.customer_id !== user.id && job.courier_id !== user.id) {
      res.status(403).json({ detail: 'Access denied' });
      return;
    }

    if (job.status === 'CANCELLED') {
      res.status(409).json({ detail: 'This order was cancelled, so the chat is closed. Use Help if you need anything.' });
      return;
    }
    const limit = await hit(`msg:${user.id}`, MESSAGES_PER_MINUTE, 60);
    if (!limit.allowed) return tooMany(res, limit.retryAfter, 'messages');

    const { rows } = await sql`
      INSERT INTO messages (job_id, sender_id, sender_name, sender_role, content)
      VALUES (${jobId}, ${user.id}, ${user.full_name}, ${user.role}, ${content})
      RETURNING *
    `;

    res.status(201).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
