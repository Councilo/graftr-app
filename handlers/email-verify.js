// The "Confirm my email" link in the sign-up email lands here (the app reads the token out of the
// link and posts it). No sign-in is needed: the link may be opened on a different phone than the
// one Vendaru is signed in on, and all it can do is mark that address as confirmed.
const { sql, ensureSchema } = require('../lib/db');
const { consumeToken } = require('../lib/email-tokens');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const { token } = req.body || {};
    await ensureSchema();

    const limit = await hit(`verify-ip:${clientIp(req)}`, 30, 60 * 60);
    if (!limit.allowed) { tooMany(res, limit.retryAfter, 'attempts'); return; }

    const used = await consumeToken(token, 'verify');
    if (!used) {
      res.status(400).json({ detail: 'This link has expired or has already been used. Sign in and ask for a new one.' });
      return;
    }
    // The link is tied to the address it was sent to; if the email was changed since, it no longer counts.
    const done = await sql`
      UPDATE users SET email_verified_at = COALESCE(email_verified_at, now())
      WHERE id = ${used.userId} AND lower(email) = ${used.email} AND deleted_at IS NULL
      RETURNING id
    `;
    if (!done.rows.length) {
      res.status(400).json({ detail: 'This link was sent to an email address that is no longer on the account. Sign in and ask for a new one.' });
      return;
    }
    res.status(200).json({ verified: true });
  } catch (err) {
    sendError(res, err);
  }
};
