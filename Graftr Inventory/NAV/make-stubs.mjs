/* Generates the title-only sub-pages. Content comes later — these exist so
   every preview card on a hub opens a real page.
   Run: node utravel-prototype/make-stubs.mjs  */
import { writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

/* file, parent page id, title, and the back-link label */
const STUBS = [
  ['nav-cycle.html',            'nav',      'Cycle',                'Navigation'],
  ['nav-drive.html',            'nav',      'Drive',                'Navigation'],
  ['nav-rail-bus.html',         'nav',      'Rail & Bus',           'Navigation'],
  ['nav-flights.html',          'nav',      'Flights',              'Navigation'],
  ['nav-alerts.html',           'nav',      'Alerts',               'Navigation'],
  ['nav-local.html',            'nav',      'Local Essentials',     'Navigation'],

  ['card-boarding.html',        'card',     'Boarding Pass',        'Travel Card'],
  ['card-visa.html',            'card',     'Visa',                 'Travel Card'],
  ['card-essentials.html',      'card',     'Travel Essentials',    'Travel Card'],
  ['card-times.html',           'card',     'Journey Times',        'Travel Card'],
  ['card-alerts.html',          'card',     'Alerts',               'Travel Card'],
  ['card-accessibility.html',   'card',     'Accessibility',        'Travel Card'],

  ['discover-explore.html',     'discover', 'Explore',              'Discover'],
  ['discover-hotspots.html',    'discover', 'Holiday Hotspots',     'Discover'],
  ['discover-stays.html',       'discover', 'Stays',                'Discover'],
  ['discover-bucket.html',      'discover', 'Bucket List',          'Discover'],
  ['discover-rentals.html',     'discover', 'Rentals & Transfers',  'Discover'],
  ['discover-weather.html',     'discover', 'Weather & Best Time',  'Discover'],

  ['profile-preferences.html',  'profile',  'Preferences',          'Profile'],
  ['profile-claudia.html',      'profile',  'Claudia AI',           'Profile'],
];

const BACK = { nav: 'navigation.html', card: 'travel-card.html', discover: 'discover.html', profile: 'profile.html' };

const page = (parent, title, backLabel) => `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Utravel — ${title}</title>
<link rel="stylesheet" href="assets/app.css">
</head>
<body data-page="${parent}">

<main class="canvas">
  <div class="mhead">
    <a class="backlink" href="${BACK[parent]}">
      <span data-icon="chevron" data-size="16" class="backlink__arrow"></span>${backLabel}
    </a>
  </div>

  <div class="page">
    <div class="page__inner">
      <a class="backlink backlink--wide" href="${BACK[parent]}">
        <span data-icon="chevron" data-size="16" class="backlink__arrow"></span>${backLabel}
      </a>

      <header class="page__head">
        <div>
          <h1 class="page__title">${title}</h1>
        </div>
      </header>

      <div class="placeholder">
        <span data-icon="doc" data-size="26"></span>
        <p>Content to come.</p>
      </div>
    </div>
  </div>
</main>

<script src="assets/app.js"></script>
</body>
</html>
`;

let made = 0;
for (const [file, parent, title, backLabel] of STUBS) {
  writeFileSync(join(here, file), page(parent, title, backLabel), 'utf8');
  made++;
}
console.log(`wrote ${made} stub pages`);
