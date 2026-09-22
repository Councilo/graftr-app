// The ONE serverless function behind every /api/* URL.
//
// Vercel turns each file in api/ into its own function, and the free (Hobby)
// plan allows only 12 functions per deployment. Vendaru had grown to 19
// endpoints, so every deploy over that line was rejected and the live site
// stopped updating. Instead of one file per endpoint, this single function
// receives every API request and hands it to the matching handler in
// handlers/ — so the number of endpoints no longer matters, and adding one
// never risks the deploy again.
//
// How a request gets here: vercel.json routes /api/<name> to this file with
// ?route=<name>; the handler name is read from that (falling back to the URL's
// own path). dev-server.js goes through this same file, so local behaviour is
// the production behaviour.
//
// Each handler is required lazily, inside its own arrow function. The
// require() calls are plain string literals, which is what lets Vercel's file
// tracing find every handler and bundle it, while a cold start only loads the
// one that is actually called.
const HANDLERS = {
  'account-consent': () => require('../handlers/account-consent'),
  'account-courier-mode': () => require('../handlers/account-courier-mode'),
  'account-delete': () => require('../handlers/account-delete'),
  'account-export': () => require('../handlers/account-export'),
  'account-password': () => require('../handlers/account-password'),
  'account-profile': () => require('../handlers/account-profile'),
  'admin-audit': () => require('../handlers/admin-audit'),
  'admin-job': () => require('../handlers/admin-job'),
  'admin-overview': () => require('../handlers/admin-overview'),
  'admin-payments': () => require('../handlers/admin-payments'),
  'admin-refunds': () => require('../handlers/admin-refunds'),
  'admin-tickets': () => require('../handlers/admin-tickets'),
  'admin-users': () => require('../handlers/admin-users'),
  'address-search': () => require('../handlers/address-search'),
  'call-answer': () => require('../handlers/call-answer'),
  'call-config': () => require('../handlers/call-config'),
  'call-end': () => require('../handlers/call-end'),
  'call-poll': () => require('../handlers/call-poll'),
  'call-start': () => require('../handlers/call-start'),
  'email-resend': () => require('../handlers/email-resend'),
  'email-verify': () => require('../handlers/email-verify'),
  'jobs-accept': () => require('../handlers/jobs-accept'),
  'jobs-available': () => require('../handlers/jobs-available'),
  'jobs-cancel': () => require('../handlers/jobs-cancel'),
  'jobs-courier-mine': () => require('../handlers/jobs-courier-mine'),
  'jobs-create': () => require('../handlers/jobs-create'),
  'jobs-delete': () => require('../handlers/jobs-delete'),
  'jobs-deliver': () => require('../handlers/jobs-deliver'),
  'jobs-location': () => require('../handlers/jobs-location'),
  'jobs-mine': () => require('../handlers/jobs-mine'),
  'jobs-pickup': () => require('../handlers/jobs-pickup'),
  'jobs-quote': () => require('../handlers/jobs-quote'),
  'jobs-start': () => require('../handlers/jobs-start'),
  'jobs-tracking': () => require('../handlers/jobs-tracking'),
  'login': () => require('../handlers/login'),
  'me': () => require('../handlers/me'),
  'messages-list': () => require('../handlers/messages-list'),
  'messages-send': () => require('../handlers/messages-send'),
  'password-forgot': () => require('../handlers/password-forgot'),
  'password-reset': () => require('../handlers/password-reset'),
  'refund-mine': () => require('../handlers/refund-mine'),
  'refund-request': () => require('../handlers/refund-request'),
  'register': () => require('../handlers/register'),
  'reverse-geocode': () => require('../handlers/reverse-geocode'),
  'support-create': () => require('../handlers/support-create'),
  'support-mine': () => require('../handlers/support-mine'),
  'support-reply': () => require('../handlers/support-reply'),
  'track': () => require('../handlers/track'),
};

// Only ever a plain name: letters, digits and hyphens. Anything else can never
// match a handler, and this keeps a crafted path from reaching the lookup.
const NAME_RE = /^[a-z0-9-]{1,40}$/;

function routeName(req) {
  const fromQuery = req.query && req.query.route;
  if (typeof fromQuery === 'string' && fromQuery) return fromQuery;
  const path = String(req.url || '').split('?')[0];
  const m = path.match(/^\/api\/([^/]+)\/?$/);
  return m ? m[1] : '';
}

module.exports = async (req, res) => {
  const name = routeName(req);
  const load = NAME_RE.test(name) && Object.prototype.hasOwnProperty.call(HANDLERS, name) ? HANDLERS[name] : null;
  if (!load) {
    res.status(404).json({ detail: 'No such endpoint' });
    return;
  }
  return load()(req, res);
};

// Exposed so tests can check that every handler file is registered, and the
// other way round.
module.exports.HANDLER_NAMES = Object.keys(HANDLERS);
