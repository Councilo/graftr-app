const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin } = require('../lib/auth');
const { sendError } = require('../lib/respond');

// The numbers on the Admin dashboard's front page: what needs attention now
// (pending refunds, open tickets, unpaid orders) and the overall picture.
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    await ensureSchema();
    const count = async (query) => Number((await query).rows[0].n);

    const pendingRefunds = await count(sql`SELECT count(*) AS n FROM refund_requests WHERE status = 'PENDING'`);
    const openTickets = await count(sql`SELECT count(*) AS n FROM support_tickets WHERE status IN ('OPEN', 'IN_PROGRESS')`);
    const suspended = await count(sql`SELECT count(*) AS n FROM users WHERE is_suspended = true AND deleted_at IS NULL`);
    const pendingShops = await count(sql`SELECT count(*) AS n FROM shops WHERE status = 'pending'`);

    const payments = await sql`
      SELECT status, count(*) AS n, coalesce(sum(amount_gbp), 0) AS total, coalesce(sum(refunded_gbp), 0) AS refunded
      FROM payments GROUP BY status
    `;
    const jobs = await sql`SELECT status, count(*) AS n FROM jobs GROUP BY status`;
    const users = await sql`SELECT role, count(*) AS n FROM users WHERE deleted_at IS NULL GROUP BY role`;

    res.status(200).json({
      needs_attention: { pending_refunds: pendingRefunds, open_tickets: openTickets, pending_shops: pendingShops },
      suspended_accounts: suspended,
      payments: payments.rows.map((r) => ({ status: r.status, count: Number(r.n), total_gbp: Number(r.total), refunded_gbp: Number(r.refunded) })),
      jobs: Object.fromEntries(jobs.rows.map((r) => [r.status, Number(r.n)])),
      users: Object.fromEntries(users.rows.map((r) => [r.role, Number(r.n)])),
    });
  } catch (err) {
    sendError(res, err);
  }
};
