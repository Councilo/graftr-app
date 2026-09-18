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

    compose: { pickup_address: '', dropoff_address: '', start: '', end: '', quote: null, quoteError: null, busy: false },

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
  let trackingMap = null; // the one live Leaflet map instance, if a job detail is open

  // ---------------- tiny helpers ----------------
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function money(n) { return '£' + Number(n).toFixed(2); }
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
  async function api(path, { method = 'GET', json, form, auth = true } = {}) {
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
    refreshLists() {
      loadLists();
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
        state.compose = { pickup_address: '', dropoff_address: '', start: '', end: '', quote: null, quoteError: null, busy: false };
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
    if (trackingMap) { trackingMap.remove(); trackingMap = null; }
    root.innerHTML = state.screen === 'auth' ? renderAuth() : renderDashboard();
    if (state.screen === 'dashboard') {
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
    return `
      <div class="card">
        <div class="field">
          <label>Pickup address</label>
          <input data-bind="compose.pickup_address" value="${escapeHtml(c.pickup_address)}" placeholder="12 High St, Manchester" />
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
          ${c.quote ? `<strong>${c.quote.distance_km} km</strong> · estimated <strong>${money(c.quote.price_gbp)}</strong>` : ''}
        </div>
        ${c.quoteError ? `<div class="form-error">${escapeHtml(c.quoteError)}</div>` : ''}

        <div class="compose-actions">
          <button class="btn btn-ghost" data-action="getQuote" ${c.busy ? 'disabled' : ''}>Get quote</button>
          <button class="btn btn-primary" data-action="submitJob" ${c.busy || !c.quote ? 'disabled' : ''}>Post job</button>
        </div>
        <p class="hint" style="margin-top:10px;margin-bottom:0">
          Quotes are priced from a fixed table of UK towns and cities, not a live map — mention a recognised UK town
          or city in each address.
        </p>
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
            <span>${job.distance_km} km</span>
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

  function initMapFor(job) {
    const el = document.getElementById(`map-${job.id}`);
    if (!el || typeof L === 'undefined') return;
    const map = L.map(el).setView([job.pickup_lat, job.pickup_lng], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker([job.pickup_lat, job.pickup_lng]).addTo(map).bindPopup('Pickup');
    L.marker([job.dropoff_lat, job.dropoff_lng]).addTo(map).bindPopup('Dropoff');
    const line = L.polyline(
      [[job.pickup_lat, job.pickup_lng], [job.dropoff_lat, job.dropoff_lng]],
      { color: '#141414', weight: 2, dashArray: '4,6' },
    ).addTo(map);
    map.fitBounds(line.getBounds(), { padding: [24, 24] });
    trackingMap = map;
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
