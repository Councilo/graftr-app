// The connection helper servers a phone needs to set up a call (see lib/calls.js).
// Signed-in users only: the TURN credentials shouldn't be handed to strangers.
const { requireUser } = require('../lib/auth');
const { iceServers } = require('../lib/calls');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return;
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ iceServers: iceServers() });
  } catch (err) {
    sendError(res, err);
  }
};
