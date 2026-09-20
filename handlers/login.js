const { sql, ensureSchema } = require('../lib/db');
const { verifyPassword, signToken } = require('../lib/auth');

// A real bcrypt hash of a throwaway string. When the email is unknown we still
// compare the password against this, so a wrong email and a wrong password take
// the same time and can't be told apart by how long the reply took.
const DUMMY_HASH = '$2a$10$A4WwfjYYn0hbTmWFM37.8ObCY2icdMLZ1VEU6RH7SaQ0qD3zPCpGS';
const { sendError } = require('../lib/respond');
const { clientIp, isLimited, record, tooMany } = require('../lib/ratelimit');

// Failed sign-ins allowed before a short lockout: per account (someone
// guessing one person's password from anywhere) and per address (someone
// trying many accounts from one place). Only FAILURES count, so a person who
// signs in correctly is never slowed down.
const FAILS_PER_ACCOUNT = 8;
const FAILS_PER_IP = 30;
const WINDOW_SECONDS = 15 * 60;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const { password } = body;
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : body.email;
    if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 200) {
      res.status(422).json({ detail: 'Email and password are required' });
      return;
    }

    await ensureSchema();

    const accountKey = `login-fail:${email}`;
    const ipKey = `login-fail-ip:${clientIp(req)}`;
    if (await isLimited(accountKey, FAILS_PER_ACCOUNT, WINDOW_SECONDS) || await isLimited(ipKey, FAILS_PER_IP, WINDOW_SECONDS)) {
      tooMany(res, WINDOW_SECONDS, 'sign-in attempts');
      return;
    }

    const { rows } = await sql`
      SELECT id, email, full_name, role, password_hash, deleted_at FROM users WHERE email = ${email}
    `;
    const user = rows[0];
    // Same message whether the email doesn't exist or the password is
    // wrong — telling them apart would let a caller enumerate which emails
    // have accounts.
    const passwordOk = await verifyPassword(password, user && !user.deleted_at ? user.password_hash : DUMMY_HASH);
    if (!user || user.deleted_at || !passwordOk) {
      await record(accountKey);
      await record(ipKey);
      res.status(401).json({ detail: 'Incorrect email or password' });
      return;
    }

    const token = signToken(user);
    res.status(200).json({
      access_token: token,
      token_type: 'bearer',
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
    });
  } catch (err) {
    sendError(res, err);
  }
};
