// What a courier is allowed to see of a job they have not accepted yet.
//
// Every courier account can browse the open jobs, and anyone can register as
// one, so the marketplace must not hand out where people live. Before a job is
// accepted a courier sees only the area (town and postcode district), places
// rounded to about a kilometre, and a coarse version of the route — enough to
// judge whether the run is worth taking. The full address, exact points and
// road-accurate route arrive only once the courier has accepted the job.

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

// Two decimal places is about 1.1 km of latitude — a neighbourhood, not a door.
function roundCoord(n) {
  return Math.round(Number(n) * 100) / 100;
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
function publicJobView(job) {
  const coarse = Array.isArray(job.route_geometry)
    ? decimateRoute(job.route_geometry, 60).map(([lat, lng]) => [roundCoord(lat), roundCoord(lng)])
    : null;
  return {
    id: job.id,
    status: job.status,
    masked: true,
    pickup_address: areaLabel(job.pickup_address),
    dropoff_address: areaLabel(job.dropoff_address),
    pickup_lat: roundCoord(job.pickup_lat),
    pickup_lng: roundCoord(job.pickup_lng),
    dropoff_lat: roundCoord(job.dropoff_lat),
    dropoff_lng: roundCoord(job.dropoff_lng),
    pickup_window_start: job.pickup_window_start,
    pickup_window_end: job.pickup_window_end,
    distance_km: job.distance_km,
    price_gbp: job.price_gbp,
    package_size: job.package_size || 'medium',
    route_geometry: coarse,
    created_at: job.created_at,
    courier_id: null,
    customer_name: null,
  };
}

module.exports = { areaLabel, roundCoord, decimateRoute, publicJobView };
