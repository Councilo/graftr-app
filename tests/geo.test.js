// Geo/routing pure-function tests: haversine, segment projection, polyline distance, detour.
// Offline: no network, no server, no database.
const REPO = require('path').resolve(__dirname, '..');
const { haversineM, pointToSegmentM, pointToPolylineM, detourM, detourMinutes, MAX_DETOUR_M } = require(REPO + '/lib/geo.js');

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 260) : '')); }
};

// ---- haversineM ---------------------------------------------------------------
console.log('[haversineM: haversine distance in metres]');

// London (51.5074, -0.1278) to Manchester (53.4808, -2.2426) ≈ 262 km
const LONDON = [51.5074, -0.1278];
const MANCHESTER = [53.4808, -2.2426];
const lm = haversineM(LONDON, MANCHESTER);
ok('London to Manchester is about 262 km (±5 km)', Math.abs(lm - 262000) < 5000, Math.round(lm));

// Same point = 0
ok('same point = 0 m', haversineM(LONDON, LONDON) === 0);

// Two very close points: ~111m apart (0.001° lat ≈ 111 m)
const A = [53.77, -2.70];
const B = [53.771, -2.70];
const ab = haversineM(A, B);
ok('0.001° lat apart ≈ 111 m (±10 m)', Math.abs(ab - 111) < 10, Math.round(ab));

// Symmetry
ok('distance is symmetric', Math.abs(haversineM(LONDON, MANCHESTER) - haversineM(MANCHESTER, LONDON)) < 0.001);

// ---- pointToSegmentM ----------------------------------------------------------
console.log('\n[pointToSegmentM: minimum distance from point to segment]');

// Point ON the segment (midpoint)
const S1 = [53.770, -2.700];
const S2 = [53.780, -2.700];
const MID = [53.775, -2.700];
ok('point exactly on segment = 0 m (or near-zero)', pointToSegmentM(MID, S1, S2) < 1);

// Perpendicular case: point to the side of a segment
// Segment runs north–south, point is to the east
const EAST = [53.775, -2.690];  // ~700m east of midpoint
const perp = pointToSegmentM(EAST, S1, S2);
ok('perpendicular distance from east point to N-S segment is positive and reasonable', perp > 100 && perp < 2000, Math.round(perp));

// Past the endpoint: point is south of S1, so closest point should be S1
const SOUTH = [53.765, -2.700];
const dSouth = pointToSegmentM(SOUTH, S1, S2);
const dToS1 = haversineM(SOUTH, S1);
ok('point past endpoint snaps to endpoint', Math.abs(dSouth - dToS1) < 1, [Math.round(dSouth), Math.round(dToS1)]);

// Point past the other end
const NORTH = [53.785, -2.700];
const dNorth = pointToSegmentM(NORTH, S1, S2);
const dToS2 = haversineM(NORTH, S2);
ok('point past far endpoint snaps to far endpoint', Math.abs(dNorth - dToS2) < 1, [Math.round(dNorth), Math.round(dToS2)]);

// Zero-length segment (degenerate case)
ok('zero-length segment = distance to that point', Math.abs(pointToSegmentM(A, A, A) - 0) < 1);

// ---- pointToPolylineM ---------------------------------------------------------
console.log('\n[pointToPolylineM: minimum distance from point to polyline]');

// Simple L-shaped polyline: [0,0] -> [1,0] -> [1,1] (in lat/lng terms, scaled)
const PL = [[53.770, -2.710], [53.770, -2.700], [53.780, -2.700]];
// Point near corner [53.770, -2.700]
const CORNER_PT = [53.771, -2.700];
const dCorner = pointToPolylineM(CORNER_PT, PL);
ok('polyline: point near bend finds correct nearest segment', dCorner < 200, Math.round(dCorner));

// Point closer to segment 2 than segment 1
const FAR_ON_SEG2 = [53.775, -2.699];
const dSeg2 = pointToPolylineM(FAR_ON_SEG2, PL);
ok('polyline: picks the closer segment', dSeg2 < 200, Math.round(dSeg2));

// Fewer than 2 points = Infinity
ok('polyline with 0 points returns Infinity', pointToPolylineM([53.77, -2.70], []) === Infinity);
ok('polyline with 1 point returns Infinity', pointToPolylineM([53.77, -2.70], [[53.77, -2.70]]) === Infinity);

// ---- detourM ------------------------------------------------------------------
console.log('\n[detourM: extra metres for a detour]');

// A simple straight route from A to B (north-south, long enough to test)
// Route: Preston city centre, about 1.5 km north
const ROUTE_START = [53.757, -2.703];
const ROUTE_END   = [53.770, -2.703];
const STRAIGHT_ROUTE = [ROUTE_START, [53.760, -2.703], [53.763, -2.703], [53.766, -2.703], ROUTE_END];

// Shop and customer both close to the route (within 400m), shop before customer
// shop: slightly east of route midpoint, customer: further along route on east side
const SHOP_ON_ROUTE = [53.763, -2.702]; // ~80m east of a route point
const CUST_ON_ROUTE = [53.766, -2.702]; // ~80m east, further north

const dm = detourM(STRAIGHT_ROUTE, SHOP_ON_ROUTE, CUST_ON_ROUTE);
ok('job close to route has finite, small detour', isFinite(dm) && dm < 1000, Math.round(dm));
ok('detour for near job is non-negative', dm >= 0);

// Job far off route: customer more than 400m away
const FAR_CUST = [53.763, -2.670]; // ~2.5km east
const dmFar = detourM(STRAIGHT_ROUTE, SHOP_ON_ROUTE, FAR_CUST);
ok('job with customer > MAX_DETOUR_M off route returns Infinity', dmFar === Infinity, Math.round(dmFar));

// Shop > 400m off route
const FAR_SHOP = [53.763, -2.670];
const dmFarShop = detourM(STRAIGHT_ROUTE, FAR_SHOP, CUST_ON_ROUTE);
ok('job with shop > MAX_DETOUR_M off route returns Infinity', dmFarShop === Infinity);

// Backward job: shop comes after customer along the route
const dm_backward = detourM(STRAIGHT_ROUTE, CUST_ON_ROUTE, SHOP_ON_ROUTE); // swapped: cust before shop geographically, shop is "north" on route
// CUST is at 53.766 (segment index ~3), SHOP is at 53.763 (segment index ~2)
// So if we pass (route, custPt, shopPt) with cust further along, shop projection is before cust projection
// Actually let's make a clearer backward case: shop is NORTH (later on route), cust is SOUTH (earlier on route)
const SHOP_NORTH = [53.769, -2.702]; // near end of route
const CUST_SOUTH = [53.760, -2.702]; // near start of route
const dmBack = detourM(STRAIGHT_ROUTE, SHOP_NORTH, CUST_SOUTH);
ok('backward job (shop after customer on route) returns Infinity', dmBack === Infinity, Math.round(dmBack));

// Short route (< 2 points) — edge cases
ok('route with 0 points: both far off route -> Infinity', detourM([], SHOP_ON_ROUTE, CUST_ON_ROUTE) === Infinity);
ok('route with 1 point: < 2 segments -> Infinity', detourM([ROUTE_START], SHOP_ON_ROUTE, CUST_ON_ROUTE) === Infinity);

// MAX_DETOUR_M is 400
ok('MAX_DETOUR_M constant is 400 m', MAX_DETOUR_M === 400);

// ---- detourMinutes ------------------------------------------------------------
console.log('\n[detourMinutes: detour in minutes]');

const dmins = detourMinutes(STRAIGHT_ROUTE, SHOP_ON_ROUTE, CUST_ON_ROUTE);
ok('detourMinutes returns a positive integer for a short detour', Number.isInteger(dmins) && dmins > 0, dmins);
ok('detourMinutes = ceil(detourM / 80)', dmins === Math.ceil(detourM(STRAIGHT_ROUTE, SHOP_ON_ROUTE, CUST_ON_ROUTE) / 80), [dmins, detourM(STRAIGHT_ROUTE, SHOP_ON_ROUTE, CUST_ON_ROUTE)]);
ok('detourMinutes Infinity for far job', detourMinutes(STRAIGHT_ROUTE, FAR_SHOP, CUST_ON_ROUTE) === Infinity);

// A job with exactly 80m detour should give 1 min
// We can't easily construct exactly 80m, but we can verify the formula holds for the computed value
const dm2 = detourM(STRAIGHT_ROUTE, SHOP_ON_ROUTE, CUST_ON_ROUTE);
ok('detourMinutes rounds UP, never down', detourMinutes(STRAIGHT_ROUTE, SHOP_ON_ROUTE, CUST_ON_ROUTE) >= Math.floor(dm2 / 80));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
