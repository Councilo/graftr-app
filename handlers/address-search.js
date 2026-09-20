// Backs the address search-as-you-type dropdown on the compose screen. No
// auth: it touches no account data, and it has to answer on every keystroke
// pause rather than after a login round trip.
//
// A search that can't be answered is reported, not hidden. It still returns
// 200 with an empty list (a failing suggestion box must never break the form
// around it), but flags `error: true` so the dropdown can say "couldn't search
// right now — type the full address" instead of looking like nothing matched.
const { searchAddresses } = require('../lib/geocode');
const { signPlace } = require('../lib/place-token');
const { clientIp, hit, tooMany } = require('../lib/ratelimit');

const MAX_QUERY_LENGTH = 120;

// ?near=lat,lng — optional ranking bias, e.g. the pickup while typing the drop-off.
function parseNear(value) {
  if (typeof value !== 'string') return null;
  const [lat, lng] = value.split(',').map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }

  const q = String(req.query.q || '').trim();
  // Below this length the results are mostly noise, and it's one keystroke
  // away from firing again anyway — not worth a request.
  if (q.length < 3 || q.length > MAX_QUERY_LENGTH) {
    res.status(200).json({ results: [] });
    return;
  }

  try {
    // Open to anyone, so bounded per address: the free services behind it
    // would block the whole site if one visitor hammered them.
    const limit = await hit(`addr:${clientIp(req)}`, 120, 60);
    if (!limit.allowed) return tooMany(res, limit.retryAfter, 'searches');
    const found = await searchAddresses(q, { near: parseNear(req.query.near) });
    const results = found.map((r) => ({ ...r, token: signPlace(r.display_name, r.lat, r.lng) }));
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ results });
  } catch (err) {
    console.error('address-search failed:', err.message);
    res.status(200).json({ results: [], error: true });
  }
};
