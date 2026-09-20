// The review-order choices: who is at each end, handover, instructions, package size, and
// PIN confirmation on delivery.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret';
const REPO = require('path').resolve(__dirname, '..');
const { signQuote } = require(REPO + '/lib/quote-token.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 240) : '')); }
};
const BASE = 'http://localhost:5500';
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
async function call(method, path, token, body, extraHeaders) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}), ...(extraHeaders || {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}
const stamp = Date.now();
async function user(role, tag) {
  const email = `${tag}_${stamp}@example.com`;
  await call('POST', '/api/register', null, { email, password: 'password123', full_name: `${tag} Tester`, role, accept_terms: true, accept_courier_terms: true, location_consent: true });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  const m = await call('GET', '/api/me', l.body.access_token);
  return { token: l.body.access_token, id: m.body.id };
}
const jpeg = () => new (require('buffer').Blob)([Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0xff, 0xd9])], { type: 'image/jpeg' });
async function photo(token, endpoint, jobId, headers) {
  const f = new FormData(); f.append('photo', jpeg(), 'p.jpg');
  const r = await fetch(`${BASE}/api/${endpoint}?jobId=${jobId}`, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'X-Forwarded-For': IP, ...(headers || {}) }, body: f });
  return { status: r.status, body: await r.json().catch(() => null) };
}

(async () => {
  const cust = await user('customer', 'optcust');
  const cour = await user('courier', 'optcour');
  const PA = '12 Option Street, Bolton BL1 1AA, UK', DA = '4 Choice Road, Leeds LS1 2HT, UK';
  const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.8, dropoff_lng: -1.55, distance_km: 60, price_gbp: 40 };
  const make = (extra) => call('POST', '/api/jobs-create', cust.token, {
    pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date().toISOString(),
    quote_token: signQuote(cust.id, PA, DA, Q), ...extra,
  });

  console.log('[defaults]');
  let r = await make({});
  ok('an order with no options gets the defaults (kerb, kerb, medium, no PIN)', r.status === 201 && r.body.pickup_handover === 'kerb' && r.body.dropoff_handover === 'kerb' && r.body.package_size === 'medium' && r.body.pin_required === false && r.body.delivery_pin === null && r.body.customer_is_recipient === false, r.body);

  console.log('\n[validation]');
  r = await make({ pickup_handover: 'teleport' });
  ok('an unknown handover -> 422', r.status === 422, r);
  r = await make({ package_size: 'huge' });
  ok('an unknown package size -> 422', r.status === 422, r);
  r = await make({ dropoff_instructions: 'x'.repeat(301) });
  ok('instructions over 300 characters -> 422', r.status === 422, r);
  r = await make({ pickup_contact_name: 'N'.repeat(101) });
  ok('a contact name over 100 characters -> 422', r.status === 422, r);
  r = await make({ dropoff_contact_name: { a: 1 } });
  ok('a non-text contact name -> 422', r.status === 422, r);

  console.log('\n[a full order]');
  r = await make({
    mode: 'receiving', pickup_contact_name: '  Sam Sender ', dropoff_contact_name: 'Me Myself',
    pickup_handover: 'door', dropoff_handover: 'leave',
    pickup_instructions: 'Ring bell twice; parcel is on the hall table', dropoff_instructions: 'Gate code 4321, safe place is the porch',
    package_size: 'large', pin_confirmation: true,
  });
  const job = r.body;
  ok('created with every choice stored (names trimmed)', r.status === 201 && job.customer_is_recipient === true && job.pickup_contact_name === 'Sam Sender' && job.dropoff_handover === 'leave' && job.package_size === 'large' && /Gate code/.test(job.dropoff_instructions), job);
  ok('a PIN was made: four digits, shown to the customer', job.pin_required === true && /^\d{4}$/.test(job.delivery_pin), job.delivery_pin);
  const mine = (await call('GET', '/api/jobs-mine', cust.token)).body.find((j) => j.id === job.id);
  ok('the customer still sees the PIN when listing their orders', mine && mine.delivery_pin === job.delivery_pin, mine && mine.delivery_pin);

  console.log('\n[what a courier sees before accepting]');
  const av = (await call('GET', '/api/jobs-available', cour.token)).body.find((j) => j.id === job.id);
  ok('the marketplace shows the package size', av && av.package_size === 'large', av);
  const leak = JSON.stringify(av);
  ok('but no contact names, instructions, handover, or PIN', !/Sam Sender|Me Myself|Gate code|hall table|delivery_pin|instructions|contact/i.test(leak), leak.slice(0, 200));

  console.log('\n[after accepting]');
  r = await call('POST', '/api/jobs-accept', cour.token, { jobId: job.id });
  ok('the courier now sees the contacts, handover and instructions', r.status === 200 && r.body.pickup_contact_name === 'Sam Sender' && r.body.pickup_handover === 'door' && /hall table/.test(r.body.pickup_instructions) && /Gate code/.test(r.body.dropoff_instructions), r.body);
  ok('the courier is told a PIN is needed but never given it', r.body.pin_required === true && r.body.delivery_pin === undefined, r.body);
  const cm = (await call('GET', '/api/jobs-courier-mine', cour.token)).body.find((j) => j.id === job.id);
  ok('nor in their job list', cm && cm.pin_required === true && cm.delivery_pin === undefined, cm);
  r = await photo(cour.token, 'jobs-pickup', job.id);
  ok('collected', r.status === 200 && r.body.status === 'COLLECTED', r);

  console.log('\n[delivering with a PIN]');
  r = await photo(cour.token, 'jobs-deliver', job.id);
  ok('no PIN -> 422 and the job stays COLLECTED', r.status === 422 && r.body.pin_required === true, r);
  r = await photo(cour.token, 'jobs-deliver', job.id, { 'X-Delivery-Pin': 'abcd' });
  ok('a PIN that is not 4 digits -> 422', r.status === 422, r);
  const wrong = job.delivery_pin === '0000' ? '1111' : '0000';
  r = await photo(cour.token, 'jobs-deliver', job.id, { 'X-Delivery-Pin': wrong });
  ok('the wrong PIN -> 403', r.status === 403, r);
  const still = (await call('GET', '/api/jobs-courier-mine', cour.token)).body.find((j) => j.id === job.id);
  ok('the job is still COLLECTED after a wrong PIN (no photo was kept)', still.status === 'COLLECTED' && !still.delivery_photo_url, still);
  let locked = null;
  for (let i = 0; i < 6; i += 1) {
    const t = await photo(cour.token, 'jobs-deliver', job.id, { 'X-Delivery-Pin': wrong });
    if (t.status === 429) { locked = i; break; }
  }
  ok('repeated wrong PINs are locked out (429)', locked !== null && locked <= 5, locked);
  r = await photo(cour.token, 'jobs-deliver', job.id, { 'X-Delivery-Pin': job.delivery_pin });
  ok('even the right PIN is refused while locked out (429)', r.status === 429, r);

  console.log('\n[an order without a PIN delivers as before]');
  const plain = (await make({ package_size: 'small' })).body;
  await call('POST', '/api/jobs-accept', cour.token, { jobId: plain.id });
  await photo(cour.token, 'jobs-pickup', plain.id);
  r = await photo(cour.token, 'jobs-deliver', plain.id);
  ok('delivered with just the photo', r.status === 200 && r.body.status === 'DELIVERED', r);

  const okPinJob = (await make({ pin_confirmation: true })).body;
  await call('POST', '/api/jobs-accept', cour.token, { jobId: okPinJob.id });
  await photo(cour.token, 'jobs-pickup', okPinJob.id);
  r = await photo(cour.token, 'jobs-deliver', okPinJob.id, { 'X-Delivery-Pin': okPinJob.delivery_pin });
  ok('the right PIN delivers it', r.status === 200 && r.body.status === 'DELIVERED', r);

  console.log('\n[the public tracking link]');
  const t = await call('GET', '/api/track', null, null, { 'X-Track-Token': job.tracking_token });
  ok('shows none of the contacts, instructions or PIN', t.status === 200 && !/Sam Sender|Me Myself|Gate code|hall table|delivery_pin|pin|instructions|contact/i.test(JSON.stringify(t.body)), t.body);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
