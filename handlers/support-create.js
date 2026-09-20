// Opens a support ticket. Works signed in (name and email come from the
// account, and the ticket can point at one of the person's orders) or signed
// out (name and email are asked for, so a locked-out or suspended person can
// still get help).
const { sql, ensureSchema } = require('../lib/db');
const { userFromRequest } = require('../lib/auth');
const { SUPPORT_CATEGORIES } = require('../lib/legal');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');
const { sendError } = require('../lib/respond');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const body = req.body || {};
    // A hidden field real people never see or fill: a bot that fills every
    // field gets a normal-looking success and nothing is stored.
    if (typeof body.website === 'string' && body.website.trim()) {
      res.status(201).json({ id: 0, status: 'OPEN' });
      return;
    }

    const category = body.category;
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!SUPPORT_CATEGORIES.includes(category)) {
      res.status(422).json({ detail: `category must be one of: ${SUPPORT_CATEGORIES.join(', ')}` });
      return;
    }
    if (subject.length < 3 || subject.length > 120) {
      res.status(422).json({ detail: 'Please give a subject (3 to 120 characters)' });
      return;
    }
    if (message.length < 10 || message.length > 4000) {
      res.status(422).json({ detail: 'Please describe the problem (10 to 4,000 characters)' });
      return;
    }

    await ensureSchema();

    let userId = null;
    let name;
    let email;
    const user = await userFromRequest(req); // optional: null when signed out
    if (user) {
      userId = user.id;
      name = user.full_name;
      email = user.email;
    } else {
      name = typeof body.name === 'string' ? body.name.trim() : '';
      email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
      if (!name || name.length > 100) {
        res.status(422).json({ detail: 'Your name is required' });
        return;
      }
      if (!EMAIL_RE.test(email) || email.length > 254) {
        res.status(422).json({ detail: 'A valid email is required so we can reply' });
        return;
      }
    }

    // Spam and floods: per address, and per email.
    const byIp = await hit(`support-ip:${clientIp(req)}`, 10, 60 * 60);
    const byEmail = byIp.allowed ? await hit(`support-email:${email}`, 5, 60 * 60) : byIp;
    if (!byIp.allowed || !byEmail.allowed) { tooMany(res, 3600, 'support requests'); return; }

    // An order can only be attached if it is the person's own (as customer or courier).
    let jobId = null;
    if (body.job_id !== undefined && body.job_id !== null && body.job_id !== '') {
      const id = Number(body.job_id);
      if (!Number.isInteger(id) || !userId) {
        res.status(422).json({ detail: 'That order can not be attached' });
        return;
      }
      const owned = await sql`SELECT id FROM jobs WHERE id = ${id} AND (customer_id = ${userId} OR courier_id = ${userId})`;
      if (!owned.rows.length) {
        res.status(422).json({ detail: 'That order can not be attached' });
        return;
      }
      jobId = id;
    }

    const { rows } = await sql`
      INSERT INTO support_tickets (user_id, name, email, category, subject, message, job_id)
      VALUES (${userId}, ${name}, ${email}, ${category}, ${subject}, ${message}, ${jobId})
      RETURNING id, status, created_at
    `;
    res.status(201).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
