// compactAddress: a courier-friendly street address from Nominatim reverse-geocode data. No network.
const REPO = require('path').resolve(__dirname, '..');
const { compactAddress } = require(REPO + '/lib/geocode.js');

let pass = 0, fail = 0;
const eq = (name, got, want) => {
  if (got === want) { pass++; console.log('  ok   ' + name + '  ->  ' + got); }
  else { fail++; console.log('  FAIL ' + name + '\n       got:  ' + got + '\n       want: ' + want); }
};

// The real response that started this (Piccadilly Gardens): a shop's name leads the long form.
eq('drops the shop name, keeps number + street, area, town, postcode',
  compactAddress({ name: 'Bunsik', display_name: 'Bunsik, 1A, Piccadilly Gardens, Piccadilly, City Centre, Manchester, Greater Manchester, England, M1 1AF, United Kingdom',
    address: { amenity: 'Bunsik', house_number: '1A', road: 'Piccadilly Gardens', neighbourhood: 'Piccadilly', suburb: 'City Centre', city: 'Manchester', state_district: 'Greater Manchester', state: 'England', postcode: 'M1 1AF', country: 'United Kingdom', country_code: 'gb' } }),
  '1A Piccadilly Gardens, City Centre, Manchester, M1 1AF');

eq('a plain house',
  compactAddress({ display_name: 'x', address: { house_number: '12', road: 'High Street', city: 'Leeds', postcode: 'LS1 1AA' } }),
  '12 High Street, Leeds, LS1 1AA');

eq('a village: the village is the town',
  compactAddress({ display_name: 'x', address: { house_number: '4', road: 'Kings Road', village: 'Bramhope', county: 'West Yorkshire', postcode: 'LS16 9JN' } }),
  '4 Kings Road, Bramhope, LS16 9JN');

eq('no house number: just the street',
  compactAddress({ display_name: 'x', address: { road: 'Sefton Street', suburb: 'Crumpsall', city: 'Manchester', postcode: 'M8 5AH' } }),
  'Sefton Street, Crumpsall, Manchester, M8 5AH');

eq('a suburb equal to the town is not repeated',
  compactAddress({ display_name: 'x', address: { house_number: '9', road: 'Mill Lane', suburb: 'Bolton', town: 'Bolton', postcode: 'BL1 1AA' } }),
  '9 Mill Lane, Bolton, BL1 1AA');

eq('footpath / pedestrian roads still count as a street',
  compactAddress({ display_name: 'x', address: { pedestrian: 'Market Street', city: 'Manchester', postcode: 'M1 1PT' } }),
  'Market Street, Manchester, M1 1PT');

eq('no street at all (a park): the place name leads',
  compactAddress({ name: 'Heaton Park', display_name: 'x', address: { leisure: 'Heaton Park', suburb: 'Heaton', city: 'Manchester', postcode: 'M25 2SW' } }),
  'Heaton Park, Heaton, Manchester, M25 2SW');

eq('a house number without a road is not a headline: the place name leads',
  compactAddress({ name: 'Tesco Extra', display_name: 'x', address: { house_number: '7', city: 'Leeds', postcode: 'LS1 2AB' } }),
  'Tesco Extra, Leeds, LS1 2AB');

eq('too little to build from: falls back to the long form',
  compactAddress({ display_name: 'Some Place, Somewhere, England, United Kingdom', address: { country: 'United Kingdom' } }),
  'Some Place, Somewhere, England, United Kingdom');

eq('no address object at all: falls back to the long form',
  compactAddress({ display_name: 'Just A Name' }),
  'Just A Name');

eq('nothing at all: null, not a crash', compactAddress(null), null);
eq('empty object: null', compactAddress({}), null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
