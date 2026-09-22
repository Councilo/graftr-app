// Local-dev-only: populates the marketplace with fake job offers so it looks fully populated while
// trying out the courier screens. Only ever talks to the pg-mem dev server on localhost — there is no
// live-site base URL here to point at production, deliberately, since showing real couriers fake
// demand on the live marketplace would be misleading. Run with the dev server already up:
//   node scripts/seed-demo-offers.js
const BASE = 'http://localhost:5500';
if (!/^https?:\/\/localhost(:|\/|$)/.test(BASE)) throw new Error('refusing to seed anything but localhost');

const stamp = Date.now();
async function call(method, path, token, body) {
  const r = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': '10.9.9.9', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}
async function customer(tag, full_name) {
  const email = `${tag}_${stamp}@example.com`;
  await call('POST', '/api/register', null, { email, password: 'password123', full_name, role: 'customer', accept_terms: true, location_consent: true });
  const l = await call('POST', '/api/login', null, { email, password: 'password123' });
  return { token: l.body.access_token, email };
}

// Tomorrow at a given UTC hour is always inside the 7am-9pm UK-local walker-hours window for any hour
// from 11-15 UTC, whichever side of the BST/GMT switch the run happens to land on.
function daytimeIso(hourUtc) {
  const d = new Date(Date.now() + 24 * 3600e3);
  d.setUTCHours(hourUtc, 0, 0, 0);
  return d.toISOString();
}

// Different towns, short in-town pickup/dropoff pairs — candidates only, since a real walking-route
// lookup is what decides eligibility (server-side, see lib/walking.js), not this list. Extras beyond
// the 5 needed are backups in case the free routing service places one just over the mile cap.
const WALKER_CANDIDATES = [
  ['Fishergate, Preston PR1 3AA, UK', 'Lowthian Street, Preston PR1 3AA, UK'],
  ['Deepdale Road, Preston, UK', 'Blackpool Road, Preston, UK'],
  ['Church Street, Lancaster, UK', 'Cable Street, Lancaster, UK'],
  ['Talbot Road, Blackpool, UK', 'Central Drive, Blackpool, UK'],
  ['Wilmslow Road, Manchester, UK', 'Dickenson Road, Manchester, UK'],
  ['Northgate, Chester, UK', 'Foregate Street, Chester, UK'],
  ['High Street, Lancaster, UK', 'Moor Lane, Lancaster, UK'],
  ['Deansgate, Manchester, UK', 'John Dalton Street, Manchester, UK'],
];

// Longer, cross-town pairs for standard (driver) delivery — no distance cap, so no eligibility check
// needed first, just a handful of well-known, reliably-geocoded places for variety.
const STANDARD_CANDIDATES = [
  ['Preston railway station, UK', 'Lancaster railway station, UK'],
  ['Manchester Piccadilly railway station, UK', 'Manchester Victoria railway station, UK'],
  ['Liverpool Lime Street railway station, UK', 'Liverpool South Parkway railway station, UK'],
  ['Leeds railway station, UK', 'Bradford Interchange, UK'],
  ['Blackpool North railway station, UK', 'Blackpool South railway station, UK'],
  ['York railway station, UK', 'Harrogate railway station, UK'],
  ['Sheffield railway station, UK', 'Rotherham Central railway station, UK'],
  ['Bristol Temple Meads railway station, UK', 'Bath Spa railway station, UK'],
  ['Newcastle railway station, UK', 'Sunderland railway station, UK'],
];

// Nominatim's public instance is shared and rate-limited (roughly one request/second); firing job
// creations back to back gets some of them 502'd. A short pause between each keeps every candidate a
// fair try instead of just the first few.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const NAMES = ['Aisha Khan', 'Tom Whitfield', 'Priya Nair', 'Jack O\'Malley', 'Ellie Sanderson', 'Sam Osei'];

(async () => {
  const custs = [];
  for (let i = 0; i < NAMES.length; i++) custs.push(await customer(`seed${i}`, NAMES[i]));
  let ci = 0;
  const nextCust = () => custs[ci++ % custs.length];

  console.log('Seeding 5 walker offers...');
  let made = 0;
  const hours = [11, 12, 13, 14, 15];
  for (const [pa, da] of WALKER_CANDIDATES) {
    if (made >= 5) break;
    await sleep(1200);
    const cust = nextCust();
    const r = await call('POST', '/api/jobs-create', cust.token, {
      pickup_address: pa, dropoff_address: da, pickup_window_start: daytimeIso(hours[made % hours.length]),
      delivery_mode: 'walker', walker_ack: true, package_size: 'small',
    });
    if (r.status === 201) {
      made++;
      console.log(`  ok   #${r.body.id}  ${pa}  ->  ${da}  (${money(r.body.price_gbp)}, ${r.body.walk_minutes_low}-${r.body.walk_minutes_high} min)`);
    } else {
      console.log(`  skip ${pa} -> ${da}  (${r.status}: ${r.body && r.body.detail})`);
    }
  }
  if (made < 5) console.log(`  only made ${made}/5 walker offers — add more candidates to WALKER_CANDIDATES`);

  console.log('\nSeeding 5 standard offers...');
  made = 0;
  for (const [pa, da] of STANDARD_CANDIDATES) {
    if (made >= 5) break;
    await sleep(1200);
    const cust = nextCust();
    const r = await call('POST', '/api/jobs-create', cust.token, {
      pickup_address: pa, dropoff_address: da, pickup_window_start: daytimeIso(hours[made % hours.length]),
    });
    if (r.status === 201) {
      made++;
      console.log(`  ok   #${r.body.id}  ${pa}  ->  ${da}  (${money(r.body.price_gbp)}, ${r.body.distance_km} km)`);
    } else {
      console.log(`  skip ${pa} -> ${da}  (${r.status}: ${r.body && r.body.detail})`);
    }
  }
  if (made < 5) console.log(`  only made ${made}/5 standard offers — add more candidates to STANDARD_CANDIDATES`);

  console.log('\nDone. Log in as a courier (driver or walker mode) on the dev server to see the offers.');
})().catch((e) => { console.error('CRASH', e); process.exit(1); });

function money(n) { return `£${Number(n).toFixed(2)}`; }
