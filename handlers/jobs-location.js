// Backs live tracking: the assigned courier's device calls this every few
// seconds while a job is under way, and the customer's tracking view polls
// jobs-tracking.js to pick up whatever was last written here.
const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
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
    // Location is only ever shared with the agreement of the person sharing it
    // (recorded at sign-up, or later via account-consent). No record, no sharing.
    if (!courier.location_consent_at) {
      res.status(403).json({ detail: 'Location sharing needs your agreement first. See the Location Tracking Policy.', consent_required: true });
      return;
    }

    const { jobId, job_id, lat, lng } = req.body || {};
    const id = Number(jobId ?? job_id ?? req.query?.jobId ?? req.query?.job_id);
    // Numbers only: Number(null), Number('') and Number(true) are 0 and 1, which
    // would quietly file a courier at a point in the Atlantic.
    const latNum = typeof lat === 'number' ? lat : NaN;
    const lngNum = typeof lng === 'number' ? lng : NaN;
    if (!Number.isInteger(id) || !Number.isFinite(latNum) || !Number.isFinite(lngNum)
      || Math.abs(latNum) > 90 || Math.abs(lngNum) > 180 || (latNum === 0 && lngNum === 0)) {
      res.status(422).json({ detail: 'jobId, lat and lng are required' });
      return;
    }

    await ensureSchema();

    const { rows } = await sql`SELECT id, courier_id, status, started_at FROM jobs WHERE id = ${id}`;
    const job = rows[0];
    if (!job) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    if (job.courier_id !== courier.id) {
      res.status(403).json({ detail: "This job isn't assigned to you" });
      return;
    }
    // Sharing location only makes sense while a parcel is actually moving —
    // before ACCEPTED there's no job to track yet, and after DELIVERED
    // there's nothing left to reach.
    if (job.status !== 'ACCEPTED' && job.status !== 'COLLECTED') {
      res.status(409).json({ detail: `Job is ${job.status} — nothing to track` });
      return;
    }

    // Nothing is shared until the courier presses Start order (jobs-start): accepting a job
    // while at home must not put a home address on the customer's map.
    if (job.status === 'ACCEPTED' && !job.started_at) {
      res.status(409).json({ detail: 'Press Start order before sharing your location.', not_started: true });
      return;
    }

    const updated = await sql`
      UPDATE jobs
      SET courier_lat = ${latNum}, courier_lng = ${lngNum}, courier_location_updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    res.status(200).json(serializeJob(updated.rows[0]));
  } catch (err) {
    sendError(res, err);
  }
};
