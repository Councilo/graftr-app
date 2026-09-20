// A person adds to their own support ticket. (Admins reply through
// admin-tickets.) Replying to a resolved ticket reopens it; a closed one stays
// closed and the person is pointed at opening a new one.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { hit, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return;

    const body = req.body || {};
    const ticketId = Number(body.ticketId ?? body.ticket_id);
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    if (!Number.isInteger(ticketId)) {
      res.status(422).json({ detail: 'ticketId is required' });
      return;
    }
    if (content.length < 1 || content.length > 4000) {
      res.status(422).json({ detail: 'Write a reply (up to 4,000 characters)' });
      return;
    }

    await ensureSchema();

    const limit = await hit(`support-reply:${user.id}`, 30, 60 * 60);
    if (!limit.allowed) { tooMany(res, limit.retryAfter, 'messages'); return; }

    const found = await sql`SELECT id, user_id, status FROM support_tickets WHERE id = ${ticketId}`;
    const ticket = found.rows[0];
    // The same answer whether it doesn't exist or belongs to someone else.
    if (!ticket || ticket.user_id !== user.id) {
      res.status(404).json({ detail: 'No such ticket' });
      return;
    }
    if (ticket.status === 'CLOSED') {
      res.status(409).json({ detail: 'This ticket is closed. Please open a new one.' });
      return;
    }

    const { rows } = await sql`
      INSERT INTO support_replies (ticket_id, sender_role, sender_name, content)
      VALUES (${ticketId}, 'user', ${user.full_name}, ${content})
      RETURNING id, ticket_id, sender_role, sender_name, content, created_at
    `;
    await sql`
      UPDATE support_tickets
      SET updated_at = now(), status = CASE WHEN status = 'RESOLVED' THEN 'OPEN' ELSE status END
      WHERE id = ${ticketId}
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
