// A place the search dropdown offered, signed so it can be trusted later.
//
// When a customer picks "Piccadilly Gardens, Manchester, M1 1AF" from the
// dropdown, the exact coordinates of that result are already known. Sending
// only the text back would make the quote look the place up a second time
// from the words alone, which can land somewhere else (or nowhere, if the
// label is worded differently from what the quote geocoder expects). So each
// result carries a token binding its label to its coordinates; the quote
// endpoint verifies it and uses those coordinates directly.
//
// The signature is what makes that safe: coordinates can't be edited to
// shrink a trip and its price, and a token only counts for the label it was
// issued with — edit the text and the token stops applying. It has no `sub`
// or `role` and carries `p: 1`, so it can never be mistaken for a login token.
//
// Tokens are best-effort. Without JWT_SECRET the search still works (it must,
// it's a public search box) and simply hands out none; the quote then falls
// back to geocoding the text, exactly as before.
const jwt = require('jsonwebtoken');
const { signingSecret } = require('./secret');

const PLACE_TTL = '2h';

function signPlace(label, lat, lng) {
  const secret = signingSecret();
  if (!secret) return null;
  return jwt.sign({ p: 1, l: label, lat, lng }, secret, { expiresIn: PLACE_TTL });
}

// { lat, lng, display_name } when the token is genuine, unexpired, and was
// issued for exactly this label; otherwise null.
function verifyPlace(token, label) {
  const secret = signingSecret();
  if (!secret || typeof token !== 'string' || !token) return null;
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch {
    return null;
  }
  if (!payload || payload.p !== 1 || payload.l !== label) return null;
  if (!Number.isFinite(payload.lat) || !Number.isFinite(payload.lng)) return null;
  return { lat: payload.lat, lng: payload.lng, display_name: label };
}

module.exports = { signPlace, verifyPlace };
