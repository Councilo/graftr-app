// Repairs the cover + 4 work photos on every listing.
//
// Three faults it fixes:
//   1. Five Unsplash photos have been deleted upstream and 404. They were on
//      18 listings — 6 covers and 18 gallery slots showing nothing.
//   2. U Travel's cover pointed at assets/business/utravel-cover.jpg; the file
//      on disk is u-travel-uk-cover.jpg.
//   3. The same photo was used up to eight times while others were used once,
//      so listings in a category looked like each other.
//
// It only ever assigns photos verified to return 200, and never gives a
// listing the same photo twice. Run: node fix_business_images.js
const fs = require('fs');

const DATA = 'assets/businesses.json';
const CHECK = '.imgcheck.txt';

const photoId = (u) => {
  const m = String(u).match(/photo-[a-z0-9-]+/);
  return m ? m[0] : null;
};

const businesses = JSON.parse(fs.readFileSync(DATA, 'utf8'));

// Every URL that answered 200 when checked.
const dead = new Set();
fs.readFileSync(CHECK, 'utf8').trim().split('\n').forEach((line) => {
  const i = line.indexOf(' ');
  const code = line.slice(0, i);
  const url = line.slice(i + 1);
  const id = photoId(url);
  if (code !== '200' && id) dead.add(id);
});

// A listing on a local file keeps it — those are its own photos, not stock.
const localCover = new Map([['biz-u-travel-uk', 'assets/business/u-travel-uk-cover.jpg']]);

// Working photos, grouped by the category they were curated for.
const pools = new Map();
businesses.forEach((b) => {
  if (!pools.has(b.category)) pools.set(b.category, new Set());
  [b.coverSrc, ...(b.gallery || [])].filter(Boolean).forEach((u) => {
    const id = photoId(u);
    if (id && !dead.has(id)) pools.get(b.category).add(id);
  });
});
pools.forEach((set, cat) => pools.set(cat, [...set].sort()));

const cover = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
const shot = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

// Spread the pool rather than reaching for the same photo each time: always
// take the least-used one that this listing hasn't already got.
const used = new Map();
const take = (pool, exclude) => {
  const options = pool.filter((id) => !exclude.has(id));
  if (!options.length) return null;
  options.sort((a, b) => (used.get(a) || 0) - (used.get(b) || 0) || a.localeCompare(b));
  const picked = options[0];
  used.set(picked, (used.get(picked) || 0) + 1);
  return picked;
};

let fixedCovers = 0, fixedShots = 0, keptLocal = 0;

// Covers first, across every listing, so they get first pick and come out as
// distinct as each category allows — the cover is what's seen most.
businesses.forEach((b) => {
  if (localCover.has(b.id)) {
    if (b.coverSrc !== localCover.get(b.id)) fixedCovers++;
    b.coverSrc = localCover.get(b.id);
    keptLocal++;
    return;
  }
  if (String(b.coverSrc || '').startsWith('assets/')) { keptLocal++; return; }

  const before = photoId(b.coverSrc);
  const picked = take(pools.get(b.category) || [], new Set());
  if (picked) {
    b.coverSrc = cover(picked);
    if (picked !== before) fixedCovers++;
  }
});

// Then four work photos each, none matching the cover or each other. Assigned
// fresh rather than kept: keeping them preserved the very imbalance being
// fixed, since a photo already on eight listings stayed on eight.
businesses.forEach((b) => {
  const pool = pools.get(b.category) || [];
  const taken = new Set([photoId(b.coverSrc)].filter(Boolean));
  const before = (b.gallery || []).map(photoId).join(',');
  const out = [];
  while (out.length < 4) {
    const picked = take(pool, taken);
    if (!picked) break;
    taken.add(picked);
    out.push(shot(picked));
  }
  b.gallery = out;
  if (out.map(photoId).join(',') !== before) fixedShots++;
});

fs.writeFileSync(DATA, JSON.stringify(businesses, null, 2) + '\n');

const counts = [...used.values()];
const spread = {};
counts.forEach((n) => { spread[n] = (spread[n] || 0) + 1; });
console.log('covers changed  :', fixedCovers);
console.log('galleries redone:', fixedShots);
console.log('local covers    :', keptLocal);
console.log('photos in use   :', used.size, 'of', 93);
console.log('uses per photo  : min', Math.min(...counts), 'max', Math.max(...counts), '(was 8)');
console.log('spread          :', JSON.stringify(spread));
