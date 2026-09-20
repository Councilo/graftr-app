// Admin: find accounts, and suspend or reinstate them. A suspended person can
// still sign in, read their profile and support tickets, and open a ticket to
// appeal — everything else is refused (see requireUser in lib/auth.js).
const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin, isAdminEmail } = require('../lib/auth');
const { audit } = require('../lib/audit');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    await ensureSchema();

    if (req.method === 'GET') {
      // LIKE wildcards in what the admin typed are taken literally.
      const q = String((req.query && req.query.q) || '').trim().toLowerCase().slice(0, 100).replace(/[\\%_]/g, (c) => `\\${c}`);
      const pattern = `%${q}%`;
      const { rows } = await sql`
        SELECT id, email, full_name, phone, role, created_at, is_suspended, suspended_reason, terms_accepted_at, location_consent_at
        FROM users
        WHERE deleted_at IS NULL AND (lower(email) LIKE ${pattern} OR lower(full_name) LIKE ${pattern})
        ORDER BY id DESC
        LIMIT 50
      `;
      const asCustomer = await sql`SELECT customer_id AS uid, count(*) AS n FROM jobs GROUP BY customer_id`;
      const asCourier = await sql`SELECT courier_id AS uid, count(*) AS n FROM jobs WHERE courier_id IS NOT NULL GROUP BY courier_id`;
      const jobCount = new Map();
      for (const r of [...asCustomer.rows, ...asCourier.rows]) jobCount.set(r.uid, (jobCount.get(r.uid) || 0) + Number(r.n));
      res.status(200).json(rows.map((u) => ({ ...u, job_count: jobCount.get(u.id) || 0, is_admin: isAdminEmail(u.email) })));
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ detail: 'Method not allowed' });
      return;
    }

    const body = req.body || {};
    const userId = Number(body.userId);
    const reason = typeof body.reason === 'string' ? body.reason.trim().slice(0, 500) : '';
    if (!Number.isInteger(userId) || !['suspend', 'unsuspend'].includes(body.action)) {
      res.status(422).json({ detail: 'userId and action ("suspend" or "unsuspend") are required' });
      return;
    }
    const found = await sql`SELECT id, email, is_suspended FROM users WHERE id = ${userId} AND deleted_at IS NULL`;
    const target = found.rows[0];
    if (!target) {
      res.status(404).json({ detail: 'No such account' });
      return;
    }
    // Admins can't lock each other (or themselves) out from here; that is done
    // by editing the ADMIN_EMAILS setting.
    if (isAdminEmail(target.email)) {
      res.status(403).json({ detail: 'An admin account can\'t be suspended from here' });
      return;
    }

    if (body.action === 'suspend') {
      if (reason.length < 3) {
        res.status(422).json({ detail: 'Give a reason for the suspension' });
        return;
      }
      await sql`UPDATE users SET is_suspended = true, suspended_reason = ${reason} WHERE id = ${userId}`;
      await audit(admin.id, 'user.suspend', `user:${userId}`, reason);
    } else {
      await sql`UPDATE users SET is_suspended = false, suspended_reason = NULL WHERE id = ${userId}`;
      await audit(admin.id, 'user.unsuspend', `user:${userId}`, reason);
    }
    const { rows } = await sql`SELECT id, email, full_name, role, is_suspended, suspended_reason FROM users WHERE id = ${userId}`;
    res.status(200).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
