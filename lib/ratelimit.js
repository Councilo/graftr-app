// A small database-backed rate limiter.
//
// A serverless function has no memory that survives between requests (or is
// shared between instances), so an in-process counter would protect nothing.
// Instead each counted event is a row in rate_events, and a check is "how many
// rows with this key in the last N seconds". It costs one indexed query per
// protected request, which is fine at this scale and needs no extra service.
//
// Used for the things that can be hammered from outside: guessing passwords,
// mass-registering, spamming support, and guessing tracking links.
const { sql, ensureSchema } = require('./db');

function clientIp(req) {
  const forwarded = String((req.headers && req.headers['x-forwarded-for']) || '').split(',')[0].trim();
  return forwarded || (req.socket && req.socket.remoteAddress) || 'unknown';
}

async function countRecent(key, windowSeconds) {
  await ensureSchema();
  const since = new Date(Date.now() - windowSeconds * 1000).toISOString();
  const { rows } = await sql`SELECT count(*) AS n FROM rate_events WHERE key = ${key} AND created_at > ${since}`;
  return Number(rows[0].n);
}

async function record(key) {
  await ensureSchema();
  await sql`INSERT INTO rate_events (key) VALUES (${key})`;
  // Housekeeping: now and then, drop anything a day old so the table stays small.
  if (Math.random() < 0.02) {
    const old = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    await sql`DELETE FROM rate_events WHERE created_at < ${old}`;
  }
}

// Is this key already over its limit? (Counts only; does not record.)
async function isLimited(key, limit, windowSeconds) {
  return (await countRecent(key, windowSeconds)) >= limit;
}

// Count one event against the key, unless it is already over the limit.
// Returns { allowed, retryAfter } — retryAfter is the window, a safe upper
// bound on how long to wait.
async function hit(key, limit, windowSeconds) {
  if (await isLimited(key, limit, windowSeconds)) return { allowed: false, retryAfter: windowSeconds };
  await record(key);
  return { allowed: true, retryAfter: 0 };
}

// Sends the standard 429 and returns true when the request should stop.
function tooMany(res, retryAfter, what = 'attempts') {
  res.setHeader('Retry-After', String(retryAfter));
  res.status(429).json({ detail: `Too many ${what}. Please wait a while and try again.` });
  return true;
}

module.exports = { clientIp, isLimited, record, hit, tooMany };
