// jobs-create: the pickup window end is optional (defaults to start + 24h). Uses signed quote tokens so no map service is called.
process.env.JWT_SECRET = 'local-dev-only-not-a-real-secret'; // same throwaway secret dev-server.js uses
const REPO = require('path').resolve(__dirname, '..');
const { signQuote } = require(REPO + '/lib/quote-token.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 240) : '')); }
};
const BASE = 'http://localhost:5500';
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`; // own rate-limit bucket per script run

async function call(method, path, token, body) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}
const DAY = 24 * 60 * 60 * 1000;

(async () => {
  const email = `win_${Date.now()}@example.com`;
  await call('POST', '/api/register', null, { accept_terms: true, accept_courier_terms: true, location_consent: true, email, password: 'password123', full_name: 'Window Tester', role: 'customer' });
  const login = await call('POST', '/api/login', null, { email, password: 'password123' });
  const ct = login.body.access_token;
  const me = await call('GET', '/api/me', ct);
  const uid = me.body.id;

  const PA = 'zzqx window pickup', DA = 'zzqx window dropoff';
  const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.48, dropoff_lng: -2.24, distance_km: 20, price_gbp: 22.5 };
  const create = (extra) => call('POST', '/api/jobs-create', ct, { pickup_address: PA, dropoff_address: DA, quote_token: signQuote(uid, PA, DA, Q), ...extra });

  console.log('[jobs-create: pickup_window_end is optional]');
  const start = new Date(Date.now() + 3 * 60 * 60 * 1000);
  let r = await create({ pickup_window_start: start.toISOString() });
  ok('start only -> 201', r.status === 201, r);
  ok('the start is stored exactly as sent', r.body && new Date(r.body.pickup_window_start).getTime() === start.getTime(), r.body && r.body.pickup_window_start);
  ok('the end defaults to start + 24 hours exactly', r.body && new Date(r.body.pickup_window_end).getTime() === start.getTime() + DAY, r.body && [r.body.pickup_window_start, r.body.pickup_window_end]);

  r = await create({ pickup_window_start: start.toISOString(), pickup_window_end: null });
  ok('end: null behaves as omitted', r.status === 201 && new Date(r.body.pickup_window_end).getTime() === start.getTime() + DAY, r);
  r = await create({ pickup_window_start: start.toISOString(), pickup_window_end: '' });
  ok('end: "" behaves as omitted', r.status === 201 && new Date(r.body.pickup_window_end).getTime() === start.getTime() + DAY, r);

  const explicitEnd = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  r = await create({ pickup_window_start: start.toISOString(), pickup_window_end: explicitEnd.toISOString() });
  ok('an explicit end (API clients) is still honoured', r.status === 201 && new Date(r.body.pickup_window_end).getTime() === explicitEnd.getTime(), r);

  console.log('\n[jobs-create: validation still holds]');
  r = await create({ pickup_window_start: start.toISOString(), pickup_window_end: new Date(start.getTime() - 60000).toISOString() });
  ok('an explicit end before the start -> 422', r.status === 422, r);
  r = await create({ pickup_window_start: start.toISOString(), pickup_window_end: start.toISOString() });
  ok('an explicit end equal to the start -> 422', r.status === 422, r);
  r = await create({ pickup_window_start: start.toISOString(), pickup_window_end: 'not a date' });
  ok('an explicit end that is not a date -> 422', r.status === 422, r);
  r = await create({});
  ok('no start at all -> 422', r.status === 422 && /pickup_window_start/.test(r.body.detail), r);
  r = await create({ pickup_window_start: 'garbage' });
  ok('an invalid start -> 422', r.status === 422 && /pickup_window_start/.test(r.body.detail), r);
  r = await create({ pickup_window_start: null });
  ok('a null start -> 422 (not a 1970 pickup)', r.status === 422, r);
  r = await create({ pickup_window_start: true });
  ok('a boolean start -> 422', r.status === 422, r);
  r = await create({ pickup_window_start: 0 });
  ok('a numeric start -> 422', r.status === 422, r);
  r = await create({ pickup_window_start: '   ' });
  ok('a blank-string start -> 422', r.status === 422, r);

  console.log('\n[jobs-create: a pickup time can not be far in the past]');
  const ago = (ms) => new Date(Date.now() - ms).toISOString();
  r = await create({ pickup_window_start: ago(2 * 60 * 60 * 1000) });
  ok('2 hours ago -> 422 saying it is in the past', r.status === 422 && /past/i.test(r.body.detail), r);
  r = await create({ pickup_window_start: '2020-01-01T10:00:00.000Z' });
  ok('a date years ago -> 422', r.status === 422, r);
  r = await create({ pickup_window_start: ago(30 * 60 * 1000) });
  ok('30 minutes ago is tolerated (a slow device clock) -> 201', r.status === 201, r);
  r = await create({ pickup_window_start: new Date().toISOString() });
  ok('right now -> 201', r.status === 201, r);
  r = await create({ pickup_window_start: new Date(Date.now() + 365 * DAY).toISOString() });
  ok('a year ahead is allowed -> 201', r.status === 201, r);

  console.log('\n[the stored job reads back correctly]');
  r = await call('GET', '/api/jobs-mine', ct);
  const withDefault = r.body.filter((j) => new Date(j.pickup_window_end).getTime() - new Date(j.pickup_window_start).getTime() === DAY);
  ok('jobs-mine returns the jobs with their derived windows', r.status === 200 && withDefault.length >= 3, r.body && r.body.map((j) => [j.pickup_window_start, j.pickup_window_end]));

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
