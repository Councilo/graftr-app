// Admin: the support inbox. List tickets, open one to read the conversation,
// reply to it, and move it through OPEN -> IN_PROGRESS -> RESOLVED -> CLOSED.
const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin } = require('../lib/auth');
const { audit } = require('../lib/audit');
const { sendError } = require('../lib/respond');

const STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

module.exports = async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    await ensureSchema();

    if (req.method === 'GET') {
      const id = req.query && req.query.id;
      if (id !== undefined) {
        const ticketId = Number(id);
        if (!Number.isInteger(ticketId)) {
          res.status(422).json({ detail: 'id must be a number' });
          return;
        }
        const t = await sql`SELECT * FROM support_tickets WHERE id = ${ticketId}`;
        if (!t.rows.length) {
          res.status(404).json({ detail: 'No such ticket' });
          return;
        }
        const replies = await sql`
          SELECT id, sender_role, sender_name, content, created_at FROM support_replies WHERE ticket_id = ${ticketId} ORDER BY id
        `;
        res.status(200).json({ ...t.rows[0], replies: replies.rows });
        return;
      }

      // Default view is what still needs someone: OPEN and IN_PROGRESS.
      const status = String((req.query && req.query.status) || 'ACTIVE').toUpperCase();
      if (status !== 'ACTIVE' && status !== 'ALL' && !STATUSES.includes(status)) {
        res.status(422).json({ detail: `status must be ACTIVE, ALL or one of: ${STATUSES.join(', ')}` });
        return;
      }
      const { rows } = await sql`
        SELECT t.id, t.user_id, t.name, t.email, t.category, t.subject, t.job_id, t.status, t.created_at, t.updated_at
        FROM support_tickets t
        WHERE (${status} = 'ALL')
           OR (${status} = 'ACTIVE' AND t.status IN ('OPEN', 'IN_PROGRESS'))
           OR t.status = ${status}
        ORDER BY t.updated_at DESC
        LIMIT 100
      `;
      const counts = await sql`SELECT ticket_id, count(*) AS n FROM support_replies GROUP BY ticket_id`;
      const replyCount = new Map(counts.rows.map((r) => [r.ticket_id, Number(r.n)]));
      res.status(200).json(rows.map((r) => ({ ...r, reply_count: replyCount.get(r.id) || 0 })));
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ detail: 'Method not allowed' });
      return;
    }

    const body = req.body || {};
    const id = Number(body.id);
    if (!Number.isInteger(id)) {
      res.status(422).json({ detail: 'id is required' });
      return;
    }
    const found = await sql`SELECT id, status FROM support_tickets WHERE id = ${id}`;
    if (!found.rows.length) {
      res.status(404).json({ detail: 'No such ticket' });
      return;
    }

    if (body.action === 'reply') {
      const content = typeof body.content === 'string' ? body.content.trim() : '';
      if (content.length < 1 || content.length > 4000) {
        res.status(422).json({ detail: 'Write a reply (up to 4,000 characters)' });
        return;
      }
      const { rows } = await sql`
        INSERT INTO support_replies (ticket_id, sender_role, sender_name, content)
        VALUES (${id}, 'admin', 'Vendaru Support', ${content})
        RETURNING id, ticket_id, sender_role, sender_name, content, created_at
      `;
      await sql`
        UPDATE support_tickets
        SET updated_at = now(), status = CASE WHEN status = 'OPEN' THEN 'IN_PROGRESS' ELSE status END
        WHERE id = ${id}
      `;
      await audit(admin.id, 'ticket.reply', `ticket:${id}`, content.slice(0, 200));
      res.status(201).json(rows[0]);
      return;
    }

    if (body.action === 'status') {
      if (!STATUSES.includes(body.status)) {
        res.status(422).json({ detail: `status must be one of: ${STATUSES.join(', ')}` });
        return;
      }
      const { rows } = await sql`UPDATE support_tickets SET status = ${body.status}, updated_at = now() WHERE id = ${id} RETURNING id, status`;
      await audit(admin.id, 'ticket.status', `ticket:${id}`, body.status);
      res.status(200).json(rows[0]);
      return;
    }

    res.status(422).json({ detail: 'action must be "reply" or "status"' });
  } catch (err) {
    sendError(res, err);
  }
};
