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

  // A walker job's own, shorter grace period (15 min, vs 30 for an ordinary job — see lib/expiry.js
  // and lib/walking.js). Real, close-together addresses, checked directly against the walking-route
  // service before use (the same pair tests/walkers.test.js relies on, ~626 m apart, well under the
  // 1-mile cap). Created BEFORE the marketplace is polled below: expireStaleJobs() only actually runs
  // once a minute per server process, so everything that needs to be caught by that one real pass has
  // to already exist before the first call that triggers it — a second call moments later would be a
  // silent no-op, not a second, fresh check.
  //
  // These jobs' pickup_window_start has to be both genuinely recent (jobs-create refuses anything
  // more than an hour in the past) AND within the 7am-9pm UK-local hours walker delivery runs in —
  // there's no way to satisfy both unless the real clock, right now, is itself safely inside that
  // window. So this part is skipped outside it, rather than failing for a reason that has nothing to
  // do with whether the code works.
  const ukHour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false }).format(new Date()));
  const safeHours = ukHour >= 8 && ukHour < 20;
  let staleWalker = null, freshWalker = null;
  if (safeHours) {
    const WPA = 'Fishergate, Preston PR1 3AA, UK', WDA = 'Lowthian Street, Preston PR1 3AA, UK';
    const WQ = { pickup_lat: 53.7573, pickup_lng: -2.7048, dropoff_lat: 53.7605, dropoff_lng: -2.7010, distance_km: 1, price_gbp: 5 };
    const mkWalker = async (minutesAgo) => {
      const t = new Date(Date.now() - minutesAgo * 60000);
      return (await call('POST', '/api/jobs-create', cust.token, {
        pickup_address: WPA, dropoff_address: WDA, pickup_window_start: t.toISOString(), pickup_window_end: new Date(t.getTime() + 1000).toISOString(),
        quote_token: signQuote(cust.id, WPA, WDA, WQ), delivery_mode: 'walker', walker_ack: true, package_size: 'small',
      })).body;
    };
    staleWalker = await mkWalker(20); // past the walker grace (15 min), inside the standard one (30 min)
    freshWalker = await mkWalker(5);  // inside even the walker grace
  } else {
    console.log(`  skip  walker grace-period checks (it's ${ukHour}:00 UK time; these need to run between 8am and 8pm)`);
  }
  const staleStandardAt20 = await mk({ pickup_window_start: new Date(Date.now() - 20 * 60000).toISOString(), pickup_window_end: new Date(Date.now() - 20 * 60000 + 1000).toISOString() });

  // One poll: the single real pass through expireStaleJobs() that catches everything created above,
  // walker and standard alike, in the same query.
  const av = (await call('GET', '/api/jobs-available', cour.token)).body;
  ok('stale jobs are gone from the marketplace', !av.some((j) => j.id === stale.id || j.id === paid.id), av.map((j) => j.id));
  ok('a fresh job is still listed', av.some((j) => j.id === fresh.id));
  ok('a standard job at 20 minutes old is NOT yet expired (30-minute grace)', av.some((j) => j.id === staleStandardAt20.id), av.map((j) => j.id));

  const mine = (await call('GET', '/api/jobs-mine', cust.token)).body;
  const a = mine.find((j) => j.id === stale.id), b = mine.find((j) => j.id === paid.id), c = mine.find((j) => j.id === fresh.id);
  ok('the unpaid stale job is CANCELLED and not charged', a.status === 'CANCELLED' && a.payment_status === 'VOID', a);
  ok('the paid stale job is CANCELLED and refunded automatically', b.status === 'CANCELLED' && b.payment_status === 'REFUNDED' && b.refund_status === 'AUTO_APPROVED', b);
  ok('the fresh job is untouched', c.status === 'OPEN' && c.payment_status === 'UNPAID', c);

  if (safeHours) {
    const sw = mine.find((j) => j.id === staleWalker.id), fw = mine.find((j) => j.id === freshWalker.id);
    ok('a walker job past its own 15-minute grace IS expired, even though a standard job at the same 20-minute age is not', sw && sw.status === 'CANCELLED', sw);
    ok('a walker job still inside its 15-minute grace is untouched', fw && fw.status === 'OPEN', fw);
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
