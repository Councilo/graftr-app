// Walker delivery: a courier with no car or bike collects a bag and carries it on foot, at most 1
// mile by the route they actually walk. It is slower than a courier, on purpose and on the record —
// every price this file returns comes with a time RANGE, never a single number, and nothing here
// ever invents a route: if the real walking distance can't be found, the option is unavailable
// rather than guessed at from a straight line.
//
// The only genuine walking-route service available to this app is routing.openstreetmap.de's
// "routed-foot" instance. router.project-osrm.org (used for driving routes elsewhere in this
// codebase) answers a /foot/ request too, but silently gives back the SAME route as /driving/ — it
// is a car-only demo server that ignores the profile in the URL. Checked directly: for one test
// pair of coordinates it returned an identical distance and duration for both profiles, at a car's
// speed. So it must never be treated as a walking source, and there is only one real one — no second
// independent server to fail over to the way drivingRoute() has. If it is down, walking is
// unavailable; this never falls back to routed-car.
const NOMINATIM_USER_AGENT = 'Vendaru/1.0 (+https://vendaru.com; peer-to-peer courier)';
const FOOT_ROUTE_URL = 'https://routing.openstreetmap.de/routed-foot/route/v1/foot';
const FOOT_TIMEOUT_MS = 3000;

const MAX_WALK_M = 1609; // 1 mile, the owner's stated limit
const WALK_M_PER_MIN = 80; // about 3 mph — a brisk but ordinary walking pace
const DOOR_MINUTES = 6; // finding the shop, being served, then the door at the other end
const RANGE_SLOP = 1.4; // the "could take this long in practice" multiplier for the top of the range
const RANGE_PAD_MIN = 5;

// No walking alone after dark. UK local time (not the server's own UTC clock, and not a fixed UTC
// offset either — Intl tracks BST/GMT so this doesn't drift an hour out every summer). Checked
// directly against Europe/London for both a winter and a summer date before relying on it.
const WALKER_HOURS_START = 7;  // 07:00
const WALKER_HOURS_END = 21;   // 21:00 — the window is [START, END), so 20:59 is in and 21:00 is not
const LONDON_HOUR_FORMAT = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hour12: false });
function withinWalkerHours(when) {
  const hour = Number(LONDON_HOUR_FORMAT.format(new Date(when)));
  return hour >= WALKER_HOURS_START && hour < WALKER_HOURS_END;
}
// 7 -> "7am", 21 -> "9pm" — stays correct however WALKER_HOURS_START/END are tuned later.
const clockWord = (h) => (h === 0 ? '12am' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`);
const WALKER_HOURS_DETAIL = `Walker delivery only runs between ${clockWord(WALKER_HOURS_START)} and ${clockWord(WALKER_HOURS_END)} (UK time). Choose a pickup time in that window, or pick a courier instead.`;

const WALKER_BASE_GBP = 2.75;
const WALKER_PER_MILE_GBP = 1.25;
const WALKER_MIN_GBP = 3.00;
const KM_PER_MILE = 1.609344;

const WALKER_PRICING = {
  base_fare_gbp: WALKER_BASE_GBP,
  per_mile_gbp: WALKER_PER_MILE_GBP,
  minimum_fare_gbp: WALKER_MIN_GBP,
};

// A walker job nobody has taken doesn't wait as long as a standard one before it's cancelled and
// refunded: it's a short, casual, nearby trip, and a customer would rather get their money back and
// try again (maybe as a courier order) than have a small bag sit on the marketplace for half an
// hour. lib/expiry.js applies this in place of its own, longer default for delivery_mode = 'walker'.
const WALKER_EXPIRY_GRACE_MS = 15 * 60 * 1000;

// Only "small" exists as a genuine walker-sized option today — Vendaru has no separate weight field,
// and "small" is already defined elsewhere as "fits in a bag, under 5 kg", which is what a walker can
// carry a mile. A dedicated, lower weight cap (the plan discussed 3 kg) needs its own field later.
const WALKER_PACKAGE_SIZE = 'small';

// Distinct from GeocodeServiceError (lib/geocode.js) only in name, so a caller can tell what failed
// without inspecting a message string. Never thrown for "too far" — that is a normal, expected
// answer, not a service failure — only for the walking-route service itself being unreachable.
class WalkingServiceError extends Error {}

// pickup/dropoff: { lat, lng }. Returns { distance_m, geometry } or null if the route genuinely
// couldn't be found (a real "no route", not a timeout — see the catch below). Throws
// WalkingServiceError when the service itself couldn't be reached at all, so the caller can tell "no
// route exists" from "we don't know" and treat them differently (the latter should not silently
// become "not eligible" without saying so).
//
// One retry, after a short pause: with only one genuine server (see the note at the top of this
// file), there's no second one to fall over to the way drivingRoute() has, so a single dropped
// connection would otherwise take the whole walker option down with it. A definitive answer (a
// real route, or a real "no route") is never retried — only a failure to get an answer at all.
async function walkingRouteOnce(pickup, dropoff) {
  const query = `${FOOT_ROUTE_URL}/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}?overview=full&geometries=geojson`;
  const signal = typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(FOOT_TIMEOUT_MS) : undefined;
  let res;
  try {
    res = await fetch(query, { headers: { 'User-Agent': NOMINATIM_USER_AGENT }, signal });
  } catch (err) {
    throw new WalkingServiceError(`Could not reach the walking route service: ${err.message}`);
  }
  if (!res.ok) throw new WalkingServiceError(`Walking route service returned ${res.status}`);
  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new WalkingServiceError('Walking route service sent something unreadable');
  }
  if (data && data.code === 'NoRoute') return null;
  const route = data && data.code === 'Ok' && data.routes && data.routes[0];
  if (!route) return null;
  return {
    distance_m: route.distance,
    // GeoJSON is [lng, lat]; Leaflet (and the rest of this app) wants [lat, lng].
    geometry: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
  };
}

async function walkingRoute(pickup, dropoff) {
  try {
    return await walkingRouteOnce(pickup, dropoff);
  } catch (err) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return walkingRouteOnce(pickup, dropoff); // a second WalkingServiceError here is left to reach the caller
  }
}

// A range, never a single number — the customer is told the truth about how much it can vary, not a
// figure that looks precise and usually isn't. `low` assumes a clean run; `high` allows for a queue at
// the shop, traffic lights, stairs, an address that's hard to find.
function walkMinutes(distanceM) {
  const walking = distanceM / WALK_M_PER_MIN;
  const low = Math.ceil(walking + DOOR_MINUTES);
  const high = Math.ceil(walking * RANGE_SLOP + DOOR_MINUTES + RANGE_PAD_MIN);
  return { low, high: Math.max(high, low + 1) };
}

// Whole pence, the same "exact sum of what's on screen" approach as lib/geocode.js's quotePrice.
function walkerPrice(distanceM) {
  const tenthsOfMile = Math.round((distanceM / 1000 / KM_PER_MILE) * 10);
  const pence = Math.round((Math.round(WALKER_BASE_GBP * 100) * 10 + Math.round(WALKER_PER_MILE_GBP * 100) * tenthsOfMile) / 10);
  return Math.max(Math.round(WALKER_MIN_GBP * 100), pence) / 100;
}

// { eligible: true, price_gbp, minutes: {low, high}, distance_m, geometry } or
// { eligible: false, reason } — the server's own opinion, never trusting a distance the phone sent.
async function walkerEligibility(pickup, dropoff) {
  let route;
  try {
    route = await walkingRoute(pickup, dropoff);
  } catch (err) {
    return { eligible: false, reason: 'unavailable', detail: 'The walking option is unavailable right now.' };
  }
  if (!route) return { eligible: false, reason: 'no_route', detail: "There's no walkable route between these two points." };
  if (route.distance_m > MAX_WALK_M) {
    return { eligible: false, reason: 'too_far', detail: 'Walker delivery is only for trips of a mile or less on foot.' };
  }
  return {
    eligible: true,
    distance_m: Math.round(route.distance_m),
    geometry: route.geometry,
    price_gbp: walkerPrice(route.distance_m),
    minutes: walkMinutes(route.distance_m),
  };
}

module.exports = {
  MAX_WALK_M, WALK_M_PER_MIN, DOOR_MINUTES, WALKER_PRICING, WALKER_PACKAGE_SIZE, WALKER_EXPIRY_GRACE_MS,
  WALKER_HOURS_START, WALKER_HOURS_END, WALKER_HOURS_DETAIL, withinWalkerHours,
  WalkingServiceError, walkingRoute, walkMinutes, walkerPrice, walkerEligibility,
};
