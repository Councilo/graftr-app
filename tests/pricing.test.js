// Unit checks for the per-mile pricing in lib/geocode.js (no network).
const { quotePrice, distanceMiles, PRICING } = require('../lib/geocode.js');
let pass = 0, fail = 0;
const eq = (name, got, want) => {
  if (got === want) { pass++; console.log('  ok   ' + name + ' = ' + got); }
  else { fail++; console.log('  FAIL ' + name + ': got ' + got + ', want ' + want); }
};
const KM = 1.609344;
console.log('pricing config', JSON.stringify(PRICING));
eq('0 km -> minimum fare', quotePrice(0), 5);
eq('1 mile -> min (3.50+1.37=4.87 < 5)', quotePrice(1 * KM), 5);
eq('1.1 miles -> 3.50+1.507=5.007 -> 5.01', quotePrice(1.1 * KM), 5.01);
eq('5 miles -> 3.50+6.85', quotePrice(5 * KM), 10.35);
eq('10 miles -> 3.50+13.70', quotePrice(10 * KM), 17.2);
eq('15.5 miles (half-penny case 24.735) rounds UP', quotePrice(15.5 * KM), 24.74);
eq('100 miles -> 3.50+137', quotePrice(100 * KM), 140.5);
eq('distanceMiles(24.9 km) = 15.5', distanceMiles(24.9), 15.5);
// The customer-checkable identity: price === base + shown miles x rate (when above the minimum).
let identityFails = 0;
for (let km = 3; km < 400; km += 0.37) {
  const mi = distanceMiles(km);
  const want = Math.round((350 * 10 + 137 * Math.round(mi * 10)) / 10) / 100;
  if (Math.abs(quotePrice(km) - want) > 1e-9) identityFails++;
}
eq('price == base + displayed miles x rate over 1000 distances', identityFails, 0);
// Monotonic: a longer trip never costs less.
let mono = true, prev = 0;
for (let km = 0; km < 500; km += 0.05) { const p = quotePrice(km); if (p < prev) mono = false; prev = p; }
eq('price never decreases with distance', mono, true);
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
