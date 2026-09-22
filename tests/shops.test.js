// Partner shops end to end: applying, admin approval, posting a bag (always a walker job), the
// masking exception (a shop is shown in full, the customer's own address stays masked), the pickup
// code (the shop's to give, the walker's to ask for — never the other way round), and the shop's own
// Ready / Handed over taps. Needs the real geocoding and walking-route services (a shop's address is
// geocoded, and every bag is a walker job), so it's registered in run-all.js as needing the network.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret';
let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 260) : '')); }
};
const BASE = 'http://localhost:5500';
const IP = `10.12.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
async function call(method, path, token, body) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
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
  return { token: l.body.access_token, id: m.body.id, email };
}

// Addresses near Fishergate, Preston, the same pair tests/walkers.test.js uses, checked directly
// against the real geocoding and walking-route services before use: NEAR is well under a mile,
// Bamber Bridge is a few kilometres out (comfortably over the cap either way).
const SHOP_ADDRESS = 'Fishergate, Preston PR1 3AA, UK';
const NEAR_ADDRESS = 'Lowthian Street, Preston PR1 3AA, UK';
const FAR_ADDRESS = 'Bamber Bridge, Preston PR5 8AN, UK';

// A bag posted with no ready_at defaults to "now" server-side — fine in the day, but silently refused
// after 9pm (the walker-hours rule), which used to make this whole suite fail overnight for a reason
// that has nothing to do with shops. Every bag below that isn't deliberately testing the hours
// rejection uses this instead: tomorrow at 1pm UTC, always inside 7am-9pm UK time regardless of season.
function daytimeIso() {
  const d = new Date(Date.now() + 24 * 3600e3);
  d.setUTCHours(13, 0, 0, 0);
  return d.toISOString();
}

(async () => {
  const owner = await user('customer', 'shopowner');
  const driver = await user('courier', 'shopdriver');
  const walker = await user('courier', 'shopwalker');
  // A fresh courier now defaults to walker mode (the low-barrier sign-up path) — driver switched
  // explicitly here since this fixture needs to behave like an ordinary driver.
  await call('POST', '/api/account-courier-mode', driver.token, { mode: 'driver' });
  await call('POST', '/api/account-courier-mode', walker.token, { mode: 'walker' });
  // The dev server treats this exact address as an admin (dev-server.js's ADMIN_EMAILS default) —
  // register/login use the literal address, not the tag+stamp pattern the other accounts use.
  await call('POST', '/api/register', null, { email: 'admin@example.com', password: 'password123', full_name: 'Admin', role: 'customer', accept_terms: true });
  const adminLogin = await call('POST', '/api/login', null, { email: 'admin@example.com', password: 'password123' });
  const admin = { token: adminLogin.body.access_token };

  console.log('[before applying]');
  let r = await call('GET', '/api/shop-profile', owner.token);
  ok('no shop yet', r.status === 200 && r.body.shop === null, r.body);
  r = await call('POST', '/api/shop-post-bag', owner.token, { recipient_name: 'X', dropoff_address: NEAR_ADDRESS, ready_at: daytimeIso() });
  ok('cannot post a bag with no shop', r.status === 403, r);
  r = await call('GET', '/api/admin-shops', owner.token);
  ok('a non-admin cannot see the shop admin list', r.status === 403, r);

  console.log('\n[applying]');
  r = await call('POST', '/api/shop-profile', owner.token, {
    name: `Ali's Corner Shop ${stamp}`, address: SHOP_ADDRESS, phone: '01772 000000',
    opening_hours: 'Mon-Sat 8am-8pm', collection_notes: 'Side door on the left',
  });
  ok('applying creates a pending shop, geocoded', r.status === 201 && r.body.shop.status === 'pending' && Number.isFinite(r.body.shop.lat) && Number.isFinite(r.body.shop.lng), r.body);
  const shopId = r.body.shop.id;
  r = await call('POST', '/api/shop-post-bag', owner.token, { recipient_name: 'X', dropoff_address: NEAR_ADDRESS, ready_at: daytimeIso() });
  ok('a pending shop cannot post a bag yet', r.status === 403 && /waiting for approval/i.test(r.body.detail), r);
  r = await call('POST', '/api/shop-profile', owner.token, { name: `Ali's Corner Shop ${stamp}`, address: SHOP_ADDRESS, opening_hours: 'Mon-Sun 7am-9pm' });
  ok('editing while pending updates the same shop, not a second one', r.status === 200 && r.body.shop.id === shopId && r.body.shop.opening_hours === 'Mon-Sun 7am-9pm', r.body);

  console.log('\n[admin approval]');
  r = await call('GET', '/api/admin-shops?status=pending', admin.token);
  ok('the admin sees it pending', r.status === 200 && r.body.some((s) => s.id === shopId), r.body.map((s) => s.id));
  r = await call('POST', '/api/admin-shops', admin.token, { shopId, action: 'approve' });
  ok('admin approves it', r.status === 200 && r.body.status === 'approved', r.body);

  console.log('\n[posting a bag]');
  r = await call('POST', '/api/shop-post-bag', owner.token, { recipient_name: 'Jane Smith', dropoff_address: NEAR_ADDRESS, notes: 'Flat 2', ready_at: daytimeIso() });
  ok('an approved shop posts a genuinely short bag', r.status === 201 && r.body.delivery_mode === 'walker' && r.body.shop_id === shopId, r.body);
  const bag = r.body;
  ok('its pickup address is the shop, in full', bag.pickup_address.includes('Fishergate'), bag.pickup_address);
  ok('the shop (as the job\'s own customer) can see the pickup code', /^\d{4}$/.test(bag.pickup_code || ''), bag.pickup_code);
  ok('it carries a minute range like any walker job', typeof bag.walk_minutes_low === 'number' && bag.walk_minutes_high > bag.walk_minutes_low, bag);

  r = await call('POST', '/api/shop-post-bag', owner.token, { recipient_name: 'Too Far', dropoff_address: FAR_ADDRESS, ready_at: daytimeIso() });
  ok('a bag over a mile away is refused', r.status === 422, r);
  r = await call('POST', '/api/shop-post-bag', owner.token, { recipient_name: 'Night Owl', dropoff_address: NEAR_ADDRESS, ready_at: (() => { const d = new Date(Date.now() + 24 * 3600e3); d.setUTCHours(23, 0, 0, 0); return d.toISOString(); })() });
  ok('a bag ready after dark is refused', r.status === 422 && /7am|9pm/.test(r.body.detail), r);

  console.log('\n[a suspended shop cannot post]');
  r = await call('POST', '/api/admin-shops', admin.token, { shopId, action: 'suspend', reason: 'test suspension' });
  ok('admin suspends it', r.status === 200 && r.body.status === 'suspended', r.body);
  r = await call('POST', '/api/shop-post-bag', owner.token, { recipient_name: 'X', dropoff_address: NEAR_ADDRESS, ready_at: daytimeIso() });
  ok('a suspended shop cannot post', r.status === 403 && /suspended/i.test(r.body.detail), r);
  r = await call('POST', '/api/shop-profile', owner.token, { name: 'New name', address: SHOP_ADDRESS });
  ok('nor edit its way back in', r.status === 403, r);
  r = await call('POST', '/api/admin-shops', admin.token, { shopId, action: 'approve' });
  ok('admin re-approves it', r.status === 200 && r.body.status === 'approved', r.body);

  console.log('\n[marketplace: the shop is shown in full, the customer stays masked]');
  const availDriver = (await call('GET', '/api/jobs-available', driver.token)).body;
  const bagToDriver = availDriver.find((j) => j.id === bag.id);
  ok('a driver sees the bag too, flagged as a walker job for the app\'s icon', bagToDriver && bagToDriver.delivery_mode === 'walker', bagToDriver);
  const availWalker = (await call('GET', '/api/jobs-available', walker.token)).body;
  const seen = availWalker.find((j) => j.id === bag.id);
  ok('a walker sees it', !!seen, availWalker.map((j) => j.id));
  ok('the shop end is shown in full — name, street, exact coordinates — a shop is a public place', seen && seen.pickup_address.includes('Fishergate') && seen.pickup_lat === bag.pickup_lat && seen.pickup_lng === bag.pickup_lng, seen);
  ok('flagged as a shop job', seen && seen.is_shop_job === true, seen);
  ok('but the customer end is still just the postcode', seen && seen.dropoff_address === 'Preston PR1 3AA' && !seen.dropoff_address.includes('Lowthian'), seen && seen.dropoff_address);
  ok('and nobody browsing sees the pickup code', seen && seen.pickup_code === undefined, seen);

  console.log('\n[accept: the walker is told a code is needed, never the code itself]');
  r = await call('POST', '/api/jobs-accept', walker.token, { jobId: bag.id });
  ok('the walker accepts', r.status === 200 && r.body.status === 'ACCEPTED', r.body);
  ok('pickup_code_required is set, but the actual code is not in the walker\'s own response', r.body.pickup_code_required === true && r.body.pickup_code === undefined, r.body);
  const mineWalker = (await call('GET', '/api/jobs-courier-mine', walker.token)).body.find((j) => j.id === bag.id);
  ok('nor in their job list', mineWalker && mineWalker.pickup_code_required === true && mineWalker.pickup_code === undefined, mineWalker);
  const mineShop = (await call('GET', '/api/jobs-mine', owner.token)).body.find((j) => j.id === bag.id);
  ok('but the shop (as the customer) can still see it', mineShop && mineShop.pickup_code === bag.pickup_code, mineShop);

  console.log('\n[the shop\'s own Ready / Handed over]');
  r = await call('POST', '/api/shop-ready', owner.token, { jobId: bag.id });
  ok('the shop marks it ready', r.status === 200 && !!r.body.shop_ready_at, r.body);
  r = await call('POST', '/api/shop-ready', driver.token, { jobId: bag.id });
  ok('someone with no shop cannot mark it ready', r.status === 403, r);
  r = await call('POST', '/api/shop-handover', owner.token, { jobId: bag.id });
  ok('the shop confirms handover once a walker has accepted', r.status === 200 && !!r.body.shop_handed_over_at, r.body);

  console.log('\n[pickup: the walker needs the right code]');
  const jpeg = () => new (require('buffer').Blob)([Buffer.from([0xff, 0xd8, 0xff, 0xd9])], { type: 'image/jpeg' });
  const pickup = async (headers) => {
    const f = new FormData(); f.append('photo', jpeg(), 'p.jpg');
    const res = await fetch(`${BASE}/api/jobs-pickup?jobId=${bag.id}`, { method: 'POST', headers: { Authorization: 'Bearer ' + walker.token, 'X-Forwarded-For': IP, ...(headers || {}) }, body: f });
    return { status: res.status, body: await res.json().catch(() => null) };
  };
  r = await pickup({});
  ok('no code at all -> refused, told a code is needed', r.status === 422 && r.body.pickup_code_required === true, r);
  r = await pickup({ 'X-Pickup-Code': '0000' });
  ok('the wrong code -> refused', r.status === 403 || (r.status === 422 && String(r.body.detail || '').includes('4-digit')), r);
  r = await pickup({ 'X-Pickup-Code': bag.pickup_code });
  ok('the right code (read off the shop\'s own screen) -> collected', r.status === 200 && r.body.status === 'COLLECTED', r);

  console.log('\n[delivery: the recipient is the name the shop gave, not the shop itself]');
  const deliver = async () => {
    const f = new FormData(); f.append('photo', jpeg(), 'd.jpg');
    const res = await fetch(`${BASE}/api/jobs-deliver?jobId=${bag.id}`, { method: 'POST', headers: { Authorization: 'Bearer ' + walker.token, 'X-Forwarded-For': IP }, body: f });
    return { status: res.status, body: await res.json().catch(() => null) };
  };
  r = await deliver();
  ok('delivered', r.status === 200 && r.body.status === 'DELIVERED' && r.body.dropoff_contact_name === 'Jane Smith', r.body);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
