// Backs the address-autocomplete dropdown on the compose screen. No auth,
// same reasoning as reverse-geocode.js: this touches no account data, and
// it needs to answer on every keystroke pause rather than after a login
// round trip.
//
// Deliberately fails soft. A quote's own geocoding (lib/geocode.js's
// computeQuote, via /api/jobs-quote and /api/jobs-create) has to be strict —
// if it can't place an address, the customer needs to know before a price
// is shown. This is different: it's a suggestion list, not a decision, so
// Nominatim being briefly unreachable just means an empty dropdown rather
// than a visible error — the customer can still type the rest of the
// address by hand and get a real answer from Get Quote either way.
const { searchAddresses } = require('../lib/geocode');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }

  const q = String(req.query.q || '').trim();
  // Below this length Nominatim's own results are mostly noise, and it's
  // one keystroke away from firing again anyway — not worth a request.
  if (q.length < 3) {
    res.status(200).json({ results: [] });
    return;
  }

  try {
    const results = await searchAddresses(q, 6);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ results });
  } catch (err) {
    console.error('address-search failed:', err.message);
    res.status(200).json({ results: [] });
  }
};
