// A cancelled job must not come back to life when a slow photo upload finishes afterwards.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret';
const REPO = require('path').resolve(__dirname, '..');
const { signQuote } = require(REPO + '/lib/quote-token.js');
const http = require('http');
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (x !== undefined ? ' -> ' + JSON.stringify(x).slice(0, 200) : '')); } };
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
async function call(method, path, token, body) {
  const r = await fetch('http://localhost:5500' + path, { method, headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return { status: r.status, body: await r.json().catch(() => null) };
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function adminUser() {
  const email = 'admin@example.com'; // the local dev server treats this address as an admin
  await call('POST', '/api/register', null, { email, password: 'password123', full_name: 'Admin', role: 'customer', accept_terms: true });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  return { token: l.body.access_token };
}
async function user(role, tag) {
  const email = `${tag}_${Date.now()}@example.com`;
  await call('POST', '/api/register', null, { email, password: 'password123', full_name: tag, role, accept_terms: true, accept_courier_terms: true, location_consent: true });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  const m = await call('GET', '/api/me', l.body.access_token);
  return { token: l.body.access_token, id: m.body.id };
}
// Sends a photo upload slowly: headers + start now, the rest after `delayMs`.
function slowUpload(path, token, delayMs) {
  return new Promise((resolve) => {
    const B = '----race' + Date.now();
    const head = Buffer.from(`--${B}\r\nContent-Disposition: form-data; name="photo"; filename="p.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`);
    const file = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0xff, 0xd9]);
    const tail = Buffer.from(`\r\n--${B}--\r\n`);
    const req = http.request({ host: 'localhost', port: 5500, path, method: 'POST', headers: { 'Content-Type': 'multipart/form-data; boundary=' + B, 'Content-Length': head.length + file.length + tail.length, Authorization: 'Bearer ' + token, 'X-Forwarded-For': IP } }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => resolve({ status: res.statusCode, body: (() => { try { return JSON.parse(data); } catch (e) { return null; } })() }));
    });
    req.write(head);
    req.write(file.subarray(0, 4));
    setTimeout(() => { req.write(file.subarray(4)); req.end(tail); }, delayMs);
  });
}

(async () => {
  const cust = await user('customer', 'racecust');
  const cour = await user('courier', 'racecour');
  const admin = await adminUser();
  // A fresh courier defaults to walker mode now; this file's jobs are ordinary long-haul ones.
  await call('POST', '/api/account-courier-mode', cour.token, { mode: 'driver' });
  const PA = '1 Race Street, Bolton BL1 1AA, UK', DA = '2 Race Road, Leeds LS1 2HT, UK';
  const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.8, dropoff_lng: -1.55, distance_km: 60, price_gbp: 40 };
  const mk = async () => (await call('POST', '/api/jobs-create', cust.token, { pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date().toISOString(), quote_token: signQuote(cust.id, PA, DA, Q) })).body;
  const status = async (id) => (await call('GET', '/api/jobs-mine', cust.token)).body.find((j) => j.id === id);

  console.log('[pickup upload racing a cancel]');
  let job = await mk();
  await call('POST', '/api/jobs-accept', cour.token, { jobId: job.id });
  const pending = slowUpload(`/api/jobs-pickup?jobId=${job.id}`, cour.token, 700);
  await wait(250);
  // The customer's own Cancel is locked once a courier has accepted, so support cancels it.
  const locked = await call('POST', '/api/jobs-cancel', cust.token, { jobId: job.id });
  ok('the customer cannot cancel an accepted order themselves (409, locked)', locked.status === 409 && locked.body.locked === true, locked);
  const c = await call('POST', '/api/admin-job', admin.token, { id: job.id, action: 'cancel', fee_gbp: 0 });
  ok('support cancels it while the courier is mid-upload (200)', c.status === 200, c);
  const res = await pending;
  ok('the finished upload is refused (409)', res.status === 409, res);
  const j = await status(job.id);
  ok('the job stays CANCELLED (not COLLECTED)', j.status === 'CANCELLED' && !j.pickup_photo_url && !j.collected_at, j);

  console.log('\n[delivery upload racing a cancel of a collected job]');
  job = await mk();
  await call('POST', '/api/jobs-accept', cour.token, { jobId: job.id });
  const f = new FormData(); f.append('photo', new (require('buffer').Blob)([Buffer.from([0xff, 0xd8, 0xff, 0xd9])], { type: 'image/jpeg' }), 'p.jpg');
  await fetch(`http://localhost:5500/api/jobs-pickup?jobId=${job.id}`, { method: 'POST', headers: { Authorization: 'Bearer ' + cour.token, 'X-Forwarded-For': IP }, body: f });
  const c2 = await call('POST', '/api/jobs-cancel', cust.token, { jobId: job.id });
  ok('a customer cannot cancel once collected (409)', c2.status === 409, c2);
  const d = await slowUpload(`/api/jobs-deliver?jobId=${job.id}`, cour.token, 200);
  ok('delivery still completes normally', d.status === 200 && d.body.status === 'DELIVERED', d);

  console.log('\n[courier hands the job back while the customer watches]');
  job = await mk();
  await call('POST', '/api/jobs-accept', cour.token, { jobId: job.id });
  const hb = await call('POST', '/api/jobs-cancel', cour.token, { jobId: job.id });
  const after = await status(job.id);
  ok('handing back returns it to OPEN with no courier', hb.status === 200 && hb.body.outcome === 'relisted' && after.status === 'OPEN' && after.courier_id === null, [hb.body, after]);
  const stale = await slowUpload(`/api/jobs-pickup?jobId=${job.id}`, cour.token, 100);
  ok('the ex-courier can no longer collect it (403/409)', stale.status === 403 || stale.status === 409, stale);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
