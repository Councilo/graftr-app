// Records an agreement after sign-up: a courier who signed up before location
// consent existed agreeing now, or anyone accepting an updated version of the
// terms. Consent is only ever recorded when the request says so explicitly.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { TERMS_VERSION } = require('../lib/legal');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return;

    const body = req.body || {};
    if (body.location !== true && body.terms !== true) {
      res.status(422).json({ detail: 'Nothing to record: send location: true and/or terms: true' });
      return;
    }
    await ensureSchema();
    if (body.location === true) {
      await sql`UPDATE users SET location_consent_at = now() WHERE id = ${user.id}`;
    }
    if (body.terms === true) {
      await sql`UPDATE users SET terms_accepted_at = now(), terms_version = ${TERMS_VERSION} WHERE id = ${user.id}`;
    }
    const { rows } = await sql`SELECT terms_accepted_at, terms_version, location_consent_at FROM users WHERE id = ${user.id}`;
    res.status(200).json(rows[0]);
  } catch (err) {
    sendError(res, err);
  }
};
