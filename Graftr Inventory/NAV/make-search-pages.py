"""Builds every page that uses the searchable template (sbar + filters +
results), each with content specific to its domain. Run once, then delete
or keep for future edits — it's idempotent (always regenerates from scratch).
"""
import os

def esc(s):
    return s

def sbar(fields, go_label='Search'):
    cells = []
    for icon, label, value in fields:
        cells.append(f'''        <label class="sbar__field">
          <span data-icon="{icon}" data-size="19"></span>
          <span>
            <span class="sbar__label">{label}</span>
            <span class="sbar__value">{value}</span>
          </span>
        </label>''')
    return '''      <div class="sbar">
%s
        <button class="sbar__go"><span data-icon="search" data-size="19"></span>%s</button>
      </div>''' % ('\n'.join(cells), go_label)

def chips(items):
    out = []
    for label, on in items:
        out.append(f'        <button class="chip" data-toggle="tick" aria-pressed="{"true" if on else "false"}">{label}</button>')
    return '      <div class="chips" style="margin-top:14px">\n' + '\n'.join(out) + '\n      </div>'

def rhead(count, sub):
    return f'''      <div class="rhead">
        <div>
          <div class="rhead__count">{count}</div>
          <div class="page__sub">{sub}</div>
        </div>
        <div class="rhead__tools">
          <button class="btn btn--sm fbtn" data-opens=".filters">
            <span data-icon="sliders" data-size="16"></span>Filters
          </button>
          <button class="btn btn--sm">
            <span data-icon="arrow" data-size="16"></span>Sort: Recommended
          </button>
        </div>
      </div>'''

def frange(lo, hi, val, unit=''):
    return f'''              <div class="frange">
                <input type="range" min="{lo}" max="{hi}" value="{val}" aria-label="Range">
                <div class="frange__vals"><span>{unit}{lo}</span><span>{unit}{val}</span></div>
              </div>'''

def fopt(label, n, on=False):
    return f'''              <button class="fopt" data-toggle="tick" aria-pressed="{"true" if on else "false"}">
                <span class="fopt__box" data-icon="check" data-size="12"></span>
                {label} <span class="fopt__n">{n}</span>
              </button>'''

def fgroup(title, body, open_=False):
    return f'''          <details class="fgroup"{" open" if open_ else ""}>
            <summary>{title}</summary>
            <div class="fgroup__body">
{body}
            </div>
          </details>'''

def filters_rail(groups, clear_label='Clear all'):
    return f'''        <aside class="filters" aria-label="Filter results">
          <div class="filters__head">
            <span class="section__title">Filters</span>
            <button class="section__link">{clear_label}</button>
            <button class="section__link fbtn" data-opens=".filters">Done</button>
          </div>
{chr(10).join(groups)}
        </aside>'''

def rcard(href, scene, photo_key, p1, p2, name, loc, facts, side_top, side_bottom, save_on=False):
    facts_html = '\n                  '.join(f'<span class="pill{cls}">{label}</span>' for label, cls in facts)
    photo_attr = f' data-photo="{photo_key}"' if photo_key else ''
    return f'''          <a class="rcard" href="{href}">
            <span class="photo rcard__photo" data-scene="{scene}"{photo_attr}
                  style="--p1:{p1};--p2:{p2}">
              <button class="rcard__save" data-toggle="save" aria-pressed="{"true" if save_on else "false"}"
                      aria-label="Save"><span data-icon="heart" data-size="17"></span></button>
            </span>
            <span class="rcard__body">
              <span class="rcard__main">
                <span class="rcard__name">{name}</span>
                <span class="rcard__loc">{loc}</span>
                <span class="rcard__facts">
                  {facts_html}
                </span>
              </span>
              <span class="rcard__side">
                {side_top}
                {side_bottom}
              </span>
            </span>
          </a>'''

def score(big, small):
    return f'<span class="score"><b>{big}</b> {small}</span>'

def price(from_label, num, unit):
    return f'<span><span class="rprice__from">{from_label}</span>\n                <span class="rprice__num">{num}</span>\n                <span class="rprice__unit">{unit}</span></span>'

def plain(top_label, top_val, bottom_val):
    return (f'<span class="score"><b>{top_val}</b> {top_label}</span>',
            f'<span class="rprice__unit">{bottom_val}</span>')

def alert_card(sev, badge, when, title, text, act):
    cls = {'crit': 'alert--crit', 'warn': 'alert--warn', 'info': 'alert--info'}[sev]
    return f'''          <article class="alert {cls}">
            <div class="alert__top">
              <span class="alert__badge">{badge}</span>
              <span class="alert__when">{when}</span>
            </div>
            <div class="alert__title">{title}</div>
            <div class="alert__text">{text}</div>
            <div class="alert__act">{act}</div>
          </article>'''

def page(title, page_attr, back_href, back_label, body):
    return f'''<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Utravel — {title}</title>
<link rel="stylesheet" href="assets/app.css">
</head>
<body data-page="{page_attr}">

<main class="canvas">
  <div class="mhead">
    <a class="backlink" href="{back_href}">
      <span data-icon="chevron" data-size="16" class="backlink__arrow"></span>{back_label}
    </a>
  </div>

  <div class="page">
    <div class="page__inner">

      <a class="backlink backlink--wide" href="{back_href}">
        <span data-icon="chevron" data-size="16" class="backlink__arrow"></span>{back_label}
      </a>

{body}

    </div>
  </div>
</main>

<script src="assets/photos.js"></script>
<script src="assets/app.js"></script>
</body>
</html>
'''

def write(fname, title, page_attr, back_href, back_label, body):
    open(fname, 'w', encoding='utf-8').write(page(title, page_attr, back_href, back_label, body))
    print(f'{fname} written')


# =========================================================================
# 1. RENTALS & TRANSFERS
# =========================================================================
body = sbar([
    ('loc', 'Pickup', 'Edinburgh Airport'),
    ('clock', 'Dates', '14 &ndash; 17 Aug'),
    ('car', 'Vehicle', 'Any type'),
]) + '\n\n' + chips([
    ('Automatic', True), ('Under &pound;40/day', False), ('Free cancellation', True),
    ('Unlimited mileage', False), ('Includes insurance', False),
]) + '\n\n' + rhead('86 rentals in Edinburgh', '14&ndash;17 Aug &middot; Edinburgh Airport pickup') + '''

      <div class="rbody">
''' + filters_rail([
    fgroup('Price per day', frange(15, 150, 45, '&pound;'), True),
    fgroup('Vehicle type', '\n'.join([fopt('Car', 52, True), fopt('Van', 9), fopt('Campervan', 6), fopt('Bike', 19)]), True),
    fgroup('Transmission', '\n'.join([fopt('Automatic', 61, True), fopt('Manual', 25)]), True),
    fgroup('Supplier rating', '\n'.join([fopt('Exceptional 9+', 14), fopt('Very good 8+', 38, True)])),
    fgroup('Extras', '\n'.join([fopt('Insurance included', 40), fopt('GPS', 22), fopt('Child seat', 15)])),
]) + '\n\n        <div class="rlist">\n' + '\n\n'.join([
    rcard('#', 'city', None, '#9BB0C9', '#33465E', 'Compact hatchback &mdash; VW Polo or similar',
          'Edinburgh Airport pickup',
          [('Automatic', ''), ('5 seats', ''), ('2 bags', ''), ('Free cancellation', ' pill--ok')],
          score('8.6', 'Europcar &middot; 226'), price('3 days from', '&pound;102', '&pound;34 a day')),
    rcard('#', 'coast', None, '#8FBFD9', '#2A5E7A', 'Estate &mdash; Skoda Octavia or similar',
          'City centre pickup',
          [('Automatic', ''), ('5 seats', ''), ('4 bags', '')],
          score('8.2', 'Hertz &middot; 184'), price('3 days from', '&pound;156', '&pound;52 a day')),
    rcard('#', 'forest', 'cottage', '#C8B49B', '#6B5334', 'Campervan &mdash; 2-berth',
          'Leith depot',
          [('Manual', ''), ('2 seats', ''), ('Kitchen', ''), ('Free cancellation', ' pill--ok')],
          score('9.0', 'Camptoo &middot; 58'), price('3 days from', '&pound;276', '&pound;92 a day'), save_on=True),
    rcard('#', 'city', 'edinburgh', '#8FB4D9', '#2F4E70', 'E-bike hire',
          'Old Town hub',
          [('Electric', ''), ('Helmet included', '')],
          score('4.7', 'rider rating'), price('Per day', '&pound;18', 'return by 8pm')),
    rcard('#', 'mountain', 'arthursseat', '#8FB4D9', '#2F4E70', 'Airport transfer &mdash; private car',
          'EDI &rarr; Old Town &middot; 30 min',
          [('Automatic', ''), ('4 seats', ''), ('Meet &amp; greet', '')],
          score('8.9', '412 rides'), price('Flat fare', '&pound;28', 'per car')),
]) + '''

          <div style="display:grid;justify-items:center;gap:10px;padding:18px 0 4px">
            <button class="btn">Show more rentals</button>
            <span class="page__sub">Showing 5 of 86</span>
          </div>

        </div>
      </div>'''
write('discover-rentals.html', 'Rentals & Transfers', 'discover', 'discover.html', 'Discover', body)


# =========================================================================
# 2. WEATHER & BEST TIME
# =========================================================================
def wcard(name, when, temp, cond1, cond2, pillcls, pilltext, scene, photo_key, p1, p2):
    return f'''          <a class="rcard" href="discover-weather.html">
            <span class="photo rcard__photo" data-scene="{scene}"{f' data-photo="{photo_key}"' if photo_key else ''}
                  style="--p1:{p1};--p2:{p2}"></span>
            <span class="rcard__body">
              <span class="rcard__main">
                <span class="rcard__name">{name}</span>
                <span class="rcard__loc">{when}</span>
                <span class="rcard__facts">
                  <span class="pill">{temp}</span>
                  <span class="pill">{cond1}</span>
                  <span class="pill">{cond2}</span>
                </span>
              </span>
              <span class="rcard__side">
                <span class="score"><b>{temp}</b> avg high</span>
                <span class="pill {pillcls}">{pilltext}</span>
              </span>
            </span>
          </a>'''

body = sbar([
    ('loc', 'Destination', 'Kyoto'),
    ('clock', 'Month', 'March'),
    ('compass', 'Compare', '5 places'),
]) + '\n\n' + chips([
    ('Warm &amp; dry', True), ('Low season', False), ('Good for hiking', True),
    ('Avoid monsoon', False), ('Aurora season', False),
]) + '\n\n' + rhead('5 destinations compared', 'Comparing by month and climate') + '''

      <div class="rbody">
''' + filters_rail([
    fgroup('Temperature', frange(0, 35, 20, ''), True),
    fgroup('Season', '\n'.join([fopt('Spring', 4, True), fopt('Summer', 3), fopt('Autumn', 3), fopt('Winter', 2)]), True),
    fgroup('Rainfall', '\n'.join([fopt('Low', 6, True), fopt('Medium', 4), fopt('High', 2)])),
    fgroup('Best for', '\n'.join([fopt('Hiking', 5, True), fopt('Beach', 3), fopt('City', 6), fopt('Snow', 2)])),
]) + '\n\n        <div class="rlist">\n' + '\n\n'.join([
    wcard('Kyoto', 'Best late Mar &ndash; early Apr', '18&deg;', 'Dry', 'Cherry blossom', 'pill--ok', 'Go now', 'blossom', 'kyoto', '#D9B8A0', '#6B4433'),
    wcard('Iceland', 'Best Jun &ndash; Aug', '13&deg;', 'Long days', 'Aurora in winter', 'pill--soon', 'Shoulder', 'aurora', 'iceland', '#8FA8D9', '#2E3D6B'),
    wcard('Amalfi coast', 'Best May &amp; Sep', '24&deg;', 'Sunny', 'Busy in Aug', 'pill--warn', 'Peak season', 'coast', 'campervan', '#9BAFC4', '#35485C'),
    wcard('Scottish Highlands', 'Best May &ndash; Jun', '15&deg;', 'Midge-free', 'Long light', 'pill--ok', 'Go now', 'mountain', 'lakes', '#A9C4A0', '#3B5B33'),
    wcard('Marrakesh', 'Best Mar &ndash; May', '28&deg;', 'Dry heat', 'Busy at Easter', 'pill--warn', 'Peak season', 'desert', 'marrakesh', '#E0B78F', '#8A4B2A'),
]) + '''

        </div>
      </div>'''
write('discover-weather.html', 'Weather & Best Time', 'discover', 'discover.html', 'Discover', body)


# =========================================================================
# 3. NAVIGATION — ALERTS (route & transport disruptions)
# =========================================================================
body = sbar([
    ('nav', 'Route', 'All my routes'),
    ('clock', 'When', 'Today'),
    ('bell', 'Severity', 'Any severity'),
]) + '\n\n' + chips([
    ('Severe', True), ('Delays', True), ('Notices', False),
    ('My saved routes', True), ('Today only', False),
]) + '\n\n' + rhead('5 alerts on your routes', 'Updated 2 min ago') + '''

      <div class="rbody">
''' + filters_rail([
    fgroup('Severity', '\n'.join([fopt('Severe', 1, True), fopt('Delays', 2, True), fopt('Notice', 2)]), True),
    fgroup('Transport type', '\n'.join([fopt('Rail &amp; Bus', 3, True), fopt('Flights', 0), fopt('Roads', 1), fopt('Local', 1)]), True),
    fgroup('Affects', '\n'.join([fopt('My saved routes only', 5, True)])),
    fgroup('Time', '\n'.join([fopt('Today', 3, True), fopt('This week', 5)])),
]) + '\n\n        <div class="rlist">\n' + '\n\n'.join([
    alert_card('crit', 'Severe', 'Now', 'Bus 8 &mdash; part suspended',
               'Roadworks on Park Street. Diverting via Queens Road, adding 12 min.', 'See alternative route'),
    alert_card('warn', 'Delays', '14 min ago', 'Temple Meads &mdash; platform change',
               '10:24 to Edinburgh now departs platform 5.', 'View station'),
    alert_card('warn', 'Delays', '40 min ago', 'A38 closed northbound',
               'Diversion via A46 in place. Adds around 18 minutes.', 'See alternative route'),
    alert_card('info', 'Notice', 'Today', 'Engineering works this Sunday',
               'Replacement buses between Bath Spa and Chippenham all day.', 'Plan around it'),
    alert_card('info', 'Notice', 'This week', 'Rail strike notice',
               'Reduced ScotRail service expected on Friday. Check before you travel.', 'Check your route'),
]) + '''

        </div>
      </div>'''
write('nav-alerts.html', 'Alerts', 'nav', 'navigation.html', 'Navigation', body)


# =========================================================================
# 4. TRAVEL CARD — ALERTS (this trip)
# =========================================================================
body = sbar([
    ('nav', 'Trip', 'Edinburgh, 14&ndash;17 Aug'),
    ('clock', 'When', 'This trip'),
    ('bell', 'Severity', 'Any severity'),
]) + '\n\n' + chips([
    ('Severe', True), ('Delays', True), ('Notices', True),
    ('Flights only', False), ('Today', False),
]) + '\n\n' + rhead('3 alerts for this trip', 'Edinburgh &middot; 14&ndash;17 Aug') + '''

      <div class="rbody">
''' + filters_rail([
    fgroup('Severity', '\n'.join([fopt('Severe', 1, True), fopt('Delays', 1, True), fopt('Notice', 1, True)]), True),
    fgroup('Category', '\n'.join([fopt('Flights', 2, True), fopt('Transport', 0), fopt('Accommodation', 1), fopt('Documents', 0)]), True),
    fgroup('Affects', '\n'.join([fopt('This trip only', 3, True)])),
]) + '\n\n        <div class="rlist">\n' + '\n\n'.join([
    alert_card('crit', 'Severe', 'Now', 'Gate 12 &rarr; Gate 7',
               'UT 214 to Edinburgh. Allow 8 minutes to walk across the terminal.', 'Update boarding pass'),
    alert_card('warn', 'Delays', '22 min ago', 'Security queue over 25 minutes',
               'Leave 15 minutes earlier than your saved route suggests.', 'Adjust leave time'),
    alert_card('info', 'Notice', 'Yesterday', 'Airport car park full',
               'Silver Zone is at capacity. Long Stay has spaces from 05:00.', 'See parking'),
]) + '''

        </div>
      </div>'''
write('card-alerts.html', 'Alerts', 'card', 'travel-card.html', 'Travel Card', body)


# =========================================================================
# 5. TRAVEL CARD — TRIPS (new)
# =========================================================================
def tripcard(dest, dates, status_label, status_cls, mode_label, side_bottom, scene, photo_key, p1, p2, save_on=False):
    return f'''          <a class="rcard" href="travel-card.html">
            <span class="photo rcard__photo" data-scene="{scene}"{f' data-photo="{photo_key}"' if photo_key else ''}
                  style="--p1:{p1};--p2:{p2}">
              <button class="rcard__save" data-toggle="save" aria-pressed="{"true" if save_on else "false"}"
                      aria-label="Save"><span data-icon="heart" data-size="17"></span></button>
            </span>
            <span class="rcard__body">
              <span class="rcard__main">
                <span class="rcard__name">{dest}</span>
                <span class="rcard__loc">{dates}</span>
                <span class="rcard__facts">
                  <span class="pill {status_cls}">{status_label}</span>
                  <span class="pill">{mode_label}</span>
                </span>
              </span>
              <span class="rcard__side">
                <span class="score"><b>{mode_label}</b></span>
                <span class="rprice__unit">{side_bottom}</span>
              </span>
            </span>
          </a>'''

body = sbar([
    ('loc', 'Destination', 'Any destination'),
    ('clock', 'Dates', 'Any dates'),
    ('sliders', 'Status', 'All trips'),
]) + '\n\n' + chips([
    ('Current', True), ('Upcoming', True), ('Past', False),
    ('Saved routes', False), ('Shared trips', False),
]) + '\n\n' + rhead('5 trips', 'Current, upcoming and past') + '''

      <div class="rbody">
''' + filters_rail([
    fgroup('Status', '\n'.join([fopt('Current', 1, True), fopt('Upcoming', 2, True), fopt('Past', 2), fopt('Saved routes', 2)]), True),
    fgroup('Mode', '\n'.join([fopt('Walk', 0), fopt('Car', 2, True), fopt('Rail &amp; Bus', 1), fopt('Flights', 2, True)]), True),
    fgroup('Alerts', '\n'.join([fopt('Has active alerts', 1)])),
]) + '\n\n        <div class="rlist">\n' + '\n\n'.join([
    tripcard('Edinburgh', '14&ndash;17 Aug 2026', 'In progress', 'pill--live', 'Flights', '4 docs',
             'city', 'edinburgh', '#8FB4D9', '#2F4E70'),
    tripcard('Tokyo', '3&ndash;15 Oct 2026', 'Visa needed', 'pill--warn', 'Flights', '2 docs',
             'city', 'tokyo', '#D6A9A0', '#7A3F44', save_on=True),
    tripcard('Bath', '29 Aug &ndash; 1 Sep 2026', 'Upcoming', 'pill--soon', 'Car', '2 docs',
             'city', 'bath', '#C7A98F', '#6E4B32'),
    tripcard('Lake District', '2&ndash;4 Jul 2026', 'Completed', 'pill--done', 'Car', 'Share trip',
             'forest', 'lakes', '#A8C69A', '#3E5B37'),
    tripcard('Cardiff', '18&ndash;19 May 2026', 'Completed', 'pill--done', 'Rail &amp; Bus', 'Share trip',
             'coast', 'cornwall', '#B49BC9', '#4A3560'),
]) + '''

          <div style="display:grid;justify-items:center;gap:10px;padding:18px 0 4px">
            <button class="btn">Show past trips</button>
            <span class="page__sub">Showing 5 of 5</span>
          </div>

        </div>
      </div>'''
write('card-trips.html', 'Trips', 'card', 'travel-card.html', 'Travel Card', body)

print('\ndone')
