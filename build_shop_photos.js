// Gives each of the 100 local shop cards its own photo, so they read like the
// other cards on Shop rather than initials in a box.
//
//   UNSPLASH_ACCESS_KEY=... node build_shop_photos.js
//
// Writes the photo list straight into app.js, replacing SHOP_PHOTOS. The
// pictures are of the kind of shop — a bakery counter, a pharmacy, a chiller
// aisle — never captioned as a particular branch, which is not something we
// can stand behind.
const fs = require('fs');

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error('Set UNSPLASH_ACCESS_KEY. Nothing was written.');
  process.exit(1);
}

// One search per chain, enough photos for a town each.
const QUERIES = {
  'Co-op Food': 'convenience store interior',
  'Tesco Express': 'supermarket aisle groceries',
  "Sainsbury's Local": 'grocery store shelves',
  'Iceland': 'frozen food packaging',
  'Farmfoods': 'grocery shopping basket',
  'Greggs': 'bakery shop counter',
  'Boots': 'pharmacy shop',
  'Home Bargains': 'cleaning products shelf',
  'B&M': 'discount store aisle',
  'Poundland': 'variety store shelves',
};

const TOWNS = 10;

async function search(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}`
    + `&per_page=30&orientation=landscape&content_filter=high`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } });
  if (!res.ok) throw new Error(`${query}: ${res.status}`);
  const json = await res.json();
  return json.results.map((p) => p.urls.raw);
}

(async () => {
  const photos = {};
  const seen = new Set();
  for (const [chain, query] of Object.entries(QUERIES)) {
    const raws = await search(query);
    // No photo twice across the whole board, same as the listings.
    const mine = raws.filter((r) => !seen.has(r)).slice(0, TOWNS);
    mine.forEach((r) => seen.add(r));
    photos[chain] = mine.map((r) => `${r}&auto=format&fit=crop&w=800&q=80`);
    console.log(`${chain.padEnd(18)} ${photos[chain].length}/${TOWNS}`);
    if (photos[chain].length < TOWNS) console.log('  ! short — widen the query');
    await new Promise((r) => setTimeout(r, 300));
  }

  const body = 'const SHOP_PHOTOS = ' + JSON.stringify(photos, null, 2) + ';';
  const app = fs.readFileSync('app.js', 'utf8');
  const re = /const SHOP_PHOTOS = \{[\s\S]*?\n\};/;
  if (!re.test(app)) {
    console.error('SHOP_PHOTOS not found in app.js — add a placeholder first.');
    process.exit(1);
  }
  fs.writeFileSync('app.js', app.replace(re, body));

  const all = Object.values(photos).flat();
  console.log(`\nwritten: ${all.length} photos, ${new Set(all).size} distinct`);
})();
