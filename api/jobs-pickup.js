const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { savePhoto, UploadError } = require('../lib/upload');
const { serializeJob } = require('../lib/jobs');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const courier = await requireRole(req, res, 'courier');
    if (!courier) return;

    const jobId = Number(req.query.jobId);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId query parameter is required' });
      return;
    }

    await ensureSchema();

    const { rows } = await sql`SELECT id, courier_id, status FROM jobs WHERE id = ${jobId}`;
    const job = rows[0];
    if (!job) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    if (job.courier_id !== courier.id) {
      res.status(403).json({ detail: "This job isn't assigned to you" });
      return;
    }
    if (job.status !== 'ACCEPTED') {
      res.status(409).json({ detail: `Job is ${job.status}, expected ACCEPTED` });
      return;
    }

    // The photo is uploaded and only then does the row change — if the
    // upload throws (wrong type, too big), the job stays exactly ACCEPTED
    // rather than moving to COLLECTED with no photo behind it.
    let photoUrl;
    try {
      photoUrl = await savePhoto(req, 'pickup', jobId);
    } catch (err) {
      if (err instanceof UploadError) {
        res.status(err.statusCode).json({ detail: err.message });
        return;
      }
      throw err;
    }

    const updated = await sql`
      UPDATE jobs
      SET pickup_photo_url = ${photoUrl}, status = 'COLLECTED', collected_at = now()
      WHERE id = ${jobId}
      RETURNING *
    `;
    res.status(200).json(serializeJob(updated.rows[0]));
  } catch (err) {
    sendError(res, err);
  }
};
