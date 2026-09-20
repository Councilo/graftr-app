// The person being called answers ({ callId, answer }) or declines ({ callId, decline: true }).
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { expireStaleCalls, MAX_SDP_LENGTH } = require('../lib/calls');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const body = req.body || {};
    const callId = Number(body.callId ?? body.call_id);
    if (!Number.isInteger(callId)) {
      res.status(422).json({ detail: 'callId is required' });
      return;
    }
    const declining = body.decline === true;
    if (!declining && (typeof body.answer !== 'string' || body.answer.length < 20 || body.answer.length > MAX_SDP_LENGTH)) {
      res.status(422).json({ detail: 'The call could not be answered (invalid answer)' });
      return;
    }

    await ensureSchema();
    await expireStaleCalls();

    const found = await sql`SELECT id, caller_id, callee_id, status FROM calls WHERE id = ${callId}`;
    const call = found.rows[0];
    if (!call || (call.caller_id !== user.id && call.callee_id !== user.id)) {
      res.status(404).json({ detail: 'No such call' });
      return;
    }
    if (call.callee_id !== user.id) {
      res.status(403).json({ detail: 'Only the person being called can answer' });
      return;
    }

    // One UPDATE decides it: if the caller gave up (or it timed out) a moment ago the
    // WHERE no longer matches and this answer is refused.
    const updated = declining
      ? await sql`UPDATE calls SET status = 'DECLINED', ended_at = now() WHERE id = ${callId} AND callee_id = ${user.id} AND status = 'RINGING' RETURNING id, status`
      : await sql`
          UPDATE calls SET status = 'ACTIVE', answer = ${body.answer}, answered_at = now(), heartbeat_at = now()
          WHERE id = ${callId} AND callee_id = ${user.id} AND status = 'RINGING'
          RETURNING id, status
        `;
    if (!updated.rows.length) {
      res.status(409).json({ detail: 'This call is no longer ringing' });
      return;
    }
    res.status(200).json(updated.rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
