const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { savePhoto, deletePhoto, UploadError } = require('../lib/upload');
const { serializeJob } = require('../lib/jobs');
const { sendError } = require('../lib/respond');
const { isLimited, record, tooMany } = require('../lib/ratelimit');
const { pinMatches } = require('../lib/order-options');

// A wrong PIN can be tried a handful of times, not ten thousand.
const PIN_TRIES = 5;
const PIN_WINDOW_SECONDS = 60 * 60;

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

    const { rows } = await sql`SELECT id, courier_id, status, delivery_pin FROM jobs WHERE id = ${jobId}`;
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

    // When the customer asked for PIN confirmation, the recipient reads the PIN out and the
    // courier types it in: it is checked BEFORE the photo is accepted. It arrives in a header
    // (not the URL) so it never ends up in a request log.
    if (job.delivery_pin) {
      const given = String(req.headers['x-delivery-pin'] || '').trim();
      if (!/^\d{4}$/.test(given)) {
        res.status(422).json({ detail: 'This delivery needs the 4-digit PIN from the recipient', pin_required: true });
        return;
      }
      const key = `delivery-pin:${jobId}`;
      if (await isLimited(key, PIN_TRIES, PIN_WINDOW_SECONDS)) { tooMany(res, PIN_WINDOW_SECONDS, 'PIN attempts'); return; }
      if (!pinMatches(given, job.delivery_pin)) {
        await record(key);
        res.status(403).json({ detail: "That PIN isn't right. Check it with the recipient.", pin_required: true });
        return;
      }
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
      WHERE id = ${jobId} AND courier_id = ${courier.id} AND status = 'COLLECTED'
      RETURNING *
    `;
    if (!updated.rows.length) {
      await deletePhoto(photoUrl);
      res.status(409).json({ detail: 'This job changed while the photo was uploading. Nothing was recorded.' });
      return;
    }
    res.status(200).json(serializeJob(updated.rows[0]));
  } catch (err) {
    sendError(res, err);
  }
};
