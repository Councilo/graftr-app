// Geographic helpers for the walker route-mode marketplace (Phase 3).
// All coords are [lat, lng] arrays.
const { WALK_M_PER_MIN } = require('./walking');

const MAX_DETOUR_M = 400;
const R = 6371000; // Earth radius in metres

// Haversine distance in metres between [lat,lng] point a and b.
function haversineM(a, b) {
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Minimum distance in metres from point p to segment a→b.
// Uses a flat-earth approximation for the projection parameter t (valid for
// the short distances involved in a walking route).
function pointToSegmentM(p, a, b) {
  const dlat = b[0] - a[0];
  const dlng = b[1] - a[1];
  const denom = dlat * dlat + dlng * dlng;
  if (denom === 0) return haversineM(p, a); // degenerate segment
  const vlat = p[0] - a[0];
  const vlng = p[1] - a[1];
  const t = Math.min(1, Math.max(0, (vlat * dlat + vlng * dlng) / denom));
  const closest = [a[0] + t * dlat, a[1] + t * dlng];
  return haversineM(p, closest);
}

// Minimum distance from p to any segment of polyline.
// Returns Infinity if polyline has fewer than 2 points.
function pointToPolylineM(p, polyline) {
  if (!polyline || polyline.length < 2) return Infinity;
  let minDist = Infinity;
  for (let i = 0; i < polyline.length - 1; i++) {
    const d = pointToSegmentM(p, polyline[i], polyline[i + 1]);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

// Extra metres if the walker detours to pick up and drop off this job.
//
// walkerRoute: array of [lat,lng] points describing the walker's own journey.
// shopPt, custPt: [lat, lng] — pickup and dropoff for the job.
//
// Returns Infinity if either point is more than MAX_DETOUR_M off the route,
// or if the shop projection appears after the customer projection (the job
// would require going backward along the route).
function detourM(walkerRoute, shopPt, custPt) {
  if (!walkerRoute || walkerRoute.length < 2) return Infinity;

  // Pre-compute cumulative distances and per-segment lengths along the route.
  const n = walkerRoute.length;
  const segLen = new Array(n - 1);
  const cumDist = new Array(n);
  cumDist[0] = 0;
  for (let i = 0; i < n - 1; i++) {
    segLen[i] = haversineM(walkerRoute[i], walkerRoute[i + 1]);
    cumDist[i + 1] = cumDist[i] + segLen[i];
  }

  // Find the closest segment for a given point and return its perpendicular
  // distance and the along-route distance to the projection point.
  function projectPoint(pt) {
    let bestPerp = Infinity;
    let bestAlong = 0;
    for (let i = 0; i < n - 1; i++) {
      const a = walkerRoute[i];
      const b = walkerRoute[i + 1];
      const dlat = b[0] - a[0];
      const dlng = b[1] - a[1];
      const denom = dlat * dlat + dlng * dlng;
      let t = 0;
      if (denom !== 0) {
        const vlat = pt[0] - a[0];
        const vlng = pt[1] - a[1];
        t = Math.min(1, Math.max(0, (vlat * dlat + vlng * dlng) / denom));
      }
      const closest = [a[0] + t * dlat, a[1] + t * dlng];
      const perp = haversineM(pt, closest);
      if (perp < bestPerp) {
        bestPerp = perp;
        bestAlong = cumDist[i] + t * segLen[i];
      }
    }
    return { perp: bestPerp, along: bestAlong };
  }

  const shop = projectPoint(shopPt);
  const cust = projectPoint(custPt);

  // Either point is too far off the route.
  if (shop.perp > MAX_DETOUR_M || cust.perp > MAX_DETOUR_M) return Infinity;

  // The shop is past the customer — wrong direction.
  if (shop.along > cust.along) return Infinity;

  // Extra distance = side-trip to shop + job leg + side-trip back to route,
  // minus the distance that would have been walked anyway between the two
  // projection points.
  const extra =
    shop.perp +
    haversineM(shopPt, custPt) +
    cust.perp -
    (cust.along - shop.along);

  // Can be marginally negative when the job lies exactly on the route.
  return Math.max(0, extra);
}

// detourM divided by WALK_M_PER_MIN, rounded up to the nearest integer minute.
// Returns Infinity if detourM is Infinity.
function detourMinutes(walkerRoute, shopPt, custPt) {
  const dm = detourM(walkerRoute, shopPt, custPt);
  if (!isFinite(dm)) return Infinity;
  return Math.ceil(dm / WALK_M_PER_MIN);
}

module.exports = { haversineM, pointToSegmentM, pointToPolylineM, detourM, detourMinutes, MAX_DETOUR_M };
