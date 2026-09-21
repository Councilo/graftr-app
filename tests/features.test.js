// End-to-end checks for everything added for policies / refunds / payments /
// help / GPS tracking / admin, plus the hardening from the review agents.
// Runs against the dev server (localhost:5500), using signed quote tokens so no
// map service is ever called. Admin = admin@example.com (dev-server default).
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret';
const REPO = require('path').resolve(__dirname, '..');
const { signQuote } = require(REPO + '/lib/quote-token.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 300) : '')); }
};
const BASE = 'http://localhost:5500';
const rnd = () => Math.floor(Math.random() * 250);
let IP = `10.${rnd()}.${rnd()}.${1 + rnd()}`;

async function call(method, path, token, body, ip) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ip || IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json().catch(() => null), headers: r.headers };
}
const stamp = Date.now();
async function makeUser(role, tag, extra = {}) {
  const email = `${tag}_${stamp}@example.com`;
  const reg = await call('POST', '/api/register', null, {
    email, password: 'password123', full_name: `${tag} Tester`, role,
    accept_terms: true, ...(role === 'courier' ? { accept_courier_terms: true, location_consent: true } : {}), ...extra,
  });
  const login = await call('POST', '/api/login', null, { email, password: 'password123' });
  const token = login.body && login.body.access_token;
  const me = token ? await call('GET', '/api/me', token) : { body: {} };
  return { email, token, id: me.body && me.body.id, reg, me };
}

const PA = 'Flat 7, 12 High Street, Bolton BL1 1AA, UK';
const DA = '4 Kings Road, Leeds LS1 2HT, UK';
const Q = { pickup_lat: 53.5812, pickup_lng: -2.4321, dropoff_lat: 53.7998, dropoff_lng: -1.5491, distance_km: 60, price_gbp: 40.5 };
const line = (n) => Array.from({ length: n }, (_, i) => [Q.pickup_lat + (Q.dropoff_lat - Q.pickup_lat) * (i / (n - 1)), Q.pickup_lng + (Q.dropoff_lng - Q.pickup_lng) * (i / (n - 1))]);
async function post(customer, extra = {}) {
  return call('POST', '/api/jobs-create', customer.token, {
    pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date(Date.now() + 3600e3).toISOString(),
    quote_token: signQuote(customer.id, PA, DA, Q), ...extra,
  });
}
const jpeg = () => new (require('buffer').Blob)([Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0xff, 0xd9])], { type: 'image/jpeg' });
async function photo(token, endpoint, jobId, blob) {
  const f = new FormData(); f.append('photo', blob || jpeg(), 'p.jpg');
  const r = await fetch(`${BASE}/api/${endpoint}?jobId=${jobId}`, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'X-Forwarded-For': IP }, body: f });
  return { status: r.status, body: await r.json().catch(() => null) };
}
const mine = async (u) => (await call('GET', '/api/jobs-mine', u.token)).body || [];
const jobOf = async (u, id) => (await mine(u)).find((j) => j.id === id);

(async () => {
  console.log('[registration: consent is required and recorded]');
  let r = await call('POST', '/api/register', null, { email: `x1_${stamp}@example.com`, password: 'password123', full_name: 'No Terms', role: 'customer' });
  ok('customer without accept_terms -> 422', r.status === 422, r);
  r = await call('POST', '/api/register', null, { email: `x2_${stamp}@example.com`, password: 'password123', full_name: 'Half', role: 'courier', accept_terms: true });
  ok('courier without courier terms / location consent -> 422', r.status === 422, r);
  r = await call('POST', '/api/register', null, { email: `x3_${stamp}@example.com`, password: 'password123', full_name: 'Half', role: 'courier', accept_terms: true, accept_courier_terms: true });
  ok('courier without location consent -> 422', r.status === 422, r);

  const alice = await makeUser('customer', 'alice');
  const bob = await makeUser('customer', 'bob');
  const carl = await makeUser('courier', 'carl');
  const dana = await makeUser('courier', 'dana');
  const admin = { ...(await (async () => {
    const email = 'admin@example.com';
    await call('POST', '/api/register', null, { email, password: 'password123', full_name: 'Admin', role: 'customer', accept_terms: true });
    const l = await call('POST', '/api/login', null, { email, password: 'password123' });
    const m = await call('GET', '/api/me', l.body.access_token);
    return { token: l.body.access_token, id: m.body.id, me: m };
  })()) };
  ok('four accounts registered and signed in', [alice, bob, carl, dana].every((u) => u.token && u.id));
  ok('/api/me carries payment instructions and the current terms version', !!alice.me.body.payment_instructions && !!alice.me.body.terms_version_current, alice.me.body);
  ok('the admin is flagged is_admin, others are not', admin.me.body.is_admin === true && alice.me.body.is_admin === false, admin.me.body);

  r = await call('POST', '/api/register', null, { email: `ALICE_${stamp}@Example.com`, password: 'password123', full_name: 'Dup', role: 'customer', accept_terms: true });
  ok('the same email in different case is a duplicate -> 409', r.status === 409, r);

  console.log('\n[login: no way to tell a wrong email from a wrong password; lockout]');
  const wrongPw = await call('POST', '/api/login', null, { email: alice.email, password: 'nope-nope' });
  const wrongEm = await call('POST', '/api/login', null, { email: `ghost_${stamp}@example.com`, password: 'nope-nope' });
  ok('wrong password and unknown email answer identically', wrongPw.status === 401 && wrongEm.status === 401 && wrongPw.body.detail === wrongEm.body.detail, [wrongPw.body, wrongEm.body]);
  let locked = null;
  for (let i = 0; i < 9; i += 1) { const x = await call('POST', '/api/login', null, { email: `lock_${stamp}@example.com`, password: 'bad-bad-bad' }, `10.9.${rnd()}.${1 + rnd()}`); if (x.status === 429) { locked = i; break; } }
  ok('one account is locked out after repeated failures (429)', locked !== null && locked <= 8, locked);
  r = await call('POST', '/api/login', null, { email: alice.email.toUpperCase(), password: 'password123' });
  ok('sign-in is case-insensitive on the email', r.status === 200, r);

  console.log('\n[jobs: creation, payment record, dedupe, cap]');
  r = await post(alice, { route_geometry: line(2000) });
  ok('job created 201 with UNPAID payment', r.status === 201 && r.body.payment_status === 'UNPAID' && r.body.refunded_gbp === 0, r);
  const j1 = r.body;
  ok('customer gets a tracking token on their own job', typeof j1.tracking_token === 'string' && j1.tracking_token.length >= 20, j1.tracking_token);
  ok('a 2000-point route is thinned to at most 1500 points, ends kept', j1.route_geometry.length <= 1500 && Math.abs(j1.route_geometry[0][0] - Q.pickup_lat) < 1e-9 && Math.abs(j1.route_geometry.at(-1)[0] - Q.dropoff_lat) < 1e-9, j1.route_geometry.length);
  const tok = signQuote(alice.id, PA, DA, Q);
  const d1 = await call('POST', '/api/jobs-create', alice.token, { pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date(Date.now() + 3600e3).toISOString(), quote_token: tok });
  const d2 = await call('POST', '/api/jobs-create', alice.token, { pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date(Date.now() + 3600e3).toISOString(), quote_token: tok });
  ok('the same quote posted twice creates one job (second -> 409)', d1.status === 201 && d2.status === 409, [d1.status, d2.status]);

  console.log('\n[marketplace: couriers see the postcode, not the house]');
  const av = (await call('GET', '/api/jobs-available', carl.token)).body || [];
  const seen = av.find((j) => j.id === j1.id);
  ok('the open job is listed', !!seen);
  ok('addresses are area-only (no house number / street)', seen && !/High Street|Flat 7|12/.test(seen.pickup_address + seen.dropoff_address), seen && [seen.pickup_address, seen.dropoff_address]);
  ok('each end is the town and the whole postcode', seen && seen.pickup_address === 'Bolton BL1 1AA' && seen.dropoff_address === 'Leeds LS1 2HT', seen && [seen.pickup_address, seen.dropoff_address]);
  ok('pins are rounded to about 100 m: a street, not the door', seen && seen.pickup_lat === 53.581 && seen.pickup_lng === -2.432 && seen.dropoff_lat === 53.8 && seen.dropoff_lng === -1.549, seen && [seen.pickup_lat, seen.pickup_lng, seen.dropoff_lat, seen.dropoff_lng]);
  ok('the exact coordinates are not sent anywhere', seen && !JSON.stringify(seen).includes('53.5812') && !JSON.stringify(seen).includes('-2.4321'), seen);
  ok('it never says the area is hidden', seen && !/hidden|until accepted/i.test(JSON.stringify(seen)), seen);
  ok('no customer id, no tracking token, flagged masked', seen && seen.customer_id === undefined && seen.tracking_token === undefined && seen.masked === true, seen);
  ok('no stored route (it ends at the doors); the app draws the road route between the pins', seen && seen.route_geometry === null, seen && seen.route_geometry);
  ok('a customer cannot use the marketplace (403)', (await call('GET', '/api/jobs-available', alice.token)).status === 403);

  console.log('\n[cancel: refunds by the terms]');
  const a = (await post(alice)).body;
  r = await call('POST', '/api/jobs-cancel', alice.token, { jobId: a.id });
  let ja = await jobOf(alice, a.id);
  ok('cancel before accept (unpaid) -> CANCELLED, payment VOID', r.status === 200 && ja.status === 'CANCELLED' && ja.payment_status === 'VOID', [r.status, ja && ja.payment_status]);
  const b = (await post(alice)).body;
  r = await call('POST', '/api/admin-payments', alice.token, { jobId: b.id, action: 'mark_paid' });
  ok('a customer cannot record payments (403)', r.status === 403, r);
  r = await call('POST', '/api/admin-payments', null, { jobId: b.id, action: 'mark_paid' });
  ok('nor can an anonymous caller (401)', r.status === 401, r);
  r = await call('POST', '/api/admin-payments', admin.token, { jobId: b.id, action: 'mark_paid', reference: 'BACS-1' });
  ok('admin marks it paid', r.status === 200 && r.body.status === 'PAID', r);
  r = await call('POST', '/api/admin-payments', admin.token, { jobId: b.id, action: 'mark_paid' });
  ok('marking paid twice -> 409', r.status === 409, r);
  r = await call('POST', '/api/jobs-cancel', alice.token, { jobId: b.id });
  let jb = await jobOf(alice, b.id);
  ok('cancel before accept (paid) -> automatic full refund', r.status === 200 && jb.payment_status === 'REFUNDED' && Math.abs(jb.refunded_gbp - Q.price_gbp) < 0.005 && jb.refund_status === 'AUTO_APPROVED', jb);
  await call('POST', '/api/jobs-cancel', alice.token, { jobId: b.id });
  jb = await jobOf(alice, b.id);
  ok('cancelling again never refunds twice', Math.abs(jb.refunded_gbp - Q.price_gbp) < 0.005, jb.refunded_gbp);

  console.log('\n[after a courier accepts, the customer cannot cancel: it is locked, support cancels with a fee]');
  const c = (await post(alice)).body;
  await call('POST', '/api/admin-payments', admin.token, { jobId: c.id, action: 'mark_paid' });
  r = await call('POST', '/api/jobs-accept', carl.token, { jobId: c.id });
  ok('courier accepts', r.status === 200 && r.body.status === 'ACCEPTED', r);
  ok('accepted job now shows the full address to its courier', r.body.pickup_address === PA, r.body.pickup_address);
  ok('accepted job never shows the courier the tracking token', r.body.tracking_token === undefined);
  r = await call('POST', '/api/jobs-cancel', alice.token, { jobId: c.id });
  let jc = await jobOf(alice, c.id);
  ok('the customer cancelling an ACCEPTED order is refused (409, locked) and explains the fee', r.status === 409 && r.body.locked === true && /fee/i.test(r.body.detail), r);
  ok('the order is untouched: still ACCEPTED, still PAID', jc.status === 'ACCEPTED' && jc.payment_status === 'PAID', jc);
  r = await call('POST', '/api/admin-job', alice.token, { id: c.id, action: 'cancel', fee_gbp: 0 });
  ok('a customer cannot use the admin cancel (403)', r.status === 403, r);
  r = await call('POST', '/api/admin-job', null, { id: c.id, action: 'cancel' });
  ok('nor can an anonymous caller (401)', r.status === 401, r);
  r = await call('POST', '/api/admin-job', admin.token, { id: c.id, action: 'cancel', fee_gbp: -5 });
  ok('a negative fee -> 422', r.status === 422, r);
  r = await call('POST', '/api/admin-job', admin.token, { id: c.id, action: 'cancel', fee_gbp: 999 });
  ok('a fee bigger than the order -> 422', r.status === 422, r);
  r = await call('POST', '/api/admin-job', admin.token, { id: c.id, action: 'cancel', fee_gbp: 10, note: 'Courier was already on the way' });
  jc = await jobOf(alice, c.id);
  ok('admin cancels with a £10 fee: £30.50 goes back, order CANCELLED', r.status === 200 && r.body.status === 'CANCELLED' && Math.abs(r.body.returned_gbp - 30.5) < 0.005 && Math.abs(r.body.fee_gbp - 10) < 0.005, r);
  ok('the payment shows PARTIALLY_REFUNDED £30.50 and the request is recorded as approved', jc.status === 'CANCELLED' && jc.payment_status === 'PARTIALLY_REFUNDED' && Math.abs(jc.refunded_gbp - 30.5) < 0.005 && jc.refund_status === 'APPROVED', jc);
  r = await call('POST', '/api/admin-job', admin.token, { id: c.id, action: 'cancel', fee_gbp: 10 });
  ok('cancelling it a second time -> 409 (no double refund)', r.status === 409, r);
  r = await call('POST', '/api/jobs-pickup?jobId=' + c.id, carl.token);
  ok('the courier can no longer collect it (409)', r.status === 409, r);
  const c2 = (await post(alice)).body; // never paid
  await call('POST', '/api/jobs-accept', carl.token, { jobId: c2.id });
  r = await call('POST', '/api/admin-job', admin.token, { id: c2.id, action: 'cancel', fee_gbp: 5 });
  const unpaidRows = (await call('GET', '/api/admin-payments?status=UNPAID', admin.token)).body;
  const owed = unpaidRows.find((p) => p.job_id === c2.id);
  ok('an unpaid order cancelled with a £5 fee: the customer now owes only the fee', r.status === 200 && owed && Math.abs(Number(owed.amount_gbp) - 5) < 0.005, [r.body, owed && owed.amount_gbp]);
  const c3 = (await post(alice)).body;
  r = await call('POST', '/api/admin-job', admin.token, { id: c3.id, action: 'cancel', fee_gbp: 0 });
  ok('an order nobody has accepted cannot be cancelled this way (409)', r.status === 409, r);
  ok('a customer cannot read the admin queue (403)', (await call('GET', '/api/admin-refunds', alice.token)).status === 403);

  console.log('\n[refund requests after delivery; two admins racing]');
  const d = (await post(bob)).body;
  await call('POST', '/api/admin-payments', admin.token, { jobId: d.id, action: 'mark_paid' });
  await call('POST', '/api/jobs-accept', carl.token, { jobId: d.id });
  r = await photo(carl.token, 'jobs-pickup', d.id, new (require('buffer').Blob)([Buffer.from('<html>not an image at all</html>')], { type: 'image/jpeg' }));
  ok('an HTML file labelled image/jpeg is refused (415)', r.status === 415, r);
  r = await call('POST', '/api/jobs-location', carl.token, { jobId: d.id, lat: null, lng: null });
  ok('location null/null -> 422', r.status === 422, r);
  r = await call('POST', '/api/jobs-location', carl.token, { jobId: d.id, lat: 0, lng: 0 });
  ok('location 0,0 -> 422', r.status === 422, r);
  r = await call('POST', '/api/jobs-location', carl.token, { jobId: d.id, lat: '53.5', lng: '-2.4' });
  ok('location as strings -> 422', r.status === 422, r);
  r = await call('POST', '/api/jobs-location', carl.token, { jobId: d.id, lat: 53.59, lng: -2.44 });
  ok('a real location before Start order -> 409 (nothing is shared until they set off)', r.status === 409 && r.body.not_started === true, r);
  await call('POST', '/api/jobs-start', carl.token, { jobId: d.id });
  r = await call('POST', '/api/jobs-location', carl.token, { jobId: d.id, lat: 53.59, lng: -2.44 });
  ok('a real location -> 200', r.status === 200, r);
  r = await call('POST', '/api/jobs-location', dana.token, { jobId: d.id, lat: 53.59, lng: -2.44 });
  ok("another courier can't post location for it (403)", r.status === 403, r);
  r = await photo(carl.token, 'jobs-pickup', d.id);
  ok('a real photo collects it', r.status === 200 && r.body.status === 'COLLECTED', r);
  r = await photo(carl.token, 'jobs-deliver', d.id);
  ok('a real photo delivers it', r.status === 200 && r.body.status === 'DELIVERED', r);
  r = await call('POST', '/api/refund-request', bob.token, { jobId: d.id, reason: 'made-up' });
  ok('unknown refund reason -> 422', r.status === 422, r);
  r = await call('POST', '/api/refund-request', bob.token, { jobId: d.id, reason: 'other', details: 'x' });
  ok("'other' needs an explanation -> 422", r.status === 422, r);
  r = await call('POST', '/api/refund-request', alice.token, { jobId: d.id, reason: 'damaged' });
  ok("someone else's order -> 404", r.status === 404, r);
  r = await call('POST', '/api/refund-request', bob.token, { jobId: d.id, reason: 'damaged', amount: 999 });
  ok('more than was paid -> 422', r.status === 422, r);
  r = await call('POST', '/api/refund-request', bob.token, { jobId: d.id, reason: 'damaged', details: 'Box crushed on arrival', amount: 20 });
  ok('a valid request -> 201 PENDING', r.status === 201 && r.body.status === 'PENDING', r);
  const rq = r.body;
  r = await call('POST', '/api/refund-request', bob.token, { jobId: d.id, reason: 'damaged' });
  ok('a second open request -> 409', r.status === 409, r);
  const open = (await post(bob)).body;
  r = await call('POST', '/api/refund-request', bob.token, { jobId: open.id, reason: 'damaged' });
  ok('a request on an OPEN order points to cancelling instead (409)', r.status === 409, r);
  const both = await Promise.all([
    call('POST', '/api/admin-refunds', admin.token, { id: rq.id, decision: 'approve' }),
    call('POST', '/api/admin-refunds', admin.token, { id: rq.id, decision: 'approve' }),
    call('POST', '/api/admin-refunds', admin.token, { id: rq.id, decision: 'approve' }),
  ]);
  const codes = both.map((x) => x.status).sort();
  const jd = await jobOf(bob, d.id);
  ok('three simultaneous approvals: exactly one wins, money moves once', codes.filter((s) => s === 200).length === 1 && codes.filter((s) => s === 409).length === 2 && Math.abs(jd.refunded_gbp - 20) < 0.005, [codes, jd.refunded_gbp]);
  const mineRefunds = await call('GET', '/api/refund-mine', bob.token);
  ok('the customer sees their refund history', mineRefunds.status === 200 && JSON.stringify(mineRefunds.body).includes('APPROVED'), mineRefunds.body);
  r = await call('POST', '/api/refund-request', bob.token, { jobId: d.id, reason: 'not_delivered', details: 'Never arrived at all really' });
  const rq2 = r.body;
  r = await call('POST', '/api/admin-refunds', admin.token, { id: rq2.id, decision: 'deny' });
  ok('denying without a reason -> 422', r.status === 422, r);
  r = await call('POST', '/api/admin-refunds', admin.token, { id: rq2.id, decision: 'deny', note: 'Photo shows it was delivered' });
  ok('denying with a reason -> DENIED', r.status === 200 && r.body.status === 'DENIED', r);
  r = await call('POST', '/api/refund-request', bob.token, { jobId: d.id, reason: 'wrong_price', details: 'Charged more than the quote shown', amount: 15 });
  const rq3 = r.body;
  r = await call('POST', '/api/admin-refunds', alice.token, { id: rq3.id, decision: 'approve' });
  ok('a customer cannot decide refunds (403)', r.status === 403, r);
  r = await call('POST', '/api/admin-refunds', admin.token, { id: rq3.id, decision: 'approve', amount: 5 });
  const jd2 = await jobOf(bob, d.id);
  ok('admin approves £5 of £15 asked -> PARTIALLY_APPROVED, payment shows £25 refunded in total', r.status === 200 && r.body.status === 'PARTIALLY_APPROVED' && jd2.payment_status === 'PARTIALLY_REFUNDED' && Math.abs(jd2.refunded_gbp - 25) < 0.005, [r.body, jd2.payment_status, jd2.refunded_gbp]);
  r = await call('POST', '/api/admin-refunds', admin.token, { id: rq3.id, decision: 'approve' });
  ok('deciding it again -> 409', r.status === 409, r);
  r = await call('POST', '/api/jobs-delete', bob.token, { jobId: d.id });
  ok('a job with payment / refund history cannot be deleted (409)', r.status === 409, r);

  console.log('\n[public tracking link]');
  const tk = j1.tracking_token;
  r = await call('GET', '/api/track?token=' + encodeURIComponent(tk));
  ok('an OPEN job: 200 with no courier and only area-level places', r.status === 200 && r.body.courier === null && !JSON.stringify(r.body).includes('High Street') && !JSON.stringify(r.body).includes('Flat 7'), r.body);
  ok('no prices, no ids, no pickup, no photos are exposed', !/price|pickup|customer|photo|"id"/i.test(JSON.stringify(r.body)), r.body);
  ok('tracking responses are not cacheable / indexable', /no-store/.test(r.headers.get('cache-control') || '') && /noindex/.test(r.headers.get('x-robots-tag') || ''), [r.headers.get('cache-control'), r.headers.get('x-robots-tag')]);
  r = await call('GET', '/api/track?token=' + 'A'.repeat(24));
  ok('a made-up token -> 404', r.status === 404, r);
  r = await call('GET', '/api/track?token=short');
  ok('a malformed token -> 404', r.status === 404, r);
  const e = (await post(alice)).body;
  await call('POST', '/api/jobs-accept', dana.token, { jobId: e.id });
  await call('POST', '/api/jobs-start', dana.token, { jobId: e.id });
  await call('POST', '/api/jobs-location', dana.token, { jobId: e.id, lat: 53.6, lng: -2.3 });
  r = await call('GET', '/api/track?token=' + encodeURIComponent(e.tracking_token));
  ok('ACCEPTED: the courier is not shown yet', r.status === 200 && r.body.status === 'ACCEPTED' && r.body.courier === null, r.body);
  await photo(dana.token, 'jobs-pickup', e.id);
  await call('POST', '/api/jobs-location', dana.token, { jobId: e.id, lat: 53.61234567, lng: -2.31234567 });
  r = await call('GET', '/api/track?token=' + encodeURIComponent(e.tracking_token));
  ok('COLLECTED: first name + rounded live position + distance', r.status === 200 && r.body.courier && r.body.courier.first_name === 'dana' && r.body.courier.lat === 53.6123 && typeof r.body.courier.distance_remaining_km === 'number', r.body);
  ok("no surname or email in the tracking view", !/Tester|@/.test(JSON.stringify(r.body)), r.body);
  const cm = (await call('GET', '/api/jobs-courier-mine', dana.token)).body;
  ok("couriers never receive the customer's tracking token", cm.every((x) => x.tracking_token === undefined), cm.map((x) => x.tracking_token));
  r = await photo(dana.token, 'jobs-deliver', e.id);
  r = await call('GET', '/api/track?token=' + encodeURIComponent(e.tracking_token));
  ok('DELIVERED: courier position is gone', r.status === 200 && r.body.status === 'DELIVERED' && (!r.body.courier || r.body.courier.lat == null), r.body);

  console.log('\n[chat limits]');
  const f = (await post(alice)).body;
  await call('POST', '/api/jobs-accept', carl.token, { jobId: f.id });
  r = await call('POST', '/api/messages-send', alice.token, { jobId: f.id, content: 'x'.repeat(2001) });
  ok('over 2000 characters -> 422', r.status === 422, r);
  r = await call('POST', '/api/messages-send', alice.token, { jobId: f.id, content: { a: 1 } });
  ok('a non-string message -> 422', r.status === 422, r);
  r = await call('POST', '/api/messages-send', alice.token, { jobId: f.id, content: 'Hi, gate code is 1234' });
  ok('a normal message -> 201', r.status === 201, r);
  r = await call('POST', '/api/messages-send', bob.token, { jobId: f.id, content: 'let me in' });
  ok("a stranger can't post in someone's chat (403)", r.status === 403, r);
  await call('POST', '/api/admin-job', admin.token, { id: f.id, action: 'cancel', fee_gbp: 0 }); // support cancels it (the customer's own button is locked)
  r = await call('POST', '/api/messages-send', alice.token, { jobId: f.id, content: 'hello?' });
  ok('a cancelled order closes its chat (409)', r.status === 409, r);

  console.log('\n[support / help]');
  r = await call('POST', '/api/support-create', null, { category: 'other', subject: 'Hello', message: 'I have a question about pricing please', name: 'Visitor', email: `visitor_${stamp}@example.com` });
  ok('an anonymous visitor can open a ticket (201)', r.status === 201, r);
  r = await call('POST', '/api/support-create', null, { category: 'other', subject: 'Spam', message: 'buy pills now please thanks', name: 'Bot', email: 'bot@example.com', website: 'http://spam' });
  ok('the honeypot field silently drops bots', r.status < 300 && !(r.body && r.body.id), r);
  r = await call('POST', '/api/support-create', null, { category: 'nonsense', subject: 'x', message: 'y', name: 'V', email: 'v@example.com' });
  ok('a bad category / short text -> 422', r.status === 422, r);
  r = await call('POST', '/api/support-create', alice.token, { category: 'order', subject: 'Where is my parcel', message: 'It has been three days now', job_id: e.id });
  ok("a signed-in customer can attach their own order", r.status === 201, r);
  const t1 = r.body;
  r = await call('POST', '/api/support-create', alice.token, { category: 'order', subject: 'Not mine', message: 'This is somebody elses job id', job_id: d.id });
  ok("attaching someone else's order is refused", r.status >= 400 && r.status < 500, r);
  r = await call('GET', '/api/support-mine', alice.token);
  ok('the customer sees their own tickets', r.status === 200 && JSON.stringify(r.body).includes('Where is my parcel'), r.body);
  r = await call('GET', '/api/support-mine', bob.token);
  ok("another user does not see them", !JSON.stringify(r.body).includes('Where is my parcel'), r.body);
  r = await call('GET', '/api/admin-tickets', alice.token);
  ok('a customer cannot open the admin inbox (403)', r.status === 403, r);
  r = await call('GET', '/api/admin-tickets', admin.token);
  ok('admin sees the inbox', r.status === 200 && JSON.stringify(r.body).includes('Where is my parcel'), r.body);
  r = await call('POST', '/api/admin-tickets', admin.token, { id: t1.id, action: 'reply', content: 'Looking into it now.' });
  ok('admin replies', r.status === 200 || r.status === 201, r);
  r = await call('GET', '/api/support-mine', alice.token);
  ok('the customer sees the reply', JSON.stringify(r.body).includes('Looking into it now'), r.body);
  r = await call('POST', '/api/support-reply', alice.token, { ticketId: t1.id, content: 'Thank you!' });
  ok('the customer can reply to their ticket', r.status === 200 || r.status === 201, r);
  r = await call('POST', '/api/support-reply', bob.token, { ticketId: t1.id, content: 'sneaky' });
  ok("another user can't reply to it", r.status >= 400 && r.status < 500, r);
  r = await call('POST', '/api/admin-tickets', admin.token, { id: t1.id, action: 'status', status: 'RESOLVED' });
  ok('admin resolves it', r.status === 200, r);

  console.log('\n[admin: overview, users, suspension, audit]');
  r = await call('GET', '/api/admin-overview', admin.token);
  ok('overview for admin (200)', r.status === 200 && r.body && typeof r.body === 'object', r);
  ok('overview: customer 403, anonymous 401', (await call('GET', '/api/admin-overview', carl.token)).status === 403 && (await call('GET', '/api/admin-overview')).status === 401);
  r = await call('GET', '/api/admin-users?q=carl', admin.token);
  ok('user search finds a courier and never leaks password hashes', r.status === 200 && JSON.stringify(r.body).includes('carl_') && !JSON.stringify(r.body).includes('password_hash'), r.body);
  r = await call('POST', '/api/admin-users', admin.token, { userId: carl.id, action: 'suspend', reason: 'Testing suspension' });
  ok('admin suspends a courier', r.status === 200, r);
  const g = (await post(alice)).body;
  r = await call('POST', '/api/jobs-accept', carl.token, { jobId: g.id });
  ok('a suspended courier cannot accept jobs (403)', r.status === 403 && r.body.suspended === true, r);
  r = await call('GET', '/api/me', carl.token);
  ok('a suspended user can still read their own profile (to see why)', r.status === 200 && r.body.is_suspended === true, r.body);
  r = await call('POST', '/api/admin-users', admin.token, { userId: admin.id, action: 'suspend', reason: 'self' });
  ok('admins cannot be suspended', r.status >= 400, r);
  r = await call('POST', '/api/admin-users', admin.token, { userId: carl.id, action: 'unsuspend' });
  r = await call('POST', '/api/jobs-accept', carl.token, { jobId: g.id });
  ok('after unsuspending, accepting works again', r.status === 200, r);
  r = await call('GET', '/api/admin-job?id=' + c.id, admin.token);
  ok('admin can inspect a job with payment + refunds', r.status === 200 && JSON.stringify(r.body).includes('PARTIALLY') , r.body && Object.keys(r.body));
  r = await call('GET', '/api/admin-audit', admin.token);
  ok('the audit trail records the admin actions', r.status === 200 && Array.isArray(r.body) && r.body.some((x) => /refund\.approve/.test(x.action)) && r.body.some((x) => /suspend/.test(x.action)), r.body && r.body.slice(0, 3));

  console.log('\n[account: password, export, consent, delete]');
  r = await call('POST', '/api/account-password', alice.token, { current_password: 'wrong-wrong', new_password: 'newpassword1' });
  ok('wrong current password -> 403', r.status === 403, r);
  r = await call('POST', '/api/account-password', alice.token, { current_password: 'password123', new_password: 'short' });
  ok('a too-short new password -> 422', r.status === 422, r);
  r = await call('POST', '/api/account-password', alice.token, { current_password: 'password123', new_password: 'newpassword1' });
  ok('password changed', r.status === 200, r);
  r = await call('POST', '/api/login', null, { email: alice.email, password: 'newpassword1' });
  ok('the new password signs in', r.status === 200, r);

  console.log('\n[profile: name, phone, email]');
  const pat = await makeUser('customer', 'pat');
  const pam = await makeUser('customer', 'pam');
  r = await call('POST', '/api/account-profile', null, { full_name: 'X' });
  ok('signed out -> 401', r.status === 401, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Q. Tester', phone: '+44 7700 900123', email: pat.email });
  ok('name and phone saved', r.status === 200 && r.body.full_name === 'Pat Q. Tester' && r.body.phone === '+44 7700 900123', r);
  r = await call('GET', '/api/me', pat.token);
  ok('/api/me shows the saved name and phone', r.body.full_name === 'Pat Q. Tester' && r.body.phone === '+44 7700 900123', r.body);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: '   ', phone: '' });
  ok('an empty name -> 422', r.status === 422, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'N'.repeat(101) });
  ok('a name over 100 characters -> 422', r.status === 422, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat', phone: 'call me maybe' });
  ok('a phone number with letters -> 422', r.status === 422, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat', phone: '12345' });
  ok('a too-short phone number -> 422', r.status === 422, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester', phone: '' });
  ok('an empty phone clears it', r.status === 200 && r.body.phone === null && (await call('GET', '/api/me', pat.token)).body.phone === null, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester', phone: '07700 900123' });
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester' });
  ok('leaving the phone out keeps it', r.status === 200 && r.body.phone === '07700 900123', r);
  const newEmail = `pat_new_${stamp}@example.com`;
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester', email: newEmail });
  ok('changing the email without the password -> 422', r.status === 422, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester', email: newEmail, current_password: 'wrong-wrong' });
  ok('changing the email with the wrong password -> 403', r.status === 403, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester', email: pam.email, current_password: 'password123' });
  ok("an email that already belongs to someone else -> 409", r.status === 409, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester', email: 'not-an-email', current_password: 'password123' });
  ok('an invalid email -> 422', r.status === 422, r);
  r = await call('POST', '/api/account-profile', pat.token, { full_name: 'Pat Tester', email: newEmail.toUpperCase(), current_password: 'password123' });
  ok('the email changes with the right password (stored lower-case)', r.status === 200 && r.body.email === newEmail, r);
  r = await call('POST', '/api/login', null, { email: newEmail, password: 'password123' });
  ok('signing in with the new email works', r.status === 200, r);
  r = await call('POST', '/api/login', null, { email: pat.email, password: 'password123' });
  ok('the old email no longer signs in', r.status === 401, r);
  r = await call('GET', '/api/admin-users?q=pat%20tester', admin.token);
  ok('admin (only) sees the phone number in Users', r.status === 200 && r.body.some((u) => u.phone === '07700 900123'), r.body);
  r = await call('GET', '/api/account-export', pat.token);
  ok('the data download includes the phone number', r.body.account.phone === '07700 900123', r.body.account);
  r = await call('GET', '/api/account-export', bob.token);
  ok("export returns the user's own data and no password hash", r.status === 200 && JSON.stringify(r.body).includes(bob.email) && !/password_hash|\$2[aby]\$/.test(JSON.stringify(r.body)), r.status);
  ok("export contains no other user's email", !JSON.stringify(r.body).includes(alice.email), 'leak');
  r = await call('POST', '/api/account-delete', bob.token, { password: 'password123' });
  ok('deletion is blocked while an order is active or unresolved, or succeeds cleanly', [200, 409].includes(r.status), r);
  const eve = await makeUser('customer', 'eve');
  r = await call('POST', '/api/account-delete', eve.token, { password: 'wrong' });
  ok('deleting with the wrong password is refused', r.status === 403 || r.status === 422, r);
  r = await call('POST', '/api/account-delete', eve.token, { password: 'password123' });
  ok('an idle account can be deleted', r.status === 200, r);
  r = await call('POST', '/api/login', null, { email: eve.email, password: 'password123' });
  ok('a deleted account can no longer sign in (401)', r.status === 401, r);
  r = await call('GET', '/api/me', eve.token);
  ok('and its old token stops working (401)', r.status === 401, r);

  console.log('\n[limits]');
  const cap = await makeUser('customer', 'cap');
  let last = null, made = 0;
  for (let i = 0; i < 12; i += 1) { last = await post(cap); if (last.status === 201) made += 1; else break; }
  ok('a customer can have at most 10 open jobs (11th -> 429)', made === 10 && last.status === 429, [made, last.status]);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
