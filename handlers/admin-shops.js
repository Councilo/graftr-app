// Admin: see partner shop applications and approve or suspend them. Only an approved shop can post a
// bag (handlers/shop-post-bag.js checks this itself too, not just the UI).
const { sql, ensureSchema } = require('../lib/db');
const { requireAdmin } = require('../lib/auth');
const { SHOP_STATUSES } = require('../lib/shops');
const { audit } = require('../lib/audit');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;
    await ensureSchema();

    if (req.method === 'GET') {
      const status = String((req.query && req.query.status) || '').trim();
      const filtered = SHOP_STATUSES.includes(status);
      const { rows } = filtered
        ? await sql`
            SELECT s.*, u.email AS owner_email, u.full_name AS owner_name
            FROM shops s JOIN users u ON u.id = s.owner_user_id
            WHERE s.status = ${status}
            ORDER BY s.created_at DESC
            LIMIT 100
          `
        : await sql`
            SELECT s.*, u.email AS owner_email, u.full_name AS owner_name
            FROM shops s JOIN users u ON u.id = s.owner_user_id
            ORDER BY s.created_at DESC
            LIMIT 100
          `;
      res.status(200).json(rows);
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ detail: 'Method not allowed' });
      return;
    }

    const body = req.body || {};
    const shopId = Number(body.shopId);
    const reason = typeof body.reason === 'string' ? body.reason.trim().slice(0, 500) : '';
    if (!Number.isInteger(shopId) || !['approve', 'suspend'].includes(body.action)) {
      res.status(422).json({ detail: 'shopId and action ("approve" or "suspend") are required' });
      return;
    }
    const found = await sql`SELECT id, status FROM shops WHERE id = ${shopId}`;
    if (!found.rows.length) {
      res.status(404).json({ detail: 'No such shop' });
      return;
    }

    if (body.action === 'suspend') {
      if (reason.length < 3) {
        res.status(422).json({ detail: 'Give a reason for the suspension' });
        return;
      }
      await sql`UPDATE shops SET status = 'suspended' WHERE id = ${shopId}`;
      await audit(admin.id, 'shop.suspend', `shop:${shopId}`, reason);
    } else {
      await sql`UPDATE shops SET status = 'approved' WHERE id = ${shopId}`;
      await audit(admin.id, 'shop.approve', `shop:${shopId}`, reason);
    }
    const { rows } = await sql`SELECT * FROM shops WHERE id = ${shopId}`;
    res.status(200).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
