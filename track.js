// Recipient tracking page. The secret lives in the URL fragment
// (/track.html#<24 characters>), which browsers never send to any server, and
// goes to our API in a request header, never in a query string. Everything
// from the API is put on the page with textContent.
(function () {
  'use strict';

  var TOKEN_RE = /^[A-Za-z0-9_-]{24}$/;
  var POLL_MS = 10000;
  var BACKOFF_MS = 60000;
  var STALE_MS = 90000;
  var ACTIVE = { OPEN: true, ACCEPTED: true, COLLECTED: true };

  function $(id) { return document.getElementById(id); }

  var el = {
    headline: $('tk-headline'),
    sub: $('tk-sub'),
    notice: $('tk-notice'),
    content: $('tk-content'),
    live: $('tk-live'),
    liveText: $('tk-live-text'),
    liveAge: $('tk-live-age'),
    map: $('tk-map'),
    mapNote: $('tk-map-note'),
    area: $('tk-area'),
    checked: $('tk-checked'),
    auto: $('tk-auto')
  };

  var token = '';
  try { token = decodeURIComponent(location.hash.slice(1)); } catch (e) { token = ''; }

  var timer = null;
  var stopped = false;
  var inflight = false;
  var waitingForVisible = false;
  var failures = 0;
  var serverOffset = 0; // server clock minus this device's clock, from the Date header
  var data = null;

  // ------------------------------------------------------------ helpers
  function setText(node, text) { if (node) node.textContent = text == null ? '' : String(text); }
  function show(node, on) { if (node) node.hidden = !on; }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function clock(d) { return pad(d.getHours()) + ':' + pad(d.getMinutes()); }

  // "Today 14:32" / "12 Sep 14:32", or with long=true "today at 14:32" / "12 Sep at 14:32"
  function when(iso, long) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var now = new Date();
    var at = long ? ' at ' : ' ';
    if (d.toDateString() === now.toDateString()) return (long ? 'today' : 'Today') + at + clock(d);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + at + clock(d);
  }

  function nowServer() { return Date.now() + serverOffset; }

  function ageText(ms) {
    var s = Math.max(0, Math.round(ms / 1000));
    if (s < 60) return s + ' s';
    return Math.floor(s / 60) + ' min';
  }

  function kmText(km) {
    var n = Number(km);
    if (!isFinite(n)) return '';
    return (n < 0.1 ? '0.1' : n.toFixed(1)) + ' km';
  }

  // ------------------------------------------------------------- states
  function terminal(headline, sub) {
    stopped = true;
    clearTimeout(timer);
    show(el.content, false);
    show(el.notice, false);
    setText(el.headline, headline);
    setText(el.sub, sub);
    document.title = headline + ' · Vendaru';
  }

  function notice(msg) {
    if (!el.notice) return;
    setText(el.notice, msg);
    show(el.notice, !!msg);
  }

  // ------------------------------------------------------------ timeline
  var STEPS = [
    { id: 'st-posted', key: 'created_at' },
    { id: 'st-accepted', key: 'accepted_at' },
    { id: 'st-collected', key: 'collected_at' },
    { id: 'st-delivered', key: 'delivered_at' }
  ];

  function renderSteps(d) {
    var currentSet = false;
    var cancelled = d.status === 'CANCELLED';
    STEPS.forEach(function (s) {
      var li = $(s.id);
      if (!li) return;
      var ts = d[s.key];
      var state;
      if (ts) state = 'done';
      else if (!currentSet && !cancelled && d.status !== 'DELIVERED') { state = 'current'; currentSet = true; }
      else state = 'todo';
      li.setAttribute('data-state', state);
      var stateEl = li.querySelector('.tk-state');
      if (stateEl) stateEl.textContent = state === 'done' ? ' (done)' : state === 'current' ? ' (in progress)' : ' (not yet)';
      var t = li.querySelector('time');
      if (t) {
        if (ts) { t.textContent = when(ts); t.setAttribute('dateTime', ts); } else { t.textContent = ''; t.removeAttribute('dateTime'); }
      }
    });
    var c = $('st-cancelled');
    if (c) {
      show(c, cancelled);
      var ct = c.querySelector('time');
      if (ct) {
        ct.textContent = when(d.cancelled_at);
        if (d.cancelled_at) ct.setAttribute('dateTime', d.cancelled_at);
      }
    }
  }

  // ---------------------------------------------------------------- map
  var map = null;
  var dropMarker = null;
  var courierMarker = null;
  var userMoved = false;
  var fitting = false;
  var mapFailed = false;

  function icon(cls) {
    return window.L.divIcon({
      className: 'tk-marker-wrap',
      html: '<span class="' + cls + '"></span>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  }

  function failMap() {
    mapFailed = true;
    show(el.map, false);
    show(el.mapNote, true);
  }

  function initMap(lat, lng) {
    try {
      map = window.L.map(el.map, { scrollWheelZoom: false, zoomControl: true }).setView([lat, lng], 14);
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      map.on('zoomstart dragstart', function () { if (!fitting) userMoved = true; });
    } catch (e) {
      map = null;
      failMap();
    }
  }

  function fit(points) {
    if (!map || userMoved) return;
    fitting = true;
    try {
      if (points.length > 1) map.fitBounds(window.L.latLngBounds(points), { padding: [44, 44], maxZoom: 15, animate: false });
      else map.setView(points[0], 14, { animate: false });
    } catch (e) { /* ignore */ }
    fitting = false;
  }

  function updateMap(d) {
    if (mapFailed || !el.map) return;
    if (!window.L) { failMap(); return; }
    var lat = Number(d.dropoff_lat);
    var lng = Number(d.dropoff_lng);
    if (!isFinite(lat) || !isFinite(lng)) { show(el.map, false); return; }
    show(el.map, true);
    if (!map) initMap(lat, lng);
    if (!map) return;
    map.invalidateSize();

    var drop = [lat, lng];
    if (!dropMarker) dropMarker = window.L.marker(drop, { icon: icon('tk-dot tk-dot-drop'), keyboard: false, title: 'Drop-off area' }).addTo(map);
    else dropMarker.setLatLng(drop);

    var c = d.status === 'COLLECTED' ? d.courier : null;
    var has = c && c.lat != null && c.lng != null && isFinite(Number(c.lat)) && isFinite(Number(c.lng));
    if (has) {
      var pos = [Number(c.lat), Number(c.lng)];
      if (!courierMarker) courierMarker = window.L.marker(pos, { icon: icon('tk-dot tk-dot-courier'), keyboard: false, title: 'Courier' }).addTo(map);
      else courierMarker.setLatLng(pos);
      fit([drop, pos]);
    } else {
      if (courierMarker) { map.removeLayer(courierMarker); courierMarker = null; }
      fit([drop]);
    }
    tickAge();
  }

  // ----------------------------------------------------- live courier line
  function courierHasPosition() {
    var c = data && data.status === 'COLLECTED' ? data.courier : null;
    return !!(c && c.lat != null && c.lng != null);
  }

  function tickAge() {
    if (!el.live || !data) return;
    if (!courierHasPosition()) return;
    var c = data.courier;
    var t = c.updated_at ? new Date(c.updated_at).getTime() : NaN;
    var stale = false;
    var msg = '';
    if (isFinite(t)) {
      var age = Math.max(0, nowServer() - t);
      stale = age > STALE_MS;
      msg = stale ? 'Signal lost — last seen ' + ageText(age) + ' ago' : 'Updated ' + ageText(age) + ' ago';
    }
    setText(el.liveAge, msg);
    el.live.classList.toggle('is-stale', stale);
    if (courierMarker && courierMarker.getElement) {
      var m = courierMarker.getElement();
      if (m) m.classList.toggle('tk-stale', stale);
    }
  }

  function renderLive(d) {
    var c = d.status === 'COLLECTED' ? d.courier : null;
    if (!c) { show(el.live, false); return; }
    show(el.live, true);
    var name = c.first_name || 'The courier';
    if (courierHasPosition()) {
      var dist = kmText(c.distance_remaining_km);
      setText(el.liveText, dist ? name + ' is ' + dist + ' away' : name + ' is on the way');
    } else {
      setText(el.liveText, name + " has collected the parcel. Live position isn't available right now.");
      setText(el.liveAge, '');
      el.live.classList.remove('is-stale');
    }
  }

  // -------------------------------------------------------------- render
  function render(d) {
    data = d;
    var st = d.status;
    var first = d.courier && d.courier.first_name ? d.courier.first_name : '';
    var headline;
    var sub = '';
    if (st === 'OPEN') {
      headline = 'Waiting for a courier';
      sub = "This delivery has been listed, but no courier has accepted it yet. This page updates by itself.";
    } else if (st === 'ACCEPTED') {
      headline = 'A courier has taken this job';
      sub = "They are on their way to collect the parcel. You'll see them on the map once it has been collected.";
    } else if (st === 'COLLECTED') {
      headline = 'On the way to you';
      sub = (first ? first + ' is' : 'The courier is') + ' on the way with the parcel.';
    } else if (st === 'DELIVERED') {
      headline = 'Delivered';
      sub = d.delivered_at ? 'Delivered ' + when(d.delivered_at, true) + '. This link stops working 24 hours after delivery.' : 'This link stops working 24 hours after delivery.';
    } else if (st === 'CANCELLED') {
      headline = 'Cancelled';
      sub = 'This delivery was cancelled. Please ask the sender if you need to know more.';
    } else {
      headline = d.stage || 'Delivery status';
    }
    setText(el.headline, headline);
    setText(el.sub, sub);
    document.title = headline + ' · Vendaru';
    setText(el.area, d.dropoff_area || 'Not available');
    show(el.content, true);
    renderSteps(d);
    renderLive(d);
    updateMap(d);
    var now = new Date();
    setText(el.checked, 'Last checked ' + clock(now) + ':' + pad(now.getSeconds()));
    show(el.auto, !!ACTIVE[st]);
  }

  // -------------------------------------------------------------- polling
  function schedule(ms) {
    clearTimeout(timer);
    if (stopped) return;
    timer = setTimeout(tick, ms);
  }

  function tick() {
    if (stopped) return;
    if (document.hidden) { waitingForVisible = true; return; }
    poll();
  }

  function poll() {
    if (inflight || stopped) return;
    inflight = true;
    var ctl = window.AbortController ? new AbortController() : null;
    var abortTimer = ctl ? setTimeout(function () { ctl.abort(); }, 15000) : null;
    var opts = { method: 'GET', headers: { 'X-Track-Token': token }, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' };
    if (ctl) opts.signal = ctl.signal;

    fetch('/api/track', opts)
      .then(function (res) {
        var dh = res.headers && res.headers.get('Date');
        var sv = dh ? Date.parse(dh) : NaN;
        if (isFinite(sv)) serverOffset = sv - Date.now();
        if (res.status === 200) {
          return res.json().then(function (j) {
            failures = 0;
            notice('');
            render(j);
            if (ACTIVE[j.status]) schedule(POLL_MS);
            else { stopped = true; clearTimeout(timer); }
          });
        }
        if (res.status === 404) {
          terminal("This link isn't valid", "Check that you've copied the whole link, or ask the sender to send it again.");
          return null;
        }
        if (res.status === 410) {
          terminal('This link has expired', 'Tracking links stop working 24 hours after a delivery is completed or cancelled.');
          return null;
        }
        if (res.status === 429) {
          notice("Too many refreshes just now. We'll try again in a minute.");
          schedule(BACKOFF_MS);
          return null;
        }
        throw new Error('status ' + res.status);
      })
      .catch(function () {
        failures++;
        notice(data ? "Can't reach Vendaru right now, so this may be out of date. Trying again…" : "Can't reach Vendaru right now. Trying again…");
        schedule(Math.min(BACKOFF_MS, POLL_MS * Math.pow(2, Math.min(failures, 3))));
      })
      .then(function () {
        if (abortTimer) clearTimeout(abortTimer);
        inflight = false;
      });
  }

  // ----------------------------------------------------------------- init
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && !stopped && waitingForVisible) {
      waitingForVisible = false;
      poll();
    }
  });

  window.addEventListener('hashchange', function () { location.reload(); });

  if (!TOKEN_RE.test(token)) {
    terminal("This link isn't valid", "Check that you've copied the whole link, or ask the sender to send it again.");
  } else if (!window.fetch) {
    terminal("This browser can't show tracking", 'Please try again in a more recent browser.');
  } else {
    setInterval(tickAge, 1000);
    poll();
  }
})();
