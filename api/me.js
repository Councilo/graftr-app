const { requireUser } = require('../lib/auth');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res);
    if (!user) return; // requireUser already sent the 401
    res.status(200).json(user);
  } catch (err) {
    sendError(res, err);
  }
};
