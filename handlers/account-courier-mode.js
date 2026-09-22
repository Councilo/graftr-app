// A courier switches between driving/cycling deliveries (any distance) and walking them (on foot, at
// most a mile — see lib/walking.js). It is the same account either way, so switching is instant and
// free; jobs-available and jobs-accept both key off this to keep the two kinds of work separate.
const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { sendError } = require('../lib/respond');

const MODES = ['driver', 'walker'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const courier = await requireRole(req, res, 'courier');
    if (!courier) return;

    const mode = (req.body || {}).mode;
    if (!MODES.includes(mode)) {
      res.status(422).json({ detail: `mode must be one of: ${MODES.join(', ')}` });
      return;
    }

    await ensureSchema();
    await sql`UPDATE users SET courier_mode = ${mode} WHERE id = ${courier.id}`;
    res.status(200).json({ courier_mode: mode });
  } catch (err) {
    sendError(res, err);
  }
};
