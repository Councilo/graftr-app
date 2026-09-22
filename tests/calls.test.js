// In-app voice calls: the set-up messages between the two people on a delivery.
// (The audio itself is phone-to-phone and can't be tested from here; this covers who may
// call whom, the ring / answer / hang-up states, and the safety limits.)
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
  return { token: l.body.access_token, id: m.body.id };
}
const OFFER = 'v=0\r\no=- 1 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n';
const ANSWER = 'v=0\r\no=- 3 4 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n';

(async () => {
  const cust = await user('customer', 'callcust');
  const cour = await user('courier', 'callcour');
  const other = await user('courier', 'callother');
  // A fresh courier defaults to walker mode now; this suite's job is an ordinary long-haul one.
  await call('POST', '/api/account-courier-mode', cour.token, { mode: 'driver' });
  const PA = '1 Call Street, Bolton BL1 1AA, UK', DA = '2 Call Road, Leeds LS1 2HT, UK';
  const Q = { pickup_lat: 53.58, pickup_lng: -2.43, dropoff_lat: 53.8, dropoff_lng: -1.55, distance_km: 60, price_gbp: 40 };
  const mk = async () => (await call('POST', '/api/jobs-create', cust.token, { pickup_address: PA, dropoff_address: DA, pickup_window_start: new Date().toISOString(), quote_token: signQuote(cust.id, PA, DA, Q) })).body;
  const openJob = await mk();
  const job = await mk();
  await call('POST', '/api/jobs-accept', cour.token, { jobId: job.id });

  console.log('[who may call]');
  let r = await call('GET', '/api/call-config');
  ok('call-config needs a sign-in (401)', r.status === 401, r);
  r = await call('GET', '/api/call-config', cust.token);
  ok('call-config returns STUN servers', r.status === 200 && Array.isArray(r.body.iceServers) && /^stun:/.test(r.body.iceServers[0].urls), r.body);
  r = await call('POST', '/api/call-start', null, { jobId: job.id, offer: OFFER });
  ok('anonymous cannot call (401)', r.status === 401, r);
  r = await call('POST', '/api/call-start', cust.token, { jobId: openJob.id, offer: OFFER });
  ok('no call before a courier has accepted (409)', r.status === 409, r);
  r = await call('POST', '/api/call-start', other.token, { jobId: job.id, offer: OFFER });
  ok('a stranger cannot call into someone else\'s delivery (403)', r.status === 403, r);
  r = await call('POST', '/api/call-start', cust.token, { jobId: job.id });
  ok('a call without an offer -> 422', r.status === 422, r);
  r = await call('POST', '/api/call-start', cust.token, { jobId: job.id, offer: 'x'.repeat(20001) });
  ok('an oversized offer -> 422', r.status === 422, r);
  r = await call('POST', '/api/call-start', cust.token, { jobId: 'abc', offer: OFFER });
  ok('a bad job id -> 422', r.status === 422, r);

  console.log('\n[ringing and answering]');
  r = await call('POST', '/api/call-start', cust.token, { jobId: job.id, offer: OFFER });
  const callId = r.body && r.body.id;
  ok('the customer starts a call (201, RINGING)', r.status === 201 && r.body.status === 'RINGING' && callId, r);
  r = await call('POST', '/api/call-start', cour.token, { jobId: job.id, offer: OFFER });
  ok('a second call on the same delivery while one rings -> 409', r.status === 409, r);
  r = await call('GET', '/api/call-poll', cour.token);
  ok('the courier sees the incoming call with the caller\'s name and offer', r.status === 200 && r.body.incoming && r.body.incoming.id === callId && r.body.incoming.offer === OFFER && /callcust/.test(r.body.incoming.from_name), r.body);
  r = await call('GET', '/api/call-poll', cust.token);
  ok('the caller does not see their own call as incoming', r.body.incoming === null, r.body);
  r = await call('GET', '/api/call-poll', other.token);
  ok('a stranger sees nothing', r.body.incoming === null, r.body);
  r = await call('GET', '/api/call-poll?callId=' + callId, cust.token);
  ok('the caller sees RINGING with no answer yet', r.body.status === 'RINGING' && r.body.answer === null, r.body);
  r = await call('GET', '/api/call-poll?callId=' + callId, other.token);
  ok('a stranger cannot look at the call (404)', r.status === 404, r);
  r = await call('POST', '/api/call-answer', cust.token, { callId, answer: ANSWER });
  ok('the caller cannot answer their own call (403)', r.status === 403, r);
  r = await call('POST', '/api/call-answer', other.token, { callId, answer: ANSWER });
  ok('a stranger cannot answer it (404)', r.status === 404, r);
  r = await call('POST', '/api/call-answer', cour.token, { callId, answer: 'short' });
  ok('an invalid answer -> 422', r.status === 422, r);
  r = await call('POST', '/api/call-answer', cour.token, { callId, answer: ANSWER });
  ok('the courier answers (200, ACTIVE)', r.status === 200 && r.body.status === 'ACTIVE', r);
  r = await call('GET', '/api/call-poll?callId=' + callId, cust.token);
  ok('the caller now receives the answer', r.body.status === 'ACTIVE' && r.body.answer === ANSWER, r.body);
  r = await call('GET', '/api/call-poll?callId=' + callId, cour.token);
  ok('the answerer is not sent their own answer back', r.body.status === 'ACTIVE' && r.body.answer === null, r.body);
  r = await call('POST', '/api/call-answer', cour.token, { callId, answer: ANSWER });
  ok('answering twice -> 409', r.status === 409, r);
  r = await call('GET', '/api/call-poll', cour.token);
  ok('an active call is no longer "incoming"', r.body.incoming === null, r.body);
  r = await call('POST', '/api/call-start', cour.token, { jobId: job.id, offer: OFFER });
  ok('no second call while one is active (409)', r.status === 409, r);

  console.log('\n[hanging up]');
  r = await call('POST', '/api/call-end', other.token, { callId });
  ok('a stranger cannot hang up someone else\'s call (404)', r.status === 404, r);
  r = await call('POST', '/api/call-end', cust.token, { callId });
  ok('the caller hangs up: ENDED', r.status === 200 && r.body.status === 'ENDED', r);
  r = await call('GET', '/api/call-poll?callId=' + callId, cour.token);
  ok('the other person sees it ended', r.body.status === 'ENDED' && r.body.ended_at, r.body);
  r = await call('POST', '/api/call-end', cour.token, { callId });
  ok('hanging up twice is harmless (200, still ENDED)', r.status === 200 && r.body.status === 'ENDED', r);

  console.log('\n[declined and cancelled]');
  r = await call('POST', '/api/call-start', cour.token, { jobId: job.id, offer: OFFER });
  const id2 = r.body.id;
  ok('the courier can call the customer too', r.status === 201, r);
  r = await call('GET', '/api/call-poll', cust.token);
  ok('the customer sees the courier calling', r.body.incoming && r.body.incoming.id === id2, r.body);
  r = await call('POST', '/api/call-answer', cust.token, { callId: id2, decline: true });
  ok('declining -> DECLINED', r.status === 200 && r.body.status === 'DECLINED', r);
  r = await call('POST', '/api/call-answer', cust.token, { callId: id2, answer: ANSWER });
  ok('answering a declined call -> 409', r.status === 409, r);
  r = await call('POST', '/api/call-start', cust.token, { jobId: job.id, offer: OFFER });
  const id3 = r.body.id;
  r = await call('POST', '/api/call-end', cust.token, { callId: id3 });
  ok('the caller giving up while it rings -> CANCELLED', r.status === 200 && r.body.status === 'CANCELLED', r);
  r = await call('POST', '/api/call-answer', cour.token, { callId: id3, answer: ANSWER });
  ok('answering a cancelled call -> 409 (nothing to answer)', r.status === 409, r);
  r = await call('GET', '/api/call-poll', cour.token);
  ok('a cancelled call stops showing as incoming', r.body.incoming === null, r.body);

  console.log('\n[limits]');
  let limited = null;
  for (let i = 0; i < 12; i += 1) {
    const s = await call('POST', '/api/call-start', cust.token, { jobId: job.id, offer: OFFER });
    if (s.status === 429) { limited = i; break; }
    if (s.body && s.body.id) await call('POST', '/api/call-end', cust.token, { callId: s.body.id });
  }
  ok('calls are rate-limited per person per hour (429)', limited !== null && limited <= 9, limited);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
