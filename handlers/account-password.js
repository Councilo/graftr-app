const { sql, ensureSchema } = require('../lib/db');
const { requireUser, hashPassword, verifyPassword } = require('../lib/auth');
const { isLimited, record, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

// Wrong "current password" guesses on a signed-in session are throttled like
// sign-in failures: a stolen session shouldn't be able to grind out the password.
const FAILS_ALLOWED = 5;
const WINDOW_SECONDS = 15 * 60;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;

    const { current_password, new_password } = req.body || {};
    if (typeof current_password !== 'string' || typeof new_password !== 'string') {
      res.status(422).json({ detail: 'current_password and new_password are required' });
      return;
    }
    if (new_password.length < 8 || new_password.length > 72) {
      res.status(422).json({ detail: 'The new password must be 8-72 characters' });
      return;
    }
    if (new_password === current_password) {
      res.status(422).json({ detail: 'Choose a password different from your current one' });
      return;
    }

    await ensureSchema();
    const key = `pw-fail:${user.id}`;
    if (await isLimited(key, FAILS_ALLOWED, WINDOW_SECONDS)) { tooMany(res, WINDOW_SECONDS, 'attempts'); return; }

    const { rows } = await sql`SELECT password_hash FROM users WHERE id = ${user.id}`;
    if (!rows[0] || !(await verifyPassword(current_password, rows[0].password_hash))) {
      await record(key);
      res.status(403).json({ detail: 'Your current password is incorrect' });
      return;
    }

    const hash = await hashPassword(new_password);
    await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${user.id}`;
    res.status(200).json({ success: true });
  } catch (err) {
    sendError(res, err);
  }
};
