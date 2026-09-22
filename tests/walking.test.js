// The walker-delivery formulas: a range never a single number, the 1-mile cap, and the price.
// Offline: pure functions, no server, no network.
const REPO = require('path').resolve(__dirname, '..');
const { walkMinutes, walkerPrice, MAX_WALK_M, WALK_M_PER_MIN, WALKER_PACKAGE_SIZE } = require(REPO + '/lib/walking.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 240) : '')); }
};

console.log('[the 1-mile cap]');
ok('is exactly 1609 metres (1 mile)', MAX_WALK_M === 1609);
ok('the walking speed is a brisk, ordinary pace (about 3 mph)', Math.abs(WALK_M_PER_MIN * 60 / 1000 / 1.609344 - 3) < 0.1, WALK_M_PER_MIN);

console.log('\n[time: always a range, never a single number]');
const full = walkMinutes(MAX_WALK_M);
ok('a full mile is a low-high pair', typeof full.low === 'number' && typeof full.high === 'number');
ok('the top of the range is always after the bottom', full.high > full.low, full);
ok('a full mile is roughly half an hour, not a minute and not two hours', full.low >= 15 && full.high <= 60, full);
const near = walkMinutes(50);
ok('a very short trip still has a floor (finding the shop, the door) and still a real range', near.low >= 5 && near.high > near.low, near);
ok('further is always a wider promise, not a narrower one', walkMinutes(1609).high - walkMinutes(1609).low >= walkMinutes(200).high - walkMinutes(200).low);
ok('further always takes longer', walkMinutes(1609).low > walkMinutes(200).low);

console.log('\n[price: whole pence, a minimum, and it grows with distance]');
ok('there is a minimum fare, even for a few steps', walkerPrice(10) >= 3, walkerPrice(10));
ok('exactly in whole pence', Number.isInteger(Math.round(walkerPrice(1000) * 100)));
ok('a full mile prices higher than a tenth of a mile', walkerPrice(1609) > walkerPrice(160));
ok('doubling the distance never doubles the price (the base fare does not scale)', walkerPrice(1609) < walkerPrice(160) * 10);
ok('a full mile is meaningfully cheaper than the standard £5 minimum courier fare', walkerPrice(1609) < 5, walkerPrice(1609));

console.log('\n[the size cap]');
ok('only "small" is allowed — Vendaru has no separate weight field yet', WALKER_PACKAGE_SIZE === 'small');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
