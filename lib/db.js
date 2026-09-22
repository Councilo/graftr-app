// Postgres via Vercel's own storage product. A serverless function is a
// fresh process on every cold start, so anything written to local disk (an
// uploaded photo, a SQLite file) can vanish the moment the container that
// held it is recycled — that ruled out the local-file approach the original
// prototype used, and it's why this needs a real hosted database at all.
//
// Attach a Postgres store to this project from the Vercel dashboard's
// Storage tab; that auto-populates POSTGRES_URL, which @vercel/postgres
// reads on its own. Nothing here ever touches the connection string
// directly — it's just not visible to this code.
const { sql } = require('@vercel/postgres');

// Every handler calls ensureSchema() before its real query, so there is no
// separate migration step to remember to run. It used to replay every
// CREATE/ALTER on every cold start; the ALTERs take a brief exclusive lock
// on the table, so that was needless work under load. Now the finished schema
// is stamped with SCHEMA_VERSION in a one-row table, and a cold start against
// an up-to-date database costs one small SELECT.
//
// IF YOU ADD OR CHANGE ANYTHING IN buildSchema(), BUMP SCHEMA_VERSION — that
// is what makes the next deploy re-run it against the live database.
const SCHEMA_VERSION = '2026-09-22-a';

let schemaReady = null;
async function ensureSchema() {
  if (!schemaReady) {
    // A rejected promise must not stay cached: one failed first attempt (two
    // cold starts racing to CREATE the same table, a dropped connection) would
    // otherwise leave this instance answering 500 until it was recycled.
    schemaReady = applySchema().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

async function applySchema() {
  // Name the missing setting instead of failing with an anonymous 500.
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    const err = new Error('POSTGRES_URL is not set');
    err.statusCode = 500;
    err.publicMessage = 'Server is not configured yet (no database connected — POSTGRES_URL is missing) — nothing you did wrong.';
    throw err;
  }
  await sql`
    CREATE TABLE IF NOT EXISTS schema_version (
      id INTEGER PRIMARY KEY,
      version TEXT NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  const current = await sql`SELECT version FROM schema_version WHERE id = 1`;
  if (current.rows[0] && current.rows[0].version === SCHEMA_VERSION) return;

  try {
    await buildSchema();
  } catch (err) {
    // Two instances starting at once can collide creating the same table; the
    // second attempt then finds it already there and goes through.
    await new Promise((resolve) => setTimeout(resolve, 250));
    await buildSchema();
  }
  await sql`
    INSERT INTO schema_version (id, version) VALUES (1, ${SCHEMA_VERSION})
    ON CONFLICT (id) DO UPDATE SET version = EXCLUDED.version, applied_at = now()
  `;
}

async function buildSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('customer', 'courier')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER NOT NULL REFERENCES users(id),
      courier_id INTEGER REFERENCES users(id),
      pickup_address TEXT NOT NULL,
      dropoff_address TEXT NOT NULL,
      pickup_lat DOUBLE PRECISION NOT NULL,
      pickup_lng DOUBLE PRECISION NOT NULL,
      dropoff_lat DOUBLE PRECISION NOT NULL,
      dropoff_lng DOUBLE PRECISION NOT NULL,
      pickup_window_start TIMESTAMPTZ NOT NULL,
      pickup_window_end TIMESTAMPTZ NOT NULL,
      distance_km DOUBLE PRECISION NOT NULL,
      price_gbp DOUBLE PRECISION NOT NULL,
      status TEXT NOT NULL DEFAULT 'OPEN'
        CHECK (status IN ('OPEN', 'ACCEPTED', 'COLLECTED', 'DELIVERED', 'CANCELLED')),
      pickup_photo_url TEXT,
      delivery_photo_url TEXT,
      -- A JSON-encoded [lat,lng] array, the real road route from OSRM.
      -- Stored as plain text rather than JSONB: nothing ever queries
      -- into it, only reads the whole thing back out, so there's no
      -- benefit to JSONB's structure and no driver-specific
      -- serialisation to worry about — see lib/jobs.js for the
      -- JSON.parse on the way out. Null when OSRM had no answer and the
      -- job fell back to a straight line between the two points.
      route_geometry TEXT,
      -- The courier's last reported position while a job is under way —
      -- null until they share it, and never populated once DELIVERED.
      courier_lat DOUBLE PRECISION,
      courier_lng DOUBLE PRECISION,
      courier_location_updated_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      accepted_at TIMESTAMPTZ,
      started_at TIMESTAMPTZ,
      collected_at TIMESTAMPTZ,
      delivered_at TIMESTAMPTZ,
      cancelled_at TIMESTAMPTZ
    )
  `;
  // A table created before this column existed needs it added
  // separately — CREATE TABLE IF NOT EXISTS above is a no-op against an
  // existing table, columns and all, so the new columns wouldn't
  // otherwise appear on a database that already had a jobs table.
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS route_geometry TEXT`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS courier_lat DOUBLE PRECISION`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS courier_lng DOUBLE PRECISION`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ`;
  await sql`CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs (status)`;
  await sql`CREATE INDEX IF NOT EXISTS jobs_customer_idx ON jobs (customer_id)`;
  await sql`CREATE INDEX IF NOT EXISTS jobs_courier_idx ON jobs (courier_id)`;
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      sender_id INTEGER NOT NULL REFERENCES users(id),
      sender_name TEXT NOT NULL,
      sender_role TEXT NOT NULL CHECK (sender_role IN ('customer', 'courier')),
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS messages_job_idx ON messages (job_id)`;
  await sql`CREATE INDEX IF NOT EXISTS messages_created_idx ON messages (created_at)`;

  // ---- accounts: consent, suspension, deletion -------------------------
  // What each person agreed to and when (see lib/legal.js), whether an
  // admin has suspended the account, and when it was deleted. A deleted
  // account is anonymised in place rather than removed, so the jobs,
  // payments and refunds that reference it stay intact.
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS terms_version TEXT`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS location_consent_at TIMESTAMPTZ`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_suspended BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS suspended_reason TEXT`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ`;
  // Optional phone number, seen only by the support team (see handlers/account-profile.js).
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT`;

  // ---- public tracking link --------------------------------------------
  // An unguessable token the customer can hand to whoever is receiving the
  // parcel. See handlers/track.js for exactly what it reveals.
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS tracking_token TEXT`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS jobs_tracking_token_idx ON jobs (tracking_token)`;

  // ---- payments (tracked, settled manually) ----------------------------
  // One record per job. There is no card processing yet: an admin records
  // that payment arrived, and refunds are recorded here too. Deleting a job
  // removes its payment row, which is why handlers/jobs-delete.js refuses to
  // delete any job that has been paid or has refund history.
  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      job_id INTEGER UNIQUE REFERENCES jobs(id) ON DELETE CASCADE,
      customer_id INTEGER NOT NULL REFERENCES users(id),
      amount_gbp DOUBLE PRECISION NOT NULL,
      refunded_gbp DOUBLE PRECISION NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'UNPAID'
        CHECK (status IN ('UNPAID', 'PAID', 'PARTIALLY_REFUNDED', 'REFUNDED', 'VOID')),
      method TEXT NOT NULL DEFAULT 'manual',
      reference TEXT,
      paid_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS payments_customer_idx ON payments (customer_id)`;
  await sql`CREATE INDEX IF NOT EXISTS payments_status_idx ON payments (status)`;

  // ---- refund requests --------------------------------------------------
  await sql`
    CREATE TABLE IF NOT EXISTS refund_requests (
      id SERIAL PRIMARY KEY,
      job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      customer_id INTEGER NOT NULL REFERENCES users(id),
      reason TEXT NOT NULL,
      details TEXT,
      amount_gbp DOUBLE PRECISION NOT NULL,
      status TEXT NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'APPROVED', 'PARTIALLY_APPROVED', 'DENIED', 'AUTO_APPROVED')),
      approved_gbp DOUBLE PRECISION NOT NULL DEFAULT 0,
      decision_note TEXT,
      decided_by INTEGER REFERENCES users(id),
      decided_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS refunds_job_idx ON refund_requests (job_id)`;
  await sql`CREATE INDEX IF NOT EXISTS refunds_customer_idx ON refund_requests (customer_id)`;
  await sql`CREATE INDEX IF NOT EXISTS refunds_status_idx ON refund_requests (status)`;

  // ---- support -----------------------------------------------------------
  await sql`
    CREATE TABLE IF NOT EXISTS support_tickets (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      category TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      job_id INTEGER REFERENCES jobs(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'OPEN'
        CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS tickets_user_idx ON support_tickets (user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS tickets_status_idx ON support_tickets (status)`;
  await sql`
    CREATE TABLE IF NOT EXISTS support_replies (
      id SERIAL PRIMARY KEY,
      ticket_id INTEGER NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
      sender_role TEXT NOT NULL CHECK (sender_role IN ('user', 'admin')),
      sender_name TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS replies_ticket_idx ON support_replies (ticket_id)`;

  // ---- admin audit trail and rate limiting ------------------------------
  await sql`
    CREATE TABLE IF NOT EXISTS audit_log (
      id SERIAL PRIMARY KEY,
      actor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      action TEXT NOT NULL,
      target TEXT,
      details TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS rate_events (
      id SERIAL PRIMARY KEY,
      key TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS rate_events_key_idx ON rate_events (key, created_at)`;

  // ---- in-app voice calls (see lib/calls.js) ----------------------------------
  // Who called whom about which delivery, and how it went. The two SDP strings are
  // the call-setup messages passed between the phones; the audio itself is never
  // sent through or stored by this server.
  await sql`
    CREATE TABLE IF NOT EXISTS calls (
      id SERIAL PRIMARY KEY,
      job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      caller_id INTEGER NOT NULL REFERENCES users(id),
      callee_id INTEGER NOT NULL REFERENCES users(id),
      status TEXT NOT NULL DEFAULT 'RINGING'
        CHECK (status IN ('RINGING', 'ACTIVE', 'ENDED', 'DECLINED', 'CANCELLED', 'MISSED')),
      offer TEXT NOT NULL,
      answer TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      answered_at TIMESTAMPTZ,
      heartbeat_at TIMESTAMPTZ,
      ended_at TIMESTAMPTZ
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS calls_job_idx ON calls (job_id, status)`;
  await sql`CREATE INDEX IF NOT EXISTS calls_callee_idx ON calls (callee_id, status)`;

  // ---- order options: contacts, handover, instructions, package size, PIN ----
  // What a customer chooses on the review screen (see lib/order-options.js). The contact
  // names and instructions are only ever shown to the courier who accepted the job.
  // delivery_pin is set only when the customer asked for PIN confirmation.
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS customer_is_recipient BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS pickup_contact_name TEXT`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS dropoff_contact_name TEXT`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS pickup_handover TEXT NOT NULL DEFAULT 'kerb'`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS dropoff_handover TEXT NOT NULL DEFAULT 'kerb'`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS pickup_instructions TEXT`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS dropoff_instructions TEXT`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS package_size TEXT NOT NULL DEFAULT 'medium'`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS delivery_pin TEXT`;

  // ---- catch-up for databases created by an older version ----------------
  // CREATE TABLE IF NOT EXISTS never alters a table that already exists, so a
  // column or constraint added to the definitions above later has to be
  // applied to an existing database here, separately.
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS courier_location_updated_at TIMESTAMPTZ`;

  // When the courier pressed Start order (set off for the pickup). Their position is only
  // shared, and only shown to the customer, from then on.
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ`;

  // ---- email: confirming addresses and resetting passwords
  // When the person confirmed their email. Everyone who already had an account when this shipped is
  // treated as confirmed: the DEFAULT fills the existing rows once when the column is first added, and
  // is then dropped so new sign-ups start unconfirmed (register also inserts an explicit NULL, so a
  // failed DROP DEFAULT can never quietly confirm anyone).
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ DEFAULT now()`;
  try {
    await sql`ALTER TABLE users ALTER COLUMN email_verified_at DROP DEFAULT`;
  } catch (err) {
    console.warn('schema: could not drop the default on users.email_verified_at —', err && err.message);
  }
  // A password reset signs out every session issued before it.
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS password_changed_at TIMESTAMPTZ`;
  // The links in confirmation and reset emails. Only a hash of each token is kept.
  await sql`
    CREATE TABLE IF NOT EXISTS email_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      purpose TEXT NOT NULL CHECK (purpose IN ('verify', 'reset')),
      email TEXT NOT NULL,
      token_hash TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS email_tokens_hash_idx ON email_tokens (token_hash)`;

  // Stops one quote being posted twice (a double-tap, or a replayed request):
  // the SHA-256 of the signed quote token is stored with the job, and the same
  // customer can't have two jobs from the same quote.
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS quote_ref TEXT`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS jobs_quote_ref_idx ON jobs (customer_id, quote_ref)`;

  await sql`CREATE INDEX IF NOT EXISTS jobs_customer_created_idx ON jobs (customer_id, created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS messages_job_created_idx ON messages (job_id, created_at)`;

  // ---- walkers: on-foot delivery from a courier with no car or bike ----
  // A courier's mode: the same account, not a new role, since a walker still does everything a
  // courier does (accept, chat, be tracked) — only which jobs they can take differs. 'driver' or
  // 'walker', enforced in application code (handlers/account-courier-mode.js) the same way
  // pickup_handover and package_size are — no DB-level CHECK, matching how those columns are done.
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS courier_mode TEXT NOT NULL DEFAULT 'driver'`;
  // A job's product: 'standard' (a driver or bike courier, any distance) or 'walker' (on foot, at
  // most a mile). walk_minutes_low/high are what the customer was promised at the time they ordered
  // — kept so a promise can be checked against what actually happened, not just what the formula
  // would say today if the formula changes later. walker_ack_at is when they ticked that they
  // understood it would be slower; jobs-create refuses to create a walker job without it.
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'standard'`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS walk_distance_m DOUBLE PRECISION`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS walk_minutes_low INTEGER`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS walk_minutes_high INTEGER`;
  await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS walker_ack_at TIMESTAMPTZ`;

  // An older database's status CHECK may predate 'CANCELLED', which would
  // reject every cancel. Postgres names an inline column check
  // <table>_<column>_check, so replace exactly that one. Wrapped because a
  // failed tidy-up must never stop the app starting — the CHECK it would
  // replace is only ever too narrow, never wrong.
  try {
    await sql`ALTER TABLE jobs DROP CONSTRAINT IF EXISTS jobs_status_check`;
    await sql`
      ALTER TABLE jobs ADD CONSTRAINT jobs_status_check
      CHECK (status IN ('OPEN', 'ACCEPTED', 'COLLECTED', 'DELIVERED', 'CANCELLED'))
    `;
  } catch (err) {
    console.warn('schema: could not refresh jobs_status_check —', err && err.message);
  }

  // Email addresses are compared case-insensitively everywhere in the code
  // (they are lower-cased on the way in); this makes the database enforce it
  // too. It can only fail if an old database already holds two accounts whose
  // emails differ only by case — those need merging by hand, and until then
  // the code-level check still applies.
  try {
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (lower(email))`;
  } catch (err) {
    console.warn('schema: could not create users_email_lower_idx —', err && err.message);
  }
}

module.exports = { sql, ensureSchema };
