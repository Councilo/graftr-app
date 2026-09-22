// Drives Antigravity's new endpoints through the real handlers on the dev server.
const BASE = 'http://localhost:5500';
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`; // own rate-limit bucket per script run

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra) : '')); }
};
async function call(method, path, token, body) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': IP, ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch { json = text; }
  return { status: r.status, body: json };
}
const stamp = Date.now();
async function reg(role, n) {
  const email = `${role}${n}_${stamp}@example.com`;
  await call('POST', '/api/register', null, { accept_terms: true, accept_courier_terms: true, location_consent: true, email, password: 'password123', full_name: `${role} ${n}`, role });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  return { token: l.body.access_token, raw: l.body };
}

(async () => {
  const cust = await reg('customer', 1);
  const cust2 = await reg('customer', 2);
  const cour = await reg('courier', 1);
  const cour2 = await reg('courier', 2);
  ok('login returns token', !!cust.token, cust.raw);
  const [ct, ct2, kt, kt2] = [cust.token, cust2.token, cour.token, cour2.token];
  // A fresh courier now defaults to walker mode (the low-barrier sign-up path) — switched back to
  // driver here since this file's jobs are ordinary (standard) ones, not walker jobs.
  await call('POST', '/api/account-courier-mode', kt, { mode: 'driver' });
  await call('POST', '/api/account-courier-mode', kt2, { mode: 'driver' });

  const now = Date.now();
  const mkBody = () => ({
    pickup_address: '10 Downing Street, London', dropoff_address: 'Piccadilly Circus, London',
    pickup_window_start: new Date(now).toISOString(), pickup_window_end: new Date(now + 86400000).toISOString(),
  });

  console.log('\n[quote: per-mile pricing on the real endpoint]');
  {
    const q = await call('POST', '/api/jobs-quote', ct, { pickup_address: 'Halliwell Road, Bolton', dropoff_address: 'Piccadilly Gardens, Manchester' });
    ok('quote 200', q.status === 200, q);
    const b = q.body;
    ok('quote carries pricing config', b.pricing && b.pricing.base_fare_gbp === 3.5 && b.pricing.per_mile_gbp === 1.37 && b.pricing.minimum_fare_gbp === 5, b.pricing);
    const mi = Math.round((b.distance_km / 1.609344) * 10) / 10;
    ok('distance_miles equals km / 1.609344 to 1dp', b.distance_miles === mi, [b.distance_miles, mi]);
    const want = Math.max(5, Math.round((350 * 10 + 137 * Math.round(mi * 10)) / 10)) / 100;
    ok('price === base + displayed miles x rate (min 5)', b.price_gbp === want, [b.price_gbp, want, mi]);
    ok('quote has a real road route (not a 2-point line)', Array.isArray(b.route_geometry) && b.route_geometry.length > 10, b.route_geometry && b.route_geometry.length);
    ok('route starts and ends near the two coordinates', b.route_geometry && Math.abs(b.route_geometry[0][0] - b.pickup_lat) < 0.01 && Math.abs(b.route_geometry[b.route_geometry.length - 1][0] - b.dropoff_lat) < 0.01);
    await new Promise(r => setTimeout(r, 1200));
    const c = await call('POST', '/api/jobs-create', ct, { pickup_address: 'Halliwell Road, Bolton', dropoff_address: 'Piccadilly Gardens, Manchester', pickup_window_start: new Date().toISOString(), pickup_window_end: new Date(Date.now() + 86400000).toISOString() });
    ok('job created with the same price the quote showed', c.status === 201 && Number(c.body.price_gbp) === b.price_gbp, [c.body.price_gbp, b.price_gbp]);
    await call('POST', '/api/jobs-delete', ct, { jobId: c.body.id });
    await new Promise(r => setTimeout(r, 1200));
  }

  console.log('\n[create x3]');
  const jobs = [];
  for (let i = 0; i < 3; i++) {
    const r = await call('POST', '/api/jobs-create', ct, mkBody());
    if (r.status !== 201 && r.status !== 200) { console.log('  create failed', r.status, r.body); break; }
    jobs.push(r.body);
    await new Promise(r => setTimeout(r, 1200)); // Nominatim 1 req/s
  }
  ok('3 jobs created', jobs.length === 3);
  if (jobs.length < 3) return finish();
  const [A, B, C] = jobs;

  console.log('\n[cancel]');
  let r = await call('POST', '/api/jobs-cancel', null, { jobId: A.id });
  ok('cancel without token -> 401', r.status === 401, r);
  r = await call('POST', '/api/jobs-cancel', ct2, { jobId: A.id });
  ok('other customer cannot cancel -> 403', r.status === 403, r);
  r = await call('POST', '/api/jobs-cancel', kt, { jobId: A.id });
  ok('unassigned courier cannot cancel -> 403', r.status === 403, r);
  r = await call('POST', '/api/jobs-cancel', ct, { job_id: A.id });
  ok('owner cancels OPEN job (job_id form) -> 200 CANCELLED', r.status === 200 && r.body.status === 'CANCELLED' && r.body.cancelled_at, r);
  r = await call('POST', '/api/jobs-cancel', ct, { jobId: A.id });
  ok('cancel again is idempotent -> 200', r.status === 200 && r.body.status === 'CANCELLED', r);
  r = await call('POST', '/api/jobs-cancel', ct, { jobId: 999999 });
  ok('cancel unknown job -> 404', r.status === 404, r);
  r = await call('POST', '/api/jobs-cancel', ct, {});
  ok('cancel without id -> 422', r.status === 422, r);
  r = await call('GET', '/api/jobs-cancel', ct);
  ok('GET cancel -> 405', r.status === 405, r);

  console.log('\n[accept a cancelled job]');
  r = await call('POST', '/api/jobs-accept', kt, { jobId: A.id });
  ok('cannot accept CANCELLED job -> 409', r.status === 409, r);

  console.log('\n[accept + location + messages on B]');
  r = await call('POST', '/api/jobs-accept', kt, { job_id: B.id });
  ok('courier accepts B (job_id form)', r.status === 200 && r.body.status === 'ACCEPTED', r);
  r = await call('GET', '/api/jobs-available', kt);
  ok('an accepted job leaves the accepting courier\'s offers at once', r.status === 200 && !r.body.some(j => j.id === B.id), r.status);
  r = await call('GET', '/api/jobs-available', kt2);
  ok('and every other courier\'s offers too', r.status === 200 && !r.body.some(j => j.id === B.id), r.status);
  r = await call('POST', '/api/jobs-location', kt2, { jobId: B.id, lat: 51.5, lng: -0.1 });
  ok('non-assigned courier location -> 403', r.status === 403, r);
  r = await call('POST', '/api/jobs-start', kt, { jobId: B.id });
  ok('the assigned courier presses Start order -> 200, started_at set', r.status === 200 && !!r.body.started_at, r);
  r = await call('POST', '/api/jobs-location', kt, { jobId: B.id, lat: 51.5, lng: -0.12 });
  ok('assigned courier location (after Start) -> 200', r.status === 200 && Number(r.body.courier_lat) === 51.5, r);

  r = await call('GET', '/api/jobs-mine', ct);
  const bMine = r.body.find((j) => j.id === B.id);
  ok('jobs-mine carries the real courier_name once accepted', bMine && bMine.courier_name === 'courier 1', bMine && bMine.courier_name);
  const cMine = r.body.find((j) => j.id === C.id);
  ok('jobs-mine: courier_name is null while OPEN', cMine && cMine.courier_name === null, cMine && cMine.courier_name);
  ok('jobs-mine still returns route_geometry as an array', Array.isArray(bMine.route_geometry));
  r = await call('GET', '/api/jobs-courier-mine', kt);
  const bCour = r.body.find((j) => j.id === B.id);
  ok('jobs-courier-mine carries customer_name', bCour && bCour.customer_name === 'customer 1', bCour && bCour.customer_name);
  ok('jobs-courier-mine still returns route_geometry as an array', Array.isArray(bCour.route_geometry));

  r = await call('POST', '/api/messages-send', ct, { jobId: B.id, content: '  hello courier  ' });
  ok('customer sends message -> 201, trimmed', r.status === 201 && r.body.content === 'hello courier' && r.body.sender_role === 'customer', r);
  r = await call('POST', '/api/messages-send', kt, { job_id: B.id, content: 'on my way' });
  ok('courier replies -> 201', r.status === 201 && r.body.sender_role === 'courier', r);
  r = await call('POST', '/api/messages-send', ct, { jobId: B.id, content: '   ' });
  ok('blank message -> 422', r.status === 422, r);
  r = await call('POST', '/api/messages-send', ct2, { jobId: B.id, content: 'let me in' });
  ok('stranger cannot post -> 403', r.status === 403, r);
  r = await call('POST', '/api/messages-send', kt2, { jobId: B.id, content: 'let me in' });
  ok('other courier cannot post -> 403', r.status === 403, r);
  r = await call('POST', '/api/messages-send', ct, { jobId: 999999, content: 'x' });
  ok('message on unknown job -> 404', r.status === 404, r);
  r = await call('POST', '/api/messages-send', null, { jobId: B.id, content: 'x' });
  ok('message without token -> 401', r.status === 401, r);

  r = await call('GET', `/api/messages-list?jobId=${B.id}`, ct);
  ok('customer lists 2 messages in order', r.status === 200 && r.body.length === 2 && r.body[0].content === 'hello courier' && r.body[1].content === 'on my way', r);
  r = await call('GET', `/api/messages-list?job_id=${B.id}`, kt);
  ok('courier lists messages (job_id form)', r.status === 200 && r.body.length === 2, r);
  r = await call('GET', `/api/messages-list?jobId=${B.id}`, ct2);
  ok('stranger cannot read -> 403', r.status === 403, r);
  r = await call('GET', `/api/messages-list?jobId=${B.id}`, kt2);
  ok('other courier cannot read -> 403', r.status === 403, r);
  r = await call('GET', '/api/messages-list', ct);
  ok('list without jobId -> 422', r.status === 422, r);
  r = await call('GET', `/api/messages-list?jobId=${C.id}`, ct);
  ok('open job with no courier: owner reads empty list', r.status === 200 && r.body.length === 0, r);
  r = await call('POST', '/api/messages-list', ct, {});
  ok('POST messages-list -> 405', r.status === 405, r);

  console.log('\n[delete]');
  r = await call('POST', '/api/jobs-delete', ct2, { jobId: A.id });
  ok('other customer cannot delete (404, not leaked) ', r.status === 404, r);
  r = await call('POST', '/api/jobs-delete', kt, { jobId: A.id });
  ok('courier cannot delete -> 403', r.status === 403, r);
  r = await call('POST', '/api/jobs-delete', ct, { jobId: B.id });
  ok('cannot delete ACCEPTED job -> 409', r.status === 409, r);
  r = await call('POST', '/api/jobs-delete', ct, { jobId: A.id });
  ok('delete CANCELLED job -> 200', r.status === 200 && r.body.success === true, r);
  r = await call('GET', '/api/jobs-mine', ct);
  ok('deleted job gone from jobs-mine', r.status === 200 && !r.body.find(j => j.id === A.id) && r.body.length === 2, r.body && r.body.map && r.body.map(j => j.id));
  r = await call('DELETE', `/api/jobs-delete?jobId=${C.id}`, ct);
  ok('DELETE method + query id on OPEN job -> 200', r.status === 200, r);

  console.log('\n[courier cancels an accepted job: it goes BACK to the marketplace]');
  r = await call('POST', '/api/jobs-cancel', kt, { jobId: B.id });
  ok('assigned courier cancels ACCEPTED -> 200, job is OPEN again, courier cleared, outcome relisted',
    r.status === 200 && r.body.status === 'OPEN' && r.body.courier_id === null && r.body.accepted_at === null && r.body.courier_lat === null && r.body.outcome === 'relisted', r);
  r = await call('POST', '/api/jobs-location', kt, { jobId: B.id, lat: 51.5, lng: -0.1 });
  ok('the ex-courier can no longer post a location for it -> 403', r.status === 403, r);
  r = await call('GET', '/api/jobs-courier-mine', kt);
  ok('courier-mine no longer lists it', r.status === 200 && !r.body.some(j => j.id === B.id), r.body && r.body.map && r.body.map(j => [j.id, j.status]));
  r = await call('GET', '/api/jobs-available', kt2);
  ok('it is back in the marketplace for other couriers', r.status === 200 && r.body.some(j => j.id === B.id), r.status);
  r = await call('GET', '/api/jobs-available', kt);
  ok('and back in the offers of the courier who handed it back', r.status === 200 && r.body.some(j => j.id === B.id), r.status);
  r = await call('GET', '/api/jobs-mine', ct);
  const relisted = r.body.find((j) => j.id === B.id);
  ok('the customer sees it OPEN again, not cancelled, and owes/loses nothing', relisted && relisted.status === 'OPEN' && relisted.payment_status === 'UNPAID' && relisted.courier_name === null, relisted && [relisted.status, relisted.payment_status]);
  r = await call('POST', '/api/jobs-accept', kt2, { jobId: B.id });
  ok('a different courier accepts the relisted job -> 200 ACCEPTED', r.status === 200 && r.body.status === 'ACCEPTED', r);
  r = await call('POST', '/api/jobs-cancel', kt, { jobId: B.id });
  ok('the first courier can not cancel a job that is no longer theirs -> 403', r.status === 403, r);
  r = await call('POST', '/api/jobs-cancel', kt2, { jobId: B.id });
  ok('the new courier cancels it too -> relisted again', r.status === 200 && r.body.status === 'OPEN', r);
  // Put it into a terminal state so the cleanup checks below still hold.
  r = await call('POST', '/api/jobs-cancel', ct, { jobId: B.id });
  ok('customer cancels the (open) job -> CANCELLED', r.status === 200 && r.body.status === 'CANCELLED', r);
  r = await call('POST', '/api/jobs-accept', kt2, { jobId: B.id });
  ok('a CANCELLED job is not acceptable -> 409', r.status === 409, r);
  r = await call('GET', '/api/jobs-available', kt2);
  ok('a cancelled job is not in available', r.status === 200 && !r.body.some(j => j.id === B.id), r);

  console.log('\n[cancel after delivery]');
  const D = (await call('POST', '/api/jobs-create', ct, mkBody())).body;
  await call('POST', '/api/jobs-accept', kt, { jobId: D.id });
  // Force DELIVERED straight through the pg pool isn't reachable from here; use the real endpoints instead.
  const fd = new (require('buffer').Blob)([Buffer.from([0xff, 0xd8, 0xff, 0xd9])], { type: 'image/jpeg' });
  const form = (fdata) => { const f = new FormData(); f.append('photo', fdata, 'p.jpg'); return f; };
  for (const ep of ['jobs-pickup', 'jobs-deliver']) {
    const rr = await fetch(BASE + '/api/' + ep + '?jobId=' + D.id, { method: 'POST', headers: { Authorization: 'Bearer ' + kt }, body: form(fd) });
    ok(ep + ' succeeds', rr.status === 200, rr.status);
  }
  r = await call('POST', '/api/jobs-cancel', ct, { jobId: D.id });
  ok('cancel DELIVERED job -> 409', r.status === 409, r);
  r = await call('POST', '/api/jobs-delete', ct, { jobId: D.id });
  ok('delete DELIVERED job -> 409', r.status === 409, r);

  finish();
})().catch(e => { console.error('CRASH', e); process.exit(1); });

function finish() {
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
}
