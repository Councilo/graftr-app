// What a courier is allowed to see of a job they have not accepted yet.
//
// Every courier account can browse the open jobs, and anyone can register as
// one, so the marketplace must not hand out the exact house. Before a job is
// accepted a courier sees each end as a town and postcode ("Bolton BL1 1AA"), a
// map pin rounded to about 100 m (so it lands in the postcode, not on the door),
// and the real road route between those two pins, which the app draws itself.
// The full address, the exact points and the contact details arrive only once
// the courier has accepted the job.

// A UK postcode: outward code (M1, SW1A, EH2) then inward code (1RN).
const POSTCODE_RE = /\b([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})\b/i;

// "12 High St, Manchester M1 1RN, UK"  ->  "Manchester M1"
// "Piccadilly Gardens, Manchester"     ->  "Manchester"
function areaLabel(address) {
  const parts = String(address || '').split(',').map((p) => p.trim()).filter(Boolean);
  if (!parts.length) return 'Area hidden until accepted';
  const withoutCountry = parts.filter((p) => !/^(uk|united kingdom|england|scotland|wales|northern ireland|great britain)$/i.test(p));
  const usable = withoutCountry.length ? withoutCountry : parts;

  for (let i = usable.length - 1; i >= 0; i -= 1) {
    const m = usable[i].match(POSTCODE_RE);
    if (m) {
      const outward = m[1].toUpperCase();
      const town = usable[i].replace(POSTCODE_RE, '').trim();
      return town ? `${town} ${outward}` : (usable[i - 1] ? `${usable[i - 1]} ${outward}` : outward);
    }
  }
  // No postcode: the last part is normally the town or city. A lone part is
  // probably a street or house, which must not be shown.
  return usable.length > 1 ? usable[usable.length - 1] : 'Area hidden until accepted';
}

// "12 High St, Manchester M1 1RN, UK"  ->  "Manchester M1 1RN"
// "Piccadilly Gardens, Manchester"     ->  "Manchester"
// What a courier browsing the open jobs sees of an address: the town and the whole postcode, never the
// street or the house number. `fallback` is what to say when the address has no usable town or postcode.
function courierAreaLabel(address, fallback) {
  const parts = String(address || '').split(',').map((p) => p.trim()).filter(Boolean);
  const withoutCountry = parts.filter((p) => !/^(uk|united kingdom|england|scotland|wales|northern ireland|great britain)$/i.test(p));
  const usable = withoutCountry.length ? withoutCountry : parts;
  for (let i = usable.length - 1; i >= 0; i -= 1) {
    const m = usable[i].match(POSTCODE_RE);
    if (m) {
      const postcode = `${m[1].toUpperCase()} ${m[2].toUpperCase()}`;
      const town = usable[i].replace(POSTCODE_RE, '').trim() || (usable[i - 1] || '');
      return town ? `${town} ${postcode}` : postcode;
    }
  }
  // No postcode: the last part is normally the town. A lone part is probably a street or a house.
  return usable.length > 1 ? usable[usable.length - 1] : fallback;
}

// Two decimal places is about 1.1 km of latitude — a neighbourhood, not a door.
function roundCoord(n) {
  return Math.round(Number(n) * 100) / 100;
}

// Three decimal places is about 110 m north-south and 65 m east-west: a street, not a door. It is the
// same rounding the recipient's tracking page uses, and about what a postcode covers.
function roundPin(n) {
  return Math.round(Number(n) * 1000) / 1000;
}

// Evenly thins a route to at most `max` points, always keeping the first and
// last, so a long route can be stored and sent at a sane size.
function decimateRoute(route, max) {
  if (!Array.isArray(route) || route.length <= max) return route;
  const out = [];
  const step = (route.length - 1) / (max - 1);
  for (let i = 0; i < max; i += 1) out.push(route[Math.round(i * step)]);
  return out;
}

// The marketplace view of an open job. Deliberately built up field by field
// from nothing rather than by deleting from the full row, so a column added to
// jobs later can never leak into the marketplace by accident.
//
// A shop-posted job's pickup end is a shop — a public place, not someone's home — so it is shown in
// full (its name and address are how a walker finds it, same as any shop on any map) and at its exact
// coordinates. The customer end of that same job is still masked exactly as before: the shop knows
// nothing extra about the actual walker Vendaru sends, and the walker only learns the exact door once
// they accept, same rule as every other job.
function publicJobView(job) {
  const isShopJob = job.shop_id != null;
  return {
    id: job.id,
    status: job.status,
    masked: true,
    pickup_address: isShopJob ? job.pickup_address : courierAreaLabel(job.pickup_address, 'Pickup point'),
    dropoff_address: courierAreaLabel(job.dropoff_address, 'Drop-off point'),
    pickup_lat: isShopJob ? job.pickup_lat : roundPin(job.pickup_lat),
    pickup_lng: isShopJob ? job.pickup_lng : roundPin(job.pickup_lng),
    dropoff_lat: roundPin(job.dropoff_lat),
    dropoff_lng: roundPin(job.dropoff_lng),
    is_shop_job: isShopJob,
    pickup_window_start: job.pickup_window_start,
    pickup_window_end: job.pickup_window_end,
    distance_km: job.distance_km,
    price_gbp: job.price_gbp,
    package_size: job.package_size || 'medium',
    delivery_mode: job.delivery_mode || 'standard',
    // The minutes a walker job promised the customer, not the exact metres — that is worked out
    // fresh from the (already rounded) pins the app draws the route between, the same as the metres
    // the courier never sees for an ordinary job either.
    walk_minutes_low: job.delivery_mode === 'walker' ? job.walk_minutes_low : null,
    walk_minutes_high: job.delivery_mode === 'walker' ? job.walk_minutes_high : null,
    // No stored route: the stored one runs to the exact doors. The app draws the real road (or, for a
    // walker job, walking) route between the two rounded pins instead, the same way it does while a
    // quote is being made.
    route_geometry: null,
    created_at: job.created_at,
    courier_id: null,
    customer_name: null,
  };
}

module.exports = { areaLabel, courierAreaLabel, roundCoord, roundPin, decimateRoute, publicJobView };
