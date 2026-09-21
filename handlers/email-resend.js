// "Send it again" for the confirmation email, for the signed-in person. The newest link replaces any
// older one. Limited to one a minute and three an hour so it can't be used to mail-bomb an address.
const { requireUser } = require('../lib/auth');
const { hit, tooMany } = require('../lib/ratelimit');
const { sendVerificationEmail } = require('../lib/notify');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;
    if (user.email_verified_at) {
      res.status(200).json({ already_verified: true });
      return;
    }
    const minute = await hit(`verify-mail-min:${user.id}`, 1, 60);
    if (!minute.allowed) { tooMany(res, minute.retryAfter, 'emails'); return; }
    const hour = await hit(`verify-mail:${user.id}`, 3, 60 * 60);
    if (!hour.allowed) { tooMany(res, hour.retryAfter, 'emails'); return; }

    const sent = await sendVerificationEmail(user);
    if (!sent) {
      res.status(503).json({ detail: "We couldn't send the email just now. Please try again in a few minutes." });
      return;
    }
    res.status(200).json({ sent: true });
  } catch (err) {
    sendError(res, err);
  }
};
