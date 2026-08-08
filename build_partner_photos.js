// Gives each partner card a banner photo that means something, the same way
// build_business_images.js does for listings.
//
//   UNSPLASH_ACCESS_KEY=... node build_partner_photos.js
//
// Writes the photo straight into the PARTNER_CARDS entry in app.js. The key is
// read from the environment and never written anywhere — it is not needed to
// run the site, only to rebuild these.
//
// Shopify and UTravel already carry a photo picked by hand from what the repo
// had. TikTok has none: nothing in the existing library reads as short video or
// creators, and a stock picture that doesn't mean anything is worse than the
// brand's own black. This is how it gets one.
const fs = require('fs');

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error('Set UNSPLASH_ACCESS_KEY. Nothing was written.');
  process.exit(1);
}

// What each card should show. Not the company — the thing the offer is about.
const QUERIES = {
  shopify: 'small business owner packing orders',
  tiktok: 'filming video smartphone creator',
  utravel: 'travel planning map holiday',
};

async function firstPhoto(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}`
    + `&per_page=10&orientation=landscape&content_filter=high`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } });
  if (!res.ok) throw new Error(`${query}: ${res.status}`);
  const json = await res.json();
  const hit = (json.results || [])[0];
  if (!hit) throw new Error(`${query}: no results`);
  return `${hit.urls.raw}&auto=format&fit=crop&w=800&q=80`;
}

(async () => {
  let app = fs.readFileSync('app.js', 'utf8');
  let changed = 0;

  for (const [id, query] of Object.entries(QUERIES)) {
    let photo;
    try {
      photo = await firstPhoto(query);
    } catch (e) {
      console.log(`${id.padEnd(9)} ! ${e.message} — left alone`);
      continue;
    }

    // Find this card's object and set or add its photo, without disturbing the
    // rest of the entry.
    const at = app.indexOf(`id: '${id}',`);
    if (at < 0) { console.log(`${id.padEnd(9)} ! not in PARTNER_CARDS`); continue; }
    const end = app.indexOf('\n  },', at);
    const entry = app.slice(at, end);

    let next;
    if (/photo: '[^']*'/.test(entry)) {
      next = entry.replace(/photo: '[^']*'/, `photo: '${photo}'`);
    } else {
      // Put it just before the url, where the other cards keep it.
      next = entry.replace(/(\n\s*)url: /, `$1photo: '${photo}',$1url: `);
    }
    if (next === entry) { console.log(`${id.padEnd(9)} ! could not place the photo`); continue; }

    app = app.slice(0, at) + next + app.slice(end);
    changed++;
    console.log(`${id.padEnd(9)} ${query}`);
    await new Promise((r) => setTimeout(r, 300));
  }

  if (!changed) { console.log('\nnothing changed'); return; }
  fs.writeFileSync('app.js', app);
  console.log(`\n${changed} card${changed === 1 ? '' : 's'} updated. Bump the ?v= in index.html and deploy.`);
})();
