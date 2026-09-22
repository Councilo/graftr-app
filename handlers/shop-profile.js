// A customer applies to become a partner shop, and edits it afterwards. One handler for both: GET
// returns the caller's own shop (or null if they don't have one), POST creates it the first time
// (status 'pending', needs an admin to approve — see handlers/admin-shops.js) or updates the details
// of one they already have. Editing an approved shop's details does NOT reset it back to pending —
// content changes are the owner's business, and an admin can always suspend it if something looks
// wrong — but a suspended shop can't edit its way back into posting; they have to ask.
const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { geocode, GeocodeServiceError } = require('../lib/geocode');
const { shopForOwner, MAX_NAME, MAX_ADDRESS, MAX_PHONE, MAX_HOURS, MAX_NOTES } = require('../lib/shops');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  try {
    const customer = await requireRole(req, res, 'customer');
    if (!customer) return;
    await ensureSchema();

    if (req.method === 'GET') {
      res.status(200).json({ shop: await shopForOwner(customer.id) });
      return;
    }
    if (req.method !== 'POST') {
      res.status(405).json({ detail: 'Method not allowed' });
      return;
    }

    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const address = typeof body.address === 'string' ? body.address.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, MAX_PHONE) : '';
    const openingHours = typeof body.opening_hours === 'string' ? body.opening_hours.trim().slice(0, MAX_HOURS) : '';
    const collectionNotes = typeof body.collection_notes === 'string' ? body.collection_notes.trim().slice(0, MAX_NOTES) : '';

    if (!name || name.length > MAX_NAME) {
      res.status(422).json({ detail: `Enter the shop's name (up to ${MAX_NAME} characters)` });
      return;
    }
    if (address.length < 5 || address.length > MAX_ADDRESS) {
      res.status(422).json({ detail: 'Enter the shop\'s full address, including postcode' });
      return;
    }

    const existing = await shopForOwner(customer.id);
    if (existing && existing.status === 'suspended') {
      res.status(403).json({ detail: 'This shop has been suspended. Contact support@vendaru.com to appeal.' });
      return;
    }

    // The address is only re-geocoded when it actually changed — an approved shop tweaking its
    // opening hours shouldn't risk its pin moving because a free map service answered differently.
    let lat = existing && existing.address === address ? existing.lat : null;
    let lng = existing && existing.address === address ? existing.lng : null;
    if (lat == null || lng == null) {
      try {
        const place = await geocode(address);
        if (!place) {
          res.status(422).json({ detail: "Couldn't find that address — try including a street, postcode or town." });
          return;
        }
        lat = place.lat;
        lng = place.lng;
      } catch (err) {
        if (err instanceof GeocodeServiceError) {
          res.status(502).json({ detail: 'The map service is unavailable right now — try again in a moment.' });
          return;
        }
        throw err;
      }
    }

    let row;
    if (existing) {
      const { rows } = await sql`
        UPDATE shops
        SET name = ${name}, address = ${address}, lat = ${lat}, lng = ${lng},
            phone = ${phone || null}, opening_hours = ${openingHours || null}, collection_notes = ${collectionNotes || null}
        WHERE id = ${existing.id}
        RETURNING *
      `;
      row = rows[0];
    } else {
      const { rows } = await sql`
        INSERT INTO shops (owner_user_id, name, address, lat, lng, phone, opening_hours, collection_notes)
        VALUES (${customer.id}, ${name}, ${address}, ${lat}, ${lng}, ${phone || null}, ${openingHours || null}, ${collectionNotes || null})
        RETURNING *
      `;
      row = rows[0];
    }
    res.status(existing ? 200 : 201).json({ shop: row });
  } catch (err) {
    sendError(res, err);
  }
};
