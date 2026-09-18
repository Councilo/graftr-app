// Vendaru — peer-to-peer courier delivery.
//
// One logged-in identity per browser, same as any real app: a person
// registers as either a customer or a courier, and the dashboard they see
// depends on which. State is rebuilt into #app's innerHTML on every
// render() — the same pattern the rest of this codebase has always used —
// with delegated click/input/change listeners on #app doing the wiring
// rather than attaching a listener per element.
(function () {
  'use strict';

  const TOKEN_KEY = 'vendaru_token';
  const MAP_SIDE_KEY = 'vendaru_map_side';

  // TEMPORARY, for testing only. Real sign-in can't work yet anyway — it
  // needs Postgres, Blob and JWT_SECRET attached in Vercel first — so a
  // bypass that just skipped the login screen would drop straight into a
  // dashboard where every single action 401s immediately, which isn't much
  // of a test. Instead this routes the whole app at a client-side stand-in
  // backend (see "TEST MODE MOCK BACKEND" below): real distance/pricing
  // math, an in-memory job board, uploaded photos previewed via object
  // URLs. Nothing here ever touches the real API or weakens real auth in
  // any way — it's a separate code path, entered only by clicking the
  // clearly-labelled test button. Set this to false (or delete this flag,
  // the skipLogin action, the button in renderAuth, and the mock backend
  // section) once real sign-in is wired up and ready to test for real.
  const TEST_MODE_SKIP_LOGIN = true;
  let testMode = false;

  const state = {
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: null,
    booting: true,       // true until the initial session check resolves
    screen: 'auth',       // 'auth' | 'dashboard'

    authRole: 'customer',
    authMode: 'login',    // 'login' | 'register'
    authFields: { full_name: '', email: '', password: '' },
    authError: null,
    authBusy: false,

    // Desktop-only layout preference for the compose screen — 'right' puts
    // the map on the right and the form on the left (the default asked
    // for), 'left' swaps them. Remembered per-viewer; below the desktop
    // breakpoint the two stack and this has no visible effect.
    mapSide: localStorage.getItem(MAP_SIDE_KEY) === 'left' ? 'left' : 'right',

    compose: {
      pickup_address: '', dropoff_address: '', start: '', end: '',
      quote: null, quoteError: null, busy: false,
      locating: false, locateError: null, pickupCoords: null,
    },

    jobs: [],
    available: [],
    listError: null,
    listsLoaded: false,

    expanded: new Set(),
    pendingPhoto: {},   // jobId -> File
    uploadBusy: {},     // jobId -> bool
    uploadError: {},    // jobId -> message
    courierNames: {},   // jobId -> full_name, filled lazily from /api/jobs-tracking
  };

  let root;
  let liveMaps = [];       // every Leaflet map instance created during the last render, torn down before the next one
  let mapsByJob = {};      // job.id -> its live map instance, for targeted updates that shouldn't tear the map down
  let courierMarkers = {}; // job.id -> the courier's live-position marker on that job's map
  let activeIntervals = {}; // job.id -> setInterval id, for location push (courier) or poll (customer)

  // ---------------- tiny helpers ----------------
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function money(n) { return '£' + Number(n).toFixed(2); }
  // Distance is computed and stored in km (that's what the haversine formula
  // and the pricing tier are built on) but shown in miles — UK road
  // distances are read in miles, not km, and a courier estimating a trip
  // wants the number they actually think in.
  function miles(km) { return (Number(km) * 0.621371).toFixed(1) + ' mi'; }
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

  // ---------------- API ----------------
  async function api(path, opts = {}) {
    if (testMode) return mockApi(path, opts);

    const { method = 'GET', json, form, auth = true } = opts;
    const headers = {};
    if (auth && state.token) headers.Authorization = 'Bearer ' + state.token;
    let body;
    if (json !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(json); }
    if (form) body = form;

    const res = await fetch(path, { method, headers, body });
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      const message = (data && data.detail) || res.statusText || 'Something went wrong';
      const err = new Error(typeof message === 'string' ? message : JSON.stringify(message));
      err.status = res.status;
      throw err;
    }
    return data;
  }

  // ---------------- TEST MODE MOCK BACKEND (temporary — see TEST_MODE_SKIP_LOGIN) ----------------
  //
  // A client-side stand-in for the real API, used only after clicking
  // "Skip sign-in" on the auth screen. Same UK town table, haversine
  // distance and pricing formula as lib/geocode.js on the server — kept in
  // sync by hand since this is temporary scaffolding, not shared code, and
  // deleted along with the rest of this section once real sign-in works.
  const MOCK_UK_PLACES = {
    london: [51.5074, -0.1278], birmingham: [52.4862, -1.8904], manchester: [53.4808, -2.2426],
    leeds: [53.8008, -1.5491], glasgow: [55.8642, -4.2518], liverpool: [53.4084, -2.9916],
    newcastle: [54.9783, -1.6178], sheffield: [53.3811, -1.4701], bristol: [51.4545, -2.5879],
    edinburgh: [55.9533, -3.1883], cardiff: [51.4816, -3.1791], belfast: [54.5973, -5.9301],
    nottingham: [52.9548, -1.1581], leicester: [52.6369, -1.1398], coventry: [52.4068, -1.5197],
    oxford: [51.7520, -1.2577], cambridge: [52.2053, 0.1218], york: [53.9600, -1.0873],
    brighton: [50.8225, -0.1372], bath: [51.3811, -2.3590], 'milton keynes': [52.0406, -0.7594],
  };
  function mockGeocode(address) {
    const text = String(address || '').toLowerCase();
    const names = Object.keys(MOCK_UK_PLACES).sort((a, b) => b.length - a.length);
    for (const name of names) if (text.includes(name)) return MOCK_UK_PLACES[name];
    return null;
  }
  function mockQuote(pickup_address, dropoff_address) {
    const p = mockGeocode(pickup_address);
    const d = mockGeocode(dropoff_address);
    if (!p || !d) {
      const bad = !p ? pickup_address : dropoff_address;
      throw new Error(`Couldn't place '${bad}' — include a UK town or city name so the quote reflects a real distance, not a guess.`);
    }
    const rad = (x) => (x * Math.PI) / 180;
    const dphi = rad(d[0] - p[0]);
    const dlambda = rad(d[1] - p[1]);
    const a = Math.sin(dphi / 2) ** 2 + Math.cos(rad(p[0])) * Math.cos(rad(d[0])) * Math.sin(dlambda / 2) ** 2;
    const distance_km = Math.round(2 * 6371 * Math.asin(Math.sqrt(a)) * 100) / 100;
    const price_gbp = Math.round(Math.max(5, 3.5 + 0.85 * distance_km) * 100) / 100;
    return { pickup_lat: p[0], pickup_lng: p[1], dropoff_lat: d[0], dropoff_lng: d[1], distance_km, price_gbp };
  }

  let mockJobs = [];
  let mockJobSeq = 1;
  const MOCK_NAMES = { '-1': 'Test Customer', '-2': 'Test Courier' };

  function mockApi(path, { method = 'GET', json, form } = {}) {
    const [route, qs] = path.split('?');
    const jobId = qs ? Number(new URLSearchParams(qs).get('jobId')) : null;
    const fail = (message) => { throw new Error(message); };
    const find = (id) => mockJobs.find((j) => j.id === id) || fail('No such job');

    if (route === '/api/jobs-quote' && method === 'POST') {
      const q = mockQuote(json.pickup_address, json.dropoff_address);
      return {
        pickup_address: json.pickup_address, dropoff_address: json.dropoff_address,
        distance_km: q.distance_km, price_gbp: q.price_gbp,
        pickup_lat: q.pickup_lat, pickup_lng: q.pickup_lng,
        dropoff_lat: q.dropoff_lat, dropoff_lng: q.dropoff_lng,
      };
    }
    if (route === '/api/jobs-create' && method === 'POST') {
      const q = mockQuote(json.pickup_address, json.dropoff_address);
      const start = new Date(json.pickup_window_start);
      const end = new Date(json.pickup_window_end);
      if (end <= start) fail('pickup_window_end must be after pickup_window_start');
      const job = {
        id: mockJobSeq++, customer_id: state.user.id, courier_id: null,
        pickup_address: json.pickup_address, dropoff_address: json.dropoff_address,
        pickup_window_start: start.toISOString(), pickup_window_end: end.toISOString(),
        ...q, status: 'OPEN', pickup_photo_url: null, delivery_photo_url: null,
        created_at: new Date().toISOString(), accepted_at: null, collected_at: null, delivered_at: null,
      };
      mockJobs.unshift(job);
      return job;
    }
    if (route === '/api/jobs-mine' && method === 'GET') {
      return mockJobs.filter((j) => j.customer_id === state.user.id);
    }
    if (route === '/api/jobs-available' && method === 'GET') {
      return mockJobs.filter((j) => j.status === 'OPEN');
    }
    if (route === '/api/jobs-courier-mine' && method === 'GET') {
      return mockJobs.filter((j) => j.courier_id === state.user.id);
    }
    if (route === '/api/jobs-accept' && method === 'POST') {
      const job = find(json.jobId);
      if (job.status !== 'OPEN') fail(`Job is ${job.status}, not open`);
      job.courier_id = state.user.id;
      job.status = 'ACCEPTED';
      job.accepted_at = new Date().toISOString();
      return job;
    }
    if (route === '/api/jobs-pickup' && method === 'POST') {
      const job = find(jobId);
      if (job.courier_id !== state.user.id) fail("This job isn't assigned to you");
      if (job.status !== 'ACCEPTED') fail(`Job is ${job.status}, expected ACCEPTED`);
      job.pickup_photo_url = URL.createObjectURL(form.get('photo'));
      job.status = 'COLLECTED';
      job.collected_at = new Date().toISOString();
      return job;
    }
    if (route === '/api/jobs-deliver' && method === 'POST') {
      const job = find(jobId);
      if (job.courier_id !== state.user.id) fail("This job isn't assigned to you");
      if (job.status !== 'COLLECTED') fail(`Job is ${job.status}, expected COLLECTED`);
      job.delivery_photo_url = URL.createObjectURL(form.get('photo'));
      job.status = 'DELIVERED';
      job.delivered_at = new Date().toISOString();
      return job;
    }
    if (route === '/api/jobs-tracking' && method === 'GET') {
      const job = find(jobId);
      return { ...job, courier_name: job.courier_id ? MOCK_NAMES[String(job.courier_id)] : null };
    }
    return fail(`(test mode) no mock for ${method} ${route}`);
  }

  // ---------------- data loading ----------------
  async function loadLists() {
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
      state.listsLoaded = true;
    } catch (err) {
      state.listError = err.message;
    }
    render();
  }

  // ---------------- actions (data-action targets) ----------------
  const actions = {
    switchAuthRole(role) {
      state.authRole = role;
      state.authError = null;
      render();
    },
    switchAuthMode(mode) {
      state.authMode = mode;
      state.authError = null;
      render();
    },
    async submitAuth() {
      const { full_name, email, password } = state.authFields;
      state.authError = null;

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
            json: { email: email.trim(), password, full_name: full_name.trim(), role: state.authRole },
          });
        }
        const data = await api('/api/login', { method: 'POST', auth: false, json: { email: email.trim(), password } });
        setToken(data.access_token);
        state.user = data.user;
        state.screen = 'dashboard';
        state.authFields = { full_name: '', email: '', password: '' };
        await loadLists();
      } catch (err) {
        state.authError = err.message;
      } finally {
        state.authBusy = false;
        render();
      }
    },
    logout() {
      setToken(null);
      state.user = null;
      state.screen = 'auth';
      state.jobs = [];
      state.available = [];
      state.listsLoaded = false;
      state.expanded = new Set();
      testMode = false;
      // Reset to a neutral login screen rather than leaving whatever role/mode
      // was last used — otherwise logging out after registering a courier
      // account strands the next person on "create courier account" with an
      // empty name field, one submit away from a confusing validation error.
      state.authMode = 'login';
      state.authRole = 'customer';
      state.authFields = { full_name: '', email: '', password: '' };
      state.authError = null;
      render();
    },
    goDashboard() {
      if (state.user) { state.screen = 'dashboard'; render(); }
    },
    // TEMPORARY testing bypass — see TEST_MODE_SKIP_LOGIN above. A fake
    // local user, no token, nothing sent to the real API: logging out drops
    // straight back to the real auth screen with no trace of it. Fixed
    // negative ids (rather than 0 for both) so a customer and a courier
    // opened this way are distinguishable — otherwise "accept my own job"
    // and "an unrelated courier's job" would look identical to the mock.
    skipLogin(role) {
      testMode = true;
      const id = role === 'customer' ? -1 : -2;
      state.user = { id, email: `test-${role}@example.com`, full_name: `Test ${role === 'customer' ? 'Customer' : 'Courier'}`, role };
      state.screen = 'dashboard';
      state.jobs = [];
      state.available = [];
      state.listsLoaded = false;
      render();
      loadLists();
    },
    refreshLists() {
      loadLists();
    },
    setMapSide(side) {
      state.mapSide = side;
      localStorage.setItem(MAP_SIDE_KEY, side);
      render();
    },
    toggleExpand(jobId) {
      if (state.expanded.has(jobId)) {
        state.expanded.delete(jobId);
        render();
        return;
      }
      state.expanded.add(jobId);
      render();
      const job = findJob(jobId);
      // Who accepted it is worth a real request rather than reading it off
      // the list response: the customer's own job lists never carry the
      // courier's name (a customer has no reason to see every courier's
      // identity just from browsing their own jobs), so this is the one
      // place /api/jobs-tracking actually gets used from the UI.
      if (state.user.role === 'customer' && job && job.courier_id && !state.courierNames[jobId]) {
        api(`/api/jobs-tracking?jobId=${jobId}`)
          .then((t) => { state.courierNames[jobId] = t.courier_name; render(); })
          .catch(() => { /* the job card still works without a name */ });
      }
    },
    // "Use my location" for the pickup field only — a courier's dropoff is
    // wherever the parcel is going, never wherever the customer happens to
    // be standing, so this button only ever appears on the pickup side.
    // Goes straight to fetch() rather than through api(): reverse-geocoding
    // needs no account and no auth, and calling it directly means it still
    // works to fill in a real address even in the client-side test-mode
    // preview, which has no other real backend behind it.
    useMyLocation() {
      if (!('geolocation' in navigator)) {
        state.compose.locateError = "This browser doesn't support location — type the address instead.";
        render();
        return;
      }
      state.compose.locating = true;
      state.compose.locateError = null;
      render();

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          // The map can show exactly where the phone says it is straight
          // away — precise GPS coordinates, no geocoding round trip needed
          // for that part. The text field still waits on reverse-geocoding,
          // since that's the only way to get a readable address out of a
          // raw lat/lng.
          state.compose.pickupCoords = { lat: latitude, lng: longitude };
          state.compose.quote = null; // the pickup point just changed under it
          render();
          try {
            const res = await fetch(`/api/reverse-geocode?lat=${latitude}&lng=${longitude}`);
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error((data && data.detail) || 'Could not look up that location');
            state.compose.pickup_address = data.address;
            state.compose.quoteError = null;
          } catch (err) {
            state.compose.locateError = err.message;
          } finally {
            state.compose.locating = false;
            render();
          }
        },
        (err) => {
          const messages = {
            1: 'Location access was denied — you can still type the address.',
            2: "Your location isn't available right now — you can still type the address.",
            3: 'Finding your location took too long — you can still type the address.',
          };
          state.compose.locating = false;
          state.compose.locateError = messages[err.code] || 'Could not get your location.';
          render();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );
    },
    async getQuote() {
      const { pickup_address, dropoff_address } = state.compose;
      state.compose.quoteError = null;
      state.compose.quote = null;
      if (pickup_address.trim().length < 3 || dropoff_address.trim().length < 3) {
        state.compose.quoteError = 'Enter both a pickup and a dropoff address';
        render();
        return;
      }
      state.compose.busy = true;
      render();
      try {
        const q = await api('/api/jobs-quote', { method: 'POST', json: { pickup_address, dropoff_address } });
        state.compose.quote = q;
      } catch (err) {
        state.compose.quoteError = err.message;
      } finally {
        state.compose.busy = false;
        render();
      }
    },
    async submitJob() {
      const { pickup_address, dropoff_address, start, end } = state.compose;
      if (!start || !end) {
        state.compose.quoteError = 'Choose a pickup window';
        render();
        return;
      }
      state.compose.busy = true;
      render();
      try {
        await api('/api/jobs-create', {
          method: 'POST',
          json: { pickup_address, dropoff_address, pickup_window_start: start, pickup_window_end: end },
        });
        state.compose = {
          pickup_address: '', dropoff_address: '', start: '', end: '',
          quote: null, quoteError: null, busy: false,
          locating: false, locateError: null, pickupCoords: null,
        };
        await loadLists();
      } catch (err) {
        state.compose.quoteError = err.message;
        state.compose.busy = false;
        render();
      }
    },
    async acceptJob(jobId) {
      try {
        await api('/api/jobs-accept', { method: 'POST', json: { jobId } });
        await loadLists();
      } catch (err) {
        state.listError = err.message;
        render();
      }
    },
    choosePhoto(jobId, fileList) {
      state.pendingPhoto[jobId] = fileList && fileList[0] ? fileList[0] : null;
      render();
    },
    async uploadPickup(jobId) {
      await doUpload(jobId, '/api/jobs-pickup');
    },
    async uploadDeliver(jobId) {
      await doUpload(jobId, '/api/jobs-deliver');
    },
  };

  async function doUpload(jobId, path) {
    const file = state.pendingPhoto[jobId];
    if (!file) {
      state.uploadError[jobId] = 'Choose a photo first';
      render();
      return;
    }
    state.uploadBusy[jobId] = true;
    state.uploadError[jobId] = null;
    render();
    try {
      const form = new FormData();
      form.append('photo', file);
      await api(`${path}?jobId=${jobId}`, { method: 'POST', form });
      delete state.pendingPhoto[jobId];
      await loadLists();
    } catch (err) {
      state.uploadError[jobId] = err.message;
    } finally {
      state.uploadBusy[jobId] = false;
      render();
    }
  }

  // ---------------- rendering ----------------
  function render() {
    // Intervals are cleared before the maps/markers they update are torn
    // down — otherwise a tick that fires in between would try to move a
    // marker on a map that no longer exists.
    Object.values(activeIntervals).forEach(clearInterval);
    activeIntervals = {};
    liveMaps.forEach((m) => m.remove());
    liveMaps = [];
    mapsByJob = {};
    courierMarkers = {};

    root.innerHTML = state.screen === 'auth' ? renderAuth() : renderDashboard();
    if (state.screen === 'dashboard') {
      if (state.user.role === 'customer') initComposeMap();
      state.expanded.forEach((jobId) => {
        const job = findJob(jobId);
        if (job) initMapFor(job);
      });
    }
  }

  function renderAuth() {
    const f = state.authFields;
    const isRegister = state.authMode === 'register';
    return `
      <div class="topbar">
        <div class="topbar-brand"><img src="assets/brand/logo.svg" alt="">Vendaru</div>
      </div>
      <div class="auth-wrap">
        <div class="auth-card">
          <div class="role-toggle">
            <button data-action="switchAuthRole" data-arg="customer" class="${state.authRole === 'customer' ? 'is-active' : ''}">Customer</button>
            <button data-action="switchAuthRole" data-arg="courier" class="${state.authRole === 'courier' ? 'is-active' : ''}">Courier</button>
          </div>
          <div class="mode-toggle">
            <button data-action="switchAuthMode" data-arg="login" class="${!isRegister ? 'is-active' : ''}">Log in</button>
            <span>·</span>
            <button data-action="switchAuthMode" data-arg="register" class="${isRegister ? 'is-active' : ''}">Register</button>
          </div>

          ${isRegister ? `
            <div class="field">
              <label>Full name</label>
              <input data-bind="authFields.full_name" value="${escapeHtml(f.full_name)}" placeholder="Jordan Duberry" />
            </div>` : ''}
          <div class="field">
            <label>Email</label>
            <input data-bind="authFields.email" type="email" value="${escapeHtml(f.email)}" placeholder="you@example.com" />
          </div>
          <div class="field">
            <label>Password</label>
            <input data-bind="authFields.password" type="password" value="${escapeHtml(f.password)}" placeholder="At least 8 characters" />
          </div>

          ${state.authError ? `<div class="form-error">${escapeHtml(state.authError)}</div>` : ''}

          <button class="btn btn-primary" data-action="submitAuth" ${state.authBusy ? 'disabled' : ''}>
            ${state.authBusy ? 'Please wait…' : (isRegister ? `Create ${state.authRole} account` : 'Log in')}
          </button>
          <p class="hint" style="margin-top:14px;text-align:center">
            ${state.authRole === 'customer' ? 'Send a parcel with a courier near you.' : 'Deliver parcels and earn on your own schedule.'}
          </p>

          ${TEST_MODE_SKIP_LOGIN ? `
            <button class="btn btn-ghost" data-action="skipLogin" data-arg="${state.authRole}" style="margin-top:14px;border-style:dashed">
              Skip sign-in — preview as ${state.authRole} (testing)
            </button>
            <p class="hint" style="margin-top:6px;text-align:center">
              Temporary: real accounts can't work yet without a database attached. This bypasses sign-in to preview the dashboard only.
            </p>` : ''}
        </div>
      </div>`;
  }

  function renderTopbar() {
    return `
      <div class="topbar">
        <div class="topbar-brand" data-action="goDashboard"><img src="assets/brand/logo.svg" alt="">Vendaru</div>
        <div class="topbar-who">
          <span>${escapeHtml(state.user.full_name)}</span>
          <span class="role-pill">${state.user.role}</span>
          <button class="logout-btn" data-action="logout">Log out</button>
        </div>
      </div>`;
  }

  function renderDashboard() {
    return renderTopbar() + (state.user.role === 'customer' ? renderCustomerDashboard() : renderCourierDashboard());
  }

  function renderComposeCard() {
    const c = state.compose;

    const formCol = `
      <div class="compose-col">
        <div class="field">
          <label>Pickup address</label>
          <input data-bind="compose.pickup_address" value="${escapeHtml(c.pickup_address)}" placeholder="12 High St, Manchester" />
          <button type="button" class="refresh-btn" style="align-self:flex-start" data-action="useMyLocation" ${c.locating ? 'disabled' : ''}>
            ${c.locating ? 'Finding your location…' : '📍 Use my current location'}
          </button>
          ${c.locateError ? `<div class="form-error">${escapeHtml(c.locateError)}</div>` : ''}
        </div>
        <div class="field">
          <label>Dropoff address</label>
          <input data-bind="compose.dropoff_address" value="${escapeHtml(c.dropoff_address)}" placeholder="4 Kings Rd, Leeds" />
        </div>
        <div class="window-row">
          <div class="field">
            <label>Pickup window start</label>
            <input data-bind="compose.start" type="datetime-local" value="${escapeHtml(c.start)}" />
          </div>
          <div class="field">
            <label>Pickup window end</label>
            <input data-bind="compose.end" type="datetime-local" value="${escapeHtml(c.end)}" />
          </div>
        </div>

        <div class="quote-line">
          ${c.quote ? `<strong>${miles(c.quote.distance_km)}</strong> · estimated <strong>${money(c.quote.price_gbp)}</strong>` : ''}
        </div>
        ${c.quoteError ? `<div class="form-error">${escapeHtml(c.quoteError)}</div>` : ''}

        <div class="compose-actions">
          <button class="btn btn-ghost" data-action="getQuote" ${c.busy ? 'disabled' : ''}>Get quote</button>
          <button class="btn btn-primary" data-action="submitJob" ${c.busy || !c.quote ? 'disabled' : ''}>Post job</button>
        </div>
        <p class="hint" style="margin-top:10px;margin-bottom:0">
          Addresses and pricing use OpenStreetMap — include a street, postcode or town so it can be found.
        </p>
      </div>`;

    const mapCol = `
      <div class="compose-col">
        <div class="job-map" id="compose-map"></div>
      </div>`;

    // Order alone decides left vs right — the layout is a plain flex row on
    // desktop (first child left, second right) and a plain flex column on
    // mobile, so swapping which string comes first is the whole mechanism;
    // nothing else has to know which side is which.
    const columns = state.mapSide === 'left' ? mapCol + formCol : formCol + mapCol;

    return `
      <div class="card">
        <div class="side-toggle">
          <span class="hint" style="margin:0">Map:</span>
          <button type="button" class="${state.mapSide === 'left' ? 'is-active' : ''}" data-action="setMapSide" data-arg="left">Left</button>
          <button type="button" class="${state.mapSide === 'right' ? 'is-active' : ''}" data-action="setMapSide" data-arg="right">Right</button>
        </div>
        <div class="compose-layout">${columns}</div>
      </div>`;
  }

  function renderCustomerDashboard() {
    return `
      <div class="page">
        <h1 class="page-title">Send a parcel</h1>
        <p class="page-sub">Post where it needs to go, get a price, and a courier will pick it up.</p>
        ${renderComposeCard()}

        <div class="section-head">
          <div class="section-label">My jobs</div>
          <button class="refresh-btn" data-action="refreshLists">Refresh</button>
        </div>
        ${renderJobList(state.jobs, { role: 'customer' })}
      </div>`;
  }

  function renderCourierDashboard() {
    return `
      <div class="page">
        <h1 class="page-title">Deliver parcels</h1>
        <p class="page-sub">Accept an open job, then confirm pickup and delivery with a photo.</p>

        <div class="section-head">
          <div class="section-label">Available jobs</div>
          <button class="refresh-btn" data-action="refreshLists">Refresh</button>
        </div>
        ${renderJobList(state.available, { role: 'courier', mode: 'available' })}

        <div class="section-label">My deliveries</div>
        ${renderJobList(state.jobs, { role: 'courier', mode: 'mine' })}
      </div>`;
  }

  function renderJobList(jobs, opts) {
    if (state.listError) return `<div class="form-error">${escapeHtml(state.listError)}</div>`;
    if (!state.listsLoaded) return `<div class="empty-note">Loading…</div>`;
    if (!jobs.length) {
      return `<div class="empty-note">${opts.mode === 'available' ? 'No open jobs right now.' : 'Nothing here yet.'}</div>`;
    }
    return jobs.map((job) => renderJobCard(job, opts)).join('');
  }

  // The always-visible summary is its own clickable region (data-action lives
  // there, not on the outer card), so the expanded detail panel below it —
  // with its own buttons and a file input — sits outside anything that
  // toggles the card. A file input nested inside the toggle region would
  // have both opened the OS file picker AND collapsed the card out from
  // under it on the very same click.
  function renderJobCard(job, opts) {
    const expanded = state.expanded.has(job.id);
    return `
      <div class="job-card">
        <div data-action="toggleExpand" data-arg="${job.id}">
          <div class="job-card-top">
            <span class="job-id">#${job.id}</span>
            <span class="status-badge status-${job.status}">${job.status}</span>
          </div>
          <div class="job-route">${escapeHtml(job.pickup_address)}<span class="arrow">→</span>${escapeHtml(job.dropoff_address)}</div>
          <div class="job-meta">
            <span class="job-price">${money(job.price_gbp)}</span>
            <span>${miles(job.distance_km)}</span>
            <span>${when(job.pickup_window_start)} – ${when(job.pickup_window_end)}</span>
          </div>
        </div>
        ${expanded ? renderJobDetail(job, opts) : ''}
      </div>`;
  }

  function renderJobDetail(job, opts) {
    const steps = [
      ['Posted', job.created_at],
      ['Accepted', job.accepted_at],
      ['Collected', job.collected_at],
      ['Delivered', job.delivered_at],
    ];
    const timeline = steps.map(([label, ts]) => `
      <div class="timeline-row ${ts ? 'is-done' : ''}">
        <span class="timeline-dot"></span>
        <span>${label}${ts ? ' · ' + when(ts) : ''}</span>
      </div>`).join('');

    const photos = [job.pickup_photo_url, job.delivery_photo_url].filter(Boolean);
    const photoRow = photos.length
      ? `<div class="photo-row">${photos.map((url) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"><img class="photo-thumb" src="${escapeHtml(url)}" alt="Proof photo"></a>`).join('')}</div>`
      : '';

    const courierNameLine = (opts.role === 'customer' && job.courier_id)
      ? `<p class="hint" style="margin-top:0">Courier: ${escapeHtml(state.courierNames[job.id] || 'loading…')}</p>`
      : '';

    let courierAction = '';
    if (opts.role === 'courier') {
      if (opts.mode === 'available') {
        courierAction = `<button class="btn btn-primary btn-small" data-action="acceptJob" data-arg="${job.id}">Accept</button>`;
      } else if (job.status === 'ACCEPTED' || job.status === 'COLLECTED') {
        const kind = job.status === 'ACCEPTED' ? 'Pickup' : 'Deliver';
        const label = job.status === 'ACCEPTED' ? 'Upload pickup proof' : 'Upload delivery proof';
        const chosen = state.pendingPhoto[job.id];
        const busy = !!state.uploadBusy[job.id];
        const err = state.uploadError[job.id];
        courierAction = `
          <div class="upload-row">
            <input type="file" accept="image/*" data-photo-for="${job.id}" />
            <button class="btn btn-primary btn-small" data-action="upload${kind}" data-arg="${job.id}" ${busy ? 'disabled' : ''}>
              ${busy ? 'Uploading…' : label}
            </button>
            ${chosen ? `<span class="hint" style="margin:0">${escapeHtml(chosen.name)}</span>` : ''}
          </div>
          ${err ? `<div class="form-error">${escapeHtml(err)}</div>` : ''}`;
      }
    }

    return `
      <div class="job-detail">
        <div class="job-map" id="map-${job.id}"></div>
        ${courierNameLine}
        <div class="timeline">${timeline}</div>
        ${photoRow}
        ${courierAction}
      </div>`;
  }

  // Shared by the compose screen's route preview and a job's own detail
  // panel — one of them may have only a pickup point (GPS taken, no quote
  // yet), the other always has both, so both are optional and the view
  // adapts to whichever is actually known.
  const UK_DEFAULT_CENTER = [54.5, -3.2];
  const UK_DEFAULT_ZOOM = 5;

  // Black-and-white tiles. There's no separate grayscale tile server worth
  // depending on for this (most either need an API key or have their own,
  // stricter usage limits) — a CSS filter on the same free OpenStreetMap
  // tiles gets the same result without a second service to fall over. Scoped
  // to `.job-map .leaflet-tile-pane` in styles.css, not set here, so it
  // applies to every map (compose and job-detail alike) with nothing to wire
  // up per instance.

  // `route`, when given, is { distance_km, price_gbp, geometry } — geometry
  // is the real road-by-road path from OSRM (an array of [lat,lng] points),
  // and drives a solid line through the actual streets a courier would
  // drive. When OSRM had nothing to say (down, rate-limited, no path found),
  // geometry is null/absent and this falls back to the dashed straight line
  // between the two points this app always had — a different line style so
  // "real route" and "straight-line estimate" don't look identical.
  // Distance/price sit as a permanent label directly on whichever line gets
  // drawn, not a popup that needs a click, so the number that actually
  // matters reads straight off the map.
  function createMap(el, pickup, dropoff, route) {
    if (!el || typeof L === 'undefined') return null;
    const map = L.map(el).setView(UK_DEFAULT_CENTER, UK_DEFAULT_ZOOM);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (pickup) L.marker([pickup.lat, pickup.lng]).addTo(map).bindPopup('Pickup');
    if (dropoff) L.marker([dropoff.lat, dropoff.lng]).addTo(map).bindPopup('Dropoff');

    if (pickup && dropoff) {
      const hasRealRoute = route && Array.isArray(route.geometry) && route.geometry.length > 1;
      const path = hasRealRoute ? route.geometry : [[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]];
      const line = L.polyline(path, hasRealRoute
        ? { color: '#141414', weight: 4 }
        : { color: '#141414', weight: 3, dashArray: '6,8' }).addTo(map);
      if (route) {
        line.bindTooltip(`${miles(route.distance_km)} · ${money(route.price_gbp)}`, {
          permanent: true, direction: 'center', className: 'route-label',
        });
      }
      map.fitBounds(line.getBounds(), { padding: [32, 32] });
    } else if (pickup) {
      map.setView([pickup.lat, pickup.lng], 12);
    }
    // With neither point known yet, it stays on the whole-UK default view —
    // a blank grey box isn't a map you can plan anything on, so there's
    // always something to look at, even before an address is typed.

    liveMaps.push(map);
    return map;
  }

  // A courier's live position, added to or moved on an already-open map
  // without touching anything else on it — createMap() is never called
  // again for this, since that would tear down and refit the whole map
  // (tiles, zoom, pan) on every 10-second location update. See
  // startCourierLocationPush/startCustomerLocationPoll below for what
  // drives this.
  function upsertCourierMarker(jobId, lat, lng) {
    const map = mapsByJob[jobId];
    if (!map) return;
    if (courierMarkers[jobId]) {
      courierMarkers[jobId].setLatLng([lat, lng]);
    } else {
      courierMarkers[jobId] = L.circleMarker([lat, lng], {
        radius: 9, weight: 3, color: '#fff', fillColor: '#e63946', fillOpacity: 1,
      }).bindTooltip('Courier — live', { permanent: true, direction: 'top', className: 'route-label' }).addTo(map);
    }
  }

  function initMapFor(job) {
    const el = document.getElementById(`map-${job.id}`);
    const map = createMap(
      el,
      { lat: job.pickup_lat, lng: job.pickup_lng },
      { lat: job.dropoff_lat, lng: job.dropoff_lng },
      { distance_km: job.distance_km, price_gbp: job.price_gbp, geometry: job.route_geometry },
    );
    if (map) mapsByJob[job.id] = map;
    if (job.courier_lat != null && job.courier_lng != null) {
      upsertCourierMarker(job.id, job.courier_lat, job.courier_lng);
    }
    maybeStartTracking(job);
  }

  // The route preview on the "Send a parcel" screen — visible from the
  // moment the screen opens, not only after a job exists to expand. Prefers
  // the last quote's coordinates (both points, real route) over a bare GPS
  // fix (pickup only), since a quote is strictly more complete information.
  function initComposeMap() {
    const el = document.getElementById('compose-map');
    if (!el) return;
    const c = state.compose;
    if (c.quote) {
      createMap(
        el,
        { lat: c.quote.pickup_lat, lng: c.quote.pickup_lng },
        { lat: c.quote.dropoff_lat, lng: c.quote.dropoff_lng },
        { distance_km: c.quote.distance_km, price_gbp: c.quote.price_gbp, geometry: c.quote.route_geometry },
      );
    } else if (c.pickupCoords) {
      createMap(el, c.pickupCoords, null);
    } else {
      createMap(el, null, null);
    }
  }

  // ---------------- live courier tracking ----------------
  //
  // Tied to a job's detail panel being open, not to the job existing: a
  // courier who has 5 jobs accepted isn't broadcasting location for all 5
  // at once, only the one they currently have expanded, and a customer only
  // polls for the one job they're actually looking at. Both sides stop the
  // moment the panel closes, the job reaches DELIVERED, or any other
  // render() happens to tear down the map this was updating (render()
  // clears every interval before it clears the maps, so nothing is left
  // pushing to or reading a marker that no longer exists).
  const LOCATION_INTERVAL_MS = 10000;

  function maybeStartTracking(job) {
    const trackable = job.status === 'ACCEPTED' || job.status === 'COLLECTED';
    if (!trackable || activeIntervals[job.id]) return;
    if (state.user.role === 'courier' && job.courier_id === state.user.id) {
      startCourierLocationPush(job.id);
    } else if (state.user.role === 'customer' && job.courier_id) {
      startCustomerLocationPoll(job.id);
    }
  }

  function startCourierLocationPush(jobId) {
    if (!('geolocation' in navigator)) return;
    const pushOnce = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          api('/api/jobs-location', {
            method: 'POST',
            json: { jobId, lat: pos.coords.latitude, lng: pos.coords.longitude },
          }).catch(() => { /* one missed update is fine; the next tick tries again */ });
        },
        () => {
          // Permission denied or unavailable: stop rather than re-prompt
          // every 10 seconds — a courier who's said no gets left alone.
          clearInterval(activeIntervals[jobId]);
          delete activeIntervals[jobId];
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 5000 },
      );
    };
    pushOnce();
    activeIntervals[jobId] = setInterval(pushOnce, LOCATION_INTERVAL_MS);
  }

  function startCustomerLocationPoll(jobId) {
    const pollOnce = () => {
      api(`/api/jobs-tracking?jobId=${jobId}`)
        .then((t) => {
          if (t.courier_lat != null && t.courier_lng != null) {
            upsertCourierMarker(jobId, t.courier_lat, t.courier_lng);
          }
        })
        .catch(() => { /* the map just keeps showing the last known position */ });
    };
    pollOnce();
    activeIntervals[jobId] = setInterval(pollOnce, LOCATION_INTERVAL_MS);
  }

  // ---------------- event wiring ----------------
  function boot() {
    root = document.getElementById('app');

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      const action = actions[el.dataset.action];
      if (!action) return;
      const raw = el.dataset.arg;
      const arg = raw === undefined ? undefined : (/^-?\d+$/.test(raw) ? Number(raw) : raw);
      action(arg);
    });

    root.addEventListener('input', (e) => {
      const path = e.target.dataset.bind;
      if (!path) return;
      set(state, path, e.target.value);
      // Editing either address invalidates whatever was last quoted — the
      // price and the map on screen would otherwise keep describing a route
      // that isn't what's typed anymore. No render() here (that would drop
      // the cursor mid-keystroke); this just makes sure the next render,
      // whenever it happens, doesn't show stale data alongside fresh text.
      if (path === 'compose.pickup_address' || path === 'compose.dropoff_address') {
        state.compose.quote = null;
        if (path === 'compose.pickup_address') state.compose.pickupCoords = null;
      }
    });

    root.addEventListener('change', (e) => {
      const jobId = e.target.dataset.photoFor;
      if (jobId !== undefined && e.target.files) {
        actions.choosePhoto(Number(jobId), e.target.files);
      }
    });

    resumeSession();
  }

  async function resumeSession() {
    if (!state.token) { state.booting = false; render(); return; }
    try {
      state.user = await api('/api/me');
      state.screen = 'dashboard';
      render();
      await loadLists();
    } catch {
      setToken(null);
      state.screen = 'auth';
      render();
    } finally {
      state.booting = false;
    }
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
