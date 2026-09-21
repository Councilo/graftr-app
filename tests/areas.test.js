// What a courier sees of an open job: the town and postcode of each end, and pins rounded to about 100 m.
// Offline: needs no server.
const REPO = require('path').resolve(__dirname, '..');
const { courierAreaLabel, publicJobView, roundPin } = require(REPO + '/lib/areas.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 240) : '')); }
};
const label = (a) => courierAreaLabel(a, 'FALLBACK');

console.log('[labels: town and whole postcode, never the street]');
ok('house, street, town, postcode, country', label('Flat 7, 12 High Street, Bolton BL1 1AA, UK') === 'Bolton BL1 1AA');
ok('postcode as its own last part', label('1A Piccadilly Gardens, City Centre, Manchester, M1 1AF') === 'Manchester M1 1AF');
ok('lower case and no space in the postcode are tidied', label('4 Kings Road, Leeds ls12ht') === 'Leeds LS1 2HT', label('4 Kings Road, Leeds ls12ht'));
ok('a postcode on its own is just the postcode', label('SW1A 1AA') === 'SW1A 1AA');
ok('no postcode: the town', label('Piccadilly Gardens, Manchester') === 'Manchester');
ok('nothing usable: the fallback, which is not "hidden"', label('Paddington Station') === 'FALLBACK' && label('') === 'FALLBACK' && !/hidden/i.test('FALLBACK'));
ok('the street and house number never appear', !/High Street|Flat 7|\b12\b/.test(label('Flat 7, 12 High Street, Bolton BL1 1AA, UK')));

console.log('\n[pins: about 100 m]');
ok('three decimal places', roundPin(53.5812) === 53.581 && roundPin(-2.4321) === -2.432 && roundPin(53.7998) === 53.8);
ok('the rounding moves a point by less than 60 m north-south', Math.abs(roundPin(53.58149) - 53.58149) * 111000 < 60);

console.log('\n[the marketplace view of a job]');
const job = {
  id: 9, status: 'OPEN', customer_id: 3, tracking_token: 'secret', delivery_pin: '1234', pickup_contact_name: 'Sam',
  pickup_address: 'Flat 7, 12 High Street, Bolton BL1 1AA, UK', dropoff_address: '4 Kings Road, Leeds LS1 2HT, UK',
  pickup_lat: 53.5812, pickup_lng: -2.4321, dropoff_lat: 53.7998, dropoff_lng: -1.5491,
  route_geometry: [[53.5812, -2.4321], [53.6, -2.3], [53.7998, -1.5491]], distance_km: 60, price_gbp: 40.5,
};
const v = publicJobView(job);
const text = JSON.stringify(v);
ok('labels are the town and postcode', v.pickup_address === 'Bolton BL1 1AA' && v.dropoff_address === 'Leeds LS1 2HT', [v.pickup_address, v.dropoff_address]);
ok('pins are rounded', v.pickup_lat === 53.581 && v.pickup_lng === -2.432 && v.dropoff_lat === 53.8 && v.dropoff_lng === -1.549);
ok('the stored route, which runs to the exact doors, is not sent', v.route_geometry === null && !text.includes('53.5812') && !text.includes('-2.4321'));
ok('distance, price and the masked flag are still there', v.distance_km === 60 && v.price_gbp === 40.5 && v.masked === true);
ok('nothing private leaks (customer, token, PIN, contact, street)', !/customer_id|tracking_token|delivery_pin|contact|High Street|Flat 7|Kings Road/.test(text), text);
ok('it never says the area is hidden', !/hidden|until accepted/i.test(text));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
