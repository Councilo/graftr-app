// Vendaru — peer-to-peer courier delivery.
//
// Complete backend integration, order cancellation, past orders,
// chat/message modal, settings, and full test-mode support.
(function () {
  'use strict';

  const TOKEN_KEY = 'vendaru_token';

  // The "preview without signing in" button runs the app on made-up data in the
  // browser, with no server involved. It is for development and demos, so it only
  // appears on localhost, or on the live site when the address has ?demo=1.
  const TEST_MODE_SKIP_LOGIN = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) || /[?&]demo=1\b/.test(location.search);
  let testMode = false;

  const state = {
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: null,
    booting: true,
    screen: 'auth', // 'auth' | 'dashboard'

    authRole: 'customer',
    authMode: 'login', // 'login' | 'register' | 'forgot' (ask for a reset link) | 'reset' (choose a new password)
    authFields: freshAuthFields(),
    authError: null,
    authNotice: null,  // a good-news message on the sign-in screen (link sent, password changed)
    resetToken: null,  // the token from a reset link, held only in memory
    authBusy: false,

    customerTab: 'compose', // 'compose' | 'active' | 'received'
    courierTab: 'available', // 'available' | 'mine' | 'past'
    selectedJobId: null,
    activeModal: null, // null | 'messages' | 'settings' | 'lightbox'
    chatJobId: null,
    chatDraft: '',
    pastQuery: '', // what is typed in the past-orders search box
    jobMessages: {}, // jobId -> Array of message objects
    lightboxUrl: null,
    lightboxTitle: null,
    broadcastingGps: true,

    compose: {
      pickup_address: '', dropoff_address: '', start: '', scheduled: false, timeError: null,
      quote: null, quoteError: null, busy: false,
      locating: false, locateError: null, locateNote: null, pickupCoords: null, dropoffCoords: null,
      pickupPlace: null, dropoffPlace: null,
    },

    jobs: [],
    available: [],
    listError: null,
    listsLoaded: false,

    expanded: new Set(),
    pendingPhoto: {}, // jobId -> File
    uploadBusy: {}, // jobId -> bool
    uploadError: {}, // jobId -> message
    courierNames: {}, // jobId -> full_name
    bootError: null, // set when the first load failed for a reason other than "not signed in"
    gps: { status: 'idle', sentAt: null }, // courier's location sharing: idle | sharing | denied | consent | error
    termsBusy: false,
    deliveryPins: {}, // jobId -> the PIN a courier is typing to finish a delivery
    // Phones and tablets: every page is a full page, and this splits the screen 50/50 with the map.
    // Where the page's top edge sits when the map is open (0-1 of the height); null = open just tall enough to fit the page.
    sheetTop: (() => { try { const v = parseFloat(localStorage.getItem('vendaru_sheet_top')); return v > 0 && v < 1 ? v : null; } catch (e) { return null; } })(),
    mapSplit: (() => { try { const v = localStorage.getItem('vendaru_map_split'); return v === '1' ? true : (v === '0' ? false : null); } catch (e) { return null; } })(), // null until the person chooses (see mapOpen)
  };
  let sessionGen = 0; // bumped on sign-out so a poll still in flight can't write the old user's data

  let root;
  let liveMaps = [];
  let lastViewKey = ''; // which page/step render() last drew, so a redraw of the same one keeps its scroll position
  let workspaceMap = null;
  let sheetAuto = { sig: null, frac: 0.5 }; // where the page's top edge opened, until the person drags it
  let sheetDrag = null;                      // set while a drag is under way
  let sheetRenderQueued = false;             // a redraw that arrived mid-drag, done when it ends
  let syncTimer = null;
  let gpsTimer = null;
  let gpsDenied = false;
  let courierMarkers = {};
  let activeIntervals = {};

  let suggestTimers = { pickup: null, dropoff: null };
  let suggestSeq = { pickup: 0, dropoff: 0 };
  let suggestResults = { pickup: [], dropoff: [] };

  // ---------------- Icons (SVG Helpers) ----------------
  const ICONS = {
    box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
    history: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><polyline points="3 3 3 8 8 8"/><polyline points="12 7 12 12 15 14"/></svg>`,
    share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    locate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    navigate: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4.5 20.3l.7.7L12 18l6.8 3 .7-.7z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  };

  // ---------------- Helpers ----------------
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function money(n) { return '£' + Number(n).toFixed(2); }

  // The Vendaru wordmark (sign-in screen), and the square "V" icon that stands for it (sidebar badge).
  function brandWordmark() {
    return '<img class="auth-wordmark" src="/assets/brand/logo-wide-480.png" alt="Vendaru" width="480" height="177" draggable="false" />';
  }
  function brandLogo(alt) {
    return `<img src="/assets/brand/icon-128.png" alt="${alt || ''}" width="128" height="128" draggable="false" />`;
  }
  function freshAuthFields() {
    return { full_name: '', email: '', password: '', accept_terms: false, accept_courier_terms: false, location_consent: false };
  }
  // A person's initials in a circle. Every account used to show the same stock
  // photo of a stranger; initials are honest and need no image request.
  function initials(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  }
  function avatarHtml(name) {
    return `<span class="avatar-initials" aria-hidden="true">${escapeHtml(initials(name))}</span>`;
  }
  // Short messages that don't block the screen the way alert() does.
  function toast(message, kind) {
    if (window.VendaruPanels) window.VendaruPanels.toast(message, kind);
    else alert(message);
  }
  // The sun / crescent switch. Both icons are always in the markup; CSS shows
  // the one that matches the current theme, so flipping the theme needs no re-render.
  function themeButton(extraClass) {
    const inner = window.VendaruTheme ? window.VendaruTheme.buttonInner : '';
    return `<button type="button" class="theme-toggle ${extraClass}" data-action="toggleTheme" aria-label="Switch theme" title="Switch theme">${inner}</button>`;
  }

  // Same rounding as lib/geocode.js: the fare is priced on this exact number,
  // so the miles on screen and the sum behind the price can never disagree.
  const KM_PER_MILE = 1.609344;
  function distanceMiles(km) { return Math.round((Number(km) / KM_PER_MILE) * 10) / 10; }
  function miles(km) { return distanceMiles(km).toFixed(1) + ' mi'; }

  // The [lat, lng] a given fraction (0..1) of the way along a route's road
  // geometry, so a marker sits on the road rather than on a straight line.
  function pointAlongRoute(geometry, fraction) {
    if (!Array.isArray(geometry) || geometry.length < 2) return null;
    const lengths = [];
    let total = 0;
    for (let i = 1; i < geometry.length; i++) {
      const [lat1, lng1] = geometry[i - 1];
      const [lat2, lng2] = geometry[i];
      const dy = lat2 - lat1;
      const dx = (lng2 - lng1) * Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180);
      const d = Math.hypot(dx, dy);
      lengths.push(d);
      total += d;
    }
    const target = total * Math.min(1, Math.max(0, fraction));
    let walked = 0;
    for (let i = 0; i < lengths.length; i++) {
      if (walked + lengths[i] >= target) {
        const t = lengths[i] ? (target - walked) / lengths[i] : 0;
        return [
          geometry[i][0] + (geometry[i + 1][0] - geometry[i][0]) * t,
          geometry[i][1] + (geometry[i + 1][1] - geometry[i][1]) * t,
        ];
      }
      walked += lengths[i];
    }
    return geometry[geometry.length - 1].slice();
  }

  // ---------------- Finding the customer ----------------
  // Asks the device where it is. Precise (GPS) first; if that times out or
  // finds no fix, one more try the quick way (Wi-Fi / network), which is what
  // most laptops can actually do. Only a refusal is final.
  function getPosition() {
    const ask = (options) => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
    return ask({ enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 })
      .catch((err) => {
        if (err && err.code === 1) throw locationProblem(err);
        return ask({ enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 })
          .catch((err2) => { throw locationProblem(err2); });
      });
  }

  // What went wrong, in words a customer can act on.
  function locationProblem(err) {
    const code = err && err.code;
    if (code === 1) return new Error("Location is blocked for this site. Allow it in your browser's site settings, or type the address.");
    if (code === 3) return new Error('Finding your location took too long. Try again, or type the address.');
    return new Error("Couldn't work out your location. Type the address instead.");
  }

  // ---------------- Live location for the pickup ----------------
  // Tapping the locate button doesn't only fill the pickup in once: it switches live location on,
  // and the pickup follows the customer while they get their order ready. The small switch above
  // the pickup box turns it off, and so does typing in the box, choosing a suggestion, or leaving
  // the order form (see render()).
  let liveWatchId = null;                          // the browser's watch, while live location is on
  let liveLast = { lat: null, lng: null, at: 0 };  // where the pickup address was last worked out
  let liveLookupBusy = false;
  let pickupMarker = null;                         // the pickup dot on the map, so a live fix can slide it

  function metresBetween(a, b) {
    const rad = (x) => (x * Math.PI) / 180;
    const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2
      + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
    return 2 * 6371000 * Math.asin(Math.sqrt(h));
  }

  function startLiveLocation() {
    if (liveWatchId !== null || !('geolocation' in navigator)) return;
    state.compose.live = true;
    liveWatchId = navigator.geolocation.watchPosition(onLiveFix, onLiveError, { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 });
  }

  function stopLiveLocation() {
    if (liveWatchId !== null) {
      try { navigator.geolocation.clearWatch(liveWatchId); } catch { /* already gone */ }
      liveWatchId = null;
    }
    if (state.compose && state.compose.live) state.compose.live = false;
    syncLiveUi();
  }

  // Typing in the pickup box switches live location off without redrawing the page, so the switch
  // and the pulsing buttons have to be brought into line by hand.
  function syncLiveUi() {
    const live = !!(state.compose && state.compose.live);
    for (const el of root.querySelectorAll('.live-toggle')) {
      el.classList.toggle('is-on', live);
      el.setAttribute('aria-checked', live ? 'true' : 'false');
    }
    for (const el of root.querySelectorAll('.addr-gps, .map-btn-solo, .map-btn-solo .map-btn')) el.classList.toggle('is-live', live);
  }

  async function onLiveFix(pos) {
    const c = state.compose;
    if (!c.live) return;
    const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    c.pickupCoords = here;
    // With no quote yet the map is showing just the pickup: slide the dot and follow it.
    if (pickupMarker && !c.quote) {
      pickupMarker.setLatLng([here.lat, here.lng]);
      if (workspaceMap) workspaceMap.setView([here.lat, here.lng], workspaceMap.getZoom(), { animate: false });
    }
    // Work out a new address only after a real move, and not more than once every few seconds.
    if (liveLookupBusy) return;
    if (liveLast.lat !== null && (metresBetween(liveLast, here) < 40 || Date.now() - liveLast.at < 8000)) return;
    liveLookupBusy = true;
    try {
      const found = await reverseLookup(here.lat, here.lng);
      if (!state.compose.live) return;
      liveLast = { lat: here.lat, lng: here.lng, at: Date.now() };
      if (found.address && found.address !== c.pickup_address) {
        c.pickup_address = found.address;
        c.pickupPlace = found.place_token || null;
        c.quote = null;
        c.quoteError = null;
        const input = root.querySelector('[data-bind="compose.pickup_address"]');
        if (input && document.activeElement !== input) input.value = found.address;
        actions.maybeAutoQuote();
      }
    } catch { /* a missed lookup: the next fix tries again */ } finally { liveLookupBusy = false; }
  }

  function onLiveError(err) {
    // Only a withdrawn permission ends it; a timeout or a lost signal just waits for the next fix.
    if (err && err.code === 1) {
      stopLiveLocation();
      state.compose.locateError = "Location is blocked for this site. Allow it in your browser's site settings, or type the address.";
      render();
    }
  }

  // Coordinates -> a street address (and the token that lets the quote use
  // those exact coordinates). One retry if the request is dropped: that is
  // usually a blip, and the second try works. A request that never got an
  // answer is reported as a connection problem, not as the browser's own
  // wording ("NetworkError when attempting to fetch resource").
  async function reverseLookup(lat, lng) {
    let last;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          const problem = new Error((data && data.detail) || "Couldn't find an address for that spot. Type it instead.");
          problem.answered = res.status < 500; // a real answer: retrying won't change it
          throw problem;
        }
        return data;
      } catch (err) {
        last = err;
        if (err.answered) break;
        if (attempt < 2) await sleep(600);
      }
    }
    if (last instanceof TypeError) {
      throw new Error("Couldn't reach Vendaru to look up your address. Check your connection and try again, or type it.");
    }
    throw last;
  }

  // What a <input type="datetime-local"> wants: "2026-09-19T14:30" in the
  // customer's own local time.
  function localInputValue(date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  // When a job is to be collected: { asap, text }. A job is "ASAP" when its
  // start is within ten minutes of when it was posted (or of now, for one
  // whose scheduled time has already arrived); anything later is scheduled and
  // shown as a date and time. Couriers need this, or a job booked for
  // tomorrow looks identical to one wanted right now.
  function pickupInfo(job) {
    const start = new Date(job.pickup_window_start);
    if (!job.pickup_window_start || Number.isNaN(start.getTime())) return null;
    const created = new Date(job.created_at).getTime();
    const base = Math.max(Number.isNaN(created) ? 0 : created, Date.now());
    if (start.getTime() <= base + 10 * 60 * 1000) return { asap: true, text: 'ASAP' };
    const text = start.toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    return { asap: false, text };
  }

  // "£3.50 base + 15.5 mi × £1.37/mi" — the actual sum behind a quote, built
  // from the rates the quote itself carries.
  function fareBreakdown(q) {
    const p = q && q.pricing;
    if (!p) return '';
    const mi = distanceMiles(q.distance_km);
    if (p.base_fare_gbp + p.per_mile_gbp * mi < p.minimum_fare_gbp) {
      return `Minimum fare ${money(p.minimum_fare_gbp)} applies`;
    }
    return `${money(p.base_fare_gbp)} base + ${mi.toFixed(1)} mi × ${money(p.per_mile_gbp)}/mi`;
  }
  function when(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function setToken(token) {
    state.token = token;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }
  function findJob(jobId) {
    return state.jobs.find((j) => j.id === jobId) || state.available.find((j) => j.id === jobId);
  }
  function set(obj, path, value) {
    const parts = path.split('.');
    const last = parts.pop();
    let o = obj;
    for (const p of parts) o = o[p];
    o[last] = value;
  }

  // The other side of a job from the signed-in user's point of view. Names
  // come from the API; the fixture name is only ever shown in test mode, so a
  // real account never sees a person who doesn't exist.
  function counterparty(job) {
    if (state.user && state.user.role === 'courier') {
      return { label: 'Customer', name: job.customer_name || 'Customer', role: job.customer_is_recipient ? 'Receiving the parcel' : 'Sender' };
    }
    const name = job.courier_name
      || state.courierNames[job.id]
      || (job.courier_id ? (testMode ? 'Devon Lindsay' : 'Your courier') : 'Matching courier…');
    return { label: 'Courier', name, role: job.courier_id ? 'Courier' : 'Searching marketplace' };
  }

  function getActiveJob() {
    const isCustomer = state.user && state.user.role === 'customer';

    // When on compose tab, there is no active job
    if (isCustomer && state.customerTab === 'compose') {
      return null;
    }

    let relevantJobs = [];
    if (isCustomer) {
      if (state.customerTab === 'active') {
        relevantJobs = state.jobs.filter((j) => j.status === 'OPEN' || j.status === 'ACCEPTED' || j.status === 'COLLECTED');
      } else if (state.customerTab === 'received') {
        relevantJobs = state.jobs.filter((j) => j.status === 'DELIVERED' || j.status === 'CANCELLED');
      }
    } else {
      if (state.courierTab === 'available') {
        relevantJobs = state.available.filter((j) => j.status === 'OPEN');
      } else if (state.courierTab === 'mine') {
        relevantJobs = state.jobs.filter((j) => j.status === 'ACCEPTED' || j.status === 'COLLECTED');
      } else if (state.courierTab === 'past') {
        relevantJobs = state.jobs.filter((j) => j.status === 'DELIVERED' || j.status === 'CANCELLED');
      }
    }

    if (state.selectedJobId) {
      const found = relevantJobs.find((j) => j.id === state.selectedJobId);
      if (found) return found;
    }
    const firstExpanded = Array.from(state.expanded).find((id) => relevantJobs.some((j) => j.id === id));
    if (firstExpanded) return relevantJobs.find((j) => j.id === firstExpanded);

    // If on active or available tabs, default to the first active job
    if (isCustomer && state.customerTab === 'active') {
      return relevantJobs[0] || null;
    }
    if (!isCustomer && (state.courierTab === 'mine' || state.courierTab === 'available')) {
      return relevantJobs[0] || null;
    }

    // On past/received tabs, only show if specifically selected
    if (state.selectedJobId) {
      return relevantJobs.find((j) => j.id === state.selectedJobId) || null;
    }

    return null;
  }

  function shortCity(addr) {
    if (!addr) return 'Unknown';
    const parts = addr.split(',').map((s) => s.trim());
    // Nominatim writes a numbered address as "10, Downing Street, …", and "10"
    // on its own tells nobody anything.
    if (/^\d+[a-z]?$/i.test(parts[0]) && parts[1]) return `${parts[0]} ${parts[1]}`;
    return parts[0] || '';
  }

  // ---------------- API ----------------
  function sessionExpired() {
    if (state.screen !== 'dashboard') return;
    actions.logout();
    state.authError = 'Your session has ended. Please sign in again.';
    render();
  }

  async function api(path, opts = {}) {
    if (testMode) return mockApi(path, opts);

    const { method = 'GET', json, form, auth = true, headers: extraHeaders } = opts;
    const headers = {};
    if (auth && state.token) headers.Authorization = 'Bearer ' + state.token;
    if (extraHeaders) Object.assign(headers, extraHeaders);
    let body;
    if (json !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(json); }
    if (form) body = form;

    let res;
    try {
      res = await fetch(path, { method, headers, body });
    } catch (netErr) {
      // The browser's own wording ("NetworkError when attempting to fetch
      // resource") means nothing to a customer.
      const err = new Error("Couldn't reach Vendaru. Check your connection and try again.");
      err.network = true;
      throw err;
    }
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      const message = (data && data.detail) || res.statusText || 'Something went wrong';
      const err = new Error(typeof message === 'string' ? message : JSON.stringify(message));
      err.status = res.status;
      // A signed-in request refused as unauthenticated means the login has run
      // out (tokens last 12 hours). Say so and go back to sign-in, instead of
      // leaving a screen whose buttons all fail with "Not authenticated".
      if (res.status === 401 && auth && state.token && state.user) sessionExpired();
      if (res.status === 403 && data && data.suspended) {
        err.suspended = true;
        if (state.user) state.user.is_suspended = true;
      }
      err.data = data;
      throw err;
    }
    return data;
  }

  // ---------------- TEST MODE MOCK BACKEND ----------------
  // Test mode has no account, so it can't call the signed-in /api/jobs-quote.
  // It does the same job from the browser instead, with the same real
  // services: the coordinates from the address dropdown when one was picked
  // (otherwise the public address search), then real driving directions from
  // OSRM, then the same per-mile fare the server uses. What test mode shows
  // is what a real quote would show.
  const MOCK_PHOTO = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#cbd5e1"/><text x="150" y="108" font-family="Arial" font-size="16" text-anchor="middle" fill="#475569">Sample photo</text></svg>');
  const MOCK_PRICING = { base_fare_gbp: 3.5, per_mile_gbp: 1.37, minimum_fare_gbp: 5 }; // keep in step with lib/geocode.js
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function mockPlace(address, chosen) {
    if (chosen) return [chosen.lat, chosen.lng];
    let hit = null;
    try {
      const res = await fetch(`/api/address-search?q=${encodeURIComponent(address)}`);
      const data = await res.json();
      hit = data && data.results && data.results[0];
    } catch { /* reported below */ }
    if (!hit) {
      throw new Error(`Couldn't place '${address}' — try including a street, postcode or town so the address can be found.`);
    }
    return [hit.lat, hit.lng];
  }

  // Real driving directions from the public OSRM servers. Two independent ones speak the same
  // API, and both are demo servers that now and then drop a connection or say they are busy, so
  // they are tried in turn, twice round, before giving up. "No route" is a definitive answer.
  const ROUTE_SERVERS = ['https://router.project-osrm.org', 'https://routing.openstreetmap.de/routed-car'];
  async function roadRoute(p, d) {
    const path = `/route/v1/driving/${p[1]},${p[0]};${d[1]},${d[0]}?overview=full&geometries=geojson`;
    for (let round = 0; round < 2; round++) {
      for (const base of ROUTE_SERVERS) {
        const ctl = typeof AbortController === 'function' ? new AbortController() : null;
        const timer = ctl ? setTimeout(() => ctl.abort(), 10000) : null;
        try {
          const res = await fetch(base + path, ctl ? { signal: ctl.signal } : undefined);
          const data = res.ok ? await res.json() : null;
          const r = data && data.code === 'Ok' && data.routes && data.routes[0];
          if (r) {
            return {
              distance_km: Math.round((r.distance / 1000) * 100) / 100,
              geometry: r.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
            };
          }
          if (data && data.code === 'NoRoute') return null;
        } catch { /* busy or unreachable: try the next server */ } finally { if (timer) clearTimeout(timer); }
      }
      if (round === 0) await sleep(400);
    }
    return null;
  }

  async function mockRoute(p, d) { return roadRoute(p, d); }

  // ---- The courier's leg to the pickup ----
  // Once a courier presses Start order the customer follows them to the collection point: a real
  // road route from where the courier is now to the pickup (the same routing servers as the job's
  // own route, never a straight line), redrawn as they move. Kept per job, and only fetched again
  // after the courier has moved a fair way, so the map isn't rebuilt on every position update.
  const legCache = new Map(); // job id -> { status: 'idle'|'loading'|'done'|'failed', geometry, distance_km, from, at, tries }
  let legLine = null;         // the leg's line on the map on screen, so an update can slide it
  const legLabel = (e) => `${miles(e.distance_km)} to the pickup`;

  // job: { id, courier_lat, courier_lng, pickup_lat, pickup_lng } for an ACCEPTED job that has been started.
  function legRefresh(job) {
    if (job.courier_lat == null || job.courier_lng == null || job.pickup_lat == null || job.pickup_lng == null) return null;
    const from = { lat: Number(job.courier_lat), lng: Number(job.courier_lng) };
    const to = { lat: Number(job.pickup_lat), lng: Number(job.pickup_lng) };
    let e = legCache.get(job.id);
    if (!e) {
      e = { status: 'idle', geometry: null, distance_km: null, from: null, at: 0, tries: 0 };
      legCache.set(job.id, e);
    }
    if (e.status === 'loading') return e;
    const age = Date.now() - e.at;
    const due = e.geometry
      ? (age > 20000 && metresBetween(e.from, from) > 250)   // it has moved on: draw the road it is on now
      : (e.status === 'idle' || (e.status === 'failed' && age > 15000 && e.tries < 8));
    if (due) {
      e.status = 'loading';
      e.tries += 1;
      e.from = from;
      roadRoute([from.lat, from.lng], [to.lat, to.lng]).then((route) => {
        e.at = Date.now();
        if (route) { e.status = 'done'; e.geometry = route.geometry; e.distance_km = route.distance_km; e.tries = 0; }
        else e.status = e.geometry ? 'done' : 'failed';
        legArrived(job.id);
      });
    }
    return e;
  }

  // A route (or a failure worth saying so) has come back for this job's leg.
  function legArrived(jobId) {
    const active = getActiveJob();
    if (!active || active.id !== jobId || state.screen !== 'dashboard' || state.activeModal) return;
    const e = legCache.get(jobId);
    if (legLine && e && e.geometry) { slideLeg(active); refreshActiveCards(); return; } // already drawn: update in place
    const focused = document.activeElement;
    if (focused && root.contains(focused) && focused.dataset && focused.dataset.bind) { setTimeout(() => legArrived(jobId), 1500); return; }
    render();
  }

  // The courier moved: keep the line joined to the truck, and the label true.
  function slideLeg(job) {
    const e = legCache.get(job.id);
    if (!legLine || !e || !e.geometry || job.courier_lat == null || job.courier_lng == null) return;
    legLine.setLatLngs([[Number(job.courier_lat), Number(job.courier_lng)], ...e.geometry]);
    if (legLine.getTooltip()) legLine.setTooltipContent(legLabel(e));
  }

  // ---- A road route for anything that is drawn without one ----
  // Jobs and quotes normally arrive with their road route. If one doesn't (the routing server was
  // busy when it was planned, or it is a demo order) the browser fetches it, keeps it for the
  // session and redraws the map. Nothing pretends: until a real route is in hand the map shows the
  // two points and says it is looking, never a straight line that is not a road.
  const routeCache = new Map(); // "plat,plng,dlat,dlng" -> { status: 'loading'|'done'|'failed', geometry, tries }
  let wantedRouteKey = null;    // the route the map on screen is waiting for
  const routeKey = (p, d) => [p.lat, p.lng, d.lat, d.lng].map((n) => Number(n).toFixed(4)).join(',');

  function startRouteFetch(key, entry, pickup, dropoff) {
    entry.status = 'loading';
    entry.tries += 1;
    roadRoute([pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]).then((route) => {
      if (route) {
        entry.status = 'done';
        entry.geometry = route.geometry;
      } else {
        entry.status = 'failed';
        if (entry.tries < 6) setTimeout(() => startRouteFetch(key, entry, pickup, dropoff), 15000);
      }
      redrawForRoute(key);
    });
  }

  function routeFor(pickup, dropoff) {
    const key = routeKey(pickup, dropoff);
    let entry = routeCache.get(key);
    if (!entry) {
      entry = { status: 'loading', geometry: null, tries: 0 };
      routeCache.set(key, entry);
      startRouteFetch(key, entry, pickup, dropoff);
    }
    return entry;
  }

  // The route already fetched for a quote that came without one, so the order can be stored with it.
  function cachedRouteGeometry(q) {
    if (!q || q.pickup_lat == null || q.dropoff_lat == null) return null;
    const entry = routeCache.get(routeKey({ lat: q.pickup_lat, lng: q.pickup_lng }, { lat: q.dropoff_lat, lng: q.dropoff_lng }));
    return entry && entry.geometry ? entry.geometry : null;
  }

  function redrawForRoute(key) {
    if (key !== wantedRouteKey || state.screen !== 'dashboard' || state.activeModal) return;
    const focused = document.activeElement;
    if (focused && root.contains(focused) && focused.dataset && focused.dataset.bind) { setTimeout(() => redrawForRoute(key), 1500); return; }
    render();
  }

  async function mockQuote(pickup_address, dropoff_address) {
    const c = state.compose;
    const p = await mockPlace(pickup_address, c.pickupCoords);
    // Nominatim allows one request a second; two typed-in addresses with no
    // dropdown pick would otherwise hit it back to back.
    if (!c.pickupCoords && !c.dropoffCoords) await sleep(1100);
    const d = await mockPlace(dropoff_address, c.dropoffCoords);

    const route = await mockRoute(p, d);
    let distance_km;
    if (route) {
      distance_km = route.distance_km;
    } else {
      const rad = (x) => (x * Math.PI) / 180;
      const a = Math.sin(rad(d[0] - p[0]) / 2) ** 2
        + Math.cos(rad(p[0])) * Math.cos(rad(d[0])) * Math.sin(rad(d[1] - p[1]) / 2) ** 2;
      distance_km = Math.round(2 * 6371 * Math.asin(Math.sqrt(a)) * 100) / 100;
    }
    return {
      pickup_lat: p[0], pickup_lng: p[1], dropoff_lat: d[0], dropoff_lng: d[1],
      distance_km,
      price_gbp: mockFare(distance_km),
      route_geometry: route ? route.geometry : null,
    };
  }

  // Whole pence, exactly as lib/geocode.js quotePrice() does it.
  function mockFare(distance_km) {
    const tenths = Math.round((distance_km / KM_PER_MILE) * 10);
    const pence = Math.round((Math.round(MOCK_PRICING.base_fare_gbp * 100) * 10 + Math.round(MOCK_PRICING.per_mile_gbp * 100) * tenths) / 10);
    return Math.max(Math.round(MOCK_PRICING.minimum_fare_gbp * 100), pence) / 100;
  }

  // A courier who has just set off for the pickup: a few miles out, not on the job's own route.
  function mockHeadingIn(job) {
    return [job.pickup_lat + 0.045, job.pickup_lng - 0.06];
  }

  // Where a mock courier is, a fraction of the way along a job's road route
  // (or along the straight line when the job has none).
  function mockCourierAt(job, fraction) {
    return pointAlongRoute(job.route_geometry, fraction) || [
      job.pickup_lat + (job.dropoff_lat - job.pickup_lat) * fraction,
      job.pickup_lng + (job.dropoff_lng - job.pickup_lng) * fraction,
    ];
  }

  let mockJobs = [
    {
      id: 17205, customer_id: -1, courier_id: -2,
      pickup_address: '100 Oxford St, London W1D 1LL, UK',
      dropoff_address: 'New St, Birmingham B2 4QA, UK',
      pickup_lat: 51.5150, pickup_lng: -0.1370, dropoff_lat: 52.4780, dropoff_lng: -1.8980,
      distance_km: 180, price_gbp: 42.50, status: 'ACCEPTED', started_at: new Date(Date.now() - 1800000).toISOString(),
      pickup_window_start: new Date(Date.now() - 3600000).toISOString(),
      pickup_window_end: new Date(Date.now() + 86400000).toISOString(),
      created_at: new Date(Date.now() - 7200000).toISOString(),
      accepted_at: new Date(Date.now() - 3600000).toISOString(),
      collected_at: null, delivered_at: null, cancelled_at: null,
      pickup_photo_url: null, delivery_photo_url: null,
    },
    {
      id: 17209, customer_id: -1, courier_id: -2,
      pickup_address: 'Piccadilly Gardens, Manchester M1 1RN, UK',
      dropoff_address: 'City Square, Leeds LS1 2HT, UK',
      pickup_lat: 53.4770, pickup_lng: -2.2310, dropoff_lat: 53.7960, dropoff_lng: -1.5470,
      distance_km: 68, price_gbp: 26.00, status: 'ACCEPTED', started_at: new Date(Date.now() - 1200000).toISOString(),
      pickup_window_start: new Date(Date.now() - 10800000).toISOString(),
      pickup_window_end: new Date(Date.now() + 172800000).toISOString(),
      created_at: new Date(Date.now() - 14400000).toISOString(),
      accepted_at: new Date(Date.now() - 10800000).toISOString(),
      collected_at: null, delivered_at: null, cancelled_at: null,
      pickup_photo_url: null, delivery_photo_url: null,
    },
    {
      id: 17207, customer_id: -1, courier_id: null,
      pickup_address: 'Paddington Station, London W2 1HB, UK',
      dropoff_address: 'Bristol Temple Meads, Bristol BS1 6QF, UK',
      pickup_lat: 51.5160, pickup_lng: -0.1770, dropoff_lat: 51.4490, dropoff_lng: -2.5810,
      distance_km: 192, price_gbp: 45.00, status: 'OPEN',
      pickup_window_start: new Date(Date.now() + 3600000).toISOString(),
      pickup_window_end: new Date(Date.now() + 259200000).toISOString(),
      created_at: new Date(Date.now() - 1800000).toISOString(),
      accepted_at: null, collected_at: null, delivered_at: null, cancelled_at: null,
      pickup_photo_url: null, delivery_photo_url: null,
    },
    {
      id: 17204, customer_id: -1, courier_id: -2,
      pickup_address: 'King\'s Cross Station, London N1C 4TB, UK',
      dropoff_address: 'Princes St, Edinburgh EH2 2EQ, UK',
      pickup_lat: 51.5310, pickup_lng: -0.1240, dropoff_lat: 55.9520, dropoff_lng: -3.1890,
      distance_km: 630, price_gbp: 135.00, status: 'DELIVERED',
      pickup_window_start: new Date(Date.now() - 259200000).toISOString(),
      pickup_window_end: new Date(Date.now() - 86400000).toISOString(),
      created_at: new Date(Date.now() - 345600000).toISOString(),
      accepted_at: new Date(Date.now() - 300000000).toISOString(),
      collected_at: new Date(Date.now() - 200000000).toISOString(),
      delivered_at: new Date(Date.now() - 86400000).toISOString(),
      cancelled_at: null,
      pickup_photo_url: MOCK_PHOTO,
      delivery_photo_url: MOCK_PHOTO,
    },
    {
      id: 17198, customer_id: -1, courier_id: null,
      pickup_address: '10 Downing St, London SW1A 2AA, UK',
      dropoff_address: 'Piccadilly Gardens, Manchester M1 1RG, UK',
      pickup_lat: 51.5034, pickup_lng: -0.1276, dropoff_lat: 53.4808, dropoff_lng: -2.2374,
      distance_km: 335, price_gbp: 48.50, status: 'CANCELLED',
      pickup_window_start: new Date(Date.now() - 432000000).toISOString(),
      pickup_window_end: new Date(Date.now() - 345600000).toISOString(),
      created_at: new Date(Date.now() - 432000000).toISOString(),
      accepted_at: null, collected_at: null, delivered_at: null,
      cancelled_at: new Date(Date.now() - 400000000).toISOString(),
      pickup_photo_url: null, delivery_photo_url: null,
    }
  ];
  // The fixture jobs above were written by hand: no road route, and distances
  // and prices no real quote would produce, so the map drew a straight dashed
  // line under an invented price. In test mode each one is given what planning
  // that trip would give — the real driving route from the same routing
  // service, and the distance and fare that follow from it — so the tracking
  // screen looks and reads the way a real one does. Runs once, in the
  // background; the fixtures show as they were until it lands.
  let mockRoutesStarted = false;
  async function hydrateMockRoutes() {
    if (mockRoutesStarted) return;
    mockRoutesStarted = true;
    let changed = false;
    for (const job of [...mockJobs]) {
      if (job.route_geometry || job.pickup_lat == null || job.dropoff_lat == null) continue;
      const route = await mockRoute([job.pickup_lat, job.pickup_lng], [job.dropoff_lat, job.dropoff_lng]);
      if (!route) continue;
      job.route_geometry = route.geometry;
      job.distance_km = route.distance_km;
      job.price_gbp = mockFare(route.distance_km);
      if (job.status === 'ACCEPTED' || job.status === 'COLLECTED') {
        // A courier heading to pickup is near it; one carrying the parcel is well along.
        const at = job.status === 'COLLECTED' ? mockCourierAt(job, 0.65) : mockHeadingIn(job);
        job.courier_lat = at[0];
        job.courier_lng = at[1];
      }
      changed = true;
      await sleep(250); // the public routing service is for light use
    }
    if (changed) refreshMockView();
  }

  // Show the hydrated routes — but never redraw under someone who is typing,
  // or on the compose screen (which shows none of these jobs; its next visit
  // to a tracking tab will pick them up).
  function refreshMockView() {
    if (!testMode || state.screen !== 'dashboard' || state.activeModal) return;
    const focused = document.activeElement;
    const typing = focused && root.contains(focused) && focused.dataset && focused.dataset.bind;
    const composing = state.user && state.user.role === 'customer' && state.customerTab === 'compose';
    if (!typing && !composing) loadLists(); // reloads the demo orders, which now carry their routes
  }

  // Demo orders carry the fields the real API adds (payment and refund status,
  // and the recipient tracking secret), so the order cards look the same.
  function mockWithDefaults(job) {
    return { payment_status: 'PAID', refunded_gbp: 0, refund_status: null, tracking_token: 'DEMOTOKEN0000000000000000', ...job };
  }

  let mockJobSeq = 17210;
  const MOCK_NAMES = { '-1': 'Alex Morgan', '-2': 'Devon Lindsay' };

  let mockMessages = {
    17205: [
      { id: 1, job_id: 17205, sender_id: -2, sender_name: 'Devon Lindsay', sender_role: 'courier', content: 'Hello! I have accepted your order and will be at 100 Oxford St shortly.', created_at: new Date(Date.now() - 1800000).toISOString() },
      { id: 2, job_id: 17205, sender_id: -1, sender_name: 'Alex Morgan', sender_role: 'customer', content: 'Thanks Devon! The parcel is at the front reception desk.', created_at: new Date(Date.now() - 1500000).toISOString() },
      { id: 3, job_id: 17205, sender_id: -2, sender_name: 'Devon Lindsay', sender_role: 'courier', content: 'Understood! I will upload the pickup proof once collected.', created_at: new Date(Date.now() - 1200000).toISOString() },
    ],
    17209: [
      { id: 4, job_id: 17209, sender_id: -2, sender_name: 'Devon Lindsay', sender_role: 'courier', content: 'Parcel picked up and on the way to Leeds!', created_at: new Date(Date.now() - 3600000).toISOString() },
    ]
  };

  async function mockApi(path, { method = 'GET', json, form } = {}) {
    const [route, qs] = path.split('?');
    const params = new URLSearchParams(qs || '');
    const jobId = params.get('jobId') ? Number(params.get('jobId')) : (json && Number(json.jobId));
    const fail = (message) => { throw new Error(message); };
    const find = (id) => mockJobs.find((j) => j.id === id) || fail('No such job');

    if (route === '/api/jobs-quote' && method === 'POST') {
      const q = await mockQuote(json.pickup_address, json.dropoff_address);
      return {
        pickup_address: json.pickup_address, dropoff_address: json.dropoff_address,
        distance_km: q.distance_km, distance_miles: distanceMiles(q.distance_km), price_gbp: q.price_gbp,
        pricing: MOCK_PRICING,
        pickup_lat: q.pickup_lat, pickup_lng: q.pickup_lng,
        dropoff_lat: q.dropoff_lat, dropoff_lng: q.dropoff_lng,
        route_geometry: q.route_geometry,
      };
    }
    if (route === '/api/jobs-create' && method === 'POST') {
      // Post job follows a quote the customer already saw; reuse it rather
      // than geocoding and routing the same two addresses a second time.
      const shown = state.compose.quote;
      const q = shown && shown.pickup_address === json.pickup_address && shown.dropoff_address === json.dropoff_address
        ? shown
        : await mockQuote(json.pickup_address, json.dropoff_address);
      const start = new Date(json.pickup_window_start);
      const end = json.pickup_window_end ? new Date(json.pickup_window_end) : new Date(start.getTime() + 86400000);
      const job = {
        id: mockJobSeq++, customer_id: state.user.id, courier_id: null,
        pickup_address: json.pickup_address, dropoff_address: json.dropoff_address,
        pickup_window_start: start.toISOString(), pickup_window_end: end.toISOString(),
        pickup_lat: q.pickup_lat, pickup_lng: q.pickup_lng, dropoff_lat: q.dropoff_lat, dropoff_lng: q.dropoff_lng,
        distance_km: q.distance_km, price_gbp: q.price_gbp, route_geometry: q.route_geometry,
        status: 'OPEN', pickup_photo_url: null, delivery_photo_url: null,
        created_at: new Date().toISOString(), accepted_at: null, collected_at: null, delivered_at: null, cancelled_at: null,
        courier_lat: null, courier_lng: null,
        customer_is_recipient: json.mode === 'receiving',
        pickup_contact_name: json.pickup_contact_name || null, dropoff_contact_name: json.dropoff_contact_name || null,
        pickup_handover: json.pickup_handover || 'kerb', dropoff_handover: json.dropoff_handover || 'kerb',
        pickup_instructions: json.pickup_instructions || null, dropoff_instructions: json.dropoff_instructions || null,
        package_size: json.package_size || 'medium', pin_required: !!json.pin_confirmation,
        delivery_pin: json.pin_confirmation ? String(1000 + Math.floor(Math.random() * 9000)) : null,
      };
      mockJobs.unshift(job);
      return mockWithDefaults(job);
    }
    if (route === '/api/jobs-mine' && method === 'GET') {
      return mockJobs.filter((j) => j.customer_id === state.user.id).map(mockWithDefaults);
    }
    if (route === '/api/jobs-available' && method === 'GET') {
      return mockJobs.filter((j) => j.status === 'OPEN');
    }
    if (route === '/api/jobs-courier-mine' && method === 'GET') {
      return mockJobs.filter((j) => j.courier_id === state.user.id).map(mockWithDefaults);
    }
    if (route === '/api/jobs-accept' && method === 'POST') {
      const job = find(jobId);
      job.courier_id = state.user.id;
      job.status = 'ACCEPTED';
      job.accepted_at = new Date().toISOString();
      // Accepting shares nothing: the courier has to press Start order.
      job.started_at = null;
      job.courier_lat = null;
      job.courier_lng = null;
      return job;
    }
    if (route === '/api/jobs-start' && method === 'POST') {
      const job = find(jobId);
      job.started_at = job.started_at || new Date().toISOString();
      const from = mockHeadingIn(job);
      job.courier_lat = from[0];
      job.courier_lng = from[1];
      job.courier_location_updated_at = new Date().toISOString();
      return job;
    }
    if (route === '/api/jobs-cancel' && method === 'POST') {
      const job = find(jobId);
      if (state.user.role === 'courier') {
        // A courier handing a job back: it returns to the marketplace.
        job.status = 'OPEN'; job.courier_id = null; job.accepted_at = null; job.started_at = null; job.courier_lat = null; job.courier_lng = null;
        return { ...job, outcome: 'relisted' };
      }
      job.status = 'CANCELLED';
      job.cancelled_at = new Date().toISOString();
      return job;
    }
    if (route === '/api/support-mine' || route === '/api/refund-mine') return [];
    if (route === '/api/support-create' && method === 'POST') return { id: 1, status: 'OPEN' };
    if (route === '/api/support-reply' && method === 'POST') return { id: 1 };
    if (route === '/api/refund-request' && method === 'POST') return { id: 1, status: 'PENDING' };
    if (route === '/api/account-export') return { note: 'Demo mode: no real data' };
    if (route.startsWith('/api/account-')) return { success: true };
    if (route === '/api/jobs-delete' && (method === 'POST' || method === 'DELETE')) {
      mockJobs = mockJobs.filter((j) => j.id !== jobId);
      return { success: true, deletedJobId: jobId };
    }
    if (route === '/api/jobs-pickup' && method === 'POST') {
      const job = find(jobId);
      job.pickup_photo_url = form && form.get('photo') && typeof form.get('photo') !== 'string'
        ? URL.createObjectURL(form.get('photo'))
        : MOCK_PHOTO;
      job.status = 'COLLECTED';
      job.collected_at = new Date().toISOString();
      job.started_at = job.started_at || job.collected_at;
      const along = mockCourierAt(job, 0.45);
      job.courier_lat = along[0];
      job.courier_lng = along[1];
      return job;
    }
    if (route === '/api/jobs-deliver' && method === 'POST') {
      const job = find(jobId);
      job.delivery_photo_url = form && form.get('photo') && typeof form.get('photo') !== 'string'
        ? URL.createObjectURL(form.get('photo'))
        : MOCK_PHOTO;
      job.status = 'DELIVERED';
      job.delivered_at = new Date().toISOString();
      job.courier_lat = job.dropoff_lat;
      job.courier_lng = job.dropoff_lng;
      return job;
    }
    if (route === '/api/jobs-location' && method === 'POST') {
      const job = find(Number(json.jobId));
      job.courier_lat = Number(json.lat);
      job.courier_lng = Number(json.lng);
      job.courier_location_updated_at = new Date().toISOString();
      return job;
    }
    if (route === '/api/jobs-tracking' && method === 'GET') {
      const job = find(jobId);
      return { ...job, courier_name: job.courier_id ? MOCK_NAMES[String(job.courier_id)] : null };
    }
    if (route === '/api/messages-list' && method === 'GET') {
      // A copy: the poller compares old and new lists, and the same array twice always looks unchanged.
      return (mockMessages[jobId] || []).slice();
    }
    if (route === '/api/messages-send' && method === 'POST') {
      const jId = Number(json.jobId);
      if (!mockMessages[jId]) mockMessages[jId] = [];
      const msg = {
        id: Date.now(),
        job_id: jId,
        sender_id: state.user ? state.user.id : -1,
        sender_name: state.user ? state.user.full_name : 'You',
        sender_role: state.user ? state.user.role : 'customer',
        content: json.content,
        created_at: new Date().toISOString(),
      };
      mockMessages[jId].push(msg);
      return msg;
    }
    return fail(`(test mode) no mock for ${method} ${route}`);
  }

  // ---------------- Data Loading ----------------
  async function loadLists() {
    const gen = sessionGen;
    state.listError = null;
    try {
      if (state.user.role === 'customer') {
        state.jobs = await api('/api/jobs-mine');
      } else {
        const [available, mine] = await Promise.all([
          api('/api/jobs-available'),
          api('/api/jobs-courier-mine'),
        ]);
        state.available = available;
        state.jobs = mine;
      }
      if (gen !== sessionGen || !state.user) return;
      state.listsLoaded = true;
      if (state.user.role === 'customer' && state.customerTab === 'compose') {
        state.selectedJobId = null;
      } else if (!state.selectedJobId) {
        const active = getActiveJob();
        if (active) {
          state.selectedJobId = active.id;
        }
      }
    } catch (err) {
      if (gen !== sessionGen) return;
      state.listError = err.message;
    }
    render();
  }

  async function loadMessages(jobId) {
    if (!jobId) return;
    try {
      const msgs = await api(`/api/messages-list?jobId=${jobId}`) || [];
      const prev = state.jobMessages[jobId];
      state.jobMessages[jobId] = msgs;
      // The chat is polled every few seconds; only redraw when something
      // actually arrived (or this is the first load), not on every tick.
      const last = (list) => (list && list.length ? list[list.length - 1].id : null);
      if (!prev || prev.length !== msgs.length || last(prev) !== last(msgs)) render();
    } catch {}
  }

  // ---------------- Actions ----------------
  const actions = {
    switchAuthRole(role) {
      state.authRole = role;
      state.authError = null;
      render();
    },
    switchAuthMode(mode) {
      state.authMode = mode;
      state.authError = null;
      state.authNotice = null;
      render();
    },
    setCustomerTab(tab) {
      state.customerTab = tab;
      state.pastQuery = '';
      state.selectedJobId = null;
      state.expanded.clear();
      render();
    },
    setCourierTab(tab) {
      state.courierTab = tab;
      state.pastQuery = '';
      state.selectedJobId = null;
      state.expanded.clear();
      render();
    },
    selectJob(id) {
      const jobId = Number(id);
      state.selectedJobId = jobId;
      if (state.expanded.has(jobId)) {
        state.expanded.delete(jobId);
      } else {
        state.expanded.clear();
        state.expanded.add(jobId);
      }
      render();
    },
    toggleExpand(id) {
      const jobId = Number(id);
      state.selectedJobId = jobId;
      if (state.expanded.has(jobId)) {
        state.expanded.delete(jobId);
      } else {
        state.expanded.clear();
        state.expanded.add(jobId);
      }
      render();
    },
    // With an order (from a card, or a row in the inbox) this opens that order's chat; without
    // one it opens the inbox, where you pick which order to talk about.
    openMessages(jobId) {
      const next = Number(jobId) || null;
      if (state.chatJobId !== next) state.chatDraft = '';
      state.chatJobId = next;
      state.activeModal = 'messages';
      render();
      if (next) loadMessages(next);
    },
    openSettings() {
      // Real accounts get the full Account panel; the demo keeps its role switcher.
      if (!testMode && window.VendaruPanels) { window.VendaruPanels.open('account'); return; }
      state.activeModal = 'settings';
      render();
    },
    toggleMapSplit() {
      state.mapSplit = !mapOpen();
      try { localStorage.setItem('vendaru_map_split', state.mapSplit ? '1' : '0'); } catch (e) { /* not remembered, still works */ }
      render();
    },
    startCall(jobId) {
      if (testMode) { toast("Calls aren't available in the demo.", 'error'); return; }
      if (window.VendaruCalls) window.VendaruCalls.start(Number(jobId));
      else toast('Calling is not available right now.', 'error');
    },
    openHelp(jobId, field) {
      // field === 'cancel' comes from the locked Cancel button: start a request to cancel this order.
      const extra = field === 'cancel' ? { category: 'order', subject: `Cancel order #${jobId}` } : {};
      if (window.VendaruPanels) window.VendaruPanels.open('help', jobId ? { tab: 'contact', jobId, ...extra } : {});
    },
    openAdmin() {
      if (window.VendaruPanels) window.VendaruPanels.open('admin');
    },
    requestRefund(jobId) {
      const job = state.jobs.find((j) => j.id === Number(jobId));
      if (job && window.VendaruPanels) window.VendaruPanels.open('refund', { job });
    },
    shareLink(jobId) {
      const job = state.jobs.find((j) => j.id === Number(jobId));
      if (job && window.VendaruPanels) window.VendaruPanels.open('share', { job });
    },
    payInfo(jobId) {
      const job = state.jobs.find((j) => j.id === Number(jobId));
      if (job && window.VendaruPanels) window.VendaruPanels.open('pay', { job });
    },
    async acceptTermsNow() {
      state.termsBusy = true;
      render();
      try {
        await api('/api/account-consent', { method: 'POST', json: { terms: true } });
        await reloadUser();
      } catch (err) {
        toast(err.message, 'error');
      }
      state.termsBusy = false;
      render();
    },
    async enableLocation() {
      try {
        await api('/api/account-consent', { method: 'POST', json: { location: true } });
        await reloadUser();
        state.gps = { status: 'idle', sentAt: null };
        gpsDenied = false;
        pushCourierLocation();
        render();
      } catch (err) {
        toast(err.message, 'error');
      }
    },
    retryBoot() {
      state.bootError = null;
      render();
      resumeSession();
    },
    openLightbox(url, title) {
      state.lightboxUrl = url;
      state.lightboxTitle = title || 'Proof Photo';
      state.activeModal = 'lightbox';
      render();
    },
    closeModal() {
      state.activeModal = null;
      state.lightboxUrl = null;
      render();
    },
    async sendChatMessage() {
      const text = (state.chatDraft || '').trim();
      const jId = state.chatJobId;
      if (!text || !jId) return;
      state.chatDraft = '';
      render();
      try {
        await api('/api/messages-send', { method: 'POST', json: { jobId: jId, content: text } });
        await loadMessages(jId);
      } catch (err) {
        // Put the words back so a failed send doesn't lose what they typed.
        if (!state.chatDraft) state.chatDraft = text;
        render();
        toast(err.message, 'error');
      }
    },
    async submitAuth() {
      const { full_name, email, password, accept_terms, accept_courier_terms, location_consent } = state.authFields;
      state.authError = null;

      if (state.authMode === 'register') {
        if (!accept_terms) {
          state.authError = 'Please tick the box to confirm you are 18 or over and agree to the Terms and Privacy Policy.';
          render();
          return;
        }
        if (state.authRole === 'courier' && (!accept_courier_terms || !location_consent)) {
          state.authError = 'Couriers need to accept the Courier Terms and agree to location sharing on deliveries.';
          render();
          return;
        }
      }

      if (state.authMode === 'register' && !full_name.trim()) {
        state.authError = 'Full name is required';
        render();
        return;
      }
      if (!email.trim() || !password) {
        state.authError = 'Email and password are required';
        render();
        return;
      }

      state.authBusy = true;
      render();
      try {
        if (state.authMode === 'register') {
          await api('/api/register', {
            method: 'POST',
            auth: false,
            json: {
              full_name: full_name.trim(), email: email.trim(), password, role: state.authRole,
              accept_terms: true,
              ...(state.authRole === 'courier' ? { accept_courier_terms: true, location_consent: true } : {}),
            },
          });
        }
        const session = await api('/api/login', {
          method: 'POST',
          auth: false,
          json: { email: email.trim(), password },
        });
        setToken(session.access_token);
        state.user = session.user;
        state.screen = 'dashboard';
        applyPageFromHash();
        state.authFields = freshAuthFields();
        state.bootError = null;
        render();
        try { state.user = await api('/api/me'); } catch (meErr) { /* the login response already has the basics */ }
        await loadLists();
      } catch (err) {
        state.authError = err.message;
      } finally {
        state.authBusy = false;
        render();
      }
    },
    // "Forgot your password?": asks for a reset link. The answer is the same whether or not the address has an account.
    async submitForgot() {
      const email = state.authFields.email.trim();
      state.authError = null;
      state.authNotice = null;
      if (!email) { state.authError = 'Enter the email address you signed up with'; render(); return; }
      state.authBusy = true;
      render();
      try {
        await api('/api/password-forgot', { method: 'POST', auth: false, json: { email } });
        state.authNotice = "If that address has an account, we've sent it a link to choose a new password. It works once, for an hour. If it doesn't arrive, check your junk or spam folder.";
      } catch (err) {
        state.authError = err.message;
      } finally {
        state.authBusy = false;
        render();
      }
    },
    // The new password chosen after following the link in the reset email.
    async submitReset() {
      const password = state.authFields.password;
      state.authError = null;
      if (password.length < 8 || password.length > 72) { state.authError = 'The new password must be 8-72 characters.'; render(); return; }
      state.authBusy = true;
      render();
      try {
        await api('/api/password-reset', { method: 'POST', auth: false, json: { token: state.resetToken, password } });
        state.resetToken = null;
        state.authMode = 'login';
        state.authFields.password = '';
        state.authNotice = 'Password changed. Log in with your new password.';
      } catch (err) {
        state.authError = err.message + ' You can ask for a new link below.';
        state.authNotice = null;
      } finally {
        state.authBusy = false;
        render();
      }
    },
    async resendVerification() {
      try {
        const r = await api('/api/email-resend', { method: 'POST', json: {} });
        if (r && r.already_verified) {
          // Confirmed already (say, from another device): drop the banner rather than promise an email.
          await reloadUser();
          render();
          toast('Your email is already confirmed.');
          return;
        }
        toast('Sent. Check your inbox and your junk or spam folder.');
      } catch (err) {
        toast(err.message, 'error');
      }
    },
    skipLogin(role) {
      testMode = true;
      state.user = {
        id: role === 'courier' ? -2 : -1,
        email: role === 'courier' ? 'courier@test.local' : 'customer@test.local',
        full_name: role === 'courier' ? 'Devon Lindsay' : 'Alex Morgan',
        role: role,
      };
      state.screen = 'dashboard';
      state.selectedJobId = null;
      state.expanded.clear();
      if (role === 'customer') {
        state.customerTab = 'compose';
      } else {
        state.courierTab = 'available';
      }
      render();
      loadLists();
      hydrateMockRoutes();
    },
    logout() {
      sessionGen++;
      stopLiveLocation();
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* fine */ }
      if (window.VendaruPanels) window.VendaruPanels.close();
      testMode = false;
      setToken(null);
      state.user = null;
      state.screen = 'auth';
      // Back to a clean sign-in form, not whichever mode/role/error the last
      // session left behind.
      state.authMode = 'login';
      state.authRole = 'customer';
      state.authError = null;
      state.authFields = freshAuthFields();
      state.jobs = [];
      state.available = [];
      state.listsLoaded = false;
      state.activeModal = null;
      // Nothing of the last person's session may show for the next one on a
      // shared device: half-typed addresses, chat, chosen photos, open cards.
      state.compose = { pickup_address: '', dropoff_address: '', start: '', scheduled: false, timeError: null, quote: null, quoteError: null, busy: false, locating: false, locateError: null, locateNote: null, pickupCoords: null, dropoffCoords: null, pickupPlace: null, dropoffPlace: null };
      state.jobMessages = {};
      state.chatJobId = null;
      state.chatDraft = '';
      state.pastQuery = '';
      state.pendingPhoto = {};
      state.uploadBusy = {};
      state.uploadError = {};
      state.selectedJobId = null;
      state.expanded.clear();
      state.customerTab = 'compose';
      state.courierTab = 'available';
      state.gps = { status: 'idle', sentAt: null };
      state.bootError = null;
      render();
    },
    goDashboard() {
      state.selectedJobId = null;
      state.expanded.clear();
      if (state.user && state.user.role === 'customer') {
        state.customerTab = 'compose';
      } else {
        state.courierTab = 'available';
      }
      render();
    },
    selectSuggestion(index, field) {
      const r = (suggestResults[field] || [])[index];
      if (!r) return;
      if (field === 'pickup') {
        stopLiveLocation();
        state.compose.pickup_address = r.display_name;
        state.compose.pickupCoords = { lat: r.lat, lng: r.lng };
        state.compose.pickupPlace = r.token || null;
      } else {
        state.compose.dropoff_address = r.display_name;
        state.compose.dropoffCoords = { lat: r.lat, lng: r.lng };
        state.compose.dropoffPlace = r.token || null;
      }
      state.compose.quote = null;
      closeSuggestBox(field, { silent: true });
      render();
      // Like a maps app: having picked where from, go straight on to where to.
      if (field === 'pickup' && !state.compose.dropoff_address) {
        const next = root.querySelector('[data-bind="compose.dropoff_address"]');
        if (next) next.focus();
      } else if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
      actions.maybeAutoQuote();
    },
    toggleTheme() {
      if (window.VendaruTheme) window.VendaruTheme.toggle();
    },
    mapZoom(direction) {
      if (!workspaceMap) return;
      if (Number(direction) > 0) workspaceMap.zoomIn(); else workspaceMap.zoomOut();
    },
    // Now (the default) or Schedule. Scheduling opens the date and time box
    // pre-filled with the current time, so the customer starts from "now" and
    // adjusts, rather than from an empty field.
    setPickupMode(mode) {
      const c = state.compose;
      c.timeError = null;
      if (mode === 'schedule') {
        c.scheduled = true;
        if (!c.start) c.start = localInputValue(new Date());
      } else {
        c.scheduled = false;
        c.start = '';
      }
      render();
    },
    // The small switch above the pickup box. On: the pickup follows the device. Off: it stays put.
    toggleLive() {
      if (state.compose.live) { stopLiveLocation(); render(); return; }
      actions.useMyLocation();
    },
    clearAddress(field) {
      const c = state.compose;
      if (field === 'pickup') { stopLiveLocation(); c.pickup_address = ''; c.pickupCoords = null; c.pickupPlace = null; c.locateError = null; c.locateNote = null; }
      else { c.dropoff_address = ''; c.dropoffCoords = null; c.dropoffPlace = null; }
      c.quote = null;
      c.quoteError = null;
      closeSuggestBox(field, { silent: true });
      render();
      const input = root.querySelector(`[data-suggest-field="${field}"]`);
      if (input) input.focus();
    },
    // The GPS button in the pickup bar (and the one on the map). Finds where the
    // customer is, turns that into a street address, and fills the pickup.
    async useMyLocation() {
      const c = state.compose;
      if (c.locating) return;
      c.locateError = null;
      c.locateNote = null;

      if (!('geolocation' in navigator)) {
        c.locateError = "This browser can't share your location. Type the address instead.";
        render();
        return;
      }
      // Browsers only give location to secure pages (https, or localhost); on
      // anything else the request just fails, so say why.
      if (window.isSecureContext === false) {
        c.locateError = 'Location only works on a secure (https) connection. Type the address instead.';
        render();
        return;
      }

      c.locating = true;
      render();
      try {
        const pos = await getPosition();
        const { latitude, longitude, accuracy } = pos.coords;
        c.pickupCoords = { lat: latitude, lng: longitude };
        c.pickupPlace = null;
        c.quote = null;
        render(); // show the spot on the map straight away, while the address loads

        const found = await reverseLookup(latitude, longitude);
        c.pickup_address = found.address;
        c.pickupPlace = found.place_token || null;
        c.quoteError = null;
        liveLast = { lat: latitude, lng: longitude, at: Date.now() };
        startLiveLocation();
        // A network-only fix can be hundreds of metres out; say so instead of
        // presenting a guess as a fact.
        if (accuracy > 500) {
          c.locateNote = 'Your device gave an approximate location. Check the address, and adjust it if needed.';
        }
      } catch (err) {
        stopLiveLocation();
        c.pickupCoords = null; // no address to go with it, so no pickup pin either
        c.locateError = err.message;
      } finally {
        c.locating = false;
        render();
        if (c.pickup_address && !c.locateError) actions.maybeAutoQuote();
      }
    },
    maybeAutoQuote() {
      const c = state.compose;
      if (c.quote || c.busy) return;
      if (c.pickup_address.trim().length < 3 || c.dropoff_address.trim().length < 3) return;
      actions.getQuote();
    },
    async getQuote() {
      const { pickup_address, dropoff_address } = state.compose;
      state.compose.quoteError = null;
      state.compose.quote = null;
      if (pickup_address.trim().length < 3 || dropoff_address.trim().length < 3) {
        state.compose.quoteError = 'Enter both a pickup and dropoff address';
        render();
        return;
      }
      state.compose.busy = true;
      render();
      try {
        const { pickupPlace, dropoffPlace } = state.compose;
        const q = await api('/api/jobs-quote', {
          method: 'POST',
          json: { pickup_address, dropoff_address, pickup_place: pickupPlace, dropoff_place: dropoffPlace },
        });
        state.compose.quote = q;
      } catch (err) {
        state.compose.quoteError = err.message;
      } finally {
        state.compose.busy = false;
        render();
      }
    },
    // ---- the review step ----
    reviewOrder() {
      const c = state.compose;
      if (!c.quote) return;
      c.step = 'review';
      composeOpts().editing = null;
      composeOpts().info = null;
      render();
      const scroller = root.querySelector('.panel-scroll-content');
      if (scroller) scroller.scrollTop = 0;
    },
    backToForm() {
      state.compose.step = 'form';
      render();
    },
    // Start a new order from a past one: same addresses and options, a fresh quote, then
    // straight to the review screen. If the quote fails the form is left filled in instead.
    async reorder(jobId) {
      const job = state.jobs.find((j) => j.id === Number(jobId));
      if (!job || !job.pickup_address || !job.dropoff_address) return;
      const handover = (h) => (HANDOVER_LABELS[h] ? h : 'kerb');
      state.compose = {
        pickup_address: job.pickup_address, dropoff_address: job.dropoff_address, start: '', scheduled: false, timeError: null,
        quote: null, quoteError: null, busy: false,
        locating: false, locateError: null, locateNote: null, pickupCoords: null, dropoffCoords: null,
        pickupPlace: null, dropoffPlace: null,
        opts: {
          mode: job.customer_is_recipient ? 'receiving' : 'sending',
          pickupContact: job.pickup_contact_name || '', dropoffContact: job.dropoff_contact_name || '',
          pickupHandover: handover(job.pickup_handover), dropoffHandover: handover(job.dropoff_handover),
          pickupNotes: job.pickup_instructions || '', dropoffNotes: job.dropoff_instructions || '',
          size: PARCEL_SIZES[job.package_size] ? job.package_size : 'medium', pin: !!job.pin_required, editing: null,
        },
      };
      state.customerTab = 'compose';
      state.selectedJobId = null;
      state.expanded.clear();
      render();
      await actions.getQuote();
      if (state.compose.quote) actions.reviewOrder();
    },
    setMode(mode) {
      composeOpts().mode = mode === 'receiving' ? 'receiving' : 'sending';
      render();
    },
    // One editor open at a time: 'pickup', 'dropoff' or 'size'; tapping it again closes it.
    editStop(which) {
      const o = composeOpts();
      o.editing = o.editing === which ? null : which;
      render();
    },
    clearPastSearch() {
      state.pastQuery = '';
      render();
      const box = root.querySelector('.past-search-input');
      if (box) box.focus();
    },
    // One guidelines row open at a time; tapping it again closes it.
    toggleInfo(which) {
      const o = composeOpts();
      o.info = o.info === which ? null : which;
      render();
    },
    setHandover(which, value) {
      const o = composeOpts();
      if (!HANDOVER_LABELS[value]) return;
      if (which === 'pickup') o.pickupHandover = value; else o.dropoffHandover = value;
      render();
    },
    setSize(size) {
      const o = composeOpts();
      if (!PARCEL_SIZES[size]) return;
      o.size = size;
      o.editing = null;
      render();
    },
    togglePin() {
      const o = composeOpts();
      o.pin = !o.pin;
      render();
    },
    async submitJob() {
      const { pickup_address, dropoff_address, start, scheduled, quote } = state.compose;
      let s;
      if (scheduled) {
        // The date box gives "2026-09-19T14:30" with no timezone. Read here, in
        // the customer's browser, it means their local time; sent as-is the
        // server (which runs in UTC) would read it as UTC and, in British
        // Summer Time, book the pickup an hour late. toISOString() is unambiguous.
        const picked = start ? new Date(start) : null;
        if (!picked || Number.isNaN(picked.getTime())) {
          state.compose.timeError = 'Choose a date and time, or switch back to Now.';
          render();
          return;
        }
        if (picked.getTime() < Date.now() - 60 * 1000) {
          state.compose.timeError = 'That time has already passed. Pick a later one.';
          render();
          return;
        }
        s = picked.toISOString();
      } else {
        s = new Date().toISOString(); // Now: the moment they press the button
      }
      const o = composeOpts();
      const me = state.user ? state.user.full_name : '';
      state.compose.busy = true;
      render();
      try {
        // The token locks in the exact price and distance the customer was
        // shown; the server posts that, rather than quoting a second time.
        const created = await api('/api/jobs-create', {
          method: 'POST',
          json: {
            pickup_address, dropoff_address, pickup_window_start: s,
            quote_token: quote && quote.quote_token,
            route_geometry: (quote && quote.route_geometry) || cachedRouteGeometry(quote),
            mode: o.mode,
            pickup_contact_name: o.pickupContact || (o.mode === 'sending' ? me : ''),
            dropoff_contact_name: o.dropoffContact || (o.mode === 'receiving' ? me : ''),
            pickup_handover: o.pickupHandover,
            dropoff_handover: o.dropoffHandover,
            pickup_instructions: o.pickupNotes,
            dropoff_instructions: o.dropoffNotes,
            package_size: o.size,
            pin_confirmation: o.pin,
          },
        });
        state.compose = {
          pickup_address: '', dropoff_address: '', start: '', scheduled: false, timeError: null,
          quote: null, quoteError: null, busy: false,
          locating: false, locateError: null, locateNote: null, pickupCoords: null, dropoffCoords: null,
      pickupPlace: null, dropoffPlace: null,
        };
        state.customerTab = 'active';
        state.selectedJobId = created.id;
        await loadLists();
      } catch (err) {
        state.compose.busy = false;
        if (err.status === 409) {
          // The quote went stale while the form sat open. Fetch a fresh one
          // so the current price is on screen before they post again.
          state.compose.quote = null;
          await actions.getQuote();
          state.compose.quoteError = state.compose.quoteError || err.message;
          render();
          return;
        }
        state.compose.quoteError = err.message;
        render();
      }
    },
    async acceptJob(jobId) {
      const id = Number(jobId);
      const leaveOffers = () => { state.available = state.available.filter((j) => j.id !== id); };
      try {
        await api('/api/jobs-accept', { method: 'POST', json: { jobId: id } });
        leaveOffers(); // out of the offers at once, without waiting for the lists to reload
        state.courierTab = 'mine';
        state.selectedJobId = Number(jobId);
        await loadLists();
        // Nothing is shared yet: that starts when the courier presses Start order.
      } catch (err) {
        toast(err.message, 'error');
        if (err && err.status === 409) { leaveOffers(); render(); } // someone else got there first: it is no longer on offer
        await loadLists(); // and show the current list
      }
    },
    // The courier sets off for the pickup. Their phone starts sharing its position from here, and
    // the customer can follow them to the collection point.
    async startOrder(jobId) {
      try {
        await api('/api/jobs-start', { method: 'POST', json: { jobId: Number(jobId) } });
        await loadLists();
        pushCourierLocation(); // the first position, straight away rather than at the next tick
      } catch (err) {
        if (err && err.data && err.data.consent_required) setGps('consent');
        toast(err.message, 'error');
        await loadLists();
      }
    },
    async cancelJob(jobId) {
      const id = Number(jobId);
      const job = state.jobs.find((j) => j.id === id);
      const isCourier = state.user && state.user.role === 'courier';
      let question;
      if (isCourier) {
        question = `Hand back Order #${id}? It goes straight back on the marketplace for another courier, and the customer isn't charged extra.`;
      } else if (job && job.payment_status === 'PAID') {
        question = `Cancel Order #${id}? No courier has taken it yet, so you'll be refunded in full automatically.`;
      } else {
        question = `Cancel Order #${id}? No courier has taken it yet, so you won't be charged.`;
      }
      if (!confirm(question)) return;
      try {
        const done = await api('/api/jobs-cancel', { method: 'POST', json: { jobId: id } });
        if (done && done.outcome === 'relisted') toast('Handed back. It is on the marketplace again.');
        else if (!isCourier) toast('Order cancelled.');
        await loadLists();
      } catch (err) {
        toast(err.message, 'error');
        await loadLists();
      }
    },
    async deleteJob(jobId) {
      const id = Number(jobId);
      if (!confirm(`Remove Order #${id} from your list?`)) return;
      try {
        await api(`/api/jobs-delete?jobId=${id}`, { method: 'POST', json: { jobId: id } });
        if (state.selectedJobId === id) state.selectedJobId = null;
        state.expanded.delete(id);
        await loadLists();
      } catch (err) {
        toast(err.message, 'error');
      }
    },
    choosePhoto(jobId, files) {
      if (files && files[0]) {
        state.pendingPhoto[jobId] = files[0];
        state.uploadError[jobId] = null;
        render();
      }
    },
    async uploadPickup(jobId) {
      await doUpload(jobId, '/api/jobs-pickup');
    },
    async uploadDeliver(jobId) {
      await doUpload(jobId, '/api/jobs-deliver');
    },
  };

  // Phone photos are often 5–10 MB, and the platform rejects request bodies over
  // about 4.5 MB before our code even runs — with an error the app can't read.
  // So the picture is shrunk in the browser first: longest side 1600 px, JPEG.
  // A format the browser can't decode (some HEIC) goes up as it is, and the
  // server says if it is too big.
  async function shrinkPhoto(file) {
    if (!file || !/^image\/(jpeg|png|webp)$/.test(file.type) || typeof createImageBitmap !== 'function') return file;
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      if (scale === 1 && file.size <= 1.5 * 1024 * 1024) { if (bitmap.close) bitmap.close(); return file; }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      if (bitmap.close) bitmap.close();
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
      return blob && blob.size < file.size ? new File([blob], 'photo.jpg', { type: 'image/jpeg' }) : file;
    } catch (e) {
      return file;
    }
  }

  async function doUpload(jobId, path) {
    const file = state.pendingPhoto[jobId];
    if (!file && !testMode) {
      state.uploadError[jobId] = 'Choose a photo first';
      render();
      return;
    }
    // A delivery the customer protected with a PIN: the courier types what the recipient tells them.
    const extraHeaders = {};
    if (path === '/api/jobs-deliver') {
      const job = state.jobs.find((j) => j.id === jobId);
      if (job && job.pin_required) {
        const pin = String(state.deliveryPins[jobId] || '').trim();
        if (!/^\d{4}$/.test(pin)) {
          state.uploadError[jobId] = 'Enter the 4-digit PIN the recipient gives you';
          render();
          return;
        }
        extraHeaders['X-Delivery-Pin'] = pin;
      }
    }
    state.uploadBusy[jobId] = true;
    state.uploadError[jobId] = null;
    render();
    try {
      const form = new FormData();
      if (file) form.append('photo', await shrinkPhoto(file));
      await api(`${path}?jobId=${jobId}`, { method: 'POST', form, headers: extraHeaders });
      delete state.deliveryPins[jobId];
      delete state.pendingPhoto[jobId];
      await loadLists();
    } catch (err) {
      state.uploadError[jobId] = err.message;
    } finally {
      state.uploadBusy[jobId] = false;
      render();
    }
  }

  // ---------------- Autocomplete ----------------
  // One dropdown per address field, driven by /api/address-search. Each field
  // is always in one state — idle, loading, ok, empty or error — and the box
  // shows what that state means, so a slow or failed search is never
  // indistinguishable from "nothing matched".
  const SUGGEST_MIN_CHARS = 3;
  const SUGGEST_DEBOUNCE_MS = 250;
  const suggestStatus = { pickup: 'idle', dropoff: 'idle' };
  const suggestActive = { pickup: -1, dropoff: -1 }; // keyboard-highlighted row
  const suggestAbort = { pickup: null, dropoff: null };
  const suggestCache = new Map(); // "query|near" -> { results, error } for this page load

  function suggestNear(field) {
    // Rank towards the other end of the trip: someone sending across town
    // means the Kings Road near their pickup, not one 200 miles away.
    const other = field === 'pickup' ? state.compose.dropoffCoords : state.compose.pickupCoords;
    return other ? `${other.lat.toFixed(4)},${other.lng.toFixed(4)}` : '';
  }

  function closeSuggestBox(field, { silent = false } = {}) {
    clearTimeout(suggestTimers[field]);
    if (suggestAbort[field]) suggestAbort[field].abort();
    suggestSeq[field]++; // any answer still in flight is now stale
    suggestResults[field] = [];
    suggestStatus[field] = 'idle';
    suggestActive[field] = -1;
    if (!silent) renderSuggestBox(field);
  }

  function scheduleAddressSuggest(field, query) {
    clearTimeout(suggestTimers[field]);
    const q = (query || '').trim();
    if (q.length < SUGGEST_MIN_CHARS) {
      closeSuggestBox(field);
      return;
    }

    const near = suggestNear(field);
    const key = `${q.toLowerCase()}|${near}`;
    const cached = suggestCache.get(key);
    if (cached) {
      suggestSeq[field]++;
      suggestResults[field] = cached.results;
      suggestStatus[field] = cached.results.length ? 'ok' : 'empty';
      suggestActive[field] = -1;
      renderSuggestBox(field);
      return;
    }

    // Keep whatever is showing while the next answer loads (no flicker per
    // keystroke); only show "Searching…" when there is nothing yet.
    suggestStatus[field] = suggestResults[field].length ? 'ok' : 'loading';
    renderSuggestBox(field);

    suggestTimers[field] = setTimeout(async () => {
      const seq = ++suggestSeq[field];
      if (suggestAbort[field]) suggestAbort[field].abort();
      const controller = new AbortController();
      suggestAbort[field] = controller;
      try {
        const url = `/api/address-search?q=${encodeURIComponent(q)}${near ? `&near=${near}` : ''}`;
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json().catch(() => null);
        if (seq !== suggestSeq[field]) return;
        const failed = !res.ok || !data || data.error;
        const results = failed ? [] : (data.results || []);
        if (!failed) suggestCache.set(key, { results });
        suggestResults[field] = results;
        suggestStatus[field] = failed ? 'error' : (results.length ? 'ok' : 'empty');
        suggestActive[field] = -1;
      } catch (err) {
        if (err && err.name === 'AbortError') return; // superseded by a newer keystroke
        if (seq !== suggestSeq[field]) return;
        suggestResults[field] = [];
        suggestStatus[field] = 'error';
      }
      renderSuggestBox(field);
    }, SUGGEST_DEBOUNCE_MS);
  }

  // Wraps the parts of `text` that match a word the customer typed, escaping
  // everything — the match markup is the only HTML that reaches the page.
  function highlightMatch(text, query) {
    const words = String(query || '').trim().split(/\s+/).filter((w) => w.length >= 2)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!words.length) return escapeHtml(text);
    return String(text).split(new RegExp(`(${words.join('|')})`, 'ig'))
      .map((part, i) => (i % 2 ? `<strong>${escapeHtml(part)}</strong>` : escapeHtml(part)))
      .join('');
  }

  function renderSuggestBox(field) {
    const box = document.getElementById(`${field}-suggestions`);
    if (!box) return;
    const status = suggestStatus[field];
    const items = suggestResults[field] || [];
    const input = root.querySelector(`[data-suggest-field="${field}"]`);
    const typed = input ? input.value : '';

    if (status === 'idle') {
      box.innerHTML = '';
    } else if (items.length) {
      box.innerHTML = items.map((r, i) => `
        <div class="addr-suggestion${i === suggestActive[field] ? ' is-active' : ''}" role="option" id="${field}-opt-${i}"
             data-action="selectSuggestion" data-arg="${i}" data-field="${field}">
          <span class="addr-pin">${ICONS.pin || ''}</span>
          <span class="addr-text">
            <span class="addr-primary">${highlightMatch(r.primary || r.display_name, typed)}</span>
            ${r.secondary ? `<span class="addr-secondary">${escapeHtml(r.secondary)}</span>` : ''}
            ${r.approximate ? '<span class="addr-approx">Door number kept · pin is on the street</span>' : ''}
          </span>
        </div>`).join('') + '<div class="addr-attrib">Search by Photon · © OpenStreetMap contributors</div>';
    } else if (status === 'loading') {
      box.innerHTML = '<div class="addr-status"><span class="addr-spinner"></span>Searching…</div>';
    } else if (status === 'error') {
      box.innerHTML = '<div class="addr-status is-error">Couldn\u2019t search right now. Type the full address and we\u2019ll look it up when you continue.</div>';
    } else {
      box.innerHTML = '<div class="addr-status">No matches yet. Try adding a town or postcode.</div>';
    }

    if (input) {
      input.setAttribute('aria-expanded', items.length ? 'true' : 'false');
      if (suggestActive[field] >= 0) input.setAttribute('aria-activedescendant', `${field}-opt-${suggestActive[field]}`);
      else input.removeAttribute('aria-activedescendant');
    }
    if (status !== 'idle' && box.firstElementChild && document.activeElement === input) revealSuggestBox(box, input);
  }

  // The list opens inside the scrolling panel, which on a phone is only a few
  // rows tall. If it would run off the bottom, scroll so the field being typed
  // in sits at the top edge with the results beneath it — never so far that the
  // field itself disappears.
  function revealSuggestBox(box, input) {
    const scroller = root.querySelector('.panel-scroll-content');
    const wrap = input.closest('.addr-input-wrap');
    if (!scroller || !wrap) return;
    const s = scroller.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    if (b.bottom > s.bottom + 1 || w.top < s.top) scroller.scrollTop += w.top - s.top - 6;
  }

  function moveSuggestActive(field, delta) {
    const n = (suggestResults[field] || []).length;
    if (!n) return;
    const next = suggestActive[field] + delta;
    suggestActive[field] = Math.max(-1, Math.min(n - 1, next));
    const box = document.getElementById(`${field}-suggestions`);
    if (!box) return;
    box.querySelectorAll('.addr-suggestion').forEach((el, i) => el.classList.toggle('is-active', i === suggestActive[field]));
    const input = root.querySelector(`[data-suggest-field="${field}"]`);
    if (input) {
      if (suggestActive[field] >= 0) input.setAttribute('aria-activedescendant', `${field}-opt-${suggestActive[field]}`);
      else input.removeAttribute('aria-activedescendant');
    }
    const row = box.querySelector('.addr-suggestion.is-active');
    if (row) row.scrollIntoView({ block: 'nearest' });
  }

  // ---------------- Pages ----------------
  // Each section is its own page with its own address: #home, #on-the-way and
  // #past-orders for a customer; #home, #my-deliveries and #past-deliveries for a
  // courier. The browser's Back button and a refresh both stay where you were.
  const PAGE_NAMES = {
    customer: { compose: 'home', active: 'on-the-way', received: 'past-orders' },
    courier: { available: 'home', mine: 'my-deliveries', past: 'past-deliveries' },
  };
  function currentPageName() {
    const role = state.user && state.user.role;
    if (!PAGE_NAMES[role]) return null;
    return PAGE_NAMES[role][role === 'customer' ? state.customerTab : state.courierTab] || null;
  }
  // Keeps the address in step with the page being shown. Arriving on the site
  // replaces the current history entry; moving between pages adds one.
  function syncPageHash() {
    const name = currentPageName();
    if (state.screen !== 'dashboard' || !name) return;
    const want = '#' + name;
    if (location.hash === want) return;
    try {
      if (!location.hash) history.replaceState(null, '', want);
      else history.pushState(null, '', want);
    } catch (e) { /* some embedded browsers forbid it: the page still works, just without a Back entry */ }
  }
  // The other way round: the address says which page to show (Back button, a bookmark, a refresh).
  function applyPageFromHash() {
    const role = state.user && state.user.role;
    if (!PAGE_NAMES[role]) return false;
    const name = location.hash.replace(/^#/, '');
    const entry = Object.entries(PAGE_NAMES[role]).find(([, page]) => page === name);
    if (!entry) return false;
    const key = role === 'customer' ? 'customerTab' : 'courierTab';
    if (state[key] === entry[0]) return false;
    state[key] = entry[0];
    state.pastQuery = '';
    state.selectedJobId = null;
    state.expanded.clear();
    return true;
  }

  // ---------------- Rendering ----------------
  function render() {
    if (sheetDrag) { sheetRenderQueued = true; return; } // redrawing now would drop the handle mid-drag
    // Live location belongs to the order form only: any other page or step switches it off.
    if (liveWatchId !== null && !(state.screen === 'dashboard' && state.user && state.user.role === 'customer' && state.customerTab === 'compose' && state.compose.step !== 'review')) stopLiveLocation();
    // Rebuilding root.innerHTML destroys whichever field the user is typing
    // in, so note it now and put the cursor back afterwards. Without this a
    // background refresh (the chat poll, a status change) would drop focus
    // mid-sentence.
    const focused = document.activeElement;
    let refocus = null;
    if (focused && root.contains(focused) && focused.dataset && focused.dataset.bind) {
      refocus = { bind: focused.dataset.bind, start: focused.selectionStart, end: focused.selectionEnd };
    }

    // Redrawing the same page (opening a row, flipping a switch, a background refresh) must not
    // throw the list back to the top; moving to another page or step starts at the top.
    const oldScroller = root.querySelector('.panel-scroll-content');
    const viewKey = [state.screen, state.customerTab, state.courierTab, state.compose && state.compose.step].join('|');
    const keepScroll = oldScroller && viewKey === lastViewKey ? oldScroller.scrollTop : 0;
    lastViewKey = viewKey;

    Object.values(activeIntervals).forEach(clearInterval);
    activeIntervals = {};
    liveMaps.forEach((m) => m.remove());
    liveMaps = [];
    workspaceMap = null;
    pickupMarker = null;
    legLine = null;
    courierMarkers = {};

    root.innerHTML = state.screen === 'auth' ? renderAuth() : renderDashboard();
    if (state.screen === 'dashboard') {
      applySheet(); // before the map is drawn, so it is fitted to the room it really has
      initWorkspaceMap();
    }
    if (keepScroll) {
      const scroller = root.querySelector('.panel-scroll-content');
      if (scroller) scroller.scrollTop = keepScroll;
    }

    if (refocus) {
      const el = root.querySelector(`[data-bind="${refocus.bind}"]`);
      if (el) {
        el.focus();
        try { el.setSelectionRange(refocus.start, refocus.end); } catch { /* not a text field */ }
      }
    }
    // A chat should open on, and stay at, its newest message.
    const thread = root.querySelector('.chat-bubble-container');
    if (thread) thread.scrollTop = thread.scrollHeight;
    // The redraw made fresh theme buttons; give them the right label.
    if (window.VendaruTheme) window.VendaruTheme.sync();
    syncPageHash();
  }

  function renderAuth() {
    if (state.bootError && state.token) {
      return `
        <div class="auth-container">
          <div class="auth-glass-box" style="text-align:center;">
            <div class="auth-logo-header">${brandWordmark()}</div>
            <p style="margin:8px 0 16px;color:var(--text-2);">${escapeHtml(state.bootError)}</p>
            <button class="btn-primary-pill" data-action="retryBoot">Try again</button>
            <button class="btn-details" data-action="logout" style="margin-top:10px;background:transparent;border:1.5px solid var(--line-strong);color:var(--muted);">Sign out</button>
          </div>
        </div>`;
    }
    const f = state.authFields;
    const mode = state.authMode;
    const isRegister = mode === 'register';
    const isLogin = mode === 'login';
    const recovering = mode === 'forgot' || mode === 'reset';
    return `
      <div class="auth-container">
        ${themeButton('icon-btn-round auth-theme-toggle')}
        <div class="auth-glass-box">
          <div class="auth-logo-header">
            ${brandWordmark()}
            <h1 class="auth-tagline">${state.authRole === 'courier' ? 'Deliver parcels near you' : 'Send or receive parcels across the UK'}</h1>
            <p class="auth-tagline-sub">${state.authRole === 'courier' ? 'Pick the jobs that suit you. Your location is only shared once you start.' : 'Get an instant price, and a local courier collects and delivers it.'}</p>
          </div>

          ${recovering ? `
            <h2 class="auth-mode-title">${mode === 'reset' ? 'Choose a new password' : 'Reset your password'}</h2>
            <p class="auth-mode-sub">${mode === 'reset' ? 'Pick something at least 8 characters long. Choosing a new password signs you out on your other devices.' : "Enter the email you signed up with and we'll send you a link to choose a new one."}</p>` : `
          <div class="segmented-tabs" style="margin: 0 0 20px;">
            <button data-action="switchAuthRole" data-arg="customer" class="tab-pill ${state.authRole === 'customer' ? 'is-active' : ''}">Customer</button>
            <button data-action="switchAuthRole" data-arg="courier" class="tab-pill ${state.authRole === 'courier' ? 'is-active' : ''}">Courier</button>
          </div>

          <div class="segmented-tabs" style="background:var(--fill);margin: 0 0 20px;">
            <button data-action="switchAuthMode" data-arg="login" class="tab-pill ${!isRegister ? 'is-active' : ''}">Log in</button>
            <button data-action="switchAuthMode" data-arg="register" class="tab-pill ${isRegister ? 'is-active' : ''}">Register</button>
          </div>`}

          ${isRegister ? `
            <div class="input-field-group">
              <label class="input-field-label">Full name</label>
              <input class="modern-input" data-bind="authFields.full_name" autocomplete="name" value="${escapeHtml(f.full_name)}" placeholder="Your full name" />
            </div>` : ''}

          ${mode === 'reset' ? '' : `
          <div class="input-field-group">
            <label class="input-field-label" for="auth-email">Email</label>
            <input id="auth-email" class="modern-input" data-bind="authFields.email" type="email" autocomplete="${isRegister ? 'email' : 'username'}" value="${escapeHtml(f.email)}" placeholder="you@example.com" />
          </div>`}

          ${mode === 'forgot' ? '' : `
          <div class="input-field-group">
            <label class="input-field-label" for="auth-password">${mode === 'reset' ? 'New password' : 'Password'}</label>
            <input id="auth-password" class="modern-input" data-bind="authFields.password" type="password" autocomplete="${isLogin ? 'current-password' : 'new-password'}" value="${escapeHtml(f.password)}" placeholder="At least 8 characters" />
            ${isLogin ? '<button type="button" class="link-btn auth-forgot" data-action="switchAuthMode" data-arg="forgot">Forgot your password?</button>' : ''}
          </div>`}

          ${isRegister ? `
            <div class="consent-block">
              <label class="consent-row"><input type="checkbox" data-check="accept_terms" ${f.accept_terms ? 'checked' : ''} /><span>I'm 18 or over and I agree to the <a href="/terms.html" target="_blank" rel="noopener">Terms</a>, the <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a> and the <a href="/refund-policy.html" target="_blank" rel="noopener">Refund &amp; Cancellation Policy</a>.</span></label>
              ${state.authRole === 'courier' ? `
              <label class="consent-row"><input type="checkbox" data-check="accept_courier_terms" ${f.accept_courier_terms ? 'checked' : ''} /><span>I've read the <a href="/courier-terms.html" target="_blank" rel="noopener">Courier Terms</a>: I'm self-employed, allowed to work in the UK, and properly insured to carry parcels.</span></label>
              <label class="consent-row"><input type="checkbox" data-check="location_consent" ${f.location_consent ? 'checked' : ''} /><span>I agree to share my location while I'm on a delivery, as set out in the <a href="/location-policy.html" target="_blank" rel="noopener">Location Tracking Policy</a>.</span></label>` : ''}
            </div>` : ''}

          ${state.authNotice ? `<div class="notice notice-ok" role="status">${escapeHtml(state.authNotice)}</div>` : ''}
          ${state.authError ? `<div class="form-error" role="alert">${escapeHtml(state.authError)}</div>` : ''}

          <button class="btn-primary-pill" data-action="${mode === 'forgot' ? 'submitForgot' : (mode === 'reset' ? 'submitReset' : 'submitAuth')}" ${state.authBusy ? 'disabled' : ''} style="margin-top:10px;">
            ${state.authBusy ? 'Please wait…' : (mode === 'forgot' ? 'Send reset link' : (mode === 'reset' ? 'Save new password' : (isRegister ? `Create ${state.authRole} account` : 'Log in')))}
          </button>
          ${recovering ? '<button type="button" class="link-btn auth-back" data-action="switchAuthMode" data-arg="login">Back to log in</button>' : ''}

          ${TEST_MODE_SKIP_LOGIN && !recovering ? `
            <button class="btn-details" data-action="skipLogin" data-arg="${state.authRole}" style="margin-top:16px;background:transparent;border:1.5px dashed var(--line-strong);color:var(--muted);">
              Skip sign-in — preview as ${state.authRole}
            </button>` : ''}

          <nav class="auth-footer-links" aria-label="Help and policies">
            <a href="/help.html" target="_blank" rel="noopener">Help</a>
            <a href="/terms.html" target="_blank" rel="noopener">Terms</a>
            <a href="/privacy.html" target="_blank" rel="noopener">Privacy</a>
            <a href="/contact.html" target="_blank" rel="noopener">Contact</a>
          </nav>
        </div>
      </div>`;
  }

  function renderIconSidebar() {
    const isCustomer = state.user.role === 'customer';
    return `
      <aside class="app-icon-nav">
        <div class="brand-badge" data-action="goDashboard" title="Vendaru">
          ${brandLogo('Vendaru')}
        </div>

        <div class="nav-icon-group">
          <button class="nav-icon-btn ${(isCustomer ? state.customerTab === 'compose' : state.courierTab === 'available') ? 'is-active' : ''}" data-action="${isCustomer ? 'setCustomerTab' : 'setCourierTab'}" data-arg="${isCustomer ? 'compose' : 'available'}" title="${isCustomer ? 'Home: send or receive' : 'Home: your job offers'}" aria-label="${isCustomer ? 'Home: send or receive' : 'Home: your job offers'}">
            ${ICONS.home}
          </button>
          <button class="nav-icon-btn ${(isCustomer ? state.customerTab === 'active' : state.courierTab === 'mine') ? 'is-active' : ''}" data-action="${isCustomer ? 'setCustomerTab' : 'setCourierTab'}" data-arg="${isCustomer ? 'active' : 'mine'}" title="${isCustomer ? 'On the way' : 'My deliveries'}" aria-label="${isCustomer ? 'On the way' : 'My deliveries'}">
            ${ICONS.truck}
          </button>
          <button class="nav-icon-btn ${(isCustomer ? state.customerTab === 'received' : state.courierTab === 'past') ? 'is-active' : ''}" data-action="${isCustomer ? 'setCustomerTab' : 'setCourierTab'}" data-arg="${isCustomer ? 'received' : 'past'}" title="${isCustomer ? 'Past orders' : 'Past deliveries'}" aria-label="${isCustomer ? 'Past orders' : 'Past deliveries'}">
            ${ICONS.history}
          </button>
          <button class="nav-icon-btn" data-action="openMessages" title="Messages" aria-label="Messages">
            ${ICONS.chat}
          </button>
          <button class="nav-icon-btn nav-help" data-action="openHelp" title="Help & support" aria-label="Help and support">
            ${ICONS.help}
          </button>
          ${state.user.is_admin ? `<button class="nav-icon-btn nav-admin" data-action="openAdmin" title="Admin dashboard" aria-label="Admin dashboard">${ICONS.shield}</button>` : ''}
          <button class="nav-icon-btn nav-settings" data-action="openSettings" title="Account & settings" aria-label="Account and settings">
            <span class="ico-gear">${ICONS.settings}</span><span class="ico-user">${ICONS.user}</span>
          </button>
        </div>

        <div class="nav-bottom-group">
          ${themeButton('nav-icon-btn')}
          <button class="nav-icon-btn" data-action="logout" title="Log out">
            ${ICONS.logout}
          </button>
        </div>
      </aside>`;
  }

  // ---- Review order: the step between the form and placing the order ----
  // Everything a customer decides beyond "from where, to where": whether they are sending
  // or receiving, who is at each end and how the handover happens, any instructions, how
  // big the parcel is, when to collect it, and whether delivery needs a PIN. No prices
  // here: the fare was shown on the form and doesn't depend on any of these choices.
  const HANDOVER_LABELS = { kerb: 'Meet at kerb', door: 'Meet at door', leave: 'Leave at door' };
  const PARCEL_SIZES = {
    small: { title: 'Small parcel', blurb: 'Fits in a bag', limits: 'Up to 40 × 30 × 20 cm · under 5 kg' },
    medium: { title: 'Medium parcel', blurb: 'Fits in a car boot', limits: 'Up to 80 × 60 × 40 cm · under 15 kg' },
    large: { title: 'Large parcel', blurb: 'Needs an estate or a big boot', limits: 'Up to 120 × 80 × 60 cm · under 30 kg' },
  };

  function composeOpts() {
    const c = state.compose;
    if (!c.opts) {
      c.opts = {
        mode: 'sending', pickupContact: '', dropoffContact: '', pickupHandover: 'kerb', dropoffHandover: 'kerb',
        pickupNotes: '', dropoffNotes: '', size: 'medium', pin: false, editing: null,
      };
    }
    return c.opts;
  }

  // The courier's view of one end of the trip: how to hand over, who to ask for, any notes.
  function stopDetails(job, which) {
    const handover = job[`${which}_handover`];
    const contact = job[`${which}_contact_name`];
    const notes = job[`${which}_instructions`];
    if (!handover && !contact && !notes) return '';
    return `
      <div class="step-when">${escapeHtml(HANDOVER_LABELS[handover] || '')}${contact ? ` · ${escapeHtml(contact)}` : ''}</div>
      ${notes ? `<div class="step-note">${escapeHtml(notes)}</div>` : ''}`;
  }

  // What a courier should know about the parcel before and after accepting.
  function courierNotes(job) {
    const size = PARCEL_SIZES[job.package_size];
    const chips = [];
    if (size) chips.push(`<span class="pay-chip pay-refund">${escapeHtml(size.title)} · ${escapeHtml(size.blurb.toLowerCase())}</span>`);
    if (job.pin_required) chips.push('<span class="pay-chip pay-unpaid">PIN needed to deliver</span>');
    if (job.customer_is_recipient) chips.push('<span class="pay-chip">The customer is receiving</span>');
    return chips.length ? `<div class="pay-chips">${chips.join('')}</div>` : '';
  }

  function renderReviewStop(which) {
    const c = state.compose;
    const o = composeOpts();
    const isPickup = which === 'pickup';
    const address = isPickup ? c.pickup_address : c.dropoff_address;
    const me = state.user ? state.user.full_name : '';
    const iAmHere = (isPickup && o.mode === 'sending') || (!isPickup && o.mode === 'receiving');
    const typed = isPickup ? o.pickupContact : o.dropoffContact;
    const shownContact = typed || (iAmHere ? me : '');
    const handover = isPickup ? o.pickupHandover : o.dropoffHandover;
    const notes = isPickup ? o.pickupNotes : o.dropoffNotes;
    const open = o.editing === which;
    const rest = String(address || '').split(',').slice(1, 3).join(',').trim();
    const who = isPickup
      ? (iAmHere ? 'Your name at pickup' : "Sender's name")
      : (iAmHere ? 'Your name at drop-off' : "Recipient's name");
    return `
      <div class="rv-stop ${open ? 'is-open' : ''}">
        <button type="button" class="rv-stop-head" data-action="editStop" data-arg="${which}" aria-expanded="${open ? 'true' : 'false'}">
          <span class="rv-marker ${isPickup ? 'is-solid' : 'is-square'}" aria-hidden="true"></span>
          <span class="rv-stop-text">
            <span class="rv-stop-title">${escapeHtml(shortCity(address))}</span>
            ${rest ? `<span class="rv-stop-addr">${escapeHtml(rest)}</span>` : ''}
            <span class="rv-stop-sub">${escapeHtml(HANDOVER_LABELS[handover])}${shownContact ? ` · ${escapeHtml(shownContact)}` : ''}</span>
            <span class="rv-stop-add">${notes ? escapeHtml(notes) : (isPickup ? 'Add pick-up instructions' : 'Add drop-off instructions')}</span>
          </span>
          <span class="rv-chev" aria-hidden="true">${ICONS.chevronRight}</span>
        </button>
        ${open ? `
          <div class="rv-editor">
            <label class="input-field-label" for="rv-${which}-contact">${who} <span class="rv-opt">(optional)</span></label>
            <input id="rv-${which}-contact" class="modern-input" data-bind="compose.opts.${which}Contact" value="${escapeHtml(typed)}" maxlength="100" autocomplete="off" placeholder="${escapeHtml(iAmHere ? me : 'Their name')}" />
            <div class="input-field-label" id="rv-${which}-handover">How will you hand it over?</div>
            <div class="rv-choices" role="radiogroup" aria-labelledby="rv-${which}-handover">
              ${['kerb', 'door', 'leave'].map((h) => `<button type="button" role="radio" aria-checked="${h === handover ? 'true' : 'false'}" class="rv-choice ${h === handover ? 'is-on' : ''}" data-action="setHandover" data-arg="${which}" data-field="${h}">${HANDOVER_LABELS[h]}</button>`).join('')}
            </div>
            <label class="input-field-label" for="rv-${which}-notes">Instructions for the courier <span class="rv-opt">(optional)</span></label>
            <textarea id="rv-${which}-notes" class="modern-input rv-notes" rows="3" maxlength="300" data-bind="compose.opts.${which}Notes" placeholder="e.g. ring the bell twice, gate code 1234, ask for the porter">${escapeHtml(notes)}</textarea>
            <div class="field-hint">Only the courier who accepts your job sees these, never the other couriers.</div>
            <button type="button" class="btn-details rv-done" data-action="editStop" data-arg="${which}">Done</button>
          </div>` : ''}
      </div>`;
  }

  // A closed-by-default row in the guidelines card; tapping it opens the text underneath.
  function renderFold(key, title, sub, html, open) {
    return `
      <div class="rv-fold ${open ? 'is-open' : ''}">
        <button type="button" class="rv-row" data-action="toggleInfo" data-arg="${key}" aria-expanded="${open ? 'true' : 'false'}" aria-controls="rv-info-${key}">
          <span class="rv-row-text"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(sub)}</small></span>
          <span class="rv-chev" aria-hidden="true">${ICONS.chevronRight}</span>
        </button>
        ${open ? `<div class="rv-fold-body rv-text" id="rv-info-${key}">${html}</div>` : ''}
      </div>`;
  }

  function renderReview() {
    const c = state.compose;
    const o = composeOpts();
    const size = PARCEL_SIZES[o.size];
    return `
      <div class="rv">
        <div class="rv-top">
          <button type="button" class="rv-back" data-action="backToForm" aria-label="Back to the form">${ICONS.arrowLeft}</button>
          <h2 class="rv-title">Review order</h2>
        </div>

        <div class="segmented-tabs rv-mode" role="group" aria-label="Are you sending or receiving?">
          <button type="button" class="tab-pill ${o.mode === 'sending' ? 'is-active' : ''}" data-action="setMode" data-arg="sending" aria-pressed="${o.mode === 'sending' ? 'true' : 'false'}">I'm sending</button>
          <button type="button" class="tab-pill ${o.mode === 'receiving' ? 'is-active' : ''}" data-action="setMode" data-arg="receiving" aria-pressed="${o.mode === 'receiving' ? 'true' : 'false'}">I'm receiving</button>
        </div>

        <section class="rv-card rv-route">
          ${renderReviewStop('pickup')}
          ${renderReviewStop('dropoff')}
        </section>

        <section class="rv-card">
          <button type="button" class="rv-row" data-action="editStop" data-arg="size" aria-expanded="${o.editing === 'size' ? 'true' : 'false'}">
            <span class="rv-ico" aria-hidden="true">${ICONS.box}</span>
            <span class="rv-row-text"><strong>${escapeHtml(size.title)}</strong><span>${escapeHtml(size.blurb)}</span><small>${escapeHtml(size.limits)}</small></span>
            <span class="rv-chev" aria-hidden="true">${ICONS.chevronRight}</span>
          </button>
          ${o.editing === 'size' ? `
            <div class="rv-sizes" role="radiogroup" aria-label="Parcel size">
              ${Object.entries(PARCEL_SIZES).map(([key, s]) => `
                <button type="button" role="radio" aria-checked="${key === o.size ? 'true' : 'false'}" class="rv-radio ${key === o.size ? 'is-on' : ''}" data-action="setSize" data-arg="${key}">
                  <span class="rv-dot" aria-hidden="true"></span>
                  <span class="rv-radio-text"><strong>${escapeHtml(s.title)}</strong><span>${escapeHtml(s.blurb)}</span><small>${escapeHtml(s.limits)}</small></span>
                </button>`).join('')}
            </div>` : ''}
        </section>

        <h3 class="rv-h">Delivery speed</h3>
        <section class="rv-card">
          <div class="rv-sizes" role="radiogroup" aria-label="When should it be collected?">
            <button type="button" role="radio" aria-checked="${c.scheduled ? 'false' : 'true'}" class="rv-radio ${c.scheduled ? '' : 'is-on'}" data-action="setPickupMode" data-arg="now">
              <span class="rv-dot" aria-hidden="true"></span>
              <span class="rv-radio-text"><strong>As soon as possible</strong><small>Collected as soon as a courier accepts</small></span>
            </button>
            <button type="button" role="radio" aria-checked="${c.scheduled ? 'true' : 'false'}" class="rv-radio ${c.scheduled ? 'is-on' : ''}" data-action="setPickupMode" data-arg="schedule">
              <span class="rv-dot" aria-hidden="true"></span>
              <span class="rv-radio-text"><strong>Schedule for later</strong><small>Choose a date and time</small></span>
            </button>
          </div>
          ${c.scheduled ? `<input id="compose-start" class="modern-input pickup-datetime rv-when" data-bind="compose.start" type="datetime-local" min="${localInputValue(new Date())}" value="${escapeHtml(c.start)}" aria-label="Pickup date and time" />` : ''}
          ${c.timeError ? `<div class="form-error time-error">${escapeHtml(c.timeError)}</div>` : ''}
        </section>

        <h3 class="rv-h">Add peace of mind?</h3>
        <section class="rv-card rv-switch-row">
          <div class="rv-row-text">
            <strong>PIN confirmation</strong>
            <small>Turn on to confirm delivery with a 4-digit PIN. You'll get the PIN once the order is placed: give it to whoever is receiving the parcel, and the courier needs it to finish the delivery.</small>
          </div>
          <button type="button" class="rv-switch ${o.pin ? 'is-on' : ''}" role="switch" aria-checked="${o.pin ? 'true' : 'false'}" aria-label="PIN confirmation" data-action="togglePin"><span></span></button>
        </section>

        <h3 class="rv-h">Review parcel guidelines</h3>
        <section class="rv-card">
          ${renderFold('guidelines', 'What you can send', 'Value, size and packaging', `
            <p class="rv-lead">Intended for parcel delivery only: nobody may travel with the parcel. For a successful delivery, make sure your parcel is:</p>
            <ul class="rv-list">
              <li>£500 or less in value</li>
              <li>Securely sealed and ready for pick-up</li>
              <li>No bigger or heavier than the size you chose</li>
              <li>Not on the <a href="/prohibited-items.html" target="_blank" rel="noopener">list of prohibited items</a></li>
            </ul>`, o.info === 'guidelines')}
          ${renderFold('disclaimer', 'Disclaimer', 'Who is responsible for what', `
            <p>Reports of illegal items will be passed to the authorities. Vendaru is a parcel delivery service, and your courier is an independent person who accepts your job. It is your responsibility to make sure someone is available to hand the parcel to (or to collect it from). If nobody is, the courier may not be able to complete the delivery.</p>
            <a class="rv-linkbtn" href="/prohibited-items.html" target="_blank" rel="noopener">See all prohibited items</a>`, o.info === 'disclaimer')}
          ${renderFold('undelivered', "If your delivery can't be completed", 'What happens if nobody is there', `
            <p>If the delivery can't be completed (for example, nobody is there to receive it), the courier will message you and our support team can help you decide what happens next. Extra charges may apply. See the <a href="/refund-policy.html" target="_blank" rel="noopener">Refund &amp; Cancellation Policy</a> and the <a href="/terms.html" target="_blank" rel="noopener">Terms</a> for what is and isn't covered if a parcel is lost or damaged.</p>`, o.info === 'undelivered')}
        </section>

        ${c.quoteError ? `<div class="form-error" role="alert">${escapeHtml(c.quoteError)}</div>` : ''}
        <p class="rv-consent">By tapping Confirm order, you agree to the <a href="/terms.html" target="_blank" rel="noopener">Terms</a> and confirm your parcel follows these guidelines.</p>
        <button type="button" class="btn-primary-pill rv-confirm" data-action="submitJob" ${c.busy ? 'disabled' : ''}>${c.busy ? 'Placing your order…' : 'Confirm order'}</button>
      </div>`;
  }

  function renderComposeForm() {
    const c = state.compose;
    if (c.step === 'review' && c.quote) return renderReview();
    return `
      <div class="compose-glass-card">
        <div class="input-field-group">
          <div class="label-row">
            <label class="input-field-label">Pickup address</label>
            <button type="button" class="live-toggle ${c.live ? 'is-on' : ''}" role="switch" aria-checked="${c.live ? 'true' : 'false'}" data-action="toggleLive" title="${c.live ? 'Live location is on: your pickup follows you. Tap to turn it off.' : 'Turn on live location so your pickup follows you'}">
              <span class="live-toggle-text">Live location</span><span class="live-toggle-track" aria-hidden="true"><span></span></span>
            </button>
          </div>
          <div class="addr-input-wrap has-gps">
            <span class="addr-search-icon" aria-hidden="true">${ICONS.search}</span>
            <input class="modern-input addr-input" data-bind="compose.pickup_address" data-suggest-field="pickup" value="${escapeHtml(c.pickup_address)}" placeholder="12 High St, Manchester" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="pickup-suggestions" />
            <button type="button" class="addr-clear" data-action="clearAddress" data-arg="pickup" aria-label="Clear pickup address">${ICONS.close}</button>
            <button type="button" class="addr-gps ${c.locating ? 'is-locating' : ''} ${c.live ? 'is-live' : ''}" data-action="useMyLocation" aria-label="${c.locating ? 'Finding your location' : 'Use my current location'}" title="${c.locating ? 'Finding your location…' : 'Use my current location'}" ${c.locating ? 'disabled' : ''}>${ICONS.navigate}</button>
            <div class="addr-suggestions" id="pickup-suggestions" role="listbox"></div>
          </div>
          ${c.locating ? '<div class="field-hint locate-msg">Finding your location…</div>' : ''}
          ${c.locateError ? `<div class="form-error locate-msg">${escapeHtml(c.locateError)}</div>` : ''}
          ${c.locateNote ? `<div class="field-hint locate-msg">${escapeHtml(c.locateNote)}</div>` : ''}
        </div>

        <div class="input-field-group">
          <label class="input-field-label">Dropoff address</label>
          <div class="addr-input-wrap">
            <span class="addr-search-icon" aria-hidden="true">${ICONS.search}</span>
            <input class="modern-input addr-input" data-bind="compose.dropoff_address" data-suggest-field="dropoff" value="${escapeHtml(c.dropoff_address)}" placeholder="4 Kings Rd, Leeds" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="dropoff-suggestions" />
            <button type="button" class="addr-clear" data-action="clearAddress" data-arg="dropoff" aria-label="Clear dropoff address">${ICONS.close}</button>
            <div class="addr-suggestions" id="dropoff-suggestions" role="listbox"></div>
          </div>
        </div>

        <div class="quote-badge-line">
          ${c.busy
            ? '<span>Calculating route & price…</span>'
            : (c.quote ? `<span><strong>${miles(c.quote.distance_km)}</strong> · est. <strong>${money(c.quote.price_gbp)}</strong></span>` : '<span>Route estimate</span>')
          }
          ${c.quote ? `<span class="status-pill status-OPEN">Quoted</span>` : ''}
        </div>
        ${c.quote && fareBreakdown(c.quote) ? `<div class="quote-breakdown">${escapeHtml(fareBreakdown(c.quote))}</div>` : ''}
        ${c.quoteError ? `<div class="form-error">${escapeHtml(c.quoteError)}</div>` : ''}

        <button class="btn-primary-pill" data-action="reviewOrder" ${c.busy || !c.quote ? 'disabled' : ''} style="margin-top:6px;">
          Review order
        </button>
      </div>`;
  }

  // ---- Active deliveries: one stepper card per order, closed until it is tapped ----
  // Closed, a card shows what matters at a glance: where it is up to, when it is due,
  // and four steps (Listed, Accepted, Collected, Delivered). Tapped, it opens to the
  // courier, a message box, a call button, and the order's details and actions.
  function kmBetween(lat1, lng1, lat2, lng2) {
    const rad = (d) => (d * Math.PI) / 180;
    const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2;
    return 12742 * Math.asin(Math.min(1, Math.sqrt(a)));
  }
  const clockTime = (d) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // A rough arrival time once the parcel is moving: about 45 km/h door to door over the
  // road distance still to go (straight-line distance x 1.3 when the courier's position is
  // fresh, otherwise the whole trip from the moment it was collected). Always labelled "about".
  function etaDate(job) {
    if (job.status !== 'COLLECTED') return null;
    const KMH = 45;
    const at = job.courier_location_updated_at ? new Date(job.courier_location_updated_at).getTime() : null;
    const fresh = at && !Number.isNaN(at) && Date.now() - at < 5 * 60 * 1000;
    let ms;
    if (fresh && job.courier_lat != null && job.courier_lng != null) {
      const km = kmBetween(Number(job.courier_lat), Number(job.courier_lng), Number(job.dropoff_lat), Number(job.dropoff_lng)) * 1.3;
      ms = Date.now() + (km / KMH) * 3600000;
    } else if (job.collected_at) {
      ms = new Date(job.collected_at).getTime() + (Number(job.distance_km) / KMH) * 3600000;
    } else {
      return null;
    }
    return new Date(Math.max(ms, Date.now() + 2 * 60000));
  }

  function arrivalLine(job) {
    const pickup = pickupInfo(job);
    if (job.status === 'OPEN') return pickup && !pickup.asap ? `Pickup ${pickup.text}` : 'Waiting for a courier to accept';
    if (job.status === 'ACCEPTED') {
      if (!job.started_at) return pickup && !pickup.asap ? `Pickup ${pickup.text}` : 'Accepted — the courier will set off soon';
      const leg = legCache.get(job.id);
      if (leg && leg.distance_km != null) return `Courier is about ${Math.max(1, Math.round((leg.distance_km / 40) * 60))} min from the pickup`;
      return 'Courier is on the way to collect it';
    }
    const eta = etaDate(job);
    return eta ? `Arriving about ${clockTime(eta)}` : 'On the way to the drop-off';
  }

  // Live distance and how fresh the courier's position is (once the parcel is moving).
  function liveCaption(job) {
    if (job.status === 'ACCEPTED') {
      if (!job.started_at) return 'You will see them on the map as soon as they set off.';
      if (job.courier_lat == null || job.courier_lng == null) return "Waiting for the courier's location…";
      const leg = legCache.get(job.id);
      const away = leg && leg.distance_km != null
        ? leg.distance_km
        : kmBetween(Number(job.courier_lat), Number(job.courier_lng), Number(job.pickup_lat), Number(job.pickup_lng)) * 1.3;
      const at = job.courier_location_updated_at ? new Date(job.courier_location_updated_at).getTime() : null;
      const age = at && !Number.isNaN(at) ? Math.round((Date.now() - at) / 1000) : null;
      return `about ${miles(away)} from the pickup${age !== null ? (age > 90 ? ' · signal lost' : ` · updated ${age}s ago`) : ''}`;
    }
    if (job.status !== 'COLLECTED') return '';
    if (job.courier_lat == null || job.courier_lng == null) return "Waiting for the courier's location…";
    const left = kmBetween(Number(job.courier_lat), Number(job.courier_lng), Number(job.dropoff_lat), Number(job.dropoff_lng));
    const at = job.courier_location_updated_at ? new Date(job.courier_location_updated_at).getTime() : null;
    const age = at && !Number.isNaN(at) ? Math.round((Date.now() - at) / 1000) : null;
    return `about ${miles(left)} to go${age !== null ? (age > 90 ? ' · signal lost' : ` · updated ${age}s ago`) : ''}`;
  }

  function activeCardHead(job, isExpanded) {
    const title = { OPEN: 'Finding a courier', ACCEPTED: job.started_at ? 'Heading to the pickup' : 'Courier assigned', COLLECTED: 'On the way' }[job.status] || job.status;
    const labels = ['Listed', 'Accepted', 'Collected', 'Delivered'];
    const current = { OPEN: 1, ACCEPTED: 2, COLLECTED: 3 }[job.status];
    const steps = labels.map((label, i) => {
      const state_ = i < current ? 'done' : (i === current ? 'current' : 'todo');
      const icon = state_ === 'done' ? ICONS.check : (state_ === 'current' ? ICONS.truck : '');
      return `<li class="ac-step ${state_}" ${state_ === 'current' ? 'aria-current="step"' : ''}><span class="ac-dot">${icon}</span><span class="ac-label">${label}</span></li>`;
    }).join('');
    return `
      <div class="ac-head" data-action="toggleExpand" data-arg="${job.id}" role="button" tabindex="0" data-key-activate aria-expanded="${isExpanded ? 'true' : 'false'}" aria-label="Order ${job.id}: ${escapeHtml(title)}. ${isExpanded ? 'Tap to close' : 'Tap to open'}">
        <div class="ac-top">
          <div class="ac-titles">
            <div class="ac-title">${escapeHtml(title)}</div>
            <div class="ac-sub" data-eta-for="${job.id}">${escapeHtml(arrivalLine(job))}</div>
            <div class="ac-route">${escapeHtml(shortCity(job.pickup_address))} → ${escapeHtml(shortCity(job.dropoff_address))}</div>
          </div>
          <div class="ac-id">#VND-${job.id}<span class="ac-chev" aria-hidden="true">${ICONS.chevronDown}</span></div>
        </div>
        <ol class="ac-steps" aria-label="Delivery progress">${steps}</ol>
      </div>`;
  }

  // The open card: who is carrying it, a way to message or call them, and the live distance.
  function activeCardCourier(job) {
    const hasCourier = job.status === 'ACCEPTED' || job.status === 'COLLECTED';
    const name = hasCourier ? counterparty(job).name : 'Finding a courier…';
    const state_ = job.status === 'OPEN' ? 'Waiting for a courier to accept' : (job.status === 'ACCEPTED' ? (job.started_at ? 'Heading to collect your parcel' : "Accepted — hasn't set off yet") : 'On the way with your parcel');
    const live = liveCaption(job);
    return `
      <div class="ac-courier">
        ${avatarHtml(hasCourier ? name : '')}
        <div class="ac-who">
          <div class="ac-role">Courier</div>
          <div class="ac-name">${escapeHtml(name)}</div>
          <div class="ac-state">${escapeHtml(state_)}</div>
        </div>
        <div class="ac-fare"><strong>${money(job.price_gbp)}</strong><span>${miles(job.distance_km)}</span></div>
      </div>
      <div class="ac-msg">
        <button type="button" class="ac-msg-input" data-action="openMessages" data-arg="${job.id}" ${hasCourier ? '' : 'disabled'}>Send a message</button>
        <button type="button" class="ac-call" data-action="startCall" data-arg="${job.id}" aria-label="Call your courier" title="Call your courier" ${hasCourier ? '' : 'disabled'}>${ICONS.phone}</button>
      </div>
      <div class="ac-live" data-live-for="${job.id}">${escapeHtml(live)}</div>
      ${job.delivery_pin ? `<div class="ac-pin"><span>Delivery PIN</span><strong>${escapeHtml(job.delivery_pin)}</strong><em>Give this to whoever is receiving the parcel. The courier needs it to finish the delivery.</em></div>` : ''}`;
  }

  // Times and positions change between polls without anything else changing, so the
  // open and closed cards refresh their text in place rather than redrawing the screen.
  function refreshActiveCards() {
    if (!root) return;
    root.querySelectorAll('[data-eta-for]').forEach((el) => {
      const job = state.jobs.find((j) => j.id === Number(el.dataset.etaFor));
      if (job) el.textContent = arrivalLine(job);
    });
    root.querySelectorAll('[data-live-for]').forEach((el) => {
      const job = state.jobs.find((j) => j.id === Number(el.dataset.liveFor));
      if (job) el.textContent = liveCaption(job);
    });
  }

  // Payment and refund state as small chips on the customer's order card.
  function paymentChips(job) {
    if (!job.payment_status) return '';
    const chips = [];
    const p = job.payment_status;
    if (p === 'UNPAID') chips.push(job.status === 'CANCELLED' ? '' : '<span class="pay-chip pay-unpaid">Awaiting payment</span>');
    else if (p === 'PAID') chips.push('<span class="pay-chip pay-paid">Paid</span>');
    else if (p === 'PARTIALLY_REFUNDED') chips.push(`<span class="pay-chip pay-refund">Part refunded ${money(job.refunded_gbp)}</span>`);
    else if (p === 'REFUNDED') chips.push(`<span class="pay-chip pay-refund">Refunded ${money(job.refunded_gbp)}</span>`);
    else if (p === 'VOID') chips.push('<span class="pay-chip pay-void">Not charged</span>');
    const r = job.refund_status;
    if (r === 'PENDING') chips.push('<span class="pay-chip pay-unpaid">Refund under review</span>');
    else if (r === 'DENIED') chips.push('<span class="pay-chip pay-void">Refund declined</span>');
    return chips.filter(Boolean).length ? `<div class="pay-chips">${chips.join('')}</div>` : '';
  }

  // The courier's own view of whether their position is being shared.
  function gpsChip(job) {
    if (!state.user || state.user.role !== 'courier' || testMode) return '';
    const g = state.gps;
    let text;
    let cls = 'gps-off';
    if (g.status === 'consent') text = 'Location sharing is off. <button type="button" class="link-btn" data-action="enableLocation">Agree and turn on</button>';
    else if (g.status === 'denied') text = "Your browser is blocking location. Allow it in the site settings so the customer can follow the delivery.";
    else if (g.status === 'sharing' && g.sentAt) { text = `Sharing your location · sent ${Math.max(0, Math.round((Date.now() - g.sentAt) / 1000))}s ago`; cls = 'gps-on'; }
    else if (g.status === 'error') text = "Couldn't get a location fix. Check your GPS or signal.";
    else text = 'Starting location sharing…';
    return `<div class="gps-chip ${cls}" role="status">${text}<div class="gps-note">Keep this page open on screen — location can't be shared once the phone locks.</div></div>`;
  }

  // What the signed-in person can do with an order. A customer may cancel their own job
  // only while it is still OPEN; once a courier has accepted it the cancel button is
  // locked (cancelling then incurs a fee, so it goes through support); after collection it
  // is "Report a problem". A courier may hand a job back until they've collected the parcel
  // (it returns to the marketplace). Customers' order actions live in Help -> Orders
  // (panels.js asks for these through the bridge); couriers keep theirs on the job card.
  function orderCaps(job) {
    const isCourier = !!state.user && state.user.role === 'courier';
    return {
      canCancel: isCourier ? (job.courier_id === state.user.id && job.status === 'ACCEPTED') : job.status === 'OPEN',
      cancelLocked: !isCourier && job.status === 'ACCEPTED',
      // "Remove" only works on an order with no money history (the server refuses otherwise).
      canRemove: !isCourier && job.status === 'CANCELLED' && (job.payment_status === 'VOID' || job.payment_status === 'UNPAID') && !job.refund_status,
      canRefund: !isCourier && job.status !== 'OPEN' && !!job.payment_status && !['VOID', 'REFUNDED'].includes(job.payment_status)
        && job.refund_status !== 'PENDING' && ['ACCEPTED', 'COLLECTED', 'DELIVERED', 'CANCELLED'].includes(job.status)
        && Number(job.price_gbp) - Number(job.refunded_gbp || 0) > 0.005,
      canShare: !isCourier && ['OPEN', 'ACCEPTED', 'COLLECTED'].includes(job.status) && !!job.tracking_token,
      canPay: !isCourier && job.payment_status === 'UNPAID' && job.status !== 'CANCELLED',
    };
  }

  // ---- Past orders: search what is already loaded, so people can find an old order themselves ----
  const pastBase = () => state.jobs.filter((j) => j.status === 'DELIVERED' || j.status === 'CANCELLED');

  // Everything worth searching on: order number, addresses and postcodes, names, status, size, price, date.
  function pastSearchText(job) {
    const d = new Date(job.delivered_at || job.cancelled_at || job.created_at);
    const date = isNaN(d) ? '' : `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} ${d.toLocaleDateString('en-GB', { month: 'short' })}`;
    const parts = [
      job.id, `vnd-${job.id}`, job.pickup_address, job.dropoff_address, job.pickup_contact_name, job.dropoff_contact_name,
      job.courier_name, job.customer_name, job.status === 'CANCELLED' ? 'cancelled' : 'delivered', job.package_size, job.price_gbp, date,
    ];
    const text = parts.filter((p) => p !== null && p !== undefined && p !== '').join(' ').toLowerCase();
    return `${text} ${text.replace(/[\s,]+/g, '')}`; // the second copy lets "bl11aa" find "BL1 1AA"
  }
  function matchesPastSearch(job, query) {
    const tokens = String(query || '').toLowerCase().replace(/#/g, ' ').split(/\s+/).filter(Boolean);
    if (!tokens.length) return true;
    const hay = pastSearchText(job);
    return tokens.every((t) => hay.includes(t));
  }

  function renderPastResults(all) {
    const q = state.pastQuery.trim();
    const items = q ? all.filter((j) => matchesPastSearch(j, q)) : all;
    if (!items.length) {
      return `<div class="empty-placeholder">No orders match “${escapeHtml(q)}”.<br>Try a street, town, postcode, name or order number.<br><button type="button" class="link-btn" data-action="openHelp">Still can't find it? Ask Help</button></div>`;
    }
    return (q ? `<div class="past-count">${items.length} of ${all.length} order${all.length === 1 ? '' : 's'}</div>` : '') + items.map(renderTrackingCard).join('');
  }

  function renderPastPage(section) {
    const all = pastBase();
    if (!all.length) return `<div class="empty-placeholder">${escapeHtml(section.empty)}</div>`;
    return `
      <div class="past-search">
        <span class="past-search-ico" aria-hidden="true">${ICONS.search}</span>
        <input type="search" class="past-search-input" data-bind="pastQuery" value="${escapeHtml(state.pastQuery)}" placeholder="Place, name or order number" aria-label="Search your orders" autocomplete="off" enterkeyhint="search" />
        <button type="button" class="past-search-clear" data-action="clearPastSearch" aria-label="Clear search" ${state.pastQuery ? '' : 'hidden'}>&times;</button>
      </div>
      <div class="past-results" id="past-results">${renderPastResults(all)}</div>`;
  }

  // Typing only redraws the results, not the whole page, so the map and the keyboard stay put.
  function refreshPastResults() {
    const box = root.querySelector('#past-results');
    if (!box) return;
    box.innerHTML = renderPastResults(pastBase());
    const clear = root.querySelector('.past-search-clear');
    if (clear) clear.hidden = !state.pastQuery;
  }

  // One line of the Past orders / Past deliveries list: what went where, when, what it cost.
  // Customers also get a Reorder button; tapping the row opens the full details underneath.
  function pastRowHead(job, isCourier) {
    const cancelled = job.status === 'CANCELLED';
    const at = new Date((cancelled ? job.cancelled_at : job.delivered_at) || job.created_at);
    const validDate = !isNaN(at);
    const sameYear = validDate && at.getFullYear() === new Date().getFullYear();
    const day = validDate ? at.toLocaleDateString([], sameYear ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' }) : '';
    const time = validDate ? at.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const size = PARCEL_SIZES[job.package_size];
    const facts = [money(job.price_gbp)];
    if (isCourier) facts.push(miles(job.distance_km));
    else if (size) facts.push(size.title);
    if (Number(job.refunded_gbp) > 0) facts.push(`${money(job.refunded_gbp)} refunded`);
    return `
      <div class="past-head">
        <span class="past-thumb ${cancelled ? 'is-cancelled' : ''}" aria-hidden="true">${ICONS.box}</span>
        <span class="past-text">
          <span class="past-title">${escapeHtml(shortCity(job.pickup_address))} <span class="arrow">→</span> ${escapeHtml(shortCity(job.dropoff_address))}</span>
          ${validDate ? `<span class="past-sub">${escapeHtml(day)} · ${escapeHtml(time)}</span>` : ''}
          <span class="past-sub">${cancelled ? '<b class="past-cancelled">Cancelled</b> · ' : ''}${facts.map((f) => escapeHtml(f)).join(' · ')}</span>
        </span>
        ${isCourier ? '' : `<button type="button" class="past-reorder" data-action="reorder" data-arg="${job.id}">Reorder</button>`}
      </div>`;
  }

  function renderTrackingCard(job) {
    const isSelected = state.selectedJobId === job.id;
    const isExpanded = state.expanded.has(job.id);
    const pickupCity = shortCity(job.pickup_address);
    const dropoffCity = shortCity(job.dropoff_address);

    const statusMap = {
      OPEN: { text: 'Listed', pillClass: 'status-OPEN' },
      ACCEPTED: { text: 'Courier Assigned', pillClass: 'status-ACCEPTED' },
      COLLECTED: { text: 'On the way', pillClass: 'status-COLLECTED' },
      DELIVERED: { text: 'Received', pillClass: 'status-DELIVERED' },
      CANCELLED: { text: 'Cancelled', pillClass: 'status-CANCELLED' },
    };
    const s = statusMap[job.status] || { text: job.status, pillClass: 'status-OPEN' };
    const isCourier = state.user && state.user.role === 'courier';
    const { canCancel, cancelLocked, canRemove, canRefund, canShare } = orderCaps(job);
    const isPast = (job.status === 'DELIVERED' || job.status === 'CANCELLED');
    const moneyChips = isCourier ? '' : paymentChips(job);
    // Only worth showing until the parcel has been collected. A scheduled job
    // gets a chip on the collapsed card too, so it stands out in a list.
    const pickup = pickupInfo(job);
    const awaitingPickup = job.status === 'OPEN' || job.status === 'ACCEPTED';
    const pickupChip = pickup && awaitingPickup && !pickup.asap
      ? `<div class="pkg-pickup-chip">${ICONS.clock}<span>Pickup ${escapeHtml(pickup.text)}</span></div>`
      : '';

    // The customer's active-deliveries page uses the stepper card, closed until tapped.
    const ac = !isCourier && state.customerTab === 'active' && ['OPEN', 'ACCEPTED', 'COLLECTED'].includes(job.status);
    // Past orders / past deliveries are a plain activity list; tapping a row opens the details.
    const past = isPast && (isCourier ? state.courierTab === 'past' : state.customerTab === 'received');
    return `
      <div class="pkg-card ${ac ? 'ac-card' : ''} ${past ? 'past-card' : ''} ${isExpanded ? 'is-open' : ''} ${isSelected || isExpanded ? 'is-active' : ''}" ${ac ? '' : 'data-action="selectJob"'} data-arg="${job.id}">
        ${ac ? activeCardHead(job, isExpanded) : past ? pastRowHead(job, isCourier) : `
        <div class="pkg-card-header">
          <div>
            <div class="pkg-route-title">
              ${escapeHtml(pickupCity)} <span class="arrow">→</span> ${escapeHtml(dropoffCity)}
            </div>
            <div class="pkg-order-id">Order #${job.id} · ${miles(job.distance_km)} · ${money(job.price_gbp)}</div>
          </div>
          <div class="status-pill ${s.pillClass}">${s.text}</div>
        </div>
        ${moneyChips}
        ${pickupChip}`}

        ${isExpanded ? `
          ${ac ? activeCardCourier(job) + moneyChips : (past ? moneyChips : '')}
          ${isCourier ? courierNotes(job) : ''}
          ${ac ? '' : `
          <div class="pkg-stepper">
            <div class="step-item">
              <div class="step-indicator">
                <div class="step-dot-solid"></div>
                <div class="step-line-dashed"></div>
              </div>
              <div class="step-content">
                <div class="step-label">From (Pickup)</div>
                <div class="step-address">${escapeHtml(job.pickup_address)}</div>
                ${!job.masked ? stopDetails(job, 'pickup') : ''}
                ${pickup && awaitingPickup ? `<div class="step-when">${ICONS.clock}<span>Pickup: ${escapeHtml(pickup.text)}</span></div>` : ''}
              </div>
            </div>

            <div class="step-item">
              <div class="step-indicator">
                <div class="step-dot-ring"></div>
              </div>
              <div class="step-content">
                <div class="step-label">To (Dropoff)</div>
                <div class="step-address">${escapeHtml(job.dropoff_address)}</div>
                ${!job.masked ? stopDetails(job, 'dropoff') : ''}
              </div>
            </div>
          </div>
          `}

          ${ac ? '' : `
          <div class="courier-card-mini">
            <div class="courier-info-left">
              ${avatarHtml(counterparty(job).name)}
              <div>
                <div class="courier-name">${escapeHtml(counterparty(job).name)}</div>
                <div class="courier-role">${escapeHtml(counterparty(job).role)}</div>
              </div>
            </div>
            <div class="courier-actions-right">
              ${job.status === 'ACCEPTED' || job.status === 'COLLECTED' ? `<button class="action-circle-btn" data-action="startCall" data-arg="${job.id}" title="Call ${isCourier ? 'customer' : 'courier'}" aria-label="Call ${isCourier ? 'customer' : 'courier'}">${ICONS.phone}</button>` : ''}
              <button class="action-circle-btn is-chat" data-action="openMessages" data-arg="${job.id}" title="Message ${isCourier ? 'customer' : 'courier'}" aria-label="Message ${isCourier ? 'customer' : 'courier'}">${ICONS.chat}</button>
            </div>
          </div>
          `}

          ${job.pickup_photo_url || job.delivery_photo_url ? `
            <div style="margin: 10px 0;">
              <div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px;">Proof Photos</div>
              <div style="display:flex;gap:10px;">
                ${job.pickup_photo_url ? `
                  <button class="proof-thumb-btn" data-action="openLightbox" data-arg="${escapeHtml(job.pickup_photo_url)}" data-field="Pickup Proof photo">
                    <img class="proof-thumb" src="${escapeHtml(job.pickup_photo_url)}" alt="Pickup proof" title="Click to expand pickup proof" />
                  </button>` : ''}
                ${job.delivery_photo_url ? `
                  <button class="proof-thumb-btn" data-action="openLightbox" data-arg="${escapeHtml(job.delivery_photo_url)}" data-field="Delivery Dropoff Proof photo">
                    <img class="proof-thumb" src="${escapeHtml(job.delivery_photo_url)}" alt="Delivery proof" title="Click to expand delivery proof" />
                  </button>` : ''}
              </div>
            </div>` : ''}

          ${isCourier && job.status === 'OPEN' ? `
            <button class="btn-details" data-action="acceptJob" data-arg="${job.id}">
              Accept delivery (${money(job.price_gbp)})
            </button>` : ''}

          ${isCourier && job.status === 'ACCEPTED' && !job.started_at ? `
            <div style="margin-top:12px;background:rgba(var(--glass-rgb),0.7);padding:12px;border-radius:16px;border:1px solid var(--border-glass-subtle);">
              <div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:6px;">Step 1: Start order</div>
              <p style="font-size:12.5px;line-height:1.45;color:var(--text-2);margin:0 0 10px;">Tap Start when you set off for the pickup. The customer can follow you to the collection point from then on. Nothing is shared before that, so accepting a job at home shows nothing.</p>
              <button class="btn-details" data-action="startOrder" data-arg="${job.id}">Start order</button>
            </div>` : ''}

          ${isCourier && ((job.status === 'ACCEPTED' && job.started_at) || job.status === 'COLLECTED') ? `
            <div style="margin-top:12px;background:rgba(var(--glass-rgb),0.7);padding:12px;border-radius:16px;border:1px solid var(--border-glass-subtle);">
              <div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:6px;">
                ${job.status === 'ACCEPTED' ? 'Step 2: Confirm pickup' : 'Step 3: Complete dropoff'}
              </div>
              ${job.status === 'COLLECTED' && job.pin_required ? `<label class="pin-field"><span>Delivery PIN</span><input class="modern-input" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" data-bind="deliveryPins.${job.id}" value="${escapeHtml(state.deliveryPins[job.id] || '')}" placeholder="4-digit PIN from the recipient" ${state.uploadBusy[job.id] ? 'disabled' : ''} /></label>` : ''}
              <input type="file" accept="image/*" data-photo-for="${job.id}" style="font-size:12px;margin-bottom:8px;width:100%;" ${state.uploadBusy[job.id] ? 'disabled' : ''} aria-label="Choose a photo" />
              ${state.pendingPhoto[job.id] ? `<div class="upload-chosen">✓ ${escapeHtml(state.pendingPhoto[job.id].name || 'photo')} ready to send</div>` : ''}
              ${state.uploadError[job.id] ? `<div class="form-error" role="alert">${escapeHtml(state.uploadError[job.id])}</div>` : ''}
              <button class="btn-details" data-action="${job.status === 'ACCEPTED' ? 'uploadPickup' : 'uploadDeliver'}" data-arg="${job.id}" ${state.uploadBusy[job.id] ? 'disabled' : ''}>
                ${state.uploadBusy[job.id] ? 'Uploading…' : (job.status === 'ACCEPTED' ? '📷 Upload pickup proof & Mark on the way' : '✅ Upload delivery proof & Complete')}
              </button>
              ${gpsChip(job)}
            </div>` : ''}

          ${isCourier ? `
          ${cancelLocked ? `
            <div class="cancel-lock-note" role="note">
              <strong>Cancelling now will incur a fee</strong>, so the button is locked.
              <button type="button" class="link-btn" data-action="openHelp" data-arg="${job.id}" data-field="cancel">Contact support to cancel</button>
            </div>` : ''}
          <div class="pkg-actions-row pkg-actions-wrap">
            ${cancelLocked ? `<button type="button" class="btn-cancel-pill is-locked" disabled aria-disabled="true" title="Cancelling now incurs a fee">🔒 Cancel order</button>` : ''}
            ${canCancel ? `<button class="btn-cancel-pill" data-action="cancelJob" data-arg="${job.id}">${isCourier ? 'Hand back job' : 'Cancel order'}</button>` : ''}
            ${canRemove ? `<button class="btn-remove-pill" data-action="deleteJob" data-arg="${job.id}">Remove</button>` : ''}
            ${job.payment_status === 'UNPAID' && !isCourier && job.status !== 'CANCELLED' ? `<button class="btn-mini" data-action="payInfo" data-arg="${job.id}">How to pay</button>` : ''}
            ${canShare ? `<button class="btn-mini" data-action="shareLink" data-arg="${job.id}">Share tracking link</button>` : ''}
            ${canRefund ? `<button class="btn-mini" data-action="requestRefund" data-arg="${job.id}">Request refund</button>` : ''}
            ${job.status !== 'OPEN' ? `<button class="btn-mini" data-action="openHelp" data-arg="${job.id}">${job.status === 'COLLECTED' ? 'Report a problem' : 'Get help'}</button>` : ''}
            <button class="btn-details" style="flex:1;margin-top:0;" data-action="toggleExpand" data-arg="${job.id}">Close</button>
          </div>
          ` : ''}
        ` : ''}
      </div>`;
  }

  // ---- Messages: an inbox of orders, then one order's chat ----
  const CHAT_STATUS_CUSTOMER = { COLLECTED: 'On the way', ACCEPTED: 'Courier assigned', OPEN: 'Waiting for a courier', DELIVERED: 'Delivered' };
  const CHAT_STATUS_COURIER = { COLLECTED: 'On the way', ACCEPTED: 'To collect', DELIVERED: 'Delivered' };

  // Orders you can talk about: the ones under way first, then the latest delivered ones.
  // Cancelled orders are left out because their chat is closed.
  function chatOrders() {
    const rank = { COLLECTED: 0, ACCEPTED: 1, OPEN: 2, DELIVERED: 3 };
    const at = (j) => new Date(j.delivered_at || j.created_at || 0).getTime() || 0;
    const list = state.jobs.filter((j) => rank[j.status] !== undefined);
    const live = list.filter((j) => j.status !== 'DELIVERED').sort((a, b) => rank[a.status] - rank[b.status] || b.id - a.id);
    const done = list.filter((j) => j.status === 'DELIVERED').sort((a, b) => at(b) - at(a)).slice(0, 15);
    return { live, done };
  }

  function renderChatRow(job) {
    const isCourier = state.user && state.user.role === 'courier';
    const status = (isCourier ? CHAT_STATUS_COURIER : CHAT_STATUS_CUSTOMER)[job.status] || job.status;
    const waiting = job.status === 'OPEN'; // nobody to talk to until a courier accepts
    const who = counterparty(job);
    const inner = `
      ${waiting ? `<span class="inbox-ico" aria-hidden="true">${ICONS.clock}</span>` : avatarHtml(who.name)}
      <span class="inbox-text">
        <span class="inbox-name">${escapeHtml(waiting ? 'Waiting for a courier' : who.name)}</span>
        <span class="inbox-sub">${escapeHtml(shortCity(job.pickup_address))} → ${escapeHtml(shortCity(job.dropoff_address))}</span>
        <span class="inbox-sub">Order #${job.id} · ${escapeHtml(status)}</span>
      </span>
      ${waiting ? '' : `<span class="inbox-go" aria-hidden="true">${ICONS.chevronRight}</span>`}`;
    return waiting
      ? `<div class="inbox-row is-off" aria-disabled="true">${inner}</div>`
      : `<button type="button" class="inbox-row" data-action="openMessages" data-arg="${job.id}">${inner}</button>`;
  }

  function renderInbox() {
    const { live, done } = chatOrders();
    return `
      <div class="modal-overlay" data-action="closeModal" data-backdrop>
        <div class="glass-modal">
          <div class="modal-header">
            <div>
              <div class="modal-title">Messages</div>
              <div class="modal-sub">Choose an order to chat about it</div>
            </div>
            <button class="icon-btn-round" data-action="closeModal" aria-label="Close">${ICONS.close}</button>
          </div>
          <div class="inbox">
            ${live.length || done.length ? '' : '<div class="inbox-empty">No conversations yet. Once a courier accepts your order you can message them here.</div>'}
            ${live.length ? `<div class="inbox-h">Active</div>${live.map(renderChatRow).join('')}` : ''}
            ${done.length ? `<div class="inbox-h">Earlier</div>${done.map(renderChatRow).join('')}` : ''}
          </div>
        </div>
      </div>`;
  }

  function renderChat(jId) {
    const job = state.jobs.find((j) => j.id === jId) || null;
    const who = job ? counterparty(job) : null;
    const messages = state.jobMessages[jId] || (testMode ? mockMessages[jId] : null) || [];
    const closed = !!job && job.status === 'CANCELLED';
    const emptyNote = job && job.courier_id
      ? `No messages yet. Say hello to ${who.name}.`
      : 'No messages yet. Say hello — the courier sees this once they accept the order.';
    return `
      <div class="modal-overlay" data-action="closeModal" data-backdrop>
        <div class="glass-modal">
          <div class="modal-header">
            <div class="chat-head">
              <button type="button" class="rv-back chat-back" data-action="openMessages" aria-label="Back to all messages">${ICONS.arrowLeft}</button>
              <div class="chat-head-text">
                <div class="modal-title">${escapeHtml(who ? who.name : `Order #${jId}`)}</div>
                <div class="modal-sub">Order #${jId}${job ? ` · ${escapeHtml(shortCity(job.pickup_address))} → ${escapeHtml(shortCity(job.dropoff_address))}` : ''}</div>
              </div>
            </div>
            <button class="icon-btn-round" data-action="closeModal" aria-label="Close">${ICONS.close}</button>
          </div>

          <div class="chat-bubble-container">
            ${messages.length ? '' : `<div style="font-size:12.5px;color:var(--muted);text-align:center;padding:24px 12px;">${escapeHtml(emptyNote)}</div>`}
            ${messages.map((m) => {
              const isMe = (state.user && m.sender_id === state.user.id) || m.sender_name === 'You' || (state.user && m.sender_role === state.user.role);
              const timeStr = m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
              return `
                <div class="chat-bubble ${isMe ? 'out' : 'in'}">
                  <strong style="font-size:11px;">${escapeHtml(m.sender_name || (isMe ? 'You' : 'Courier'))}</strong>
                  <div style="margin-top:2px;">${escapeHtml(m.content || m.text || '')}</div>
                  <div style="font-size:9.5px;opacity:0.75;margin-top:4px;text-align:right">${timeStr}</div>
                </div>`;
            }).join('')}
          </div>

          ${closed ? '<div class="chat-closed">This order was cancelled, so the chat is closed. Use Help if you need anything.</div>' : `
          <div class="chat-input-row">
            <input class="modern-input" data-bind="chatDraft" value="${escapeHtml(state.chatDraft)}" placeholder="Type a message…" maxlength="2000" aria-label="Message" />
            <button class="btn-primary-pill" style="width:auto;padding:10px 18px;" data-action="sendChatMessage">Send</button>
          </div>`}
        </div>
      </div>`;
  }

  function renderModals() {
    if (!state.activeModal) return '';

    if (state.activeModal === 'messages') {
      return state.chatJobId ? renderChat(state.chatJobId) : renderInbox();
    }

    if (state.activeModal === 'settings') {
      return `
        <div class="modal-overlay" data-action="closeModal" data-backdrop>
          <div class="glass-modal">
            <div class="modal-header">
              <div class="modal-title">Account & Settings</div>
              <button class="icon-btn-round" data-action="closeModal">${ICONS.close}</button>
            </div>

            <div class="courier-card-mini" style="margin:0;">
              <div class="courier-info-left">
                ${avatarHtml(state.user ? state.user.full_name : '')}
                <div>
                  <div class="courier-name">${escapeHtml(state.user ? state.user.full_name : 'Alex Morgan')}</div>
                  <div class="courier-role">${escapeHtml(state.user ? state.user.email : 'user@example.com')} · <span class="status-pill status-OPEN">${state.user ? state.user.role : 'customer'}</span></div>
                </div>
              </div>
            </div>

            ${testMode ? `
            <div style="font-size:12.5px;color:var(--muted);line-height:1.5;">
              Test mode: switch roles to see the marketplace from either side.
            </div>` : ''}

            <div style="display:flex;gap:8px;">
              ${testMode ? `
              <button class="btn-details" style="background:#4f46e5;color:#fff;" data-action="skipLogin" data-arg="${state.user && state.user.role === 'customer' ? 'courier' : 'customer'}">
                Switch to ${state.user && state.user.role === 'customer' ? 'Courier' : 'Customer'} Mode
              </button>` : ''}
              <button class="btn-cancel-pill" data-action="logout">Log out</button>
            </div>
          </div>
        </div>`;
    }

    if (state.activeModal === 'lightbox') {
      return `
        <div class="modal-overlay" data-action="closeModal" data-backdrop>
          <div class="glass-modal lightbox-card">
            <div class="modal-header">
              <div class="modal-title">${escapeHtml(state.lightboxTitle || 'Proof of Delivery Photo')}</div>
              <button class="icon-btn-round" data-action="closeModal">${ICONS.close}</button>
            </div>
            <div class="lightbox-img-wrap">
              <img class="lightbox-full-img" src="${escapeHtml(state.lightboxUrl)}" alt="Full resolution proof" />
            </div>
          </div>
        </div>`;
    }

    return '';
  }

  // Banners that need attention before anything else: a suspended account, an
  // out-of-date agreement, a list that couldn't load.
  function renderNotices() {
    const u = state.user || {};
    const out = [];
    if (u.is_suspended) {
      out.push(`<div class="notice notice-danger" role="alert"><strong>Your account is suspended.</strong> ${escapeHtml(u.suspended_reason || '')} You can't post or accept jobs. <button type="button" class="link-btn" data-action="openHelp">Contact support</button></div>`);
    }
    if (!testMode && u.terms_version_current && u.terms_version !== u.terms_version_current) {
      out.push(`<div class="notice" role="status">Please confirm you agree to our current <a href="/terms.html" target="_blank" rel="noopener">Terms</a> and <a href="/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>. <button type="button" class="link-btn" data-action="acceptTermsNow" ${state.termsBusy ? 'disabled' : ''}>I agree</button></div>`);
    }
    if (!testMode && u.email_verification_required && !u.email_verified) {
      out.push(`<div class="notice" role="status">Please confirm your email address. We sent a link to <strong>${escapeHtml(u.email)}</strong>. <strong>Can't see it? Check your junk or spam folder.</strong> You need to confirm it before you can ${u.role === 'courier' ? 'accept' : 'post'} an order. <button type="button" class="link-btn" data-action="resendVerification">Send it again</button></div>`);
    }
    if (!testMode && u.role === 'courier' && !u.location_consent_at) {
      out.push('<div class="notice" role="status">Location sharing isn\'t agreed yet, so customers can\'t follow your deliveries. <button type="button" class="link-btn" data-action="enableLocation">Agree and turn on</button></div>');
    }
    if (state.listError) {
      out.push(`<div class="notice notice-danger" role="alert">${escapeHtml(state.listError)}</div>`);
    }
    return out.join('');
  }

  // Whether the map is showing beside the list. Whatever the person chose last wins; until they have
  // chosen, a courier gets it open (it is their main view) and a customer gets it closed.
  function mapOpen() {
    if (state.mapSplit !== null) return state.mapSplit;
    return !!(state.user && state.user.role === 'courier');
  }

  // ---- The page over the map: how far up it sits ----
  // Its bottom edge always stops above the floating pill (CSS, --pill-space). Its top edge is
  // --sheet-top: the person's own choice once they have dragged the handle, otherwise half the screen,
  // or higher when the page needs more room to sit clear of the pill (never past a fifth of the screen, which
  // is what the map's buttons need).
  function sheetLimits(ws) {
    const H = ws.clientHeight;
    const min = Math.min(Math.max(150, H * 0.2), H * 0.4); // room for the map's zoom buttons
    const max = Math.max(min, H - 230);                    // enough of the page left to read its title and grab the handle
    return { H, min, max };
  }
  function applySheet() {
    const ws = root.querySelector('.app-workspace');
    if (!ws || !ws.classList.contains('map-split')) return;
    const { H, min, max } = sheetLimits(ws);
    let frac = state.sheetTop;
    if (frac == null) {
      const panel = ws.querySelector('.tracking-panel');
      const scroller = ws.querySelector('.panel-scroll-content');
      const sig = lastViewKey + '|' + (scroller ? scroller.children.length : 0);
      if (panel && scroller && sheetAuto.sig !== sig) {
        const needed = panel.clientHeight - scroller.clientHeight + scroller.scrollHeight; // the height that shows it all (never below what it has now)
        sheetAuto = { sig, frac: Math.min(max, Math.max(min, H - needed)) / H };
      }
      frac = sheetAuto.frac;
    }
    ws.style.setProperty('--sheet-top', (Math.min(max, Math.max(min, frac * H)) / H * 100).toFixed(2) + '%');
  }
  function saveSheetTop(ws, top, H) {
    state.sheetTop = top / H;
    try { localStorage.setItem('vendaru_sheet_top', state.sheetTop.toFixed(4)); } catch (e) { /* not remembered, still works */ }
    ws.style.setProperty('--sheet-top', (state.sheetTop * 100).toFixed(2) + '%');
    if (workspaceMap) workspaceMap.invalidateSize({ animate: false });
  }
  function sheetPointerDown(e) {
    const handle = e.target.closest && e.target.closest('.sheet-handle');
    if (!handle || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const ws = root.querySelector('.app-workspace');
    const panel = ws && ws.querySelector('.tracking-panel');
    if (!panel) return;
    e.preventDefault();
    const { H, min, max } = sheetLimits(ws);
    sheetDrag = { ws, id: e.pointerId, startY: e.clientY, startTop: panel.getBoundingClientRect().top - ws.getBoundingClientRect().top, H, min, max, top: null, raf: 0 };
    try { handle.setPointerCapture(e.pointerId); } catch (err) { /* the moves still arrive without it */ }
    ws.classList.add('is-dragging-sheet');
  }
  function sheetPointerMove(e) {
    const d = sheetDrag;
    if (!d || e.pointerId !== d.id) return;
    d.top = Math.min(d.max, Math.max(d.min, d.startTop + (e.clientY - d.startY)));
    d.ws.style.setProperty('--sheet-top', d.top + 'px');
    if (!d.raf) d.raf = requestAnimationFrame(() => { d.raf = 0; if (workspaceMap) workspaceMap.invalidateSize({ animate: false }); });
  }
  function sheetPointerEnd(e) {
    const d = sheetDrag;
    if (!d || e.pointerId !== d.id) return;
    sheetDrag = null;
    d.ws.classList.remove('is-dragging-sheet');
    if (d.top !== null) saveSheetTop(d.ws, d.top, d.H);
    if (sheetRenderQueued) { sheetRenderQueued = false; render(); }
  }
  function sheetKey(e) {
    const ws = root.querySelector('.app-workspace');
    const panel = ws && ws.querySelector('.tracking-panel');
    if (!panel || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return false;
    e.preventDefault();
    const { H, min, max } = sheetLimits(ws);
    const now = panel.getBoundingClientRect().top - ws.getBoundingClientRect().top;
    saveSheetTop(ws, Math.min(max, Math.max(min, now + (e.key === 'ArrowUp' ? -1 : 1) * H * 0.06)), H);
    return true;
  }
  function sheetReset() {
    state.sheetTop = null;
    sheetAuto.sig = null;
    try { localStorage.removeItem('vendaru_sheet_top'); } catch (e) { /* fine */ }
    render();
  }

  // Each section has its own heading and its own empty message: active deliveries and
  // past orders / past deliveries are separate places, not one list under one title.
  function sectionInfo(isCustomer) {
    if (isCustomer) {
      return {
        compose: { title: 'Send or receive', sub: 'Live UK courier marketplace', empty: '' },
        active: { title: 'Active deliveries', sub: 'Parcels waiting for a courier or on their way', empty: 'No active deliveries right now. Send a parcel and it will show up here.' },
        received: { title: 'Past orders', sub: 'Delivered and cancelled orders', empty: 'No past orders yet. Finished and cancelled orders are kept here.' },
      }[state.customerTab];
    }
    return {
      available: { title: 'Your job offers', sub: 'Jobs offered to you', empty: "You're all caught up. New offers appear here as soon as they come in." },
      mine: { title: 'My deliveries', sub: 'Jobs you have accepted and are still carrying', empty: 'You have no active deliveries. Accept a job from Your job offers.' },
      past: { title: 'Past deliveries', sub: 'Delivered and cancelled jobs', empty: 'No past deliveries yet. Finished jobs are kept here.' },
    }[state.courierTab];
  }

  function renderDashboard() {
    const isCustomer = state.user.role === 'customer';
    const section = sectionInfo(isCustomer) || { title: 'Vendaru', sub: '', empty: 'Nothing here.' };
    const activeJob = getActiveJob();

    let tabItems = [];
    if (isCustomer) {
      if (state.customerTab === 'active') {
        tabItems = state.jobs.filter((j) => j.status === 'OPEN' || j.status === 'ACCEPTED' || j.status === 'COLLECTED');
      } else if (state.customerTab === 'received') {
        tabItems = state.jobs.filter((j) => j.status === 'DELIVERED' || j.status === 'CANCELLED');
      }
    } else {
      if (state.courierTab === 'available') {
        tabItems = state.available.filter((j) => j.status === 'OPEN');
      } else if (state.courierTab === 'mine') {
        tabItems = state.jobs.filter((j) => j.status === 'ACCEPTED' || j.status === 'COLLECTED');
      } else if (state.courierTab === 'past') {
        tabItems = state.jobs.filter((j) => j.status === 'DELIVERED' || j.status === 'CANCELLED');
      }
    }

    const isPastPage = isCustomer ? state.customerTab === 'received' : state.courierTab === 'past';
    const courierCompleted = state.jobs.filter((j) => j.status === 'DELIVERED');
    const totalEarnings = courierCompleted.reduce((sum, j) => sum + Number(j.price_gbp || 0), 0);

    return `
      ${renderIconSidebar()}
      <main class="app-workspace${mapOpen() ? ' map-split' : ''}">
        <div class="fullscreen-map-layer" id="workspace-map"></div>

        <section class="tracking-panel">
          ${mapOpen() ? '<div class="sheet-handle" role="separator" aria-orientation="horizontal" tabindex="0" aria-label="Drag up or down to show more or less of this page" title="Drag to show more or less. Double-click to reset."><span></span></div>' : ''}
          <div class="panel-header">
            <div class="panel-title-wrap">
              <h1 class="panel-title">${section.title}</h1>
              <span class="panel-sub">${section.sub}</span>
            </div>
            <button class="icon-btn-round header-settings" data-action="openSettings" title="Account & settings" aria-label="Account and settings">${ICONS.settings}</button>
            <button class="icon-btn-round map-toggle ${mapOpen() ? 'is-on' : ''}" data-action="toggleMapSplit" aria-pressed="${mapOpen() ? 'true' : 'false'}" aria-label="${mapOpen() ? 'Hide the map' : 'Show the map'}" title="${mapOpen() ? 'Hide the map' : 'Show the map (half screen)'}">${ICONS.map}</button>
          </div>

          ${renderNotices()}

          ${!isCustomer ? `
            <div class="courier-metrics-bar">
              <div class="metric-card">
                <span class="metric-val green">${money(totalEarnings)}</span>
                <span class="metric-lbl">Earned</span>
              </div>
              <div class="metric-card">
                <span class="metric-val indigo">${courierCompleted.length}</span>
                <span class="metric-lbl">Delivered</span>
              </div>
              <div class="metric-card">
                <span class="metric-val">${state.available.filter((j) => j.status === 'OPEN').length}</span>
                <span class="metric-lbl">Offers</span>
              </div>
            </div>` : ''}

          <div class="panel-scroll-content${isPastPage ? ' is-list' : ''}">
            ${isCustomer && state.customerTab === 'compose'
              ? renderComposeForm()
              : isPastPage ? renderPastPage(section)
              : (tabItems.length
                  ? tabItems.map(renderTrackingCard).join('')
                  : `<div class="empty-placeholder">${escapeHtml(section.empty)}</div>`
                )
            }
          </div>
        </section>

        <div class="map-controls">
          <div class="map-btn-group">
            <button type="button" class="map-btn" data-action="mapZoom" data-arg="1" aria-label="Zoom in" title="Zoom in">${ICONS.plus}</button>
            <button type="button" class="map-btn" data-action="mapZoom" data-arg="-1" aria-label="Zoom out" title="Zoom out">${ICONS.minus}</button>
          </div>
          ${isCustomer ? `
          <div class="map-btn-solo ${state.compose.live ? 'is-live' : ''}">
            <button type="button" class="map-btn ${state.compose.live ? 'is-live' : ''}" data-action="useMyLocation" aria-label="Use my location" title="Use my location">${ICONS.navigate}</button>
          </div>` : ''}
        </div>

        ${activeJob ? `
          <div class="floating-order-banner">
            <div class="banner-top-row">
              <div class="banner-order-title">Order #${activeJob.id}</div>
              <div class="status-pill ${activeJob.status === 'DELIVERED' ? 'status-DELIVERED' : (activeJob.status === 'CANCELLED' ? 'status-CANCELLED' : 'status-ACCEPTED')}">${activeJob.status}</div>
            </div>
            <div class="banner-grid">
              <div class="banner-courier-profile">
                ${avatarHtml(counterparty(activeJob).name)}
                <div class="banner-stat-item">
                  <span class="banner-stat-label">${counterparty(activeJob).label}</span>
                  <span class="banner-stat-value">${escapeHtml(counterparty(activeJob).name)}</span>
                </div>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">From</span>
                <span class="banner-stat-value">${escapeHtml(shortCity(activeJob.pickup_address))}</span>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">To</span>
                <span class="banner-stat-value">${escapeHtml(shortCity(activeJob.dropoff_address))}</span>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">Distance</span>
                <span class="banner-stat-value">${miles(activeJob.distance_km)}</span>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">Price / Delivery</span>
                <span class="banner-stat-value">${money(activeJob.price_gbp)}</span>
              </div>
            </div>
          </div>
        ` : (state.compose.quote ? `
          <div class="floating-order-banner">
            <div class="banner-top-row">
              <div class="banner-order-title">Route Estimate</div>
              <div class="status-pill status-OPEN">Quoted</div>
            </div>
            <div class="banner-grid">
              <div class="banner-courier-profile">
                ${avatarHtml('')}
                <div class="banner-stat-item">
                  <span class="banner-stat-label">Courier</span>
                  <span class="banner-stat-value">Available upon post</span>
                </div>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">From</span>
                <span class="banner-stat-value">${escapeHtml(shortCity(state.compose.pickup_address))}</span>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">To</span>
                <span class="banner-stat-value">${escapeHtml(shortCity(state.compose.dropoff_address))}</span>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">Distance</span>
                <span class="banner-stat-value">${miles(state.compose.quote.distance_km)}</span>
              </div>
              <div class="banner-stat-item">
                <span class="banner-stat-label">Price</span>
                <span class="banner-stat-value">${money(state.compose.quote.price_gbp)}</span>
              </div>
            </div>
          </div>
        ` : '')}

        ${renderModals()}
      </main>`;
  }

  // ---------------- Map Logic ----------------
  const UK_DEFAULT_CENTER = [51.5074, -0.1278];
  const UK_DEFAULT_ZOOM = 6;

  // "Live" only while the last position is recent. A dot that stopped moving
  // ten minutes ago must not look like it's still tracking.
  function trackingTooltip(job) {
    const who = state.user && state.user.role === 'courier' ? 'You' : counterparty(job).name;
    const at = job.courier_location_updated_at ? new Date(job.courier_location_updated_at).getTime() : null;
    const age = at && !Number.isNaN(at) ? Math.round((Date.now() - at) / 1000) : null;
    let line;
    if (testMode) line = '• Live in transit';
    else if (age === null) line = '• Waiting for a location update';
    else if (age > 90) line = `• Signal lost — last seen ${age >= 120 ? Math.round(age / 60) + ' min' : age + 's'} ago`;
    else line = `• Live · updated ${age}s ago`;
    const stale = age !== null && age > 90 && !testMode;
    return `<strong>Courier:</strong> ${escapeHtml(who)}<br><span style="color:${stale ? 'var(--danger)' : 'var(--indigo)'};font-weight:600;">${line}</span>`;
  }

  function initWorkspaceMap() {
    const el = document.getElementById('workspace-map');
    if (!el || typeof L === 'undefined') return;
    if (!mapOpen()) return; // the map button splits the screen; a closed map isn't drawn

    const activeJob = getActiveJob();
    const c = state.compose;

    let pickup = null;
    let dropoff = null;
    let route = null;
    let destLabel = null;
    let courierPos = null;

    if (activeJob) {
      pickup = { lat: activeJob.pickup_lat, lng: activeJob.pickup_lng };
      dropoff = { lat: activeJob.dropoff_lat, lng: activeJob.dropoff_lng };
      route = { distance_km: activeJob.distance_km, price_gbp: activeJob.price_gbp, geometry: activeJob.route_geometry };
      destLabel = activeJob.dropoff_address;
      if (activeJob.status === 'ACCEPTED' || activeJob.status === 'COLLECTED') {
        if (activeJob.courier_lat != null && activeJob.courier_lng != null) {
          // Where the courier's phone last reported it.
          courierPos = [Number(activeJob.courier_lat), Number(activeJob.courier_lng)];
        } else if (testMode && (activeJob.status === 'COLLECTED' || activeJob.started_at)) {
          // Test-mode fixtures only. A real job with no reported position shows
          // no truck at all rather than one placed on a guess.
          const ratio = activeJob.status === 'COLLECTED' ? 0.65 : 0.02;
          courierPos = [pickup.lat + (dropoff.lat - pickup.lat) * ratio, pickup.lng + (dropoff.lng - pickup.lng) * ratio];
        }
      }
    } else if (c.quote) {
      pickup = { lat: c.quote.pickup_lat, lng: c.quote.pickup_lng };
      dropoff = { lat: c.quote.dropoff_lat, lng: c.quote.dropoff_lng };
      route = { distance_km: c.quote.distance_km, price_gbp: c.quote.price_gbp, geometry: c.quote.route_geometry };
      destLabel = c.dropoff_address;
    } else if (c.pickupCoords) {
      pickup = c.pickupCoords;
    } else if (c.dropoffCoords) {
      dropoff = c.dropoffCoords;
      destLabel = c.dropoff_address;
    }

    // Zoom and locate are our own buttons (.map-controls), themed with the site.
    const map = L.map(el, { attributionControl: false, zoomControl: false }).setView(UK_DEFAULT_CENTER, UK_DEFAULT_ZOOM);
    L.control.attribution({ position: 'bottomleft' }).addTo(map);
    // Plain OpenStreetMap tiles; the black-and-white look comes from the CSS
    // grayscale filter on .leaflet-tile-pane. CARTO's free basemap serves
    // "API KEY REQUIRED" watermarked tiles, so it isn't usable here.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    if (pickup) {
      const pickupIcon = L.divIcon({
        className: 'pickup-dot-container',
        html: `<div style="width:14px;height:14px;border-radius:50%;background:var(--brand);border:2.5px solid var(--paper);box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      pickupMarker = L.marker([pickup.lat, pickup.lng], { icon: pickupIcon }).addTo(map).bindPopup('Pickup: ' + escapeHtml(pickup.lat.toFixed(4) + ', ' + pickup.lng.toFixed(4)));
    }

    if (dropoff) {
      const destIcon = L.divIcon({
        className: 'dest-dot-container',
        html: `<div class="destination-pulse-dot"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      const destMarker = L.marker([dropoff.lat, dropoff.lng], { icon: destIcon }).addTo(map);
      if (destLabel) {
        // Short name only: the full address is several lines long and gets
        // clipped at the edge of a phone screen.
        destMarker.bindTooltip(escapeHtml(shortCity(destLabel)), {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
          className: 'destination-callout-pill',
        });
      }
    }

    if (courierPos) {
      const vehicleIcon = L.divIcon({
        className: 'courier-vehicle-marker-icon',
        html: `
          <div class="courier-live-vehicle-marker">
            <div class="courier-live-ping"></div>
            <div class="courier-live-icon-wrap">${ICONS.truck}</div>
          </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });
      // Kept so the sync poller can slide it to a new position without
      // redrawing the whole map (and losing the user's pan/zoom).
      courierMarkers[activeJob.id] = L.marker(courierPos, { icon: vehicleIcon })
        .addTo(map)
        .bindTooltip(trackingTooltip(activeJob), {
          direction: 'top', offset: [0, -18], className: 'destination-callout-pill'
        });
    }

    // A courier who has pressed Start order: follow them to the pickup along a real road route.
    let leg = null;
    if (activeJob && activeJob.status === 'ACCEPTED' && activeJob.started_at && courierPos && pickup) {
      leg = legRefresh({ id: activeJob.id, courier_lat: courierPos[0], courier_lng: courierPos[1], pickup_lat: pickup.lat, pickup_lng: pickup.lng });
    }

    if (pickup && dropoff) {
      let geometry = route && Array.isArray(route.geometry) && route.geometry.length > 1 ? route.geometry : null;
      let entry = null;
      if (!geometry) {
        // No road route came with this job: fetch it (once, cached) and say so meanwhile.
        entry = routeFor(pickup, dropoff);
        wantedRouteKey = routeKey(pickup, dropoff);
        if (entry.geometry) geometry = entry.geometry;
      }
      let bounds;
      if (geometry) {
        const line = L.polyline(geometry, {
          className: 'route-line',
          color: '#ff97ca', // fallback only; the stylesheet sets the real colour
          weight: 4,
          opacity: leg ? 0.3 : 0.85, // the job's own route steps back while the courier is still on the way to it
        }).addTo(map);
        if (route && !leg) {
          line.bindTooltip(`${miles(route.distance_km)} · ${money(route.price_gbp)}`, {
            permanent: true, direction: 'center', className: 'route-label',
          });
        }
        bounds = line.getBounds();
      } else {
        const mid = [(pickup.lat + dropoff.lat) / 2, (pickup.lng + dropoff.lng) / 2];
        const words = entry && entry.status === 'failed' ? 'Road route unavailable' : 'Finding the road route…';
        L.marker(mid, {
          interactive: false,
          keyboard: false,
          icon: L.divIcon({ className: 'route-status-icon', iconSize: [0, 0], html: `<span class="route-status ${entry && entry.status === 'failed' ? '' : 'is-loading'}">${words}</span>` }),
        }).addTo(map);
        bounds = L.latLngBounds([[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]]);
      }
      if (leg) {
        const here = [courierPos[0], courierPos[1]];
        if (leg.geometry) {
          legLine = L.polyline([here, ...leg.geometry], { className: 'route-line leg-line', color: '#ff97ca', weight: 5, opacity: 0.95 }).addTo(map);
          legLine.bindTooltip(legLabel(leg), { permanent: true, direction: 'center', className: 'route-label' });
          bounds = legLine.getBounds().extend([pickup.lat, pickup.lng]);
        } else {
          const failed = leg.status === 'failed';
          L.marker([(here[0] + pickup.lat) / 2, (here[1] + pickup.lng) / 2], {
            interactive: false,
            keyboard: false,
            icon: L.divIcon({ className: 'route-status-icon', iconSize: [0, 0], html: `<span class="route-status ${failed ? '' : 'is-loading'}">${failed ? "Courier's route unavailable" : "Finding the courier's route…"}</span>` }),
          }).addTo(map);
          bounds = L.latLngBounds([here, [pickup.lat, pickup.lng]]);
        }
      }
      // No animation: the map is rebuilt from scratch on every render(), and
      // an animation still running when the next render tears it down throws
      // inside Leaflet.
      const paddingOptions = { padding: [40, 40], animate: false };
      map.fitBounds(bounds, paddingOptions);
    } else if (pickup) {
      map.setView([pickup.lat, pickup.lng], 12, { animate: false });
    } else if (dropoff) {
      map.setView([dropoff.lat, dropoff.lng], 12, { animate: false });
    }

    liveMaps.push(map);
    workspaceMap = map;
  }

  // A courier's position changes every few seconds; nothing else about the
  // job does. Comparing the jobs with position stripped out is how the poller
  // tells "just slide the marker" from "something real changed, redraw".
  const withoutPosition = (j) => {
    const c = { ...j };
    delete c.courier_lat; delete c.courier_lng; delete c.courier_location_updated_at;
    return c;
  };

  function applyPolledJobs(nextJobs, nextAvailable) {
    const prevJobs = state.jobs;
    const prevAvailable = state.available;
    state.jobs = nextJobs;
    if (nextAvailable) state.available = nextAvailable;

    const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const changed = !same(nextJobs.map(withoutPosition), prevJobs.map(withoutPosition))
      || (nextAvailable && !same(nextAvailable, prevAvailable));

    // The live job's marker doesn't exist yet if its first position only
    // arrived now — that needs a redraw to create it.
    const active = getActiveJob();
    const markerMissing = active && active.courier_lat != null && !courierMarkers[active.id]
      && nextJobs.some((j) => j.id === active.id && j.courier_lat != null);

    if (changed || markerMissing) {
      render();
      return;
    }
    nextJobs.forEach((j) => {
      const marker = courierMarkers[j.id];
      if (marker && j.courier_lat != null && j.courier_lng != null) {
        marker.setLatLng([Number(j.courier_lat), Number(j.courier_lng)]);
        marker.setTooltipContent(trackingTooltip(j));
        if (j.status === 'ACCEPTED' && j.started_at) { legRefresh(j); slideLeg(j); }
      }
    });
    refreshActiveCards();
  }

  // How often the lists refresh. Polling every few seconds forever is wasteful
  // (each poll is a serverless call and several queries), so it follows what is
  // actually happening: quick while a parcel is moving, slow when nothing is, and
  // paused while the tab is hidden.
  let lastPollAt = 0;
  function pollEveryMs() {
    const live = state.jobs.some((j) => j.status === 'ACCEPTED' || j.status === 'COLLECTED');
    if (live) return 4000;
    if (state.user && state.user.role === 'courier') return state.courierTab === 'available' ? 8000 : 15000;
    return state.jobs.some((j) => j.status === 'OPEN') ? 8000 : 20000;
  }

  function startSyncPoller() {
    if (syncTimer) clearInterval(syncTimer);
    syncTimer = setInterval(async () => {
      if (document.hidden || testMode) return;
      if (state.screen === 'dashboard' && state.user && !state.activeModal) {
        if (Date.now() - lastPollAt < pollEveryMs() - 200) return;
        lastPollAt = Date.now();
        const gen = sessionGen;
        try {
          if (state.user.role === 'customer') {
            const jobs = await api('/api/jobs-mine');
            if (gen === sessionGen) applyPolledJobs(jobs);
          } else {
            const [available, mine] = await Promise.all([
              api('/api/jobs-available'),
              api('/api/jobs-courier-mine'),
            ]);
            if (gen === sessionGen) applyPolledJobs(mine, available);
          }
        } catch { /* keep showing what's already on screen */ }
      } else if (state.activeModal === 'messages' && state.chatJobId) {
        loadMessages(state.chatJobId);
      }
    }, 2000);
  }

  // The courier's phone reports where it is while a job is under way; the
  // customer's poller above picks that up from jobs-mine. It stops asking for the
  // location once the courier has said no — nobody wants a prompt every 10s —
  // and it tells the courier what it is doing (see gpsChip), because a silent
  // failure here means a customer watching a dot that never moves.
  const GPS_PUSH_MS = 10000;
  let wakeLock = null;

  function refreshGpsChips() {
    if (!root) return;
    root.querySelectorAll('.gps-chip').forEach((el) => {
      const card = el.closest('.pkg-card');
      const id = card && Number(card.dataset.arg);
      const job = state.jobs.find((j) => j.id === id);
      if (job) el.outerHTML = gpsChip(job);
    });
  }

  function setGps(status, extra) {
    state.gps = { status, sentAt: state.gps.sentAt, ...extra };
    refreshGpsChips();
  }

  async function holdScreenAwake(on) {
    try {
      if (on && !wakeLock && 'wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
      } else if (!on && wakeLock) {
        await wakeLock.release();
        wakeLock = null;
      }
    } catch { /* not available, or refused: sharing still works while the screen is on */ }
  }

  function pushCourierLocation() {
    if (testMode || !state.user || state.user.role !== 'courier' || !('geolocation' in navigator)) return;
    // Only orders the courier has started (or already collected) share a position: accepting a job
    // while at home must not show a home address.
    const live = state.jobs.filter((j) => j.status === 'COLLECTED' || (j.status === 'ACCEPTED' && j.started_at));
    holdScreenAwake(live.length > 0);
    if (!live.length || !state.broadcastingGps) return;
    if (!state.user.location_consent_at) { if (state.gps.status !== 'consent') setGps('consent'); return; }
    if (gpsDenied) return;
    const gen = sessionGen;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (gen !== sessionGen) return;
        let sent = false;
        live.forEach((j) => {
          api('/api/jobs-location', {
            method: 'POST',
            json: { jobId: j.id, lat: pos.coords.latitude, lng: pos.coords.longitude },
          }).then(() => {
            if (!sent) { sent = true; state.gps.sentAt = Date.now(); setGps('sharing'); }
          }).catch((err) => {
            if (err && err.data && err.data.consent_required) setGps('consent');
            else if (!err || err.status !== 409) setGps('error');
          });
        });
      },
      (err) => {
        if (err && err.code === 1) { gpsDenied = true; setGps('denied'); } else setGps('error');
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 5000 },
    );
  }

  function startGpsPush() {
    if (gpsTimer) clearInterval(gpsTimer);
    gpsTimer = setInterval(() => { pushCourierLocation(); refreshGpsChips(); }, GPS_PUSH_MS);
  }

  // Re-read the signed-in person (consent and suspension can change under us).
  async function reloadUser() {
    const fresh = await api('/api/me');
    if (fresh && state.user) state.user = { ...state.user, ...fresh };
    return state.user;
  }

  // ---------------- Boot & Delegation ----------------
  function boot() {
    root = document.getElementById('app');
    if (!root) return;

    // What the Help / Account / Admin panels (panels.js) are allowed to reach.
    window.VendaruApp = {
      api: (path, opts) => api(path, opts),
      user: () => state.user,
      jobs: () => state.jobs,
      refresh: () => loadLists(),
      reloadUser: async () => { const u = await reloadUser(); render(); return u; },
      isDemo: () => testMode,
      orderCaps: (job) => orderCaps(job),
      cancelOrder: (jobId) => actions.cancelJob(jobId),
      deleteOrder: (jobId) => actions.deleteJob(jobId),
      logout: () => actions.logout(),
    };

    window.addEventListener('hashchange', () => {
      // A pasted email link in a tab that is already open doesn't reload the page.
      if (takeEmailLink()) return;
      if (state.screen === 'dashboard' && applyPageFromHash()) render();
    });

    // Coming back to the tab: catch up at once and, for a courier, send a fresh position.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden || !state.user || state.screen !== 'dashboard') return;
      lastPollAt = 0;
      pushCourierLocation();
      if (state.user.email_verification_required && !state.user.email_verified) reloadUser().then(() => render()).catch(() => {});
    });

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      // A backdrop only closes its modal when the backdrop itself is hit —
      // a click on the modal's own content bubbles up to it, and shouldn't.
      if (el.hasAttribute('data-backdrop') && e.target !== el) return;
      const action = actions[el.dataset.action];
      if (typeof action !== 'function') return;
      const arg = el.dataset.arg;
      action(arg, el.dataset.field);
    });

    root.addEventListener('input', (e) => {
      const path = e.target.dataset.bind;
      if (!path) return;
      set(state, path, e.target.value);
      if (path === 'pastQuery') { refreshPastResults(); return; }
      if (path === 'compose.start') {
        state.compose.timeError = null;
        const stale = root.querySelector('.time-error');
        if (stale) stale.remove();
      }
      if (path === 'compose.pickup_address' || path === 'compose.dropoff_address') {
        state.compose.quote = null;
        state.compose.quoteError = null;
        // Editing the text means it's no longer the place that was picked.
        if (path === 'compose.pickup_address') {
          stopLiveLocation();
          state.compose.pickupCoords = null;
          state.compose.pickupPlace = null;
          state.compose.locateError = null;
          state.compose.locateNote = null;
          root.querySelectorAll('.locate-msg').forEach((el) => el.remove());
        }
        if (path === 'compose.dropoff_address') { state.compose.dropoffCoords = null; state.compose.dropoffPlace = null; }
        scheduleAddressSuggest(path === 'compose.pickup_address' ? 'pickup' : 'dropoff', e.target.value);
      }
    });

    root.addEventListener('focusout', (e) => {
      const field = e.target.dataset.suggestField;
      if (!field) return;
      setTimeout(() => {
        // Only close if focus really left this field (a clicked result or
        // the clear button keeps it, or has already handled things).
        if (document.activeElement && document.activeElement.dataset && document.activeElement.dataset.suggestField === field) return;
        closeSuggestBox(field);
        actions.maybeAutoQuote();
      }, 150);
    });

    // Clicking a result or the clear button must not pull focus off the
    // input first — otherwise the box closes on mousedown, before the click
    // lands, and a slow tap picks nothing.
    root.addEventListener('mousedown', (e) => {
      if (e.target.closest && e.target.closest('.addr-suggestion, .addr-clear, .addr-gps')) e.preventDefault();
    });

    root.addEventListener('pointerdown', sheetPointerDown);
    root.addEventListener('pointermove', sheetPointerMove);
    root.addEventListener('pointerup', sheetPointerEnd);
    root.addEventListener('pointercancel', sheetPointerEnd);
    root.addEventListener('dblclick', (e) => { if (e.target.closest && e.target.closest('.sheet-handle')) sheetReset(); });

    root.addEventListener('keydown', (e) => {
      if (e.target.classList && e.target.classList.contains('sheet-handle') && sheetKey(e)) return;
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-key-activate]')) {
        e.preventDefault();
        e.target.click();
        return;
      }
      if (e.key === 'Enter' && e.target.dataset && /^authFields\./.test(e.target.dataset.bind || '') && !state.authBusy) {
        e.preventDefault();
        actions[state.authMode === 'forgot' ? 'submitForgot' : (state.authMode === 'reset' ? 'submitReset' : 'submitAuth')]();
        return;
      }
      if (e.key === 'Enter' && e.target.dataset && e.target.dataset.bind === 'pastQuery') {
        e.preventDefault();
        e.target.blur(); // closes the phone keyboard; the results are already showing
        return;
      }
      if (e.key === 'Enter' && e.target.dataset && e.target.dataset.bind === 'chatDraft') {
        e.preventDefault();
        actions.sendChatMessage();
        return;
      }
      const field = e.target.dataset && e.target.dataset.suggestField;
      if (!field) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSuggestActive(field, 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSuggestActive(field, -1); }
      else if (e.key === 'Escape') { closeSuggestBox(field); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (suggestActive[field] >= 0) actions.selectSuggestion(suggestActive[field], field);
        else e.target.blur();
      }
    });

    root.addEventListener('change', (e) => {
      const check = e.target.dataset && e.target.dataset.check;
      if (check) { state.authFields[check] = !!e.target.checked; return; }
      const jobId = e.target.dataset.photoFor;
      if (jobId !== undefined && e.target.files) {
        actions.choosePhoto(Number(jobId), e.target.files);
      }
    });

    startSyncPoller();
    startGpsPush();
    const link = takeEmailLink({ boot: true });
    if (link && link.kind === 'reset') return;
    resumeSession().then(() => { if (link) confirmEmail(link.token); });
  }

  // A link from one of our emails. The token is in the address after the # (so it is never sent to a
  // server or logged); it is read once and taken out of the address bar. A reset link opens the
  // "choose a new password" screen at once; a confirm link is returned so the caller can use it
  // (at boot, once the session is back; otherwise straight away). Returns null when there is none.
  function takeEmailLink(opts = {}) {
    const m = location.hash.match(/^#(verify|reset)=([A-Za-z0-9_-]{20,100})$/);
    if (!m) return null;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* fine */ }
    const link = { kind: m[1], token: m[2] };
    if (link.kind === 'reset') {
      state.authMode = 'reset';
      state.resetToken = link.token;
      state.authError = null;
      state.authNotice = null;
      state.screen = 'auth';
      state.booting = false;
      render();
    } else if (!opts.boot) {
      confirmEmail(link.token);
    }
    return link;
  }

  // The "Confirm my email" link was opened. Works whether or not the person is signed in on this device.
  async function confirmEmail(token) {
    try {
      await api('/api/email-verify', { method: 'POST', auth: false, json: { token } });
      if (state.user) {
        await reloadUser();
        render();
        toast('Thanks, your email is confirmed.');
      } else {
        state.authNotice = 'Thanks, your email is confirmed. You can log in.';
        render();
      }
    } catch (err) {
      if (state.user) toast(err.message, 'error');
      else { state.authError = err.message; render(); }
    }
  }

  async function resumeSession() {
    if (!state.token) {
      state.booting = false;
      render();
      return;
    }
    try {
      state.user = await api('/api/me');
      state.screen = 'dashboard';
      state.bootError = null;
      applyPageFromHash();
      render();
      await loadLists();
    } catch (err) {
      // Only a login the server has actually refused should sign the person
      // out. A dropped connection or a server hiccup keeps them signed in and
      // offers a retry — wiping the token would turn a blip into a logout.
      if (err && (err.status === 401 || err.status === 403)) {
        setToken(null);
        state.screen = 'auth';
      } else {
        state.bootError = err.message;
        state.screen = 'auth';
      }
      render();
    } finally {
      state.booting = false;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
