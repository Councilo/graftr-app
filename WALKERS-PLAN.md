# Walkers: the plan

Status: **plan only, nothing built yet.** Written 2026-09-21 as a document to work from. Every number marked
"default" is a starting point to tune in a pilot, not a fact. Section 12 lists the decisions I need from you.

---

## 1. The idea in one paragraph

A **walker** is a courier with no car or bike. They pick up a small **bag** from a **partner shop** (a corner shop or
mini market) and carry it to a customer's door **within 1 mile**, ideally on a route they were already going to walk.
It is cheaper than a courier and slower, and the product is honest about that everywhere: the customer sees the
time it will really take **before** they choose it, and has to tick that they understand.

Three rules the whole feature hangs on:

1. **1 mile maximum**, measured along the *walking route* from the shop to the door, never as the crow flies.
2. **Slower is advertised, not hidden.** The time range appears on the quote, the confirmation, the email, the order
   card and the tracking page, and the customer must acknowledge it.
3. **Bags only.** One small bag, light, nothing hot, nothing age-restricted, nothing valuable.

## 2. Who does what

| Person | What they do |
|---|---|
| **Shop** (partner corner shop / mini market) | Packs a bag, taps "Bag ready", hands it to the walker, taps "Handed over". Can post the delivery job itself. |
| **Customer** | Buys from the shop (paid to the shop, off-platform) and pays the walker fee through Vendaru, or the shop pays the fee. Sees the time range and ticks it. |
| **Walker** | Says where they are walking (optional), sees bags on or near that route, accepts, collects with a code, walks, delivers with proof. |
| **You (admin)** | Approve shops and walkers, see walker jobs and lateness, handle problems. |

### The two flows

**Flow A, shop-initiated (build first).** A shop posts a bag job for a customer address: "Bag for 14 Hill St,
Preston PR1 2AB, ready at 6:30 pm". Walkers nearby see it. A walker accepts, collects, delivers.

**Flow B, customer-initiated (later).** A customer picks a nearby partner shop from a list and asks a walker to collect
what they have already arranged with the shop.

**Route mode (the "on their routes" part).** A walker can tell the app "I'm walking from here to there, leaving at
6:15". The app then shows only bags whose pickup is close to that route and whose drop-off is roughly along it, ranked
by how few extra minutes they add. Without a route the walker just sees bags near where they are.

## 3. The rules (with defaults)

| Rule | Default | Why |
|---|---|---|
| Max walking route, shop to door | **1.0 mile (1,609 m)** | Your requirement. Enforced on the server from a walking route, not trusted from the phone. |
| Walker's detour off their own route | up to 0.25 mile (400 m) extra | Otherwise it is not "on their way". Tunable. |
| Bag size | the existing **small** size, capped at **3 kg** | One hand-carried bag. |
| Bags carried at once | 2 | Safety and ETA honesty. |
| Not allowed | hot food, alcohol, tobacco/vapes, medicines, cash, anything worth over £50, fragile or liquids that spill | Age checks, food safety and liability. See section 6. |
| Hours | 07:00 to 21:00 local | No walking alone at night. Tunable. |
| Walker age | 18+, right to work checked | Same as couriers (gig platforms need right-to-work checks from 1 Oct 2026, see DEPLOY-NOTES). |
| Auto-cancel if nobody accepts | 60 minutes after "ready by", automatic refund | The existing expiry already does this at 30 min after the pickup window; walkers get a shorter window. |
| Handover proof | shop's code at pickup, photo + optional PIN at the door | Reuses the existing proof photos and delivery PIN. |
| Live location | shared only after **Start order** | Already how Vendaru works. Unchanged. |

## 4. The promise, and where it is advertised

### The time
- Walking speed default **80 m per minute** (about 3 mph, 4.8 km/h).
- Time after collection = walking route ÷ 80, plus **6 minutes** for the door and stairs.
- Shown as a **range**, never a single number: `low = that time`, `high = low × 1.4 + 5`.
- Example, a full 1-mile route: 1,609 ÷ 80 = 20 min, plus 6 = 26, so **about 26 to 42 minutes after collection**.
- Time until *collection* depends on when a walker passes, so it is described honestly: "collected when a walker on
  that route accepts it, usually within an hour, otherwise cancelled and refunded".
- The pilot must measure the real numbers and correct these.

### Draft wording

**Customer, on the quote screen**
> **Walker delivery, £4.00.** A walker collects your bag from the shop on foot and carries it to you.
> **It is slower than a courier: about 26 to 42 minutes after it has been collected**, longer in bad weather.
> Only for trips under 1 mile. Not for urgent, hot, fragile or age-restricted items.
> ☐ I understand and I'm happy to wait.

**Walker, before accepting**
> Bag up to 3 kg. 0.6 miles, about 12 minutes on foot. £3.50. Adds about 4 minutes to your route.
> Collect with the shop's code. Do not enter anyone's home. Stop and report if you feel unsafe.

**Shop**
> When the bag is packed tap **Ready**. Ask the walker for the 4-digit code. Tap **Handed over**.

### Every place the conditions must appear (a checklist to tick off)
- [ ] Quote screen and review screen, with a checkbox that cannot be skipped (**the server refuses** a walker order
      without the acknowledgement and stores when it was given)
- [ ] The order card and the customer's order page
- [ ] The confirmation email and the "collected" email
- [ ] The public tracking page
- [ ] A public **/walkers.html** page (how it works, the 1 mile rule, the time range, what is not allowed)
- [ ] The FAQ, plus the Help panel
- [ ] A **Walker Terms** page (walkers) and a **Shop Terms** page (shops), and one paragraph added to the customer Terms
- [ ] The walker and shop sign-up screens

## 5. Money

Vendaru today prices by mile: £3.50 base plus £1.37 per mile, £5 minimum. Walker jobs get their own, cheaper formula.

| | Default |
|---|---|
| Base | £2.75 |
| Per mile | £1.25 |
| Minimum | £3.00 |
| A full 1-mile job | **£4.00** (a courier would be £5.00) |
| Rounded | to the nearest 5p |

**What it is worth to a walker (honest numbers, please read):**

| Job | Extra time | Pay | Per hour |
|---|---|---|---|
| 1 mile, walker starts from home for it | about 20 min walk + 8 min shop and door = 28 min | £4.00 | about **£8.60** |
| 0.5 mile, on the walker's own route | about 6 min extra | £3.40 | about **£34** |

So this only works well as **on-route** work, or as side income for people who walk anyway (students, dog walkers, people
going to the station). Route mode is therefore not a nice-to-have, it is the reason the economics work. Commission is
not modelled anywhere in Vendaru yet (a courier's "Earned" is the full price); decide it before launch.

Goods are paid to the shop outside Vendaru. Vendaru only handles the delivery fee. That keeps you away from
holding customers' money for shopping, and card payments can come later.

## 6. Safety, legal and insurance (needs a professional, this is a checklist, not advice)

- **Solicitor review** of Walker Terms, Shop Terms and the change to customer Terms (all are DRAFT until then).
- **Independent-contractor status**: same position as couriers today. Get advice, because being able to set a route and
  decline is helpful, but the wording matters.
- **Insurance**: ask a broker about public liability and goods-in-transit for on-foot delivery, and about personal
  accident cover for walkers. Do not launch without a written answer.
- **Consumer Rights Act 2015**: services must be done with reasonable care and skill and within a reasonable time.
  Advertising the range clearly, in advance and with an acknowledgement, is what makes "slower" reasonable.
- **Food**: keep to sealed, ambient grocery items. The shop is responsible for what is in the bag (allergen labels,
  hygiene). No hot food in this version.
- **Age-restricted items** (alcohol, tobacco, vapes, knives): excluded. Checking age at a door needs a process we do not have.
- **Medicines and cash**: excluded.
- **Privacy**: the customer's address is seen by the shop and the walker. Update the Privacy Policy (shops become a
  recipient of customer name, address and phone) and the Location Policy (walkers' route is stored, and deleted after 30 days).
- **Walker safety**: daylight hours, no entering homes, "leave safe" only where the customer allowed it, a "report a
  problem / I feel unsafe" button, live location only after Start, and the customer's exact door is only shown
  to the walker after they accept (see section 7, masking).
- **Lost or damaged bag**: a clear liability cap (for example £50) stated on the quote screen and in the terms.

## 7. Technical plan (mapped to how Vendaru is built)

Vendaru is **one Vercel function**: `api/index.js` maps route names to `handlers/<name>.js`. A new endpoint is a new
handler file **and** an entry in `api/index.js`. The database schema is in `lib/db.js`; every change bumps `SCHEMA_VERSION`.
Nothing here needs a new Vercel function, so the 12-function Hobby limit is not a problem.

### 7.1 Data model (one schema bump)

| Change | Purpose |
|---|---|
| `users.courier_mode` (`'driver'` default, `'walker'`) and `users.walker_approved_at` | A walker is a courier account in walker mode, approved by you. |
| `shops` table: `id, owner_user_id, name, address, postcode, lat, lng, opening_hours, phone, collection_notes, status ('pending','approved','suspended'), created_at` | The partner shop directory. Shop accounts are **customer accounts with a shop attached**, not a new role, so `requireRole('customer')` and the posting flow keep working. |
| `jobs.delivery_mode` (`'standard'` default, `'walker'`) | Which product a job is. |
| `jobs.shop_id`, `jobs.pickup_code`, `jobs.ready_at`, `jobs.handed_over_at` | Shop handover. |
| `jobs.walk_distance_m`, `jobs.walk_minutes_low`, `jobs.walk_minutes_high` | What the customer was promised, stored so it can be checked later. |
| `jobs.walker_ack_at` | When the customer accepted the conditions. |
| `walker_routes` table: `id, walker_id, from_lat, from_lng, to_lat, to_lng, geometry, leaves_at, expires_at, max_detour_m` | A walker's declared route. Deleted after 30 days. |

### 7.2 New library code
- `lib/walking.js`: the constants above in one place; `walkingRoute(a, b)` (see 7.5); `walkerEligibility(route)`
  (distance <= 1 mile, size, hours, banned-item flags); `walkMinutes(distance_m)` returning `{low, high}`;
  `walkerPrice(distance_m)`.
- `lib/geo.js`: pure functions, no network: distance from a point to a polyline, where along the polyline a point falls,
  and **detour minutes** for a job against a route. This is what makes route mode cheap and testable.

### 7.3 API changes (all in `handlers/`)
- **`jobs-quote`** also returns `walker_option: { eligible, reason, price_gbp, minutes: {low, high}, distance_m }`.
  A trip over 1 mile returns `eligible: false` with the reason, and the app hides the option.
- **`jobs-create`** accepts `delivery_mode: 'walker'` + `walker_ack: true`. The **server recomputes** the walking route
  and eligibility and ignores anything the phone claims. No acknowledgement, over 1 mile, wrong size: refused.
- **`jobs-available`** takes `?mode=walker` and optional route parameters. It filters to walker jobs, and in route mode ranks by
  detour. Masking rule below.
- **`walker-route`** (POST create / DELETE clear): a walker's declared route.
- **`shops-list`** (nearby approved shops), **`shop-profile`** (a shop owner edits theirs), **`shop-ready`**, **`shop-handover`**.
- **`admin-shops`**, **`admin-walkers`**: approve, suspend, list.
- **`jobs-pickup`** for walker jobs requires the shop's `pickup_code` in addition to the photo.
- **`jobs-accept`**: only an approved walker (or, decision 4, any courier who opted in) can take a walker job.
- Expiry (`lib/expiry.js`) gets the 60-minute rule for walker jobs.
- Emails (`lib/mail.js`) get the time range and the "what to expect" line.

### 7.4 What a walker sees before accepting (masking, using today's postcode rule)
A **shop is a public place**, so its name and address are shown in full. The **customer's end** follows the rule already
in `lib/areas.js`: town and full postcode, a pin rounded to about 100 m, and the real walking route between the two pins
drawn by the app. The exact door is revealed on accept.

### 7.5 Walking routes
- The current routing is the OSRM *car* profile. Walking needs the *foot* profile. The OpenStreetMap-hosted OSRM
  instance we already use exposes one (`routing.openstreetmap.de/routed-foot`). **Verify this works from the server and
  from the browser first**; the site's Content-Security-Policy already allows that host.
- Fallback if the foot endpoint is down: the app must not draw a straight line (your rule). Show "Route unavailable" and
  block the walker option, rather than guessing.
- The price, the 1-mile check and the time range are all computed from the **walking** distance.

### 7.6 Tests to write alongside (Vendaru already has ~470 checks)
1. Eligibility: 0.99 mile passes, 1.01 mile is refused, from the server side, whatever the phone sends.
2. A walker order without the acknowledgement is refused (422) and the timestamp is stored when given.
3. Price and time range for known distances.
4. Masking: the customer end is postcode-level, the shop end is not, no exact door before accept.
5. Detour ranking with a fixed route and fixed jobs (pure functions, no network).
6. Shop permissions: a shop can only see and edit its own jobs; an unapproved shop cannot post.
7. Pickup code: wrong code refused, right code accepted, cannot be reused.
8. Auto-cancel and refund after 60 minutes.
9. Guard test that no page says "fast", "quick" or "instant" next to Walker delivery (yes, really, so a later edit
   cannot quietly break the honesty rule).

## 8. Screens

**Customer**
- Quote screen: a second card under the courier price, "Walker delivery £4.00, about 26 to 42 min after collection",
  with the checkbox. Hidden when the trip is over 1 mile.
- Order card and page: "Walker delivery" chip and the range.

**Walker** (courier accounts in walker mode)
- Home is still **Your job offers** (never "available jobs", keeping the no-shortage-shown rule).
- A "Where are you walking?" bar at the top: from, to, when. Offers show `+4 min on your route` and £ per minute.
- The map shows the walking route, the shop pin, and the customer's pin rounded to about 100 m.
- Start order, Confirm pickup (shop code), Complete drop-off already exist and are reused.

**Shop**
- One screen: a list of today's bags, a big "New bag" button (customer name, address, phone, ready-by time), and
  Ready / Handed over buttons. Built to be used with one thumb behind a counter.

**Admin**
- Shop and walker approval queues, and a "late or cancelled walker jobs" view.

## 9. Build phases

| Phase | What ships | Size | Done when |
|---|---|---|---|
| **0. Decisions and paperwork** | Section 12 answered. Insurance enquiry sent. Solicitor briefed. Pilot town chosen. | small | You have written answers. |
| **1. Walker jobs on existing accounts** | `lib/walking.js`, foot routing verified, `walker_option` on the quote, the acknowledgement, walker price, time range in the UI and emails, auto-cancel, tests. No shops yet: the customer posts, the walker collects from an address. | medium | A trip under 1 mile can be ordered as a walker job, with the honest time range, end to end. |
| **2. Partner shops** | `shops` table, shop sign-up and approval, shop-initiated jobs, pickup code, Ready / Handed over, shop screen. | medium-large | A shop posts a bag, a walker collects it with the code, the customer receives it. |
| **3. Route mode** | `walker_routes`, `lib/geo.js`, detour ranking, "Where are you walking?" | medium | A walker sees only bags on or near their route, ranked by minutes added. |
| **4. Polish** | Bag stacking (2 at once) with a combined time, tips, ratings, card payments for the fee, shop-paid invoices. | large | Only after the pilot says it is worth it. |

Phases 1 and 2 are the smallest thing that is a real product. Route mode (3) matters for the economics, so do not skip it,
but it is safer to build it once real bags are flowing.

## 10. Pilot

- **One town, one evening window** to start (for example Preston, 4 to 8 pm), **5 shops and 10 walkers**.
- Measure: **collection wait**, **actual time after collection vs the range shown**, **on-time %** (inside the range),
  **fill rate** (bags accepted before auto-cancel), **complaints per 100 orders**, walker earnings per hour.
- **Adjust the range from real data** after the first 50 deliveries. If more than 15% arrive outside the range, widen
  it before growing.
- **Stop or rethink** if fill rate is under 50% after three weeks, or if there is any serious safety incident.

## 11. Risks

| Risk | What reduces it |
|---|---|
| Customers expect courier speed | The range, the acknowledgement, the wording ban on "fast", and the time being shown in five places. |
| Nobody accepts, bags sit | 60-minute auto-cancel with refund; route mode; pilot only where walkers are dense. |
| Walker earnings too low, so walkers leave | Push on-route jobs; commission decision; show £ per minute; consider a small per-bag shop top-up. |
| Safety at night or on isolated routes | Daylight hours, Start-order-only location, report button, no entering homes. |
| Bag contents (food, alcohol, medicine) | Item rules on the shop and customer screens, a shop declaration, the liability cap. |
| Foot routing service unreliable | Verify early; block the option instead of guessing; be ready to self-host later. |
| Shops do not keep up | A one-thumb screen; keep the shop's work to three taps; a phone number for help. |
| Regulation or insurance blocks it | Ask before Phase 1 is finished. |

## 12. Decisions I need from you

1. **Shop or customer first?** *My recommendation: shop-initiated first (Flow A).* It is simplest and gives walkers
   predictable pickups.
2. **Who pays the delivery fee?** Customer, shop, or either. *Recommendation: customer pays through Vendaru, shop can
   choose to cover it later.*
3. **Commission.** What percentage does Vendaru keep? (Not modelled yet.)
4. **Can drivers and bike couriers also take walker jobs?** *Recommendation: no, walker jobs are for walkers only in the
   pilot, so the time range stays true.*
5. **Hours.** 07:00 to 21:00 as the default, or different?
6. **Max weight and value.** 3 kg and £50 as defaults?
7. **Excluded items.** Agree the list in section 3 (no hot food, alcohol, tobacco, medicines, cash).
8. **Pilot town and the first shops** (Preston area? do you already know some shops?).
9. **Naming.** "Walkers" and "Walker delivery", or something friendlier?
10. **Insurance and solicitor**: will you take these on, or should I write a brief for each?

## 13. Out of scope for now
Card payments for goods, in-app shopping menus, hot food, age-restricted goods, night deliveries, under-18s, bag
stacking beyond 2, tips, ratings, multi-town launch.
