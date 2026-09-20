// vercel.json: the security headers must be set by route entries, because Vercel ignores a top-level
// "headers" list whenever "routes" is present (which is how the live site once ended up with none).
const fs = require('fs');
const path = require('path');
const cfg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'vercel.json'), 'utf8'));

let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name + (extra !== undefined ? '  -> ' + JSON.stringify(extra).slice(0, 200) : '')); }
};

// What a request for `pathname` gets: every header route whose src matches, later ones winning.
function headersFor(pathname) {
  const out = {};
  for (const route of cfg.routes) {
    if (!route.headers) continue;
    if (new RegExp('^' + route.src + '$').test(pathname)) Object.assign(out, route.headers);
    if (!route.continue) break;
  }
  return out;
}

console.log('[vercel.json headers]');
ok('no top-level "headers" (ignored next to "routes")', !('headers' in cfg) && Array.isArray(cfg.routes), Object.keys(cfg));

const firstDest = cfg.routes.findIndex((r) => !r.headers);
const headerRoutes = cfg.routes.slice(0, firstDest);
ok('header routes come first and all carry on to the next route', headerRoutes.length >= 4 && headerRoutes.every((r) => r.continue === true && r.headers), headerRoutes.length);
ok('the API router route is still there', cfg.routes.some((r) => /api\/index\.js\?route=\$route/.test(r.dest || '')));

const page = headersFor('/index.html');
ok('every page gets the hardening headers', page['X-Frame-Options'] === 'DENY' && page['X-Content-Type-Options'] === 'nosniff' && /strict-origin/.test(page['Referrer-Policy'] || '') && /max-age=/.test(page['Strict-Transport-Security'] || ''), page);
ok('microphone and location are allowed for our own pages only', /geolocation=\(self\)/.test(page['Permissions-Policy']) && /microphone=\(self\)/.test(page['Permissions-Policy']) && /camera=\(\)/.test(page['Permissions-Policy']), page['Permissions-Policy']);

const csp = page['Content-Security-Policy'] || '';
ok('CSP: own scripts only, no framing, no plugins', /script-src 'self'(;|$)/.test(csp) && /frame-ancestors 'none'/.test(csp) && /object-src 'none'/.test(csp) && /default-src 'self'/.test(csp), csp);
ok('CSP lets the browser reach both road-routing servers', /connect-src [^;]*https:\/\/router\.project-osrm\.org/.test(csp) && /connect-src [^;]*https:\/\/routing\.openstreetmap\.de/.test(csp), csp);
ok('CSP lets the map draw its tiles and proof photos load', /img-src [^;]*https:\/\/tile\.openstreetmap\.org/.test(csp) && /img-src [^;]*blob\.vercel-storage\.com/.test(csp), csp);

ok('API responses are not cached', headersFor('/api/me')['Cache-Control'] === 'no-store', headersFor('/api/me'));
const track = headersFor('/track.html');
ok('the recipient tracking page is private: no referrer, not indexed, not cached', track['Referrer-Policy'] === 'no-referrer' && /noindex/.test(track['X-Robots-Tag']) && track['Cache-Control'] === 'no-store', track);
ok('the tracking page keeps the site-wide hardening too', track['X-Frame-Options'] === 'DENY' && !!track['Content-Security-Policy'], track);
ok('sitemap and robots keep their content types', /application\/xml/.test(headersFor('/sitemap.xml')['Content-Type']) && /text\/plain/.test(headersFor('/robots.txt')['Content-Type']));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
