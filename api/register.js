const { sql, ensureSchema } = require('../lib/db');
const { hashPassword } = require('../lib/auth');
const { sendError } = require('../lib/respond');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = new Set(['customer', 'courier']);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }

  try {
    const { email, password, full_name, role } = req.body || {};

    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
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
    if (typeof full_name !== 'string' || !full_name.trim()) {
      res.status(422).json({ detail: 'Full name is required' });
      return;
    }
    if (!ROLES.has(role)) {
      res.status(422).json({ detail: "role must be 'customer' or 'courier'" });
      return;
    }

    await ensureSchema();

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.rows.length) {
      res.status(409).json({ detail: 'An account with this email already exists' });
      return;
    }

    const passwordHash = await hashPassword(password);
    const { rows } = await sql`
      INSERT INTO users (email, full_name, password_hash, role)
      VALUES (${email}, ${full_name.trim()}, ${passwordHash}, ${role})
      RETURNING id, email, full_name, role
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
