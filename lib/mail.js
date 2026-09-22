// The wording and layout of every email Vendaru sends. Each template returns { subject, text, html }.
//
// The layout is deliberately plain (inline styles, one column, a big button) so it looks the same in
// every mail app. Everything that came from a person (names, addresses) is escaped before it goes
// into the HTML. Emails carry only the town and postcode district of an address, never a street.
const { areaLabel } = require('./areas');
const { appUrl } = require('./email');

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const firstName = (name) => String(name || '').trim().split(/\s+/)[0] || 'there';
const money = (n) => '£' + Number(n).toFixed(2);
const ref = (job) => `#VND-${job.id}`;
const place = (address) => { const a = areaLabel(address); return /hidden/i.test(a) ? 'the pickup' : a; };

const PINK = '#FF97CA';

function layout({ heading, paragraphs, button, footer }) {
  const paras = paragraphs.map((p) => `<p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:#111;white-space:pre-line">${p.html}</p>`).join('');
  const btn = button
    ? `<p style="margin:22px 0 8px"><a href="${esc(button.url)}" style="display:inline-block;background:${PINK};color:#000;font-weight:700;font-size:16px;text-decoration:none;padding:13px 26px;border-radius:999px">${esc(button.label)}</a></p>`
    : '';
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;padding:28px 26px">
<tr><td>
<img src="${appUrl()}/assets/brand/logo-wide-480.png" alt="Vendaru" width="150" style="display:block;margin:0 0 22px;border:0">
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:#000">${esc(heading)}</h1>
${paras}${btn}
<p style="margin:26px 0 0;font-size:12.5px;line-height:1.5;color:#666">${esc(footer)}</p>
</td></tr></table>
</td></tr></table></body></html>`;
}

// paragraphs are written once as plain text and turned into HTML (escaped) here.
const P = (text) => ({ text, html: esc(text) });
const build = ({ subject, heading, paragraphs, button, footer }) => ({
  subject,
  text: [heading, '', ...paragraphs.map((p) => p.text), ...(button ? ['', `${button.label}: ${button.url}`] : []), '', footer].join('\n'),
  html: layout({ heading, paragraphs, button, footer }),
});

const FOOTER_ACCOUNT = "You're getting this because someone used this address on Vendaru. If that wasn't you, you can ignore this email.";
const FOOTER_ORDER = "You're getting this because you placed an order on Vendaru. Open the app for the full details.";

function verifyEmail({ name, link }) {
  return build({
    subject: 'Confirm your email address for Vendaru',
    heading: `Welcome to Vendaru, ${firstName(name)}`,
    paragraphs: [
      P('Please confirm your email address so you can post or accept orders. The link works for 48 hours.'),
      P('Tip: if this email landed in your junk or spam folder, mark it as not junk so our order updates reach your inbox.'),
    ],
    button: { label: 'Confirm my email', url: link },
    footer: FOOTER_ACCOUNT,
  });
}

function resetPassword({ name, link }) {
  return build({
    subject: 'Reset your Vendaru password',
    heading: `Reset your password, ${firstName(name)}`,
    paragraphs: [
      P('Use the button below to choose a new password. The link works once and expires in one hour.'),
      P("If you didn't ask for this, you can ignore this email: your password stays as it is."),
    ],
    button: { label: 'Choose a new password', url: link },
    footer: FOOTER_ACCOUNT,
  });
}

const appLink = (hash) => `${appUrl()}/#${hash}`;

// "26 to 42 minutes" — a range in every place this is mentioned, never a single number, so nobody
// is quietly promised a precision the estimate doesn't have.
const walkTime = (job) => (job.delivery_mode === 'walker' && job.walk_minutes_low != null
  ? `${job.walk_minutes_low} to ${job.walk_minutes_high} minutes` : null);

function orderPlaced({ name, job, paymentInstructions }) {
  const instructions = paymentInstructions || 'Payment is arranged with Vendaru support. Contact support@vendaru.com quoting your order reference.';
  const wt = walkTime(job);
  return build({
    subject: `Your order ${ref(job)} is listed`,
    heading: `Thanks ${firstName(name)}, your order is listed`,
    paragraphs: [
      P(`${ref(job)}: ${place(job.pickup_address)} to ${place(job.dropoff_address)}, ${money(job.price_gbp)}.`),
      P("We'll email you when a courier accepts it."),
      ...(wt ? [P(`This is a walker delivery: a courier collects your bag on foot and carries it to you. It is slower than a regular courier — expect about ${wt} once it has been collected.`)] : []),
      P(`How to pay: ${instructions}\nUse the reference VND-${job.id}.`),
    ],
    button: { label: 'See my order', url: appLink('on-the-way') },
    footer: FOOTER_ORDER,
  });
}

function orderAccepted({ name, job, courierName }) {
  const wt = walkTime(job);
  return build({
    subject: `A courier has accepted ${ref(job)}`,
    heading: `${firstName(courierName)} will collect your parcel`,
    paragraphs: [
      P(`Hi ${firstName(name)}, ${firstName(courierName)} has accepted your order ${ref(job)}.`),
      P("You'll see them on the map, and get another email, as soon as they set off for the pickup."),
      ...(wt ? [P(`${firstName(courierName)} is walking this one over — about ${wt} after they collect it.`)] : []),
    ],
    button: { label: 'See my order', url: appLink('on-the-way') },
    footer: FOOTER_ORDER,
  });
}

function orderStarted({ name, job, courierName }) {
  return build({
    subject: `${firstName(courierName)} is on the way to collect ${ref(job)}`,
    heading: 'Your courier has set off',
    paragraphs: [
      P(`Hi ${firstName(name)}, ${firstName(courierName)} is on the way to collect your parcel from ${place(job.pickup_address)}.`),
      P('You can follow them live on the map.'),
    ],
    button: { label: 'Follow my courier', url: appLink('on-the-way') },
    footer: FOOTER_ORDER,
  });
}

function orderCollected({ name, job }) {
  return build({
    subject: `Your parcel ${ref(job)} has been collected`,
    heading: 'Your parcel is on its way',
    paragraphs: [
      P(`Hi ${firstName(name)}, your parcel has been collected and is heading to ${place(job.dropoff_address)}.`),
      ...(job.delivery_pin ? [P('This order uses a delivery PIN. You can see it in the app: give it to whoever is receiving the parcel.')] : []),
    ],
    button: { label: 'Follow my parcel', url: appLink('on-the-way') },
    footer: FOOTER_ORDER,
  });
}

function orderDelivered({ name, job }) {
  return build({
    subject: `Your parcel ${ref(job)} has been delivered`,
    heading: 'Delivered',
    paragraphs: [
      P(`Hi ${firstName(name)}, your parcel to ${place(job.dropoff_address)} has been delivered. Thank you for using Vendaru.`),
      P('If anything is not right, open Help in the app and choose this order.'),
    ],
    button: { label: 'See my order', url: appLink('past-orders') },
    footer: FOOTER_ORDER,
  });
}

module.exports = { verifyEmail, resetPassword, orderPlaced, orderAccepted, orderStarted, orderCollected, orderDelivered, firstName };
