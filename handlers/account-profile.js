// Edit your own profile: name, optional phone number, and email.
//
// The phone number is optional and is only ever shown to the support team (Admin →
// Users), for reaching someone about an order. It is never shown to the other person
// on a job. Changing the email needs the current password: it is what people sign in
// with, and without it a borrowed, unlocked phone could take the account over.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser, verifyPassword } = require('../lib/auth');
const { isLimited, record, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');
const { sendVerificationEmail } = require('../lib/notify');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^\+?[0-9 ()-]+$/;
const FAILS_ALLOWED = 5;
const WINDOW_SECONDS = 15 * 60;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    // A suspended person can still correct their own details.
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return;

    const body = req.body || {};

    const fullName = typeof body.full_name === 'string' ? body.full_name.trim() : '';
    if (!fullName || fullName.length > 100) {
      res.status(422).json({ detail: 'Enter your name (up to 100 characters)' });
      return;
    }

    // Phone: leave it alone if not sent; empty clears it.
    let phone;
    if (body.phone === undefined) {
      phone = undefined;
    } else if (body.phone === null || (typeof body.phone === 'string' && !body.phone.trim())) {
      phone = null;
    } else if (typeof body.phone === 'string') {
      const cleaned = body.phone.trim().replace(/\s+/g, ' ');
      const digits = cleaned.replace(/\D/g, '');
      if (!PHONE_CHARS_RE.test(cleaned) || digits.length < 7 || digits.length > 15) {
        res.status(422).json({ detail: 'Enter a valid phone number, for example 07700 900123 or +44 7700 900123' });
        return;
      }
      phone = cleaned;
    } else {
      res.status(422).json({ detail: 'Enter a valid phone number' });
      return;
    }

    // Email: only a real change needs checking.
    const wantedEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : user.email;
    const emailChanged = wantedEmail !== String(user.email).toLowerCase();

    await ensureSchema();

    if (emailChanged) {
      if (!EMAIL_RE.test(wantedEmail) || wantedEmail.length > 254) {
        res.status(422).json({ detail: 'Enter a valid email address' });
        return;
      }
      if (typeof body.current_password !== 'string' || !body.current_password) {
        res.status(422).json({ detail: 'Enter your current password to change your email' });
        return;
      }
      const key = `pw-fail:${user.id}`;
      if (await isLimited(key, FAILS_ALLOWED, WINDOW_SECONDS)) { tooMany(res, WINDOW_SECONDS, 'attempts'); return; }
      const found = await sql`SELECT password_hash FROM users WHERE id = ${user.id}`;
      if (!found.rows[0] || !(await verifyPassword(body.current_password, found.rows[0].password_hash))) {
        await record(key);
        res.status(403).json({ detail: 'Your current password is incorrect' });
        return;
      }
      const taken = await sql`SELECT id FROM users WHERE lower(email) = ${wantedEmail} AND id <> ${user.id}`;
      if (taken.rows.length) {
        res.status(409).json({ detail: 'An account with that email already exists' });
        return;
      }
    }

    try {
      await sql`
        UPDATE users
        SET full_name = ${fullName},
            email = ${emailChanged ? wantedEmail : user.email},
            phone = ${phone === undefined ? (user.phone || null) : phone}
        WHERE id = ${user.id}
      `;
    } catch (err) {
      if (err && err.code === '23505') { // two people racing for the same address
        res.status(409).json({ detail: 'An account with that email already exists' });
        return;
      }
      throw err;
    }
    // A new address is unconfirmed until its owner clicks the link we send there.
    if (emailChanged) {
      await sql`UPDATE users SET email_verified_at = NULL WHERE id = ${user.id}`;
      await sendVerificationEmail({ id: user.id, email: wantedEmail, full_name: fullName });
    }
    // Earlier chat messages carry a copy of the sender's name; keep it in step.
    if (fullName !== user.full_name) {
      await sql`UPDATE messages SET sender_name = ${fullName} WHERE sender_id = ${user.id}`;
    }

    res.status(200).json({
      id: user.id,
      full_name: fullName,
      email: emailChanged ? wantedEmail : user.email,
      phone: phone === undefined ? (user.phone || null) : phone,
      role: user.role,
    });
  } catch (err) {
    sendError(res, err);
  }
};
