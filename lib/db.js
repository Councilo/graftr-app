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

// CREATE TABLE IF NOT EXISTS is cheap on a table that already exists — a few
// milliseconds of metadata lookup — so every handler calling this before its
// real query means there's no separate migration step to remember to run.
// That trade only holds at prototype scale; a schema change against real
// data would need a proper migration, not a wider IF NOT EXISTS.
let schemaReady = null;
async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
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
            CHECK (status IN ('OPEN', 'ACCEPTED', 'COLLECTED', 'DELIVERED')),
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
          collected_at TIMESTAMPTZ,
          delivered_at TIMESTAMPTZ
        )
      `;
      // A table created before this column existed needs it added
      // separately — CREATE TABLE IF NOT EXISTS above is a no-op against an
      // existing table, columns and all, so the new columns wouldn't
      // otherwise appear on a database that already had a jobs table.
      await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS route_geometry TEXT`;
      await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS courier_lat DOUBLE PRECISION`;
      await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS courier_lng DOUBLE PRECISION`;
      await sql`ALTER TABLE jobs ADD COLUMN IF NOT EXISTS courier_location_updated_at TIMESTAMPTZ`;
      await sql`CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs (status)`;
      await sql`CREATE INDEX IF NOT EXISTS jobs_customer_idx ON jobs (customer_id)`;
      await sql`CREATE INDEX IF NOT EXISTS jobs_courier_idx ON jobs (courier_id)`;
    })();
  }
  await schemaReady;
}

module.exports = { sql, ensureSchema };
