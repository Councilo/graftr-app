// The extra choices a customer makes when reviewing an order, beyond where it goes and
// when: who is at each end and how the handover happens, any instructions, how big the
// parcel is, and whether delivery must be confirmed with a PIN.
//
// Everything here is checked on the server; the app only offers the same choices. None of
// it changes the price (which comes from the distance, see lib/geocode.js).
const crypto = require('crypto');

const HANDOVERS = ['kerb', 'door', 'leave']; // meet at the kerb, meet at the door, leave at the door
const PACKAGE_SIZES = ['small', 'medium', 'large'];
const MAX_NAME = 100;
const MAX_INSTRUCTIONS = 300;

// Returns { value } or { error }.
function parseOrderOptions(body) {
  const b = body || {};
  const text = (raw, max, label) => {
    if (raw === undefined || raw === null || raw === '') return { ok: true, value: null };
    if (typeof raw !== 'string') return { ok: false, error: `${label} must be text` };
    const trimmed = raw.trim();
    if (trimmed.length > max) return { ok: false, error: `${label} can be at most ${max} characters` };
    return { ok: true, value: trimmed || null };
  };
  const pick = (raw, allowed, fallback, label) => {
    if (raw === undefined || raw === null || raw === '') return { ok: true, value: fallback };
    if (!allowed.includes(raw)) return { ok: false, error: `${label} must be one of: ${allowed.join(', ')}` };
    return { ok: true, value: raw };
  };

  const fields = {
    pickupContact: text(b.pickup_contact_name, MAX_NAME, 'The pickup contact name'),
    dropoffContact: text(b.dropoff_contact_name, MAX_NAME, 'The drop-off contact name'),
    pickupInstructions: text(b.pickup_instructions, MAX_INSTRUCTIONS, 'The pickup instructions'),
    dropoffInstructions: text(b.dropoff_instructions, MAX_INSTRUCTIONS, 'The drop-off instructions'),
    pickupHandover: pick(b.pickup_handover, HANDOVERS, 'kerb', 'The pickup handover'),
    dropoffHandover: pick(b.dropoff_handover, HANDOVERS, 'kerb', 'The drop-off handover'),
    packageSize: pick(b.package_size, PACKAGE_SIZES, 'medium', 'The package size'),
  };
  for (const f of Object.values(fields)) if (!f.ok) return { error: f.error };

  return {
    value: {
      customerIsRecipient: b.mode === 'receiving' || b.customer_is_recipient === true,
      pickupContact: fields.pickupContact.value,
      dropoffContact: fields.dropoffContact.value,
      pickupInstructions: fields.pickupInstructions.value,
      dropoffInstructions: fields.dropoffInstructions.value,
      pickupHandover: fields.pickupHandover.value,
      dropoffHandover: fields.dropoffHandover.value,
      packageSize: fields.packageSize.value,
      pinConfirmation: b.pin_confirmation === true,
    },
  };
}

// Four digits, from a proper random source (leading zeros kept: "0420").
function newDeliveryPin() {
  return String(crypto.randomInt(0, 10000)).padStart(4, '0');
}

// Constant-time comparison, so how long a wrong guess takes tells nobody anything.
function pinMatches(given, actual) {
  const a = Buffer.from(String(given));
  const b = Buffer.from(String(actual));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

module.exports = { HANDOVERS, PACKAGE_SIZES, MAX_NAME, MAX_INSTRUCTIONS, parseOrderOptions, newDeliveryPin, pinMatches };
