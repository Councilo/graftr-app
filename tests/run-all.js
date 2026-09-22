// Runs every test suite and prints a one-line result for each.
//
//   1. In one terminal:   npm run dev        (starts the local server on port 5500)
//   2. In another:        npm test           (or:  node tests/run-all.js --offline)
//
// --offline skips the suites that call the real free map services (Photon,
// Nominatim, OSRM). Those can fail for reasons outside this code when a service is
// slow or rate-limiting, so a failure there is worth re-running before worrying.
const { spawnSync } = require('child_process');
const path = require('path');

const OFFLINE = process.argv.includes('--offline');
const suites = [
  ['pricing', false], ['compact-address', false], ['route', false], ['quote-token', false], ['pickup-window', false],
  ['api', false], ['features', false], ['races', false], ['expiry', false], ['calls', false], ['order-options', false], ['vercel-config', false], ['start-order', false], ['email', false], ['secret', false], ['areas', false], ['walking', false],
  ['address-search', true], ['place-quote', true], ['walkers', true],
];

let failed = 0;
for (const [name, needsNetwork] of suites) {
  if (needsNetwork && OFFLINE) { console.log('skip  ' + name + ' (needs the map services)'); continue; }
  const result = spawnSync(process.execPath, [path.join(__dirname, name + '.test.js')], { encoding: 'utf8' });
  const summary = (result.stdout.match(/(\d+) passed, (\d+) failed/) || [])[0] || 'no result — did it crash?';
  const bad = result.status !== 0;
  if (bad) failed += 1;
  console.log((bad ? 'FAIL  ' : 'ok    ') + name.padEnd(16) + summary);
  if (bad) console.log(result.stdout.split('\n').filter((l) => /FAIL/.test(l)).slice(0, 8).join('\n') + (result.stderr ? '\n' + result.stderr.slice(0, 400) : ''));
}
console.log(failed ? '\n' + failed + ' suite(s) failed' : '\nAll suites passed');
process.exit(failed ? 1 : 0);
