// Deleting an account. The person's identity is removed and the account can
// never sign in again, but the ROWS are kept (anonymised) because other people's
// records depend on them: the courier's completed jobs, the customer's payments
// and refunds (which must be retained for accounting), support history. What is
// erased: email, name, password. What is retained, and why, is stated in the
// Privacy Policy's retention section.
const crypto = require('crypto');
const { sql, ensureSchema } = require('../lib/db');
const { requireUser, hashPassword, verifyPassword } = require('../lib/auth');
const { isLimited, record, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    // A suspended account can still be deleted: it's the person's own data.
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return;

    const { password } = req.body || {};
    if (typeof password !== 'string') {
      res.status(422).json({ detail: 'Enter your password to confirm' });
      return;
    }

    await ensureSchema();
    const key = `pw-fail:${user.id}`;
    if (await isLimited(key, 5, 15 * 60)) { tooMany(res, 15 * 60, 'attempts'); return; }

    const { rows } = await sql`SELECT password_hash FROM users WHERE id = ${user.id}`;
    if (!rows[0] || !(await verifyPassword(password, rows[0].password_hash))) {
      await record(key);
      res.status(403).json({ detail: 'That password is incorrect' });
      return;
    }

    // Never delete out from under a parcel in flight.
    const active = await sql`
      SELECT id FROM jobs
      WHERE (customer_id = ${user.id} OR courier_id = ${user.id})
        AND status IN ('OPEN', 'ACCEPTED', 'COLLECTED')
      LIMIT 1
    `;
    if (active.rows.length) {
      res.status(409).json({ detail: 'You still have a delivery in progress. Finish or cancel it before deleting your account.' });
      return;
    }

    // A random password nobody knows, so even a leaked old token can't matter.
    const scrambled = await hashPassword(crypto.randomBytes(24).toString('hex'));
    await sql`
      UPDATE users
      SET email = ${`deleted-${user.id}@deleted.invalid`}, full_name = 'Deleted user',
          password_hash = ${scrambled}, phone = NULL, deleted_at = now(), is_suspended = false, suspended_reason = NULL
      WHERE id = ${user.id}
    `;
    await sql`UPDATE messages SET sender_name = 'Deleted user' WHERE sender_id = ${user.id}`;
    await sql`UPDATE support_tickets SET name = 'Deleted user', email = 'deleted@deleted.invalid' WHERE user_id = ${user.id}`;
    res.status(200).json({ success: true });
  } catch (err) {
    sendError(res, err);
  }
};
