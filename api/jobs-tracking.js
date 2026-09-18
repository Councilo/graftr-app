const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { serializeJob } = require('../lib/jobs');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const jobId = Number(req.query.jobId);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId query parameter is required' });
      return;
    }

    await ensureSchema();
    const { rows } = await sql`
      SELECT j.*, c.full_name AS courier_name
      FROM jobs j
      LEFT JOIN users c ON c.id = j.courier_id
      WHERE j.id = ${jobId}
    `;
    const job = rows[0];
    if (!job) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    if (user.id !== job.customer_id && user.id !== job.courier_id) {
      res.status(403).json({ detail: 'Not your job to track' });
      return;
    }
    res.status(200).json(serializeJob(job));
  } catch (err) {
    sendError(res, err);
  }
};
