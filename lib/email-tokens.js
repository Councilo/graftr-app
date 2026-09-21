// The links in "confirm your email" and "reset your password" emails.
//
// The token is 32 random bytes; only its SHA-256 goes in the database, so a database leak can't be
// turned into working links. Each is single-use and expires (48 hours to confirm, 1 hour to reset),
// only the newest link of each kind works, and a link is tied to the address it was sent to: if
// someone changes their email after asking for a link, the old link stops working.
const crypto = require('crypto');
const { sql, ensureSchema } = require('./db');

const LIFETIME_SECONDS = { verify: 48 * 60 * 60, reset: 60 * 60 };
const hash = (token) => crypto.createHash('sha256').update(token).digest('hex');

async function createToken(userId, purpose, email) {
  if (!LIFETIME_SECONDS[purpose]) throw new Error('unknown token purpose');
  await ensureSchema();
  const token = crypto.randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + LIFETIME_SECONDS[purpose] * 1000).toISOString();
  await sql`UPDATE email_tokens SET used_at = now() WHERE user_id = ${userId} AND purpose = ${purpose} AND used_at IS NULL`;
  await sql`
    INSERT INTO email_tokens (user_id, purpose, email, token_hash, expires_at)
    VALUES (${userId}, ${purpose}, ${String(email).toLowerCase()}, ${hash(token)}, ${expires})
  `;
  return token;
}

// Uses the token up and says who it was for: { userId, email }, or null if it is unknown, expired or
// already used. One UPDATE decides it, so two clicks at the same instant can't both succeed.
async function consumeToken(token, purpose) {
  if (typeof token !== 'string' || token.length < 20 || token.length > 100) return null;
  await ensureSchema();
  const { rows } = await sql`
    UPDATE email_tokens SET used_at = now()
    WHERE token_hash = ${hash(token)} AND purpose = ${purpose} AND used_at IS NULL AND expires_at > now()
    RETURNING user_id, email
  `;
  return rows[0] ? { userId: rows[0].user_id, email: rows[0].email } : null;
}

module.exports = { createToken, consumeToken };
