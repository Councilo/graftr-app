// An approved shop posts a bag: who it's for, their address, and when it'll be ready. This always
// creates a WALKER job (a shop-posted bag is exactly what walker delivery is for) — the pickup end is
// always the shop's own registered address, never something the client sends, and eligibility, price
// and the time range are all worked out the same way as an ordinary walker order (lib/walking.js): a
// bag more than a mile from the shop, outside 7am-9pm, or too big is refused, whatever the form said.
//
// The shop is billed for the delivery (the goods themselves are paid to the shop directly, off
// Vendaru) — so the shop's own account is the job's customer_id, and "your order" emails go to the
// shop, which is the one with a Vendaru account. The actual recipient never needs one.
const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { refuseUnverified } = require('../lib/email');
const { notifyCustomer } = require('../lib/notify');
const { geocode, GeocodeServiceError } = require('../lib/geocode');
const { verifyPlace } = require('../lib/place-token');
const { walkerEligibility, WALKER_PACKAGE_SIZE, withinWalkerHours, WALKER_HOURS_DETAIL } = require('../lib/walking');
const { newDeliveryPin } = require('../lib/order-options');
const { shopForOwner, MAX_NAME, MAX_NOTES } = require('../lib/shops');
const { serializeJob } = require('../lib/jobs');
const { createPayment } = require('../lib/payments');
const { sendError } = require('../lib/respond');
const crypto = require('crypto');

const MAX_ADDRESS_LENGTH = 300;
const MAX_OPEN_JOBS = 10;
const DEFAULT_READY_WINDOW_MS = 2 * 60 * 60 * 1000; // "ready by" is a moment, not a range; the job still needs an end

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const shopOwner = await requireRole(req, res, 'customer');
    if (!shopOwner) return;
    if (refuseUnverified(res, shopOwner)) return;

    const shop = await shopForOwner(shopOwner.id);
    if (!shop || shop.status !== 'approved') {
      res.status(403).json({
        detail: !shop ? "You don't have a partner shop set up yet." : shop.status === 'pending'
          ? 'Your shop is still waiting for approval.' : 'This shop has been suspended.',
      });
      return;
    }

    const body = req.body || {};
    const dropoffAddress = typeof body.dropoff_address === 'string' ? body.dropoff_address.trim() : '';
    const recipientName = typeof body.recipient_name === 'string' ? body.recipient_name.trim().slice(0, MAX_NAME) : '';
    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, MAX_NOTES) : '';
    if (dropoffAddress.length < 3 || dropoffAddress.length > MAX_ADDRESS_LENGTH) {
      res.status(422).json({ detail: "Enter the customer's address" });
      return;
    }
    if (!recipientName) {
      res.status(422).json({ detail: "Enter who the bag is for" });
      return;
    }

    const readyAt = typeof body.ready_at === 'string' && body.ready_at.trim() ? new Date(body.ready_at) : new Date();
    if (Number.isNaN(readyAt.getTime())) {
      res.status(422).json({ detail: 'ready_at must be a valid date' });
      return;
    }
    if (!withinWalkerHours(readyAt)) {
      res.status(422).json({ detail: WALKER_HOURS_DETAIL });
      return;
    }

    // The dropoff can arrive as a place picked from the search dropdown (exact, verified coordinates)
    // or as plain typed text, geocoded here — the same choice jobs-create gives a customer.
    let dropoff = verifyPlace(body.dropoff_place, dropoffAddress);
    if (!dropoff) {
      try {
        dropoff = await geocode(dropoffAddress);
      } catch (err) {
        if (err instanceof GeocodeServiceError) {
          res.status(502).json({ detail: 'The map service is unavailable right now — try again in a moment.' });
          return;
        }
        throw err;
      }
      if (!dropoff) {
        res.status(422).json({ detail: `Couldn't place '${dropoffAddress}' — try including a street, postcode or town.` });
        return;
      }
    }

    let walk;
    try {
      walk = await walkerEligibility({ lat: shop.lat, lng: shop.lng }, { lat: dropoff.lat, lng: dropoff.lng });
    } catch (err) {
      res.status(502).json({ detail: 'The walking route service is unavailable right now — try again in a moment.' });
      return;
    }
    if (!walk.eligible) {
      res.status(422).json({ detail: walk.detail || 'This address is not eligible for walker delivery.' });
      return;
    }

    await ensureSchema();

    const open = await sql`SELECT count(*) AS n FROM jobs WHERE customer_id = ${shopOwner.id} AND status = 'OPEN'`;
    if (Number(open.rows[0].n) >= MAX_OPEN_JOBS) {
      res.status(429).json({ detail: `You already have ${MAX_OPEN_JOBS} bags waiting for a walker. Wait for one to be collected, or cancel one, before posting another.` });
      return;
    }

    const pickupAddress = `${shop.name}, ${shop.address}`;
    const pickupCode = newDeliveryPin(); // same shape as the recipient's delivery PIN, a different purpose: proves the walker collecting is the one who accepted
    const trackingToken = crypto.randomBytes(18).toString('base64url');
    const { rows } = await sql`
      INSERT INTO jobs (
        customer_id, pickup_address, dropoff_address,
        pickup_lat, pickup_lng, dropoff_lat, dropoff_lng,
        pickup_window_start, pickup_window_end, distance_km, price_gbp, status,
        route_geometry, tracking_token,
        customer_is_recipient, dropoff_contact_name, pickup_handover, dropoff_handover,
        dropoff_instructions, package_size,
        delivery_mode, walk_distance_m, walk_minutes_low, walk_minutes_high, walker_ack_at,
        shop_id, pickup_code
      ) VALUES (
        ${shopOwner.id}, ${pickupAddress}, ${dropoffAddress},
        ${shop.lat}, ${shop.lng}, ${dropoff.lat}, ${dropoff.lng},
        ${readyAt.toISOString()}, ${new Date(readyAt.getTime() + DEFAULT_READY_WINDOW_MS).toISOString()}, ${Math.round((walk.distance_m / 1000) * 100) / 100}, ${walk.price_gbp}, 'OPEN',
        ${JSON.stringify(walk.geometry)}, ${trackingToken},
        false, ${recipientName}, 'kerb', 'kerb',
        ${notes || null}, ${WALKER_PACKAGE_SIZE},
        'walker', ${walk.distance_m}, ${walk.minutes.low}, ${walk.minutes.high}, ${new Date().toISOString()},
        ${shop.id}, ${pickupCode}
      )
      RETURNING *
    `;
    await createPayment(rows[0].id, shopOwner.id, walk.price_gbp);
    await notifyCustomer(rows[0], 'orderPlaced', { paymentInstructions: process.env.PAYMENT_INSTRUCTIONS });
    res.status(201).json({
      ...serializeJob(rows[0], { forCustomer: true }),
      payment_status: 'UNPAID',
      refunded_gbp: 0,
      refund_status: null,
    });
  } catch (err) {
    sendError(res, err);
  }
};
