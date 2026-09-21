// The key that signs logins, quotes and searched places.
//
// JWT_SECRET is the proper way to set it. But a site that has a database and no JWT_SECRET used to
// refuse every sign-in, which is a hard thing to debug for someone setting Vercel up for the first
// time. So when JWT_SECRET is missing the key is derived from the database connection string
// instead: HMAC-SHA256 with the connection string as the key. That is
//   - stable: every serverless instance and every deploy works out the same key, so tokens keep working
//   - private: the connection string is a secret already, and the key cannot be turned back into it
//   - no weaker in practice: anyone holding the connection string already owns the whole database
// The one catch is that changing the database password (or connecting a different database) signs
// everyone out. Setting JWT_SECRET later does the same, once.
const crypto = require('crypto');

function signingSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  const connection = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!connection) return null;
  return crypto.createHmac('sha256', connection).update('vendaru:signing-key:v1').digest('hex');
}

module.exports = { signingSecret };
