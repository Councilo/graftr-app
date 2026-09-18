const { sql, ensureSchema } = require('../lib/db');
const { verifyPassword, signToken } = require('../lib/auth');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }

  try {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(422).json({ detail: 'Email and password are required' });
      return;
    }

    await ensureSchema();

    const { rows } = await sql`
      SELECT id, email, full_name, role, password_hash FROM users WHERE email = ${email}
    `;
    const user = rows[0];
    // Same message whether the email doesn't exist or the password is
    // wrong — telling them apart would let a caller enumerate which emails
    // have accounts.
    if (!user || !(await verifyPassword(password, user.password_hash))) {
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
