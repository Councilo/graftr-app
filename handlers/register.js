const { sql, ensureSchema } = require('../lib/db');
const { hashPassword } = require('../lib/auth');
const { sendError } = require('../lib/respond');
const { TERMS_VERSION } = require('../lib/legal');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = new Set(['customer', 'courier']);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const { password, full_name, role } = body;
    // Emails are compared case-insensitively ("Jo@x.com" and "jo@x.com" are
    // one person), so they are stored trimmed and lower-cased.
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : body.email;

    if (typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email)) {
      res.status(422).json({ detail: 'A valid email is required' });
      return;
    }
    // bcrypt silently ignores bytes past 72 — capped here so a longer
    // password can't look accepted while only its first 72 bytes are ever
    // actually checked.
    if (typeof password !== 'string' || password.length < 8 || password.length > 72) {
      res.status(422).json({ detail: 'Password must be 8-72 characters' });
      return;
    }
    if (typeof full_name !== 'string' || !full_name.trim() || full_name.trim().length > 100) {
      res.status(422).json({ detail: 'Full name is required (100 characters at most)' });
      return;
    }
    if (!ROLES.has(role)) {
      res.status(422).json({ detail: "role must be 'customer' or 'courier'" });
      return;
    }
    // Agreement is recorded, so it has to be real: a request that doesn't say
    // the person accepted is refused rather than assumed.
    if (body.accept_terms !== true) {
      res.status(422).json({ detail: 'You must accept the Terms of Service and Privacy Policy to create an account' });
      return;
    }
    if (role === 'courier' && (body.accept_courier_terms !== true || body.location_consent !== true)) {
      res.status(422).json({ detail: 'Couriers must accept the Courier Terms and agree to share their location while delivering' });
      return;
    }

    await ensureSchema();

    // Mass sign-ups from one address are the first sign of abuse.
    const limit = await hit(`register:${clientIp(req)}`, 10, 60 * 60);
    if (!limit.allowed) { tooMany(res, limit.retryAfter, 'sign-up attempts'); return; }

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.rows.length) {
      res.status(409).json({ detail: 'An account with this email already exists' });
      return;
    }

    const passwordHash = await hashPassword(password);
    const { rows } = await sql`
      INSERT INTO users (email, full_name, password_hash, role, terms_accepted_at, terms_version, location_consent_at)
      VALUES (
        ${email}, ${full_name.trim()}, ${passwordHash}, ${role}, now(), ${TERMS_VERSION},
        ${role === 'courier' ? new Date().toISOString() : null}
      )
      RETURNING id, email, full_name, role
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
