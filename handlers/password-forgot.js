// "Forgot your password?": asks for a reset link by email. The answer is the same whether or not the
// address has an account, so this can't be used to find out who is registered. Limited per address and
// per IP so it can't be used to flood someone's inbox.
const { sql, ensureSchema } = require('../lib/db');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');
const { sendPasswordResetEmail } = require('../lib/notify');
const { sendError } = require('../lib/respond');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const body = req.body || {};
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      res.status(422).json({ detail: 'Enter the email address you signed up with' });
      return;
    }
    await ensureSchema();

    const byIp = await hit(`forgot-ip:${clientIp(req)}`, 10, 60 * 60);
    if (!byIp.allowed) { tooMany(res, byIp.retryAfter, 'requests'); return; }
    const byEmail = await hit(`forgot-email:${email}`, 3, 60 * 60);
    if (!byEmail.allowed) { tooMany(res, byEmail.retryAfter, 'requests'); return; }

    const { rows } = await sql`SELECT id, email, full_name FROM users WHERE lower(email) = ${email} AND deleted_at IS NULL`;
    if (rows[0]) await sendPasswordResetEmail(rows[0]);

    res.status(200).json({ ok: true });
  } catch (err) {
    sendError(res, err);
  }
};
