process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret';
const REPO = require('path').resolve(__dirname, '..');
const { signQuote } = require(REPO + '/lib/quote-token.js');
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (x !== undefined ? ' -> ' + JSON.stringify(x).slice(0, 200) : '')); } };
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
async function call(method, path, token, body) {
  const r = await fetch('http://localhost:5500' + path, { method, headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return { status: r.status, body: await r.json().catch(() => null) };
}
async function user(role, email) {
  await call('POST', '/api/register', null, { email, password: 'password123', full_name: email.split('_')[0], role, accept_terms: true, accept_courier_terms: true, location_consent: true });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  const m = await call('GET', '/api/me', l.body.access_token);
  return { token: l.body.access_token, id: m.body.id };
}
(async () => {
  const s = Date.now();
  const cust = await user('customer', `expcust_${s}@example.com`);
  const cour = await user('courier', `expcour_${s}@example.com`);
  const admin = await user('customer', 'admin@example.com');
  const PA = '1 Old Street, Bolton BL1 1AA, UK', DA = '2 Old Road, Leeds LS1 2HT, UK';
  const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.8, dropoff_lng: -1.55, distance_km: 60, price_gbp: 40 };
  const start = new Date(Date.now() - 59 * 60000);
  const mk = async (extra) => (await call('POST', '/api/jobs-create', cust.token, { pickup_address: PA, dropoff_address: DA, pickup_window_start: start.toISOString(), pickup_window_end: new Date(start.getTime() + 1000).toISOString(), quote_token: signQuote(cust.id, PA, DA, Q), ...extra })).body;
  const stale = await mk();
  const paid = await mk();
  const fresh = (await call('POST', '/api/jobs-create', cust.token, { pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date().toISOString(), quote_token: signQuote(cust.id, PA, DA, Q) })).body;
  await call('POST', '/api/admin-payments', admin.token, { jobId: paid.id, action: 'mark_paid' });
  const av = (await call('GET', '/api/jobs-available', cour.token)).body;
  ok('stale jobs are gone from the marketplace', !av.some((j) => j.id === stale.id || j.id === paid.id), av.map((j) => j.id));
  ok('a fresh job is still listed', av.some((j) => j.id === fresh.id));
  const mine = (await call('GET', '/api/jobs-mine', cust.token)).body;
  const a = mine.find((j) => j.id === stale.id), b = mine.find((j) => j.id === paid.id), c = mine.find((j) => j.id === fresh.id);
  ok('the unpaid stale job is CANCELLED and not charged', a.status === 'CANCELLED' && a.payment_status === 'VOID', a);
  ok('the paid stale job is CANCELLED and refunded automatically', b.status === 'CANCELLED' && b.payment_status === 'REFUNDED' && b.refund_status === 'AUTO_APPROVED', b);
  ok('the fresh job is untouched', c.status === 'OPEN' && c.payment_status === 'UNPAID', c);
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
