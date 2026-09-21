// Email: confirming an address, resetting a password, and the order updates. No real email is sent:
// with no RESEND_API_KEY the dev server keeps messages in an outbox that this test reads (/__outbox).
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret';
const REPO = require('path').resolve(__dirname, '..');
const { signQuote } = require(REPO + '/lib/quote-token.js');
const emailLib = require(REPO + '/lib/email.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 260) : '')); }
};
const BASE = 'http://localhost:5500';
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function call(method, path, token, body) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}
const outbox = async (to) => (await (await fetch(`${BASE}/__outbox?to=${encodeURIComponent(to)}`)).json());
const tokenIn = (msg) => ((msg && msg.text || '').match(/#(?:verify|reset)=([A-Za-z0-9_-]+)/) || [])[1];
const stamp = Date.now();
async function signUp(role, tag, fullName) {
  const email = `${tag}_${stamp}@example.com`;
  const r = await call('POST', '/api/register', null, { email, password: 'password123', full_name: fullName || `${tag} Tester`, role, accept_terms: true, accept_courier_terms: true, location_consent: true });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  return { email, status: r.status, token: l.body && l.body.access_token, id: r.body && r.body.id };
}
const jpeg = () => new (require('buffer').Blob)([Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0xff, 0xd9])], { type: 'image/jpeg' });
async function photo(token, endpoint, jobId) {
  const f = new FormData(); f.append('photo', jpeg(), 'p.jpg');
  const r = await fetch(`${BASE}/api/${endpoint}?jobId=${jobId}`, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'X-Forwarded-For': IP }, body: f });
  return { status: r.status, body: await r.json().catch(() => null) };
}

(async () => {
  console.log('[the rule: confirm your email first, but only once email can be sent]');
  const saved = { key: process.env.RESEND_API_KEY, force: process.env.REQUIRE_EMAIL_VERIFICATION };
  delete process.env.RESEND_API_KEY; delete process.env.REQUIRE_EMAIL_VERIFICATION;
  const fakeRes = () => ({ code: 0, body: null, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; } });
  let res = fakeRes();
  ok('with no email service set up nobody is asked to confirm (they could not)', emailLib.verificationRequired() === false && emailLib.refuseUnverified(res, { email_verified_at: null }) === false && res.code === 0);
  process.env.RESEND_API_KEY = 're_test_key_not_used';
  res = fakeRes();
  ok('once email is switched on an unconfirmed person is refused with 403 email_unverified', emailLib.verificationRequired() === true && emailLib.refuseUnverified(res, { email_verified_at: null }) === true && res.code === 403 && res.body.email_unverified === true, res);
  res = fakeRes();
  ok('a confirmed person is let through', emailLib.refuseUnverified(res, { email_verified_at: '2026-09-21T10:00:00Z' }) === false && res.code === 0);
  delete process.env.RESEND_API_KEY;
  process.env.REQUIRE_EMAIL_VERIFICATION = '1';
  ok('REQUIRE_EMAIL_VERIFICATION=1 forces the rule on for testing', emailLib.verificationRequired() === true);
  delete process.env.REQUIRE_EMAIL_VERIFICATION;
  if (saved.key !== undefined) process.env.RESEND_API_KEY = saved.key;
  if (saved.force !== undefined) process.env.REQUIRE_EMAIL_VERIFICATION = saved.force;

  console.log('\n[signing up sends a confirmation email]');
  const c1 = await signUp('customer', 'mailone');
  ok('sign-up works', c1.status === 201 && !!c1.token, c1);
  let box = await outbox(c1.email);
  ok('one email went to the new address, about confirming it', box.length === 1 && /confirm/i.test(box[0].subject), box);
  const tokenA = tokenIn(box[0]);
  ok('it carries a confirm link in the fragment (never in the query string, so it is not logged)', !!tokenA && /\/#verify=/.test(box[0].text) && !/\?[^ ]*verify=/.test(box[0].text), box[0].text);
  ok('and a button in the HTML version', /Confirm my email/.test(box[0].html) && /#verify=/.test(box[0].html));
  let me = await call('GET', '/api/me', c1.token);
  ok('the new account starts unconfirmed', me.body.email_verified === false && me.body.email_verified_at === null, me.body);
  ok('/api/me says whether confirming is currently demanded', me.body.email_verification_required === false, me.body);

  console.log('\n[the confirm link]');
  let r = await call('POST', '/api/email-verify', null, { token: 'not-a-real-token-not-a-real-token' });
  ok('a made-up token -> 400', r.status === 400, r);
  r = await call('POST', '/api/email-verify', null, {});
  ok('no token -> 400', r.status === 400, r);
  r = await call('POST', '/api/email-verify', null, { token: tokenA });
  ok('the real token confirms the address (no sign-in needed) -> 200', r.status === 200 && r.body.verified === true, r);
  me = await call('GET', '/api/me', c1.token);
  ok('the account is now confirmed', me.body.email_verified === true && !!me.body.email_verified_at, me.body);
  r = await call('POST', '/api/email-verify', null, { token: tokenA });
  ok('the link only works once -> 400', r.status === 400, r);
  r = await call('POST', '/api/email-resend', c1.token);
  ok('asking for another when already confirmed says so, and sends nothing', r.status === 200 && r.body.already_verified === true && (await outbox(c1.email)).length === 1, r);
  r = await call('POST', '/api/email-resend', null);
  ok('resending needs a sign-in -> 401', r.status === 401, r);

  console.log('\n[asking for a new link]');
  const c2 = await signUp('customer', 'mailtwo');
  const firstToken = tokenIn((await outbox(c2.email))[0]);
  r = await call('POST', '/api/email-resend', c2.token);
  box = await outbox(c2.email);
  ok('"send it again" emails a second link', r.status === 200 && r.body.sent === true && box.length === 2, r);
  r = await call('POST', '/api/email-resend', c2.token);
  ok('but not more than one a minute -> 429', r.status === 429, r);
  r = await call('POST', '/api/email-verify', null, { token: firstToken });
  ok('the older link stops working once a newer one exists', r.status === 400, r);
  r = await call('POST', '/api/email-verify', null, { token: tokenIn(box[1]) });
  ok('the newest link works', r.status === 200, r);

  console.log('\n[names in emails cannot inject HTML]');
  const evil = await signUp('customer', 'mailevil', '<script>alert(1)</script>');
  const evilMail = (await outbox(evil.email))[0];
  ok('the name is escaped in the HTML and in the plain-text version is just text', !!evilMail && !/<script>/.test(evilMail.html) && /&lt;script&gt;/.test(evilMail.html), evilMail && evilMail.html.slice(0, 400));

  console.log('\n[changing your email address]');
  const c3 = await signUp('customer', 'mailthree');
  await call('POST', '/api/email-verify', null, { token: tokenIn((await outbox(c3.email))[0]) });
  const newAddress = `moved_${stamp}@example.com`;
  r = await call('POST', '/api/account-profile', c3.token, { full_name: 'Mail Three', email: newAddress, current_password: 'password123' });
  ok('changing the address works', r.status === 200 && r.body.email === newAddress, r);
  me = await call('GET', '/api/me', c3.token);
  ok('the new address is unconfirmed until its owner clicks a link', me.body.email_verified === false, me.body);
  box = await outbox(newAddress);
  ok('and the link went to the NEW address', box.length === 1 && /confirm/i.test(box[0].subject), box);

  console.log('\n[forgot password]');
  r = await call('POST', '/api/password-forgot', null, { email: 'not an email' });
  ok('a malformed address -> 422', r.status === 422, r);
  const ghost = `ghost_${stamp}@example.com`;
  r = await call('POST', '/api/password-forgot', null, { email: ghost });
  ok('an address with no account gets the same 200 (nobody can find out who is registered)', r.status === 200 && r.body.ok === true, r);
  ok('and no email is sent to it', (await outbox(ghost)).length === 0);

  const forgetful = await signUp('customer', 'mailforget');
  const oldSession = forgetful.token;
  await sleep(1100); // sessions are stamped to the second: make sure the old one is older than the reset
  r = await call('POST', '/api/password-forgot', null, { email: forgetful.email.toUpperCase() });
  ok('a real address (any capitalisation) -> 200', r.status === 200, r);
  box = (await outbox(forgetful.email)).filter((m) => /reset/i.test(m.subject));
  ok('a reset email is sent, with a link', box.length === 1 && !!tokenIn(box[0]) && /#reset=/.test(box[0].text), box);
  const resetToken = tokenIn(box[0]);
  r = await call('POST', '/api/password-reset', null, { token: resetToken, password: 'short' });
  ok('a too-short new password -> 422', r.status === 422, r);
  r = await call('POST', '/api/password-reset', null, { token: 'x'.repeat(43), password: 'a-new-password-1' });
  ok('a made-up reset token -> 400', r.status === 400, r);
  r = await call('POST', '/api/password-reset', null, { token: resetToken, password: 'a-new-password-1' });
  ok('the real link sets the new password -> 200', r.status === 200 && r.body.ok === true, r);
  r = await call('POST', '/api/login', null, { email: forgetful.email, password: 'password123' });
  ok('the old password no longer works -> 401', r.status === 401, r);
  r = await call('POST', '/api/login', null, { email: forgetful.email, password: 'a-new-password-1' });
  ok('the new one does', r.status === 200 && !!r.body.access_token, r);
  const newSession = r.body && r.body.access_token;
  r = await call('POST', '/api/password-reset', null, { token: resetToken, password: 'another-password-2' });
  ok('the reset link only works once -> 400', r.status === 400, r);
  r = await call('GET', '/api/me', oldSession);
  ok('a session from before the reset is signed out -> 401', r.status === 401, r);
  r = await call('GET', '/api/me', newSession);
  ok('a session started after it is fine, and the address counts as confirmed', r.status === 200 && r.body.email_verified === true, r.body);

  const spammed = await signUp('customer', 'mailspam');
  const statuses = [];
  for (let i = 0; i < 4; i++) statuses.push((await call('POST', '/api/password-forgot', null, { email: spammed.email })).status);
  ok('the same address can only ask 3 times an hour (the 4th -> 429)', statuses.slice(0, 3).every((s) => s === 200) && statuses[3] === 429, statuses);

  console.log('\n[order updates go to the customer]');
  const cust = await signUp('customer', 'mailorder');
  const cour = await signUp('courier', 'mailcour');
  const PA = '12 Mail Street, Bolton BL1 1AA, UK', DA = '4 Post Road, Leeds LS1 2HT, UK';
  const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.8, dropoff_lng: -1.55, distance_km: 60, price_gbp: 40 };
  const job = (await call('POST', '/api/jobs-create', cust.token, { pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date().toISOString(), quote_token: signQuote(cust.id, PA, DA, Q) })).body;
  const mails = async () => (await outbox(cust.email)).filter((m) => !/confirm/i.test(m.subject));
  let all = await mails();
  ok('placing an order emails a confirmation with the order number and the payment reference', all.length === 1 && all[0].subject.includes(`#VND-${job.id}`) && all[0].text.includes(`VND-${job.id}`) && /£40\.00/.test(all[0].text), all);
  ok('it names only the town and postcode district, never the street', /Bolton BL1/.test(all[0].text) && !/Mail Street|Post Road/.test(all[0].text + all[0].html), all[0].text);
  await call('POST', '/api/jobs-accept', cour.token, { jobId: job.id });
  all = await mails();
  ok('a courier accepting is emailed, with their first name', all.length === 2 && /accepted/i.test(all[1].subject) && /mailcour/.test(all[1].text) && !/Tester/.test(all[1].text), all[1]);
  await call('POST', '/api/jobs-start', cour.token, { jobId: job.id });
  await call('POST', '/api/jobs-start', cour.token, { jobId: job.id });
  all = await mails();
  ok('Start order emails once, even if pressed twice', all.length === 3 && /on the way/i.test(all[2].subject), all.map((m) => m.subject));
  await photo(cour.token, 'jobs-pickup', job.id);
  all = await mails();
  ok('collection is emailed', all.length === 4 && /collected/i.test(all[3].subject), all.map((m) => m.subject));
  await photo(cour.token, 'jobs-deliver', job.id);
  all = await mails();
  ok('delivery is emailed', all.length === 5 && /delivered/i.test(all[4].subject), all.map((m) => m.subject));
  ok('nothing was sent to the courier about the customer\'s order', (await outbox(cour.email)).every((m) => /confirm/i.test(m.subject)));

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
