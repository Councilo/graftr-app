const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const jobId = Number(req.query.jobId ?? req.query.job_id);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId query parameter is required' });
      return;
    }

    await ensureSchema();

    const jobRes = await sql`SELECT customer_id, courier_id FROM jobs WHERE id = ${jobId}`;
    if (!jobRes.rows.length) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }

    const job = jobRes.rows[0];
    if (job.customer_id !== user.id && job.courier_id !== user.id) {
      res.status(403).json({ detail: 'Access denied' });
      return;
    }

    const { rows } = await sql`
      SELECT id, job_id, sender_id, sender_name, sender_role, content, created_at
      FROM messages
      WHERE job_id = ${jobId}
      ORDER BY created_at DESC
      LIMIT 200
    `;

    // Newest 200, shown oldest first.
    res.status(200).json(rows.reverse());
  } catch (err) {
    sendError(res, err);
  }
};
