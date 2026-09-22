const { sql, ensureSchema } = require('../lib/db');
const { requireRole } = require('../lib/auth');
const { refuseUnverified } = require('../lib/email');
const { notifyCustomer } = require('../lib/notify');
const { computeQuote, QuoteError, GeocodeServiceError } = require('../lib/geocode');
const { verifyQuote, sanitizeRoute } = require('../lib/quote-token');
const { serializeJob } = require('../lib/jobs');
const { createPayment } = require('../lib/payments');
const { sendError } = require('../lib/respond');
const { parseOrderOptions, newDeliveryPin } = require('../lib/order-options');
const { walkerEligibility, WALKER_PACKAGE_SIZE, withinWalkerHours, WALKER_HOURS_DETAIL } = require('../lib/walking');
const crypto = require('crypto');

// Addresses are free text people type; a cap keeps a hostile request from
// storing (and later having to render) megabytes.
const MAX_ADDRESS_LENGTH = 300;

// A customer can't leave an unlimited pile of jobs open on the marketplace.
const MAX_OPEN_JOBS = 10;

// Customers choose when pickup starts; they aren't asked when it ends. The job
// still stores an end (the column is required and existing data expects it), so
// it defaults to a day after the start, the same default the app used before
// the field was removed. An API client that does send pickup_window_end still
// gets it honoured, and validated.
const DEFAULT_PICKUP_WINDOW_MS = 24 * 60 * 60 * 1000;

// "Now" is stamped by the customer's own device, so its clock can be a little
// off; a pickup earlier than this is a mistake rather than a slow clock.
const PAST_TOLERANCE_MS = 60 * 60 * 1000;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const customer = await requireRole(req, res, 'customer');
    if (!customer) return;
    if (refuseUnverified(res, customer)) return;

    const {
      pickup_address, dropoff_address, pickup_window_start, pickup_window_end,
      quote_token, route_geometry, delivery_mode, walker_ack,
    } = req.body || {};
    const wantsWalker = delivery_mode === 'walker';
    if (typeof pickup_address !== 'string' || pickup_address.trim().length < 3
      || typeof dropoff_address !== 'string' || dropoff_address.trim().length < 3) {
      res.status(422).json({ detail: 'pickup_address and dropoff_address are required' });
      return;
    }
    if (pickup_address.length > MAX_ADDRESS_LENGTH || dropoff_address.length > MAX_ADDRESS_LENGTH) {
      res.status(422).json({ detail: `Addresses can be at most ${MAX_ADDRESS_LENGTH} characters` });
      return;
    }
    const parsedOptions = parseOrderOptions(req.body);
    if (parsedOptions.error) {
      res.status(422).json({ detail: parsedOptions.error });
      return;
    }
    const opt = parsedOptions.value;
    const deliveryPin = opt.pinConfirmation ? newDeliveryPin() : null;

    if (wantsWalker) {
      if (walker_ack !== true) {
        res.status(422).json({ detail: 'Tick the box to confirm you understand walker delivery is slower before posting one.' });
        return;
      }
      if (opt.packageSize !== WALKER_PACKAGE_SIZE) {
        res.status(422).json({ detail: 'Walker delivery is for a small parcel only.' });
        return;
      }
    }

    // A string only: new Date(null) and new Date(true) are valid dates in
    // 1970, so anything else would be accepted as a pickup half a century ago.
    const start = typeof pickup_window_start === 'string' && pickup_window_start.trim()
      ? new Date(pickup_window_start)
      : new Date(NaN);
    if (Number.isNaN(start.getTime())) {
      res.status(422).json({ detail: 'pickup_window_start must be a valid date' });
      return;
    }
    if (start.getTime() < Date.now() - PAST_TOLERANCE_MS) {
      res.status(422).json({ detail: 'pickup_window_start is in the past — choose a later time' });
      return;
    }
    const endGiven = pickup_window_end !== undefined && pickup_window_end !== null && pickup_window_end !== '';
    const end = endGiven ? new Date(pickup_window_end) : new Date(start.getTime() + DEFAULT_PICKUP_WINDOW_MS);
    if (Number.isNaN(end.getTime())) {
      res.status(422).json({ detail: 'pickup_window_end must be a valid date' });
      return;
    }
    if (end <= start) {
      res.status(422).json({ detail: 'pickup_window_end must be after pickup_window_start' });
      return;
    }
    // No walking alone after dark: checked against when the parcel is actually collected (the
    // pickup start, in UK local time — "now" already resolves to the current moment), not against
    // whatever time zone the server happens to be running in.
    if (wantsWalker && !withinWalkerHours(start)) {
      res.status(422).json({ detail: WALKER_HOURS_DETAIL });
      return;
    }

    let q;
    if (quote_token) {
      // The customer is posting a quote they were shown: honour exactly that
      // price and distance rather than quoting again, which could come out
      // differently if the free routing service answers differently a
      // moment later. A token that's expired or doesn't match is refused,
      // not quietly re-priced — the customer should see the new price first.
      const signed = verifyQuote(quote_token, customer.id, pickup_address, dropoff_address);
      if (!signed) {
        res.status(409).json({ detail: 'Your quote has expired, so the price has been refreshed. Check it, then post again.' });
        return;
      }
      q = { ...signed, route_geometry: sanitizeRoute(route_geometry, signed) };
    }
    try {
      if (!q) q = await computeQuote(pickup_address, dropoff_address);
    } catch (err) {
      if (err instanceof QuoteError) {
        res.status(422).json({ detail: err.message });
        return;
      }
      if (err instanceof GeocodeServiceError) {
        res.status(502).json({ detail: 'The map service is unavailable right now — try again in a moment.' });
        return;
      }
      throw err;
    }

    // Walker delivery's own price, distance and route are worked out fresh here, from the pickup and
    // dropoff coordinates the quote already verified — never from anything the phone said about
    // distance, price or eligibility, whether or not this came from a quote_token. A quote_token from
    // an ordinary (car) quote still carries trustworthy coordinates, so this works either way.
    let walk = null;
    if (wantsWalker) {
      try {
        walk = await walkerEligibility({ lat: q.pickup_lat, lng: q.pickup_lng }, { lat: q.dropoff_lat, lng: q.dropoff_lng });
      } catch (err) {
        res.status(502).json({ detail: 'The walking route service is unavailable right now — try again in a moment.' });
        return;
      }
      if (!walk.eligible) {
        res.status(422).json({ detail: walk.detail || 'This trip is not eligible for walker delivery.' });
        return;
      }
      q = {
        ...q,
        distance_km: Math.round((walk.distance_m / 1000) * 100) / 100,
        price_gbp: walk.price_gbp,
        route_geometry: walk.geometry,
      };
    }

    await ensureSchema();

    const open = await sql`SELECT count(*) AS n FROM jobs WHERE customer_id = ${customer.id} AND status = 'OPEN'`;
    if (Number(open.rows[0].n) >= MAX_OPEN_JOBS) {
      res.status(429).json({ detail: `You already have ${MAX_OPEN_JOBS} parcels waiting for a courier. Wait for one to be picked up, or cancel one, before posting another.` });
      return;
    }

    // One quote, one job: the same signed quote posted twice (a double tap, a
    // retried request) must not create two parcels and two charges.
    const quoteRef = typeof quote_token === 'string' && quote_token
      ? crypto.createHash('sha256').update(quote_token).digest('hex')
      : null;
    if (quoteRef) {
      const dupe = await sql`SELECT id FROM jobs WHERE customer_id = ${customer.id} AND quote_ref = ${quoteRef}`;
      if (dupe.rows.length) {
        res.status(409).json({ detail: 'That parcel has already been posted — check your orders.' });
        return;
      }
    }

    // The link a customer can hand to whoever is receiving the parcel: 24
    // characters from 18 random bytes, so it can't be guessed or counted up to.
    const trackingToken = crypto.randomBytes(18).toString('base64url');
    const { rows } = await sql`
      INSERT INTO jobs (
        customer_id, pickup_address, dropoff_address,
        pickup_lat, pickup_lng, dropoff_lat, dropoff_lng,
        pickup_window_start, pickup_window_end, distance_km, price_gbp, status,
        route_geometry, tracking_token, quote_ref,
        customer_is_recipient, pickup_contact_name, dropoff_contact_name, pickup_handover, dropoff_handover,
        pickup_instructions, dropoff_instructions, package_size, delivery_pin,
        delivery_mode, walk_distance_m, walk_minutes_low, walk_minutes_high, walker_ack_at
      ) VALUES (
        ${customer.id}, ${pickup_address}, ${dropoff_address},
        ${q.pickup_lat}, ${q.pickup_lng}, ${q.dropoff_lat}, ${q.dropoff_lng},
        ${start.toISOString()}, ${end.toISOString()}, ${q.distance_km}, ${q.price_gbp}, 'OPEN',
        ${q.route_geometry ? JSON.stringify(q.route_geometry) : null}, ${trackingToken}, ${quoteRef},
        ${opt.customerIsRecipient}, ${opt.pickupContact}, ${opt.dropoffContact}, ${opt.pickupHandover}, ${opt.dropoffHandover},
        ${opt.pickupInstructions}, ${opt.dropoffInstructions}, ${opt.packageSize}, ${deliveryPin},
        ${wantsWalker ? 'walker' : 'standard'}, ${walk ? walk.distance_m : null}, ${walk ? walk.minutes.low : null},
        ${walk ? walk.minutes.high : null}, ${wantsWalker ? new Date().toISOString() : null}
      )
      RETURNING *
    `;
    // Every job has a payment record from the start (UNPAID until an admin
    // records that it was settled), so refunds always have something to act on.
    await createPayment(rows[0].id, customer.id, q.price_gbp);
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
