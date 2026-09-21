// Sets a new password from the link in the reset email. Using the link proves control of the address,
// so it also confirms the email. Everything signed in before the reset is signed out (see
// password_changed_at in lib/auth.js): a stolen session shouldn't survive a reset. Any sign-in lockout
// on the account is cleared so the person can log straight in.
const { sql, ensureSchema } = require('../lib/db');
const { hashPassword } = require('../lib/auth');
const { consumeToken } = require('../lib/email-tokens');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const { token, password } = req.body || {};
    if (typeof password !== 'string' || password.length < 8 || password.length > 72) {
      res.status(422).json({ detail: 'Password must be 8-72 characters' });
      return;
    }
    await ensureSchema();

    const limit = await hit(`reset-ip:${clientIp(req)}`, 20, 60 * 60);
    if (!limit.allowed) { tooMany(res, limit.retryAfter, 'attempts'); return; }

    const used = await consumeToken(token, 'reset');
    const invalid = { detail: 'This link has expired or has already been used. Ask for a new one.' };
    if (!used) { res.status(400).json(invalid); return; }

    const found = await sql`SELECT id, email FROM users WHERE id = ${used.userId} AND deleted_at IS NULL`;
    if (!found.rows[0] || String(found.rows[0].email).toLowerCase() !== used.email) { res.status(400).json(invalid); return; }

    const passwordHash = await hashPassword(password);
    await sql`
      UPDATE users
      SET password_hash = ${passwordHash}, password_changed_at = now(), email_verified_at = COALESCE(email_verified_at, now())
      WHERE id = ${used.userId}
    `;
    await sql`UPDATE email_tokens SET used_at = now() WHERE user_id = ${used.userId} AND purpose = 'reset' AND used_at IS NULL`;
    await sql`DELETE FROM rate_events WHERE key = ${`login-fail:${used.email}`}`;

    res.status(200).json({ ok: true });
  } catch (err) {
    sendError(res, err);
  }
};
