const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { sendError } = require('../lib/respond');

// The signed-in person's own tickets, each with its replies in order. A
// suspended person can still read these: it is how they'd see the answer to
// an appeal.
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return;

    await ensureSchema();
    const tickets = await sql`
      SELECT id, category, subject, message, job_id, status, created_at, updated_at
      FROM support_tickets WHERE user_id = ${user.id}
      ORDER BY updated_at DESC LIMIT 50
    `;
    const ids = tickets.rows.map((t) => t.id);
    let replies = [];
    if (ids.length) {
      const all = await sql`
        SELECT r.id, r.ticket_id, r.sender_role, r.sender_name, r.content, r.created_at
        FROM support_replies r
        JOIN support_tickets t ON t.id = r.ticket_id
        WHERE t.user_id = ${user.id}
        ORDER BY r.id ASC
      `;
      replies = all.rows;
    }
    res.status(200).json(tickets.rows.map((t) => ({ ...t, replies: replies.filter((r) => r.ticket_id === t.id) })));
  } catch (err) {
    sendError(res, err);
  }
};
