// Products for the Pixcision Stock listing, assembled from the two places that
// each hold half the answer.
//
// Gelato prints the framed canvases and knows which products it fulfils, but a
// Gelato product carries no retail price — Gelato charges the merchant, and what
// the customer pays is set in Shopify. Shopify's public product feed has the
// price, the images and the product URL, but says nothing about who prints it.
// So the feed supplies the shopfront and Gelato confirms which of those products
// it actually makes, matched on Shopify's product id, which Gelato stores as
// `externalId`.
//
// Set in Vercel → Settings → Environment Variables:
//   GELATO_API_KEY    from Gelato → Developer → API Keys
//   GELATO_STORE_ID   the uuid in the Gelato dashboard URL for the connected store
//
// Both are optional. Without them the endpoint still returns the full shopfront
// from the public feed and simply can't mark which items Gelato prints, so this
// deploys safely before the key exists. Gelato has no "list my stores" endpoint,
// which is why the store id has to be read off the dashboard by hand.
//
// The key never reaches the browser. Vendaru is a static site, so anything in
// app.js is published; the key is read here and only finished product cards go
// back. Vercel injects environment variables at build time, so a variable added
// after the last deploy needs a redeploy before this function can see it.

// Hard-coded on purpose. If the shop domain came from the query string this
// would be an open proxy — anyone could point it at any host and have Vercel
// fetch it. Adding a shop means editing this list.
const STORE_DOMAIN = 'pixcisionstock.com';

const GELATO_ECOMMERCE = 'https://ecommerce.gelatoapis.com/v1';

// Shopify caps a page at 250 and gives no total, so pages are walked until one
// comes back short. Bounded so a misbehaving feed can't spin here forever.
const PAGE_SIZE = 250;
const MAX_PAGES = 6;

// Shopify Markets prices by the requester's location and products.json never
// says which currency it answered in. Called from a US address this feed returns
// the US market's converted prices — every product 1.40× the UK one — which
// Vendaru would then print with a £ sign, overstating a real shop's prices by
// 40%. Two things keep it in sterling: the function runs in London (regions in
// vercel.json), so the request originates in the UK, and country=GB asks for the
// GB market explicitly. The belt matters as much as the braces here, because a
// wrong answer is indistinguishable from a right one in the response body.
async function shopifyProducts(domain) {
  const all = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetch(
      `https://${domain}/products.json?limit=${PAGE_SIZE}&page=${page}&country=GB`,
      { headers: { Accept: 'application/json', 'X-Shopify-Country': 'GB' } });
    if (!res.ok) {
      const err = new Error(`${domain} returned ${res.status}`);
      err.status = res.status;
      throw err;
    }
    const batch = (await res.json()).products || [];
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  return all;
}

// A framed print has a Frame option; a digital file has Licence and File format.
// That option shape is a more reliable split than product_type, which is blank
// on well over half the catalogue.
function isPrint(p) {
  return (p.options || []).some(o => /frame/i.test(o.name || ''))
    || /print material/i.test(p.product_type || '');
}

// Sizes and frame colours all price differently, so a single card shows the
// cheapest and says "from".
function fromPrice(p) {
  const prices = (p.variants || [])
    .map(v => Number(v.price))
    .filter(n => Number.isFinite(n) && n > 0);
  return prices.length ? Math.min(...prices) : null;
}

// Shopify descriptions are HTML — size tables, care instructions, markup. None
// of that belongs on a Vendaru card, and injecting a third party's HTML into the
// page would be an XSS hole, so it's reduced to a short line of plain text.
function blurb(p) {
  const text = String(p.body_html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= 110) return text;
  return text.slice(0, 109).replace(/\s+\S*$/, '') + '…';
}

async function gelatoProductIds(key, storeId) {
  // Only the externalId set is wanted — which Shopify products Gelato fulfils.
  const ids = new Set();
  for (let offset = 0; offset < 1000; offset += 100) {
    const res = await fetch(
      `${GELATO_ECOMMERCE}/stores/${encodeURIComponent(storeId)}/products`
        + `?limit=100&offset=${offset}&order=desc&orderBy=createdAt`,
      { headers: { 'X-API-KEY': key, Accept: 'application/json' } });
    if (!res.ok) {
      // The body can echo request detail, so it is logged for the operator and
      // never returned to the browser.
      const body = await res.text().catch(() => '');
      console.error(`Gelato products -> ${res.status}`, body.slice(0, 400));
      const err = new Error(`Gelato returned ${res.status}`);
      err.status = res.status;
      throw err;
    }
    const batch = (await res.json()).products || [];
    for (const p of batch) if (p && p.externalId) ids.add(String(p.externalId));
    if (batch.length < 100) break;
  }
  return ids;
}

module.exports = async (req, res) => {
  const clean = (v) => (typeof v === 'string' ? v.trim() : '');
  const key = clean(process.env.GELATO_API_KEY);
  const storeId = clean(process.env.GELATO_STORE_ID);

  let products;
  try {
    products = await shopifyProducts(STORE_DOMAIN);
  } catch (e) {
    console.error('Shopify feed failed:', e.message);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ products: [], error: 'upstream', upstreamStatus: e.status || null });
    return;
  }

  // Gelato is an enrichment, not a dependency: if the key is missing or the call
  // fails, the shopfront still renders and simply isn't annotated. Names of what
  // is missing come back so a half-finished setup can be diagnosed without
  // guessing — names only, never values.
  let fulfilled = null;
  let gelatoError = null;
  if (key && storeId) {
    try {
      fulfilled = await gelatoProductIds(key, storeId);
    } catch (e) {
      gelatoError = e.status || 'failed';
    }
  }

  const cards = products
    .filter(p => p && p.title && (p.images || []).length)
    .map((p) => {
      const price = fromPrice(p);
      if (price == null) return null;
      const image = (p.images[0] || {}).src || '';
      if (!image) return null;
      return {
        id: String(p.id),
        title: String(p.title).trim(),
        blurb: blurb(p),
        price,
        currency: 'GBP',
        // Shopify sizes on the fly, so the card asks for roughly what it shows
        // rather than pulling the original onto a phone. The full-size files run
        // to 5MB each; at the ~200px a card is actually drawn, _400x covers a
        // retina screen for a twentieth of the bytes.
        image: image.replace(/(\.[a-z]+)(\?|$)/i, '_400x$1$2'),
        url: `https://${STORE_DOMAIN}/products/${p.handle}`,
        kind: isPrint(p) ? 'print' : 'digital',
        variants: (p.variants || []).length,
        gelato: fulfilled ? fulfilled.has(String(p.id)) : null,
        createdAt: p.published_at || p.created_at || null,
      };
    })
    .filter(Boolean);

  // Newest first — a shop that adds work wants the new work seen.
  cards.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));

  // Cached at the edge, so the shop sees roughly one request an hour however
  // busy Vendaru gets and a slow feed never blocks a visitor.
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({
    configured: Boolean(key && storeId),
    missing: [key ? null : 'GELATO_API_KEY', storeId ? null : 'GELATO_STORE_ID'].filter(Boolean),
    gelatoError,
    counts: {
      total: cards.length,
      prints: cards.filter(c => c.kind === 'print').length,
      digital: cards.filter(c => c.kind === 'digital').length,
      gelatoFulfilled: fulfilled ? cards.filter(c => c.gelato).length : null,
    },
    products: cards,
  });
};
