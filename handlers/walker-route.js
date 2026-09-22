const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { geocode } = require('../lib/geocode');
const { walkingRoute } = require('../lib/walking');
const { sendError } = require('../lib/respond');

// Same cap as an ordinary job's addresses (jobs-create.js, shop-post-bag.js) — free text people type,
// so a request can't make the server store (and later render) something unbounded.
const MAX_ADDRESS_LENGTH = 300;

module.exports = async (req, res) => {
  try {
    const courier = await requireRole(req, res, 'courier');
    if (!courier) return;
    if (courier.courier_mode !== 'walker') {
      res.status(403).json({ detail: 'Route mode is only available to walker couriers.' });
      return;
    }

    await ensureSchema();

    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT * FROM walker_routes
        WHERE walker_id = ${courier.id} AND expires_at > now()
      `;
      const route = rows[0] || null;
      if (route && route.geometry) route.geometry = JSON.parse(route.geometry);
      res.status(200).json({ route });
      return;
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      let fromLat = body.from_lat != null ? Number(body.from_lat) : null;
      let fromLng = body.from_lng != null ? Number(body.from_lng) : null;
      let toLat = body.to_lat != null ? Number(body.to_lat) : null;
      let toLng = body.to_lng != null ? Number(body.to_lng) : null;

      // Geocode text addresses if lat/lng not provided. Number.isFinite (not the global isFinite,
      // which coerces first) so a string or other junk value is treated the same as missing, not
      // silently accepted.
      if (typeof body.from_address === 'string' && body.from_address.length > MAX_ADDRESS_LENGTH) {
        res.status(422).json({ detail: `from_address can be at most ${MAX_ADDRESS_LENGTH} characters` });
        return;
      }
      if (typeof body.to_address === 'string' && body.to_address.length > MAX_ADDRESS_LENGTH) {
        res.status(422).json({ detail: `to_address can be at most ${MAX_ADDRESS_LENGTH} characters` });
        return;
      }
      if (body.from_address && !Number.isFinite(fromLat)) {
        const g = await geocode(body.from_address);
        if (!g) { res.status(422).json({ detail: `Could not find address: ${body.from_address}` }); return; }
        fromLat = g.lat; fromLng = g.lng;
      }
      if (body.to_address && !Number.isFinite(toLat)) {
        const g = await geocode(body.to_address);
        if (!g) { res.status(422).json({ detail: `Could not find address: ${body.to_address}` }); return; }
        toLat = g.lat; toLng = g.lng;
      }

      if (!Number.isFinite(fromLat) || !Number.isFinite(fromLng) || !Number.isFinite(toLat) || !Number.isFinite(toLng)) {
        res.status(422).json({ detail: 'Provide from/to coordinates or addresses.' });
        return;
      }

      const leavesAt = body.leaves_at ? new Date(body.leaves_at) : new Date();
      if (Number.isNaN(leavesAt.getTime())) {
        res.status(422).json({ detail: 'Invalid leaves_at datetime.' });
        return;
      }

      // Compute walking route
      const route = await walkingRoute({ lat: fromLat, lng: fromLng }, { lat: toLat, lng: toLng });
      if (!route) {
        res.status(422).json({ detail: 'Could not find a walking route between those points.' });
        return;
      }

      const expiresAt = new Date(leavesAt.getTime() + 4 * 60 * 60 * 1000);
      const geometryStr = JSON.stringify(route.geometry);

      const { rows } = await sql`
        INSERT INTO walker_routes (walker_id, from_lat, from_lng, to_lat, to_lng, geometry, leaves_at, expires_at)
        VALUES (${courier.id}, ${fromLat}, ${fromLng}, ${toLat}, ${toLng}, ${geometryStr}, ${leavesAt.toISOString()}, ${expiresAt.toISOString()})
        ON CONFLICT (walker_id) DO UPDATE SET
          from_lat = EXCLUDED.from_lat,
          from_lng = EXCLUDED.from_lng,
          to_lat = EXCLUDED.to_lat,
          to_lng = EXCLUDED.to_lng,
          geometry = EXCLUDED.geometry,
          leaves_at = EXCLUDED.leaves_at,
          expires_at = EXCLUDED.expires_at,
          created_at = now()
        RETURNING *
      `;
      const row = rows[0];
      if (row && row.geometry) row.geometry = JSON.parse(row.geometry);
      res.status(200).json({ route: row });
      return;
    }

    if (req.method === 'DELETE') {
      await sql`DELETE FROM walker_routes WHERE walker_id = ${courier.id}`;
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ detail: 'Method not allowed' });
  } catch (err) {
    sendError(res, err);
  }
};
