const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { refuseUnverified } = require('../lib/email');
const { notifyCustomer } = require('../lib/notify');
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
    if (refuseUnverified(res, courier)) return;

    const body = req.body || {};
    const jobId = Number(body.jobId ?? body.job_id ?? req.query?.jobId ?? req.query?.job_id);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }

    await ensureSchema();

    // A walker job can only be taken by a courier in walker mode, and the reverse — kept as its own
    // check (not folded into the UPDATE's WHERE below) purely so the 409 can say why, rather than the
    // generic "not open" a stranger's already-accepted job gets.
    const targeted = await sql`SELECT delivery_mode FROM jobs WHERE id = ${jobId}`;
    if (targeted.rows.length && targeted.rows[0].delivery_mode === 'walker' && courier.courier_mode !== 'walker') {
      res.status(409).json({ detail: 'This is a walker job — switch to walker mode in your account to accept it.' });
      return;
    }
    if (targeted.rows.length && targeted.rows[0].delivery_mode !== 'walker' && courier.courier_mode === 'walker') {
      res.status(409).json({ detail: "Walker mode only takes walker jobs — switch back to driver mode for this one." });
      return;
    }

    // The claim itself is the UPDATE's WHERE clause, not a SELECT beforehand
    // — two couriers hitting Accept on the same job at the same instant are
    // two concurrent UPDATEs against the same row, and Postgres serialises
    // those. Only one can match status = 'OPEN'; by the time the second
    // runs, the first has already flipped it to ACCEPTED, so the second
    // matches zero rows instead of racing it. A SELECT-then-UPDATE here
    // would have left a real window for both to succeed.
    const { rows } = await sql`
      UPDATE jobs
      SET courier_id = ${courier.id}, status = 'ACCEPTED', accepted_at = now()
      WHERE id = ${jobId} AND status = 'OPEN'
      RETURNING *
    `;

    if (rows.length) {
      await notifyCustomer(rows[0], 'orderAccepted', { courierName: courier.full_name });
      res.status(200).json(serializeJob(rows[0]));
      return;
    }

    // Zero rows: find out why, purely to give a useful message — this read
    // has no bearing on the outcome above, which is already final.
    const existing = await sql`SELECT status FROM jobs WHERE id = ${jobId}`;
    if (!existing.rows.length) {
      res.status(404).json({ detail: 'No such job' });
      return;
    }
    res.status(409).json({ detail: `Job is ${existing.rows[0].status}, not open` });
  } catch (err) {
    sendError(res, err);
  }
};
