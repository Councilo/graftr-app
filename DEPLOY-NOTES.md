# Vendaru — deploy & operations notes

## Before the first deploy

**Vercel project settings**
- *Git → Production Branch*: make sure it matches the branch you push to (this repo's local branch is `master`; if Vercel's production branch is `main`, pushes to `master` only create previews).
- *Node.js version*: 22.x (also pinned in `package.json` → `engines`).
- The commit author's email must match a member of the Vercel team (Hobby plan blocks others).
- *Storage*: attach a **Postgres** store and a **Blob** store to the project. Blob access mode can't be changed later — the proof photos currently go to a **public** (unguessable-URL) store; for stricter privacy create a *private* store before real customers use it.

**Environment variables** (Project → Settings → Environment Variables)

| Name | Required | What it is |
|---|---|---|
| `JWT_SECRET` | yes | long random string used to sign logins, quotes and place tokens |
| `POSTGRES_URL` | yes | added automatically when you attach Postgres (must be the *pooled* URL) |
| `BLOB_READ_WRITE_TOKEN` | yes | added automatically when you attach Blob |
| `ADMIN_EMAILS` | yes, for the admin dashboard | comma-separated emails that get the Admin button, e.g. `you@vendaru.com` (that person must also register/sign in with that email) |
| `PAYMENT_INSTRUCTIONS` | recommended | text shown under "How to pay" (bank details / invoice wording). Plain text; line breaks are kept |
| `TURN_URLS`, `TURN_USERNAME`, `TURN_CREDENTIAL` | recommended for calls | a TURN relay for in-app calls (comma-separated `turn:`/`turns:` URLs). Without it calls use free STUN only, which fails on some mobile networks. Providers with a free tier include Cloudflare Realtime TURN and Metered |

A missing setting is now reported by name in the API's error message instead of a bare "something went wrong".

**Why the API is one file.** Vercel's Hobby plan allows 12 serverless functions per deployment and the app had 19 endpoints, which is the likely reason deploys stopped going through. All endpoints now live in `handlers/` behind one function, `api/index.js`. To add an endpoint: create `handlers/<name>.js` **and** add it to the list in `api/index.js` (a test checks the two agree). `vercel.json` publishes only the public site files, so `lib/`, `handlers/` and source files are not downloadable.

**Why the security headers are inside `routes`.** `vercel.json` uses the legacy `builds` + `routes` setup, and Vercel silently ignores a top-level `headers` list whenever `routes` is present. The first live deploy went out with no Content-Security-Policy, frame protection or cache rules for exactly that reason. The headers are now route entries with `"continue": true`, placed before the routes that serve pages; `tests/vercel-config.test.js` fails if they move back to a top-level `headers` list.

**After the deploy, check**
1. `https://<your-site>/api/me` answers `{"detail":"Not authenticated"}` (401) — the API is alive.
2. `https://<your-site>/lib/auth.js` and `/handlers/login.js` give a 404 — source isn't public.
3. Register a customer, then set `ADMIN_EMAILS` and register/sign in as that admin email — the shield button appears in the sidebar.
4. Response headers include `Content-Security-Policy` (browser dev tools → Network).

## How money works today (no card processing yet)
- Every job gets a payment record, `UNPAID`. The customer sees **How to pay** (your `PAYMENT_INSTRUCTIONS`, with reference `VND-<order number>`).
- When the money arrives, an admin opens **Admin → Payments → Mark as paid**.
- Cancelling before a courier accepts refunds automatically (or just voids it if unpaid). **Once a courier has accepted, the customer's Cancel button is locked** ("cancelling will incur a fee") and they use *Help → Orders → Contact support to cancel*; you then open **Admin → find the order → Cancel order and apply fee**, enter the fee to keep, and the rest is recorded as returned (or the amount owed drops to just the fee if unpaid). The fee amount is up to you: the policy pages have an `[OWNER TO CONFIRM]` box for it. Anything else is a **refund request** an admin approves (in full or part) or denies with a reason. Approving records the refund; **you send the money back by hand** and the app keeps the record.
- Jobs are not blocked while unpaid — decide whether couriers should only see paid jobs before launch.
- Orders nobody accepts are cancelled and refunded automatically 30 minutes after their pickup window ends (24 hours after the start unless the customer set an end).

## Testing
```
npm run dev      # local server on http://localhost:5500 (in-memory database)
npm test         # all suites; add  -- --offline  to skip the ones that call the free map services
```
The local admin is `admin@example.com` (register it on the sign-up form).

## Things only the owner can do
- Fill every yellow `[OWNER TO CONFIRM]` box in the policy pages and have a UK solicitor review them (they're marked DRAFT).
- ICO registration, complaints procedure, insurance, VAT status, company details.
- From 1 Oct 2026 gig platforms may need right-to-work checks on couriers — get advice; the app does not verify couriers yet.
- Card payments later (Stripe Connect avoids holding customers' money yourself).
- Move proof photos to private storage and add a retention/deletion schedule.

## In-app voice calls
- A phone button on the delivery card and on each accepted order rings the other person **inside the app** (WebRTC, phone-to-phone: no phone numbers shared, audio never touches your server and isn't recorded). Only the set-up messages go through `/api/call-*`, and each call is one row in `calls`.
- Both people need the app open: a web page can't wake a locked phone, so it rings within about 3 seconds while a delivery is under way and the app is on screen.
- Set the `TURN_*` variables above before relying on it: about one in five to one in three calls between two mobile networks won't connect with STUN alone. Test on two real phones on different networks before launch.
- The site's headers allow the microphone for its own pages only (`Permissions-Policy: microphone=(self)`).
