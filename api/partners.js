// Builds the Partner offers band from the Impact account, so the cards follow
// whatever programmes you've actually joined instead of being typed into app.js.
//
// This runs on the server for one reason: the Impact credentials cannot go
// anywhere near the browser. Vendaru is a static site — every byte of app.js is
// downloaded by every visitor — so a token in the frontend is a published
// token. It lives in Vercel's environment variables, is read here, and only the
// finished cards travel back to the page.
//
// Set in Vercel → Settings → Environment Variables:
//   IMPACT_ACCOUNT_SID   the account SID Impact shows alongside the token
//   IMPACT_API_TOKEN     the token secret itself
//
// Both are required: Impact's API takes the SID as the Basic-auth username and
// the token as the password, so a token on its own cannot authenticate.
// Vercel only injects environment variables at build time, so a variable added
// after the last deploy needs a redeploy before this function can see it.
//
// Neither belongs in this repo. Without them the endpoint reports that it isn't
// configured and the page falls back to its built-in list, so deploying this
// before the token exists breaks nothing.

const IMPACT_BASE = 'https://api.impact.com';

// A brand colour for the card tile, keyed on whatever the programme is called.
// Anything unrecognised gets Vendaru's own black rather than a guess.
const TINTS = [
  [/shopify/i, '#008060'],
  [/tiktok/i, '#010101'],
  [/amazon/i, '#232F3E'],
  [/booking|expedia|travel/i, '#003580'],
  [/ebay/i, '#0064D2'],
];

function tintFor(name) {
  const hit = TINTS.find(([re]) => re.test(name || ''));
  return hit ? hit[1] : '#141414';
}

// Impact returns different shapes across its endpoints and versions, so read
// the first field that's actually present rather than assuming one spelling.
function pick(obj, ...names) {
  for (const n of names) {
    const v = obj && obj[n];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

async function impactGet(path, sid, token) {
  const res = await fetch(`${IMPACT_BASE}${path}`, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    // The body can echo request details, so it is logged for the operator and
    // never returned to the browser.
    const body = await res.text().catch(() => '');
    console.error(`Impact ${path} -> ${res.status}`, body.slice(0, 400));
    const err = new Error(`Impact returned ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

module.exports = async (req, res) => {
  // Impact authenticates with the account SID as the username and the token as
  // the password, so both are needed. Several spellings accepted because the
  // name in the dashboard doesn't match the name in the docs.
  const sid = process.env.IMPACT_ACCOUNT_SID || process.env.IMPACT_ACCOUNT_ID || process.env.IMPACT_SID;
  const token = process.env.IMPACT_API_TOKEN || process.env.IMPACT_AUTH_TOKEN || process.env.IMPACT_TOKEN;

  // Not an error: the site is expected to work before the token exists. Names
  // of what's missing come back so a half-finished setup can be diagnosed
  // without guessing — names only, never values.
  if (!sid || !token) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      configured: false,
      partners: [],
      missing: [
        sid ? null : 'IMPACT_ACCOUNT_SID',
        token ? null : 'IMPACT_API_TOKEN',
      ].filter(Boolean),
    });
    return;
  }

  try {
    const data = await impactGet(`/Mediapartners/${encodeURIComponent(sid)}/Campaigns?PageSize=100`, sid, token);
    const rows = data.Campaigns || data.campaigns || [];

    const partners = (Array.isArray(rows) ? rows : [])
      .map((c) => {
        // The tracking link is the whole point — a campaign without one earns
        // nothing, so it isn't a card.
        const url = pick(c, 'TrackingLink', 'trackingLink', 'CampaignUrl', 'LandingPageUrl');
        const name = pick(c, 'CampaignName', 'campaignName', 'AdvertiserName', 'Name');
        if (!url || !name) return null;
        return {
          id: pick(c, 'CampaignId', 'campaignId', 'Id') || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name,
          blurb: pick(c, 'CampaignDescription', 'Description', 'TagLine'),
          cta: 'Visit',
          tint: tintFor(name),
          url,
        };
      })
      .filter(Boolean)
      .slice(0, 8);

    // Cached at the edge, so Impact sees roughly one request an hour however
    // busy the site gets, and a slow response never blocks a visitor.
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ configured: true, partners });
  } catch (e) {
    console.error('Impact partners failed:', e.message);
    // The page keeps its built-in cards; nothing about the credentials or the
    // upstream response goes back to the browser. The status code does come
    // back, because it says which thing is wrong — 401 the credentials, 403 the
    // token's scopes, 404 the path — and a bare status leaks nothing.
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      configured: true,
      partners: [],
      error: 'upstream',
      upstreamStatus: e.status || null,
    });
  }
};
