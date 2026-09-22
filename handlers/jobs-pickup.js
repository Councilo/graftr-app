const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { notifyCustomer } = require('../lib/notify');
const { savePhoto, deletePhoto, UploadError } = require('../lib/upload');
const { serializeJob } = require('../lib/jobs');
const { sendError } = require('../lib/respond');
const { isLimited, record, tooMany } = require('../lib/ratelimit');
const { pinMatches } = require('../lib/order-options');

// A wrong code can be tried a handful of times, not ten thousand — same shape as the delivery PIN
// check in jobs-deliver.js.
const CODE_TRIES = 5;
const CODE_WINDOW_SECONDS = 60 * 60;

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

    const { rows } = await sql`SELECT id, courier_id, status, pickup_code FROM jobs WHERE id = ${jobId}`;
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

    // A shop-posted job has its own code, read out by the shop, so it can't be collected by the wrong
    // person turning up — checked before the photo, in a header (not the URL) so it never ends up in
    // a request log, the same shape as the recipient's delivery PIN in jobs-deliver.js.
    if (job.pickup_code) {
      const given = String(req.headers['x-pickup-code'] || '').trim();
      if (!/^\d{4}$/.test(given)) {
        res.status(422).json({ detail: 'Ask the shop for the 4-digit pickup code', pickup_code_required: true });
        return;
      }
      const key = `pickup-code:${jobId}`;
      if (await isLimited(key, CODE_TRIES, CODE_WINDOW_SECONDS)) { tooMany(res, CODE_WINDOW_SECONDS, 'code attempts'); return; }
      if (!pinMatches(given, job.pickup_code)) {
        await record(key);
        res.status(403).json({ detail: "That code isn't right. Check it with the shop.", pickup_code_required: true });
        return;
      }
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

    // Guarded on the status AND the courier: the upload above can take several
    // seconds, and in that time the customer may have cancelled (or the job
    // been relisted). An unguarded UPDATE here would bring a cancelled job
    // back to life as COLLECTED.
    const updated = await sql`
      UPDATE jobs
      SET pickup_photo_url = ${photoUrl}, status = 'COLLECTED', collected_at = now(),
          started_at = COALESCE(started_at, now())
      WHERE id = ${jobId} AND courier_id = ${courier.id} AND status = 'ACCEPTED'
      RETURNING *
    `;
    if (!updated.rows.length) {
      await deletePhoto(photoUrl);
      res.status(409).json({ detail: 'This job changed while the photo was uploading — it was probably cancelled. Nothing was recorded.' });
      return;
    }
    await notifyCustomer(updated.rows[0], 'orderCollected');
    res.status(200).json(serializeJob(updated.rows[0]));
  } catch (err) {
    sendError(res, err);
  }
};
