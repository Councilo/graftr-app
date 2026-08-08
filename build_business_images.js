// Gives every listing its own cover and four work photos, with no photo shared
// between any two listings.
//
// Needs an Unsplash access key, passed in the environment so it never lands in
// the repo — the app doesn't use it, only this build step does:
//
//   UNSPLASH_ACCESS_KEY=... node build_business_images.js
//
// Search results are cached in .unsplash-cache.json, so re-running to change
// how photos are handed out costs no requests. Delete the cache to refetch.
const fs = require('fs');

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error('Set UNSPLASH_ACCESS_KEY. Nothing was written.');
  process.exit(1);
}

const DATA = 'assets/businesses.json';
const CACHE = '.unsplash-cache.json';

// What each trade's photos should actually show. Several queries per category
// so a category gets variety rather than fifty versions of one scene.
const QUERIES = {
  trades: ['plumber working', 'electrician working', 'builder construction site', 'carpenter workshop'],
  'real-estate': ['estate agent house', 'modern house exterior', 'home interior living room', 'house keys door'],
  auto: ['car mechanic garage', 'auto repair workshop', 'car service tyre', 'engine repair'],
  beauty: ['hair salon stylist', 'barber shop haircut', 'beauty salon treatment', 'manicure nails'],
  health: ['physiotherapy treatment', 'dental clinic', 'gym fitness training', 'medical clinic doctor'],
  cleaning: ['house cleaning', 'window cleaning', 'office cleaning', 'housekeeping vacuum'],
  'dog-walkers': ['dog walking park', 'dogs on leads', 'dog training outdoors', 'happy dog owner'],
  pets: ['pet grooming', 'veterinary clinic', 'cat care', 'dog groomer'],
  tutoring: ['tutor student studying', 'classroom teaching', 'child learning books', 'exam study desk'],
  travel: ['travel agency holiday', 'airport departure', 'beach holiday resort', 'suitcase travel'],
  legal: ['law office desk', 'lawyer meeting', 'accountant paperwork', 'legal documents signing'],
  events: ['wedding reception', 'event planning decor', 'party celebration', 'conference venue'],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query, page) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}`
    + `&per_page=30&page=${page}&orientation=landscape&content_filter=high`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } });
  if (!res.ok) throw new Error(`${query} p${page}: ${res.status} ${await res.text()}`);
  const json = await res.json();
  console.log(`  ${query} p${page}: ${json.results.length} photos`);
  // raw is the CDN base; the sizing goes on when the URL is written.
  return json.results.map((p) => ({ id: p.id, raw: p.urls.raw }));
}

async function gather() {
  if (fs.existsSync(CACHE)) {
    console.log('using cached search results');
    return JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  }
  const out = {};
  for (const [cat, queries] of Object.entries(QUERIES)) {
    console.log(cat);
    const seen = new Map();
    for (const q of queries) {
      try {
        (await search(q, 1)).forEach((p) => seen.set(p.id, p));
      } catch (e) {
        console.log('  !', e.message.slice(0, 80));
      }
      await sleep(300);
    }
    out[cat] = [...seen.values()];
    console.log(`  → ${out[cat].length} unique for ${cat}`);
  }
  fs.writeFileSync(CACHE, JSON.stringify(out, null, 2));
  return out;
}

(async () => {
  const pools = await gather();
  const businesses = JSON.parse(fs.readFileSync(DATA, 'utf8'));

  // A listing whose cover is a real file of its own work keeps it.
  const ownCover = (b) => String(b.coverSrc || '').startsWith('assets/');

  const need = {};
  businesses.forEach((b) => { need[b.category] = (need[b.category] || 0) + 5; });

  const short = Object.entries(need)
    .filter(([cat, n]) => (pools[cat] || []).length < n)
    .map(([cat, n]) => `${cat}: have ${(pools[cat] || []).length}, need ${n}`);
  if (short.length) {
    console.error('\nNot enough photos to give every listing its own:');
    short.forEach((s) => console.error('  ' + s));
    console.error('Delete .unsplash-cache.json and add queries for those categories.');
    process.exit(1);
  }

  const cover = (raw) => `${raw}&auto=format&fit=crop&w=1200&q=80`;
  const shot = (raw) => `${raw}&auto=format&fit=crop&w=800&q=80`;

  // Straight down each category's pool, never reusing a photo.
  const next = {};
  let covers = 0, shots = 0, kept = 0;
  businesses.forEach((b) => {
    const pool = pools[b.category];
    // A cursor per category: each photo handed out once and never revisited.
    const pick = () => {
      const i = next[b.category] || 0;
      next[b.category] = i + 1;
      return pool[i];
    };
    if (ownCover(b)) { kept++; } else { b.coverSrc = cover(pick().raw); covers++; }
    b.gallery = [pick(), pick(), pick(), pick()].map((p) => shot(p.raw));
    shots += 4;
  });

  fs.writeFileSync(DATA, JSON.stringify(businesses, null, 2) + '\n');
  console.log(`\ncovers set: ${covers} (+${kept} kept as their own file)`);
  console.log(`photos set: ${shots}`);
})();
