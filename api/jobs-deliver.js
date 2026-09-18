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
    if (job.status !== 'COLLECTED') {
      res.status(409).json({ detail: `Job is ${job.status}, expected COLLECTED` });
      return;
    }

    let photoUrl;
    try {
      photoUrl = await savePhoto(req, 'delivery', jobId);
    } catch (err) {
      if (err instanceof UploadError) {
        res.status(err.statusCode).json({ detail: err.message });
        return;
      }
      throw err;
    }

    // The courier's last live position is cleared along with delivery — a
    // finished job has nothing left to track, and the alternative is a
    // stale dot sitting on the map forever pointing at wherever they
    // happened to be when the job ended.
    const updated = await sql`
      UPDATE jobs
      SET delivery_photo_url = ${photoUrl}, status = 'DELIVERED', delivered_at = now(),
          courier_lat = NULL, courier_lng = NULL, courier_location_updated_at = NULL
      WHERE id = ${jobId}
      RETURNING *
    `;
    res.status(200).json(serializeJob(updated.rows[0]));
  } catch (err) {
    sendError(res, err);
  }
};
