// Two uses, both plain GETs:
//   GET /api/call-poll                 -> is anyone calling me right now? { incoming: {...} | null }
//   GET /api/call-poll?callId=<id>     -> where does this call stand? Used by both people while
//                                         it rings and while it is on. Doubles as the "still
//                                         here" signal that keeps an active call alive.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { expireStaleCalls } = require('../lib/calls');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    await ensureSchema();
    await expireStaleCalls();

    const callId = req.query && req.query.callId;
    if (callId === undefined) {
      const { rows } = await sql`
        SELECT c.id, c.job_id, c.offer, u.full_name AS from_name
        FROM calls c JOIN users u ON u.id = c.caller_id
        WHERE c.callee_id = ${user.id} AND c.status = 'RINGING'
        ORDER BY c.id DESC LIMIT 1
      `;
      res.status(200).json({ incoming: rows[0] || null });
      return;
    }

    const id = Number(callId);
    if (!Number.isInteger(id)) {
      res.status(422).json({ detail: 'callId must be a number' });
      return;
    }
    const found = await sql`
      SELECT c.id, c.status, c.answer, c.caller_id, c.callee_id, c.answered_at, c.ended_at
      FROM calls c WHERE c.id = ${id}
    `;
    const call = found.rows[0];
    // Same answer whether it doesn't exist or isn't yours.
    if (!call || (call.caller_id !== user.id && call.callee_id !== user.id)) {
      res.status(404).json({ detail: 'No such call' });
      return;
    }
    if (call.status === 'ACTIVE') {
      await sql`UPDATE calls SET heartbeat_at = now() WHERE id = ${id} AND status = 'ACTIVE'`;
    }
    res.status(200).json({
      id: call.id,
      status: call.status,
      // Only the caller needs the answer, and only once there is one.
      answer: call.caller_id === user.id ? call.answer : null,
      answered_at: call.answered_at,
      ended_at: call.ended_at,
    });
  } catch (err) {
    sendError(res, err);
  }
};
