// The signing key: JWT_SECRET when set, otherwise one derived from the database connection string,
// so a site with a database attached can sign people in before JWT_SECRET has been added.
// Offline: needs no server.
const REPO = require('path').resolve(__dirname, '..');
delete process.env.JWT_SECRET; delete process.env.POSTGRES_URL; delete process.env.DATABASE_URL;
const jwt = require('jsonwebtoken');
const { signingSecret } = require(REPO + '/lib/secret.js');
const { requireSecret, signToken } = require(REPO + '/lib/auth.js');
const { signQuote, verifyQuote } = require(REPO + '/lib/quote-token.js');
const { signPlace, verifyPlace } = require(REPO + '/lib/place-token.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 240) : '')); }
};
const threw = (fn) => { try { fn(); return null; } catch (e) { return e; } };
const URL_A = 'postgres://user:pw-one@db-a.example.com/vendaru?sslmode=require';
const URL_B = 'postgres://user:pw-two@db-a.example.com/vendaru?sslmode=require';

console.log('[with nothing set]');
ok('there is no key', signingSecret() === null);
const err = threw(() => requireSecret());
ok('signing in fails loudly with a 500 that says what is missing', err && err.statusCode === 500 && /JWT_SECRET/.test(err.publicMessage), err && err.publicMessage);
ok('place search still works, it just hands out no tokens', signPlace('x', 1, 2) === null);

console.log('\n[JWT_SECRET set]');
process.env.JWT_SECRET = 'a-real-secret-set-by-the-owner';
process.env.POSTGRES_URL = URL_A;
ok('JWT_SECRET is used as it is, even with a database attached', signingSecret() === 'a-real-secret-set-by-the-owner');
const withSecret = signToken({ id: 5, role: 'customer' });
ok('login tokens are signed with it', !!jwt.verify(withSecret, 'a-real-secret-set-by-the-owner').sub);

console.log('\n[no JWT_SECRET, database attached]');
delete process.env.JWT_SECRET;
const k1 = signingSecret();
ok('a key is derived from POSTGRES_URL', typeof k1 === 'string' && /^[0-9a-f]{64}$/.test(k1), k1);
ok('it is the same every time (every instance and deploy agrees)', signingSecret() === k1);
ok('it does not contain the connection string or its password', !k1.includes('pw-one') && !k1.includes('db-a.example.com'));
process.env.POSTGRES_URL = URL_B;
ok('a different connection string gives a different key', signingSecret() !== k1);
delete process.env.POSTGRES_URL; process.env.DATABASE_URL = URL_A;
ok('DATABASE_URL works the same when POSTGRES_URL is absent', signingSecret() === k1);
process.env.POSTGRES_URL = URL_A; delete process.env.DATABASE_URL;

const login = signToken({ id: 7, role: 'courier' });
const payload = jwt.verify(login, requireSecret());
ok('login tokens sign and verify with the derived key', payload.sub === 7 && payload.role === 'courier', payload);
ok('the derived key is what signed it, not the raw connection string', threw(() => jwt.verify(login, URL_A)) !== null);

const q = { pickup_lat: 53.4, pickup_lng: -2.2, dropoff_lat: 53.5, dropoff_lng: -2.3, distance_km: 5, price_gbp: 9.5 };
const quote = signQuote(7, 'A street', 'B street', q);
ok('quotes sign and verify with the derived key', !!verifyQuote(quote, 7, 'A street', 'B street'));
const place = signPlace('Piccadilly', 53.48, -2.23);
ok('searched places sign and verify with the derived key', !!place && verifyPlace(place, 'Piccadilly').lat === 53.48);

console.log('\n[tokens do not carry over to a different database]');
process.env.POSTGRES_URL = URL_B;
ok('a login from the old key is refused under the new one', threw(() => jwt.verify(login, requireSecret())) !== null);
ok('a quote from the old key is refused under the new one', verifyQuote(quote, 7, 'A street', 'B street') === null);
ok('a place from the old key is refused under the new one', verifyPlace(place, 'Piccadilly') === null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
