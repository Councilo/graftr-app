// Hang up. Either person can end a call: while it rings, the caller cancelling and the
// callee declining both count; once it is on, it simply ends. Safe to call twice.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    // Ending a call must always work, even for an account that has just been suspended.
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return;

    const callId = Number((req.body || {}).callId ?? (req.body || {}).call_id);
    if (!Number.isInteger(callId)) {
      res.status(422).json({ detail: 'callId is required' });
      return;
    }

    await ensureSchema();
    const found = await sql`SELECT id, caller_id, callee_id, status FROM calls WHERE id = ${callId}`;
    const call = found.rows[0];
    if (!call || (call.caller_id !== user.id && call.callee_id !== user.id)) {
      res.status(404).json({ detail: 'No such call' });
      return;
    }

    if (call.status === 'RINGING') {
      const next = call.caller_id === user.id ? 'CANCELLED' : 'DECLINED';
      await sql`UPDATE calls SET status = ${next}, ended_at = now() WHERE id = ${callId} AND status = 'RINGING'`;
    } else if (call.status === 'ACTIVE') {
      await sql`UPDATE calls SET status = 'ENDED', ended_at = now() WHERE id = ${callId} AND status = 'ACTIVE'`;
    }
    const now = await sql`SELECT id, status FROM calls WHERE id = ${callId}`;
    res.status(200).json(now.rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
