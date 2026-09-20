// A courier presses "Start order" when they actually set off for the pickup. Until then nobody
// is shown their location and their phone shares none, so a courier who accepts a job while at
// home doesn't put their home address on the customer's map. From Start on, the phone shares
// its position (jobs-location) until the parcel is delivered, and the customer can follow them
// to the collection point. Collecting the parcel starts an order too (jobs-pickup), so nothing
// can be collected without having been started.
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
    // Starting means sharing the phone's position, which needs the courier's agreement first.
    if (!courier.location_consent_at) {
      res.status(403).json({ detail: 'Location sharing needs your agreement first. See the Location Tracking Policy.', consent_required: true });
      return;
    }

    const body = req.body || {};
    const jobId = Number(body.jobId ?? body.job_id ?? req.query?.jobId ?? req.query?.job_id);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }

    await ensureSchema();

    // COALESCE keeps the original start time if the button is pressed twice.
    const updated = await sql`
      UPDATE jobs
      SET started_at = COALESCE(started_at, now())
      WHERE id = ${jobId} AND courier_id = ${courier.id} AND status = 'ACCEPTED'
      RETURNING *
    `;
    if (updated.rows.length) {
      res.status(200).json(serializeJob(updated.rows[0]));
      return;
    }

    // Nothing matched: say why, purely to give a useful message.
    const existing = await sql`SELECT courier_id, status FROM jobs WHERE id = ${jobId}`;
    if (!existing.rows.length) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    if (existing.rows[0].courier_id !== courier.id) {
      res.status(403).json({ detail: "This job isn't assigned to you" });
      return;
    }
    res.status(409).json({ detail: `Job is ${existing.rows[0].status} — there is nothing to start` });
  } catch (err) {
    sendError(res, err);
  }
};
