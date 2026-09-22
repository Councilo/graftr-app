// A shop taps "Handed over" once they've actually given the bag to the walker who showed the
// pickup code — the shop's own record of it, for their own peace of mind. It doesn't gate anything
// either: the walker's own "Confirm pickup" (handlers/jobs-pickup.js, which checks that same code) is
// what actually moves the job on; this can be tapped before or after that, in whichever order the
// two phones happen to catch up. Needs a walker to have accepted first — nothing to hand over before then.
const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { shopForOwner } = require('../lib/shops');
const { serializeJob } = require('../lib/jobs');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const owner = await requireRole(req, res, 'customer');
    if (!owner) return;

    const jobId = Number((req.body || {}).jobId);
    if (!Number.isInteger(jobId)) {
      res.status(422).json({ detail: 'jobId is required' });
      return;
    }

    await ensureSchema();
    const shop = await shopForOwner(owner.id);
    if (!shop) {
      res.status(403).json({ detail: "You don't have a partner shop" });
      return;
    }

    const updated = await sql`
      UPDATE jobs SET shop_handed_over_at = COALESCE(shop_handed_over_at, now())
      WHERE id = ${jobId} AND shop_id = ${shop.id} AND status IN ('ACCEPTED', 'COLLECTED', 'DELIVERED')
      RETURNING *
    `;
    if (!updated.rows.length) {
      const existing = await sql`SELECT id, status FROM jobs WHERE id = ${jobId} AND shop_id = ${shop.id}`;
      if (!existing.rows.length) {
        res.status(404).json({ detail: 'No such bag' });
        return;
      }
      res.status(409).json({ detail: 'No walker has accepted this bag yet' });
      return;
    }
    res.status(200).json(serializeJob(updated.rows[0], { forCustomer: true }));
  } catch (err) {
    sendError(res, err);
  }
};
