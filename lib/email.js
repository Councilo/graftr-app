// Sending email. Vendaru uses Resend (https://resend.com) through its plain HTTPS API, so there is
// no package to install. It needs three environment variables in Vercel:
//
//   RESEND_API_KEY   the key from the Resend dashboard (starts "re_")
//   EMAIL_FROM       the sender, for example  Vendaru <noreply@vendaru.com>  (vendaru.com has to be
//                    verified in Resend first; until then Resend only allows its own test sender)
//   APP_URL          where links in emails point, default https://www.vendaru.com
//   EMAIL_REPLY_TO   optional: where replies go, for example support@vendaru.com
//
// With no RESEND_API_KEY nothing can be sent. Locally that is fine: messages are kept in a small
// in-memory outbox (the dev server shows it at /__outbox, and the tests read it). On Vercel it
// means email is switched off, and so is the rule that people must confirm their email (they could
// not, so demanding it would lock everyone out).
const RESEND_URL = 'https://api.resend.com/emails';

// The outbox lives on `global` because the local dev server reloads modules on every request.
const outbox = (global.__vendaruOutbox = global.__vendaruOutbox || []);

const emailEnabled = () => !!process.env.RESEND_API_KEY;
const appUrl = () => String(process.env.APP_URL || 'https://www.vendaru.com').replace(/\/+$/, '');

// Is a confirmed email demanded before placing or accepting an order? Only once email can be sent.
// REQUIRE_EMAIL_VERIFICATION=1 forces it on (for testing the rule with the outbox).
const verificationRequired = () => emailEnabled() || process.env.REQUIRE_EMAIL_VERIFICATION === '1';

// Answers 403 and returns true when this person still has to confirm their email address.
function refuseUnverified(res, user) {
  if (!verificationRequired() || (user && user.email_verified_at)) return false;
  res.status(403).json({
    detail: "Please confirm your email address first. We've sent you a link, and you can ask for another from the banner at the top of the app.",
    email_unverified: true,
  });
  return true;
}

// Returns true if the message went out (or, locally, into the outbox). Never throws: a failed email
// must not break the thing that triggered it (a sign-up, an order).
async function sendEmail({ to, subject, text, html }) {
  if (!to || !subject || !(text || html)) return false;
  if (emailEnabled()) {
    try {
      const res = await fetch(RESEND_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'Vendaru <noreply@vendaru.com>',
          to: [to],
          subject,
          text,
          html,
          ...(process.env.EMAIL_REPLY_TO ? { reply_to: process.env.EMAIL_REPLY_TO } : {}),
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        console.error('email: Resend refused the message', res.status, (await res.text().catch(() => '')).slice(0, 200));
        return false;
      }
      return true;
    } catch (err) {
      console.error('email: sending failed', err && err.message);
      return false;
    }
  }
  if (!process.env.VERCEL) {
    outbox.push({ to, subject, text, html, at: new Date().toISOString() });
    if (outbox.length > 300) outbox.shift();
    return true;
  }
  console.warn('email: not sent, RESEND_API_KEY is not set');
  return false;
}

module.exports = { sendEmail, emailEnabled, verificationRequired, refuseUnverified, appUrl };
