// Password hashing and bearer-token auth for the API.
//
// bcryptjs, not bcrypt: bcrypt's native binding has to compile for whatever
// platform builds it, which is a real source of "works locally, breaks in
// Vercel's build image" failures. bcryptjs is pure JS — slower per hash, and
// at this app's scale that difference is not something anyone will notice.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, ensureSchema } = require('./db');

// Required, not defaulted. The original prototype (a single long-running
// process) could fall back to a random key generated at startup — a
// perfectly fine dev convenience there, since the key just needs to outlive
// one process. A serverless function has no equivalent "one process": it
// cold-starts repeatedly, on however many instances load balances it, and a
// key invented fresh each time would invalidate every token constantly, in
// production, for real users. So there's no fallback here — a missing
// JWT_SECRET fails loudly (see requireEnv below) rather than quietly
// signing tokens that stop working at random.
function requireSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error('JWT_SECRET is not set');
    err.statusCode = 500;
    err.publicMessage = 'Server is not configured yet (missing JWT_SECRET) — nothing you did wrong.';
    throw err;
  }
  return secret;
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, requireSecret(), { expiresIn: '12h' });
}

// Reads Authorization: Bearer <token>, verifies it, and loads the current
// user row from the database. Returns null for anything wrong with the
// token; the caller decides what HTTP status that becomes.
async function userFromRequest(req) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return null;

  let payload;
  try {
    payload = jwt.verify(token, requireSecret());
  } catch (err) {
    // A missing JWT_SECRET is a setup problem to report, not a bad token: swallowing
    // it made every signed-in request look signed-out and wiped the stored login.
    if (err && err.statusCode) throw err;
    return null;
  }

  await ensureSchema();
  const { rows } = await sql`
    SELECT id, email, full_name, role, is_suspended, suspended_reason, deleted_at,
           terms_accepted_at, terms_version, location_consent_at, phone
    FROM users WHERE id = ${payload.sub}
  `;
  const user = rows[0];
  // A deleted account (anonymised in place) can never sign in again, even
  // with a token issued before it was deleted.
  if (!user || user.deleted_at) return null;
  return { ...user, is_admin: isAdminEmail(user.email) };
}

// Admins are whoever's email is listed in the ADMIN_EMAILS environment
// variable (comma separated). Keeping it in the environment rather than the
// database means there is no admin account to create, forget, or have
// created by someone else through the public sign-up form: only someone who
// controls the Vercel project can make an admin, and the person still has to
// sign in as that email.
function isAdminEmail(email) {
  const list = String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(String(email || '').trim().toLowerCase());
}

// Sends a 401 and returns null if there's no valid session; otherwise
// returns the user. Endpoints call `const user = await requireUser(req, res);
// if (!user) return;` — the response is already sent in the failure case.
//
// A suspended account is refused everywhere (403 with the reason) except the
// few places that must keep working so the person can find out why and ask
// for help: pass { allowSuspended: true } there.
async function requireUser(req, res, options = {}) {
  const user = await userFromRequest(req);
  if (!user) {
    res.status(401).json({ detail: 'Not authenticated' });
    return null;
  }
  if (user.is_suspended && !options.allowSuspended) {
    res.status(403).json({
      detail: 'This account has been suspended. Contact support@vendaru.com for help.',
      suspended: true,
    });
    return null;
  }
  return user;
}

// Same, but 403s a user whose role doesn't match — a customer calling a
// courier-only endpoint, or vice versa.
async function requireRole(req, res, role, options = {}) {
  const user = await requireUser(req, res, options);
  if (!user) return null;
  if (user.role !== role) {
    res.status(403).json({ detail: `This action requires a ${role} account` });
    return null;
  }
  return user;
}

// Admin-only endpoints. Answers 403 (not 404) to a signed-in non-admin, so a
// legitimate admin who mistyped an email finds out why.
async function requireAdmin(req, res) {
  const user = await requireUser(req, res);
  if (!user) return null;
  if (!user.is_admin) {
    res.status(403).json({ detail: 'Admin access required' });
    return null;
  }
  return user;
}

module.exports = {
  hashPassword, verifyPassword, signToken, userFromRequest,
  requireUser, requireRole, requireAdmin, isAdminEmail, requireSecret,
};
