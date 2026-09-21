// Vendaru — the panels that sit on top of the app: Help, Account, refund
// requests, sharing a tracking link, payment instructions, and the Admin
// dashboard.
//
// They live in their own container OUTSIDE the app's #app root on purpose. The
// app redraws #app every few seconds while it polls for job updates; a form
// typed into here (a support message, a refund reason, an admin reply) would be
// wiped by that redraw if it lived inside. Nothing in this file touches the app's
// DOM, and it reaches the app only through window.VendaruApp (set by app.js).
//
// No inline event handlers anywhere (the site's Content-Security-Policy forbids
// them): one delegated click / submit / input listener on the container.
(function () {
  'use strict';

  const app = () => window.VendaruApp || {};
  const API = (path, opts) => app().api(path, opts);

  // ---------------------------------------------------------------- helpers
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  const money = (n) => '£' + Number(n || 0).toFixed(2);
  function when(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
  const nice = (s) => String(s || '').toLowerCase().replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
  function chip(text, kind) { return `<span class="pn-chip pn-chip-${kind || 'grey'}">${esc(text)}</span>`; }
  const STATUS_KIND = {
    OPEN: 'blue', IN_PROGRESS: 'blue', PENDING: 'amber', UNPAID: 'amber', PAID: 'green', APPROVED: 'green', AUTO_APPROVED: 'green',
    RESOLVED: 'green', PARTIALLY_APPROVED: 'blue', PARTIALLY_REFUNDED: 'blue', REFUNDED: 'green', DENIED: 'red', VOID: 'grey', CLOSED: 'grey',
    CANCELLED: 'grey', DELIVERED: 'green', ACCEPTED: 'blue', COLLECTED: 'blue',
  };
  const statusChip = (s) => chip(nice(s), STATUS_KIND[s] || 'grey');
  function errText(err) { return (err && err.message) || 'Something went wrong. Please try again.'; }

  // ------------------------------------------------------------------ toast
  let toastHost = null;
  function toast(message, kind) {
    if (!toastHost) {
      toastHost = document.createElement('div');
      toastHost.className = 'pn-toasts';
      toastHost.setAttribute('role', 'status');
      toastHost.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastHost);
    }
    const el = document.createElement('div');
    el.className = 'pn-toast' + (kind === 'error' ? ' is-error' : '');
    el.textContent = message;
    toastHost.appendChild(el);
    setTimeout(() => { el.classList.add('is-leaving'); setTimeout(() => el.remove(), 300); }, kind === 'error' ? 6000 : 3500);
  }

  // ------------------------------------------------------------ the shell
  let host = null;
  let body = null;
  let current = null; // { name, opts, tab, ... }
  let lastFocus = null;

  const PANELS = {};

  function ensureHost() {
    if (host) return;
    host = document.createElement('div');
    host.id = 'panels-root';
    document.body.appendChild(host);
    host.addEventListener('click', onClick);
    host.addEventListener('submit', onSubmit);
    host.addEventListener('input', onInput);
    document.addEventListener('keydown', (e) => {
      if (!current) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') trapFocus(e);
    });
  }

  function trapFocus(e) {
    const nodes = host.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, summary, [tabindex]:not([tabindex="-1"])');
    const list = Array.from(nodes).filter((n) => n.offsetParent !== null);
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open(name, opts) {
    const panel = PANELS[name];
    if (!panel) return;
    ensureHost();
    if (!current) lastFocus = document.activeElement;
    current = { name, opts: opts || {}, tab: (opts && opts.tab) || panel.defaultTab || null };
    host.innerHTML = `
      <div class="pn-overlay" data-pn="backdrop">
        <div class="pn-sheet pn-sheet-${esc(name)}" role="dialog" aria-modal="true" aria-labelledby="pn-title">
          <div class="pn-head">
            <h2 id="pn-title" class="pn-title">${esc(typeof panel.title === 'function' ? panel.title(current) : panel.title)}</h2>
            <button type="button" class="pn-x" data-pn="close" aria-label="Close">&times;</button>
          </div>
          <div class="pn-body" id="pn-body"></div>
        </div>
      </div>`;
    body = host.querySelector('#pn-body');
    document.documentElement.classList.add('pn-open');
    panel.render(current);
    const focusTarget = host.querySelector('.pn-x');
    if (focusTarget) focusTarget.focus();
  }

  function close() {
    if (!current) return;
    current = null;
    if (host) host.innerHTML = '';
    document.documentElement.classList.remove('pn-open');
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) { try { lastFocus.focus(); } catch (e) { /* element gone */ } }
    lastFocus = null;
  }

  // Redraw the current panel's body (keeps the shell, so focus stays in the dialog).
  function redraw() { if (current) PANELS[current.name].render(current); }

  // ----------------------------------------------------- event delegation
  const ACTIONS = {};   // data-pn="name"
  const FORMS = {};     // <form data-pn-form="name">
  const INPUTS = {};    // data-pn-input="name"

  function onClick(e) {
    const el = e.target.closest('[data-pn]');
    if (!el) return;
    const name = el.dataset.pn;
    if (name === 'backdrop') { if (e.target === el) close(); return; }
    if (name === 'close') { close(); return; }
    const fn = ACTIONS[name];
    if (fn) { e.preventDefault(); fn(el, e); }
  }
  function onSubmit(e) {
    const form = e.target.closest('[data-pn-form]');
    if (!form) return;
    e.preventDefault();
    const fn = FORMS[form.dataset.pnForm];
    if (fn) fn(form, e);
  }
  function onInput(e) {
    const el = e.target.closest && e.target.closest('[data-pn-input]');
    if (!el) return;
    const fn = INPUTS[el.dataset.pnInput];
    if (fn) fn(el, e);
  }

  // Busy state for a button while a request is in flight.
  async function withBusy(button, work) {
    if (button) { button.disabled = true; button.dataset.label = button.textContent; button.textContent = 'Please wait…'; }
    try { return await work(); }
    finally { if (button && document.contains(button)) { button.disabled = false; button.textContent = button.dataset.label; } }
  }
  const val = (form, name) => { const f = form.elements[name]; return f ? String(f.value || '').trim() : ''; };
  function setMsg(container, text, kind) {
    const el = container.querySelector('.pn-msg');
    if (!el) return;
    el.className = 'pn-msg' + (text ? (kind === 'ok' ? ' is-ok' : ' is-error') : '');
    el.textContent = text || '';
  }

  const LEGAL_LINKS = [
    ['Terms of Service', '/terms.html'], ['Privacy Policy', '/privacy.html'], ['Refund & Cancellation', '/refund-policy.html'],
    ['Courier Terms', '/courier-terms.html'], ['Location Tracking', '/location-policy.html'],
    ['Prohibited Items', '/prohibited-items.html'], ['Cookies & Storage', '/cookies.html'],
  ];
  const legalLinks = () => `<ul class="pn-links">${LEGAL_LINKS.map(([t, h]) => `<li><a href="${h}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('')}</ul>`;

  // ================================================================== HELP
  const HELP_CATEGORIES = [
    ['order', 'An order'], ['refund', 'A refund'], ['payment', 'Payment'], ['account', 'My account'],
    ['safety', 'Safety or a problem with someone'], ['feedback', 'Feedback'], ['other', 'Something else'],
  ];
  const faqCats = { all: 'All', ordering: 'Ordering', payments: 'Payments & refunds', couriers: 'Couriers', tracking: 'Tracking', safety: 'Safety', account: 'Account' };

  PANELS.help = {
    title: 'Help & support',
    defaultTab: 'faq',
    render(ctx) {
      const user = app().user && app().user();
      const tabs = [];
      if (user && user.role === 'customer') tabs.push(['orders', 'Orders']);
      tabs.push(['faq', 'Answers'], ['contact', 'Contact us']);
      if (user) tabs.push(['tickets', 'My requests']);
      body.innerHTML = `
        <p class="pn-emergency"><strong>In an emergency, call 999.</strong> Vendaru can't send help. Everything else, we can sort out here.</p>
        <div class="pn-tabs pn-tabs-pill" role="tablist">
          ${tabs.map(([id, label]) => `<button type="button" role="tab" class="pn-tab ${ctx.tab === id ? 'is-active' : ''}" aria-selected="${ctx.tab === id}" data-pn="helpTab" data-arg="${id}">${esc(label)}</button>`).join('')}
        </div>
        <div id="pn-help-pane"></div>
        <div class="pn-foot">
          <div class="pn-foot-title">Policies</div>
          ${legalLinks()}
          <p class="pn-small">Complaints: use <em>Contact us</em> above and choose the category that fits — we'll acknowledge it and come back to you. <a href="/help.html" target="_blank" rel="noopener">Full help page</a></p>
        </div>`;
      const pane = body.querySelector('#pn-help-pane');
      if (ctx.tab === 'orders' && user && user.role === 'customer') helpOrders(pane);
      else if (ctx.tab === 'contact') helpContact(pane, ctx);
      else if (ctx.tab === 'tickets' && user) helpTickets(pane, ctx);
      else helpFaq(pane, ctx);
    },
  };
  // Everything a customer can do with an order lives here, not on the order cards: cancel it
  // (or why it can't be), share its tracking link, ask for a refund, pay, remove it, get help.
  function helpOrders(pane) {
    const caps = app().orderCaps || (() => ({}));
    const jobs = ((app().jobs && app().jobs()) || []).slice().sort((x, y) => new Date(y.created_at) - new Date(x.created_at)).slice(0, 30);
    if (!jobs.length) { pane.innerHTML = '<p class="pn-empty">You have no orders yet.</p>'; return; }
    const place = (a) => String(a || '').split(',')[0];
    const payLabel = { UNPAID: 'Awaiting payment', PAID: 'Paid', PARTIALLY_REFUNDED: 'Part refunded', REFUNDED: 'Refunded', VOID: 'Not charged' };
    pane.innerHTML = `<p class="pn-small">Cancel an order, share its tracking link, ask for a refund, or get help with a specific order.</p>${jobs.map((j) => {
      const c = caps(j);
      return `
        <article class="pn-item">
          <div class="pn-row"><div><strong>Order #${j.id}</strong><div class="pn-small">${esc(place(j.pickup_address))} → ${esc(place(j.dropoff_address))} · ${money(j.price_gbp)} · ${esc(when(j.created_at))}</div></div>
            <div>${statusChip(j.status)}${j.payment_status ? ' ' + chip(payLabel[j.payment_status] || nice(j.payment_status), STATUS_KIND[j.payment_status] || 'grey') : ''}</div></div>
          ${Number(j.refunded_gbp) ? `<div class="pn-small">Refunded ${money(j.refunded_gbp)}</div>` : ''}
          ${j.refund_status === 'PENDING' ? '<div class="pn-small">A refund request is being reviewed.</div>' : ''}
          ${c.cancelLocked ? `<div class="cancel-lock-note" role="note"><strong>Cancelling now will incur a fee</strong>, so it can't be done here. <button type="button" class="pn-link" data-pn="orderCancelHelp" data-arg="${j.id}">Contact support to cancel</button></div>` : ''}
          <div class="pn-btnrow" style="margin-top:8px">
            ${c.canCancel ? `<button type="button" class="pn-btn pn-btn-danger" data-pn="orderCancel" data-arg="${j.id}">Cancel order</button>` : ''}
            ${c.cancelLocked ? '<button type="button" class="pn-btn" disabled aria-disabled="true" title="Cancelling now incurs a fee">🔒 Cancel order</button>' : ''}
            ${c.canPay ? `<button type="button" class="pn-btn" data-pn="orderPay" data-arg="${j.id}">How to pay</button>` : ''}
            ${c.canShare ? `<button type="button" class="pn-btn" data-pn="orderShare" data-arg="${j.id}">Share tracking link</button>` : ''}
            ${c.canRefund ? `<button type="button" class="pn-btn" data-pn="orderRefund" data-arg="${j.id}">Request refund</button>` : ''}
            ${c.canRemove ? `<button type="button" class="pn-btn" data-pn="orderRemove" data-arg="${j.id}">Remove</button>` : ''}
            ${j.status !== 'OPEN' ? `<button type="button" class="pn-btn" data-pn="orderHelp" data-arg="${j.id}">${j.status === 'COLLECTED' ? 'Report a problem' : 'Get help'}</button>` : ''}
          </div>
        </article>`;
    }).join('')}`;
  }
  const orderById = (el) => ((app().jobs && app().jobs()) || []).find((j) => String(j.id) === el.dataset.arg);
  ACTIONS.orderCancel = async (el) => { if (app().cancelOrder) await app().cancelOrder(Number(el.dataset.arg)); if (current && current.name === 'help') redraw(); };
  ACTIONS.orderRemove = async (el) => { if (app().deleteOrder) await app().deleteOrder(Number(el.dataset.arg)); if (current && current.name === 'help') redraw(); };
  ACTIONS.orderShare = (el) => { const job = orderById(el); if (job) open('share', { job }); };
  ACTIONS.orderRefund = (el) => { const job = orderById(el); if (job) open('refund', { job }); };
  ACTIONS.orderPay = (el) => { const job = orderById(el); if (job) open('pay', { job }); };
  ACTIONS.orderHelp = (el) => {
    const job = orderById(el);
    open('help', { tab: 'contact', jobId: el.dataset.arg, category: 'order', subject: job && job.status === 'COLLECTED' ? `Problem with order #${el.dataset.arg}` : '' });
  };
  ACTIONS.orderCancelHelp = (el) => open('help', { tab: 'contact', jobId: el.dataset.arg, category: 'order', subject: `Cancel order #${el.dataset.arg}` });
  ACTIONS.helpTab = (el) => { current.tab = el.dataset.arg; redraw(); };

  function helpFaq(pane, ctx) {
    const faq = Array.isArray(window.VENDARU_FAQ) ? window.VENDARU_FAQ : [];
    ctx.faqCat = ctx.faqCat || 'all';
    ctx.faqQ = ctx.faqQ || '';
    const cats = ['all'].concat(Array.from(new Set(faq.map((f) => f.cat))).filter(Boolean));
    pane.innerHTML = `
      <label class="pn-sr" for="pn-faq-q">Search the help articles</label>
      <input id="pn-faq-q" class="pn-input" type="search" placeholder="Search — e.g. refund, tracking, price" value="${esc(ctx.faqQ)}" data-pn-input="faqSearch" autocomplete="off" />
      <div class="pn-chips" role="group" aria-label="Topic">
        ${cats.map((c) => `<button type="button" class="pn-pill ${ctx.faqCat === c ? 'is-active' : ''}" data-pn="faqCat" data-arg="${esc(c)}" aria-pressed="${ctx.faqCat === c}">${esc(faqCats[c] || nice(c))}</button>`).join('')}
      </div>
      <div id="pn-faq-list" class="pn-faq" aria-live="polite"></div>`;
    renderFaqList(ctx);
  }
  function renderFaqList(ctx) {
    const list = body.querySelector('#pn-faq-list');
    if (!list) return;
    const faq = Array.isArray(window.VENDARU_FAQ) ? window.VENDARU_FAQ : [];
    const words = ctx.faqQ.toLowerCase().split(/\s+/).filter(Boolean);
    const found = faq.filter((f) => (ctx.faqCat === 'all' || f.cat === ctx.faqCat)
      && words.every((w) => (f.q + ' ' + f.a).toLowerCase().includes(w)));
    if (!faq.length) { list.innerHTML = '<p class="pn-empty">The help articles could not be loaded. You can still contact us.</p>'; return; }
    if (!found.length) {
      list.innerHTML = `<p class="pn-empty">No answers match that. <button type="button" class="pn-link" data-pn="helpTab" data-arg="contact">Ask us directly</button></p>`;
      return;
    }
    list.innerHTML = found.map((f) => `
      <details class="pn-qa">
        <summary>${esc(f.q)}</summary>
        <div class="pn-qa-a">${String(f.a).split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join('')}
          ${f.link && /^\//.test(f.link.href) ? `<p><a href="${esc(f.link.href)}" target="_blank" rel="noopener">${esc(f.link.label)}</a></p>` : ''}
        </div>
      </details>`).join('') + `<p class="pn-small">Still stuck? <button type="button" class="pn-link" data-pn="helpTab" data-arg="contact">Contact us</button></p>`;
  }
  ACTIONS.faqCat = (el) => { current.faqCat = el.dataset.arg; helpFaq(body.querySelector('#pn-help-pane'), current); };
  INPUTS.faqSearch = (el) => { current.faqQ = el.value; renderFaqList(current); };

  function helpContact(pane, ctx) {
    const user = app().user && app().user();
    const jobs = (app().jobs && app().jobs()) || [];
    const jobId = ctx.opts.jobId || '';
    const category = ctx.opts.category || (jobId ? 'order' : 'other');
    if (ctx.sentTicket) {
      pane.innerHTML = `<div class="pn-done"><div class="pn-done-icon">✓</div><h3>Thanks — we've got it</h3>
        <p>Your request is number <strong>#${esc(ctx.sentTicket)}</strong>. ${user ? 'Replies will appear under <em>My requests</em>.' : 'We\'ll reply by email.'}</p>
        <button type="button" class="pn-btn" data-pn="${user ? 'helpTab' : 'close'}" data-arg="tickets">${user ? 'View my requests' : 'Close'}</button></div>`;
      return;
    }
    pane.innerHTML = `
      <form data-pn-form="contact" class="pn-form" novalidate>
        ${user ? '' : `
        <label class="pn-label">Your name<input class="pn-input" name="name" maxlength="100" autocomplete="name" required /></label>
        <label class="pn-label">Your email<input class="pn-input" name="email" type="email" maxlength="254" autocomplete="email" required /></label>`}
        <label class="pn-label">What is it about?
          <select class="pn-input" name="category">${HELP_CATEGORIES.map(([v, l]) => `<option value="${v}" ${v === category ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>
        </label>
        ${user && jobs.length ? `
        <label class="pn-label">Which order? <span class="pn-opt">(optional)</span>
          <select class="pn-input" name="job_id"><option value="">Not about a specific order</option>
            ${jobs.map((j) => `<option value="${j.id}" ${String(j.id) === String(jobId) ? 'selected' : ''}>Order #${j.id} — ${esc(j.status.toLowerCase())}, ${money(j.price_gbp)}</option>`).join('')}
          </select>
        </label>` : ''}
        <label class="pn-label">Subject<input class="pn-input" name="subject" maxlength="120" value="${esc(ctx.opts.subject || '')}" required /></label>
        <label class="pn-label">Tell us what happened<textarea class="pn-input" name="message" rows="5" maxlength="3000" required></textarea></label>
        <div class="pn-hp" aria-hidden="true"><label>Leave this empty<input name="website" tabindex="-1" autocomplete="off" /></label></div>
        <div class="pn-msg" role="alert"></div>
        <button type="submit" class="pn-btn pn-btn-primary">Send</button>
      </form>`;
  }
  FORMS.contact = async (form) => {
    const user = app().user && app().user();
    const payload = { category: val(form, 'category'), subject: val(form, 'subject'), message: val(form, 'message'), website: val(form, 'website') };
    if (!user) { payload.name = val(form, 'name'); payload.email = val(form, 'email'); }
    else if (val(form, 'job_id')) payload.job_id = Number(val(form, 'job_id'));
    if (payload.subject.length < 3) return setMsg(form, 'Please add a short subject.');
    if (payload.message.length < 10) return setMsg(form, 'Please tell us a little more (at least 10 characters).');
    if (!user && (!payload.name || !/^\S+@\S+\.\S+$/.test(payload.email))) return setMsg(form, 'Please give your name and a valid email so we can reply.');
    setMsg(form, '');
    try {
      const sent = await withBusy(form.querySelector('[type="submit"]'), () => API('/api/support-create', { method: 'POST', json: payload, auth: !!user }));
      current.sentTicket = (sent && sent.id) || '—';
      redraw();
    } catch (err) { setMsg(form, errText(err)); }
  };

  async function helpTickets(pane, ctx) {
    pane.innerHTML = '<p class="pn-empty">Loading…</p>';
    try {
      const tickets = await API('/api/support-mine');
      ctx.tickets = tickets || [];
      if (!ctx.tickets.length) { pane.innerHTML = '<p class="pn-empty">You haven\'t contacted us yet. <button type="button" class="pn-link" data-pn="helpTab" data-arg="contact">Start a request</button></p>'; return; }
      pane.innerHTML = ctx.tickets.map((t) => `
        <details class="pn-ticket" ${String(ctx.openTicket) === String(t.id) ? 'open' : ''}>
          <summary><span class="pn-ticket-subject">${esc(t.subject)}</span> ${statusChip(t.status)} <span class="pn-small">#${t.id} · ${esc(when(t.updated_at))}</span></summary>
          <div class="pn-thread">
            <div class="pn-msg-you"><div class="pn-who">You · ${esc(when(t.created_at))}</div>${esc(t.message)}</div>
            ${(t.replies || []).map((r) => `<div class="${r.sender_role === 'admin' ? 'pn-msg-team' : 'pn-msg-you'}"><div class="pn-who">${r.sender_role === 'admin' ? 'Vendaru team' : 'You'} · ${esc(when(r.created_at))}</div>${esc(r.content)}</div>`).join('')}
            ${t.status === 'CLOSED' ? '<p class="pn-small">This request is closed. Start a new one if you need more help.</p>' : `
            <form data-pn-form="ticketReply" data-ticket="${t.id}" class="pn-form pn-inline">
              <label class="pn-sr" for="tr-${t.id}">Your reply</label>
              <textarea id="tr-${t.id}" class="pn-input" name="content" rows="2" maxlength="2000" placeholder="Write a reply…" required></textarea>
              <div class="pn-msg" role="alert"></div>
              <button type="submit" class="pn-btn">Reply</button>
            </form>`}
          </div>
        </details>`).join('');
    } catch (err) { pane.innerHTML = `<p class="pn-error">${esc(errText(err))}</p>`; }
  }
  FORMS.ticketReply = async (form) => {
    const content = val(form, 'content');
    if (content.length < 2) return setMsg(form, 'Write a reply first.');
    try {
      await withBusy(form.querySelector('[type="submit"]'), () => API('/api/support-reply', { method: 'POST', json: { ticketId: Number(form.dataset.ticket), content } }));
      current.openTicket = form.dataset.ticket;
      helpTickets(body.querySelector('#pn-help-pane'), current);
    } catch (err) { setMsg(form, errText(err)); }
  };

  // ============================================================== ACCOUNT
  // Account: a menu page (name, four tiles, a plain list) whose items open screens inside the
  // panel: Personal info, Security (password, agreements), Payments (what you owe / have paid /
  // been refunded, or, for a courier, what you have delivered), Your data and Legal.
  const ICO = {
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  };
  const svgIcon = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  Object.assign(ICO, {
    wallet: svgIcon('<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>'),
    shield: svgIcon('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    sun: svgIcon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'),
    moon: svgIcon('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
    download: svgIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    file: svgIcon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'),
    logout: svgIcon('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'),
    grid: svgIcon('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'),
    back: svgIcon('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'),
  });
  const initialsOf = (name) => {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    return parts.length ? (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() : '?';
  };
  const currentUser = () => (app().user && app().user()) || {};

  // The panel opens on a menu: your name and avatar, four big tiles, then a plain list.
  // Every tile and row opens its own screen inside the panel, with a back arrow.
  const ACCT_TITLES = { profile: 'Personal info', security: 'Password & agreements', data: 'Your data', legal: 'Legal' };
  const acctTitle = (screen, u) => (screen === 'payments' ? (u.role === 'courier' ? 'Earnings' : 'Payments') : ACCT_TITLES[screen]);
  const acctGo = (screen) => `data-pn="acctTab" data-arg="${screen}"`;
  const acctRow = (attrs, icon, title, sub) => `
    <button type="button" class="acct-row" ${attrs}>
      <span class="acct-row-ico" aria-hidden="true">${ICO[icon]}</span>
      <span class="acct-row-text"><strong>${esc(title)}</strong>${sub ? `<small>${esc(sub)}</small>` : ''}</span>
    </button>`;

  PANELS.account = {
    title: 'My account',
    defaultTab: 'home',
    render(ctx) {
      const u = currentUser();
      const screen = (ACCT_TITLES[ctx.tab] || ctx.tab === 'payments') ? ctx.tab : 'home';
      const heading = host.querySelector('#pn-title');
      if (heading) heading.textContent = screen === 'home' ? 'My account' : acctTitle(screen, u);
      if (ctx.shown !== screen) { ctx.shown = screen; body.scrollTop = 0; }
      if (screen === 'home') { acctHome(u); return; }
      body.innerHTML = `
        <div class="acct-sub">
          <button type="button" class="acct-back" data-pn="acctBack" aria-label="Back to your account">${ICO.back}</button>
          <h2 class="acct-h">${esc(acctTitle(screen, u))}</h2>
        </div>
        <div id="pn-acct-pane"></div>`;
      const pane = body.querySelector('#pn-acct-pane');
      if (screen === 'profile') acctProfile(pane, u);
      else if (screen === 'security') acctSecurity(pane, u, ctx);
      else if (screen === 'payments') acctPayments(pane, u);
      else if (screen === 'data') acctData(pane);
      else acctLegal(pane);
    },
  };
  ACTIONS.acctTab = (el) => { current.tab = el.dataset.arg; current.focusPassword = el.dataset.focus === 'password'; redraw(); };
  ACTIONS.acctBack = () => { current.tab = 'home'; redraw(); };

  function acctHome(u) {
    const courier = u.role === 'courier';
    const jobs = (app().jobs && app().jobs()) || [];
    const delivered = jobs.filter((j) => j.status === 'DELIVERED').length;
    const owed = courier ? 0 : jobs.filter((j) => j.payment_status === 'UNPAID')
      .reduce((sum, j) => sum + Number(j.payment_amount_gbp != null ? j.payment_amount_gbp : j.price_gbp), 0);
    const termsStale = !!(u.terms_version_current && u.terms_version !== u.terms_version_current);
    const needsLocation = courier && !u.location_consent_at;
    const needsEmail = !!(u.email_verification_required && !u.email_verified);
    const dark = !!(window.VendaruTheme && window.VendaruTheme.get() === 'dark');
    const tile = (attrs, icon, label, badge) => `
      <button type="button" class="acct-tile" ${attrs}>
        <span class="acct-tile-ico" aria-hidden="true">${ICO[icon]}</span>
        <span>${esc(label)}</span>
        ${badge ? `<span class="acct-tile-badge">${esc(badge)}</span>` : ''}
      </button>`;
    const card = (title, text, action, label) => `
      <div class="acct-card" role="status">
        <div class="acct-card-text"><strong>${esc(title)}</strong><small>${esc(text)}</small></div>
        <button type="button" class="acct-card-btn" data-pn="${action}">${esc(label)}</button>
      </div>`;
    body.innerHTML = `
      <div class="acct-top">
        <div class="acct-who">
          <h1 class="acct-name">${esc(u.full_name || 'Your account')}</h1>
          <div class="acct-chips">
            ${chip(courier ? 'Courier' : 'Customer', 'blue')}
            ${delivered ? chip(`${delivered} delivered`, 'green') : ''}
            ${termsStale ? chip('Terms need review', 'amber') : ''}
            ${needsEmail ? chip('Email not confirmed', 'amber') : ''}
          </div>
        </div>
        <div class="pn-avatar" aria-hidden="true">${esc(initialsOf(u.full_name))}</div>
      </div>
      ${termsStale ? card('Review our updated Terms', 'We have updated the Terms & Privacy Policy. Please confirm you agree.', 'acceptTerms', 'I agree') : ''}
      ${needsEmail ? card('Confirm your email', `We sent a link to ${u.email}. You need it before you can ${courier ? 'accept' : 'post'} an order.`, 'resendVerification', 'Send again') : ''}
      ${needsLocation ? card('Turn on location sharing', "Customers can't follow your deliveries until you agree.", 'enableLocation', 'Agree') : ''}
      <div class="acct-tiles">
        ${tile('data-pn="openHelpPanel"', 'help', 'Help')}
        ${tile(acctGo('payments'), 'wallet', courier ? 'Earnings' : 'Payments', owed > 0 ? `${money(owed)} due` : '')}
        ${tile(acctGo('profile'), 'user', 'Personal info')}
        ${tile(acctGo('security'), 'shield', 'Security')}
      </div>
      <div class="acct-list">
        ${acctRow('data-pn="toggleTheme"', dark ? 'moon' : 'sun', 'Appearance', dark ? 'Dark mode · tap for light' : 'Light mode · tap for dark')}
        ${acctRow(acctGo('data'), 'download', 'Your data', 'Download it, or delete your account')}
        ${acctRow(acctGo('legal'), 'file', 'Legal', 'Terms, privacy and other policies')}
        ${u.is_admin ? acctRow('data-pn="openAdmin"', 'grid', 'Admin dashboard', 'Refunds, payments and support requests') : ''}
        ${acctRow('data-pn="logoutNow"', 'logout', 'Log out', '')}
      </div>`;
  }

  function acctProfile(pane, u) {
    pane.innerHTML = `
      <form data-pn-form="profile" class="pn-form" novalidate>
        <label class="pn-label">Full name
          <span class="pn-field"><input class="pn-input" name="full_name" value="${esc(u.full_name)}" maxlength="100" autocomplete="name" required /><span class="pn-field-ico">${ICO.user}</span></span>
        </label>
        <label class="pn-label">Phone number <span class="pn-opt">(optional · only our support team can see it)</span>
          <span class="pn-field"><input class="pn-input" name="phone" type="tel" value="${esc(u.phone || '')}" maxlength="24" autocomplete="tel" placeholder="07700 900123" /><span class="pn-field-ico">${ICO.phone}</span></span>
        </label>
        <label class="pn-label">Email
          <span class="pn-field"><input class="pn-input" name="email" type="email" value="${esc(u.email)}" maxlength="254" autocomplete="email" required data-pn-input="profileEmail" /><span class="pn-field-ico">${ICO.mail}</span></span>
        </label>
        <label class="pn-label" id="pn-email-pw" hidden>Current password <span class="pn-opt">(needed to change your email)</span>
          <span class="pn-field"><input class="pn-input" name="current_password" type="password" autocomplete="current-password" /><span class="pn-field-ico">${ICO.lock}</span></span>
        </label>
        <div class="pn-label">Password
          <button type="button" class="pn-field pn-field-btn" data-pn="acctTab" data-arg="security" data-focus="password" aria-label="Change your password">
            <span class="pn-input pn-fake">\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022</span><span class="pn-field-ico">${ICO.eyeOff}</span>
          </button>
        </div>
        <div class="pn-msg" role="alert"></div>
        <button type="submit" class="pn-btn pn-btn-accent pn-btn-block">Save</button>
      </form>`;
  }
  // Changing the email asks for the current password; only show that box when it is changed.
  INPUTS.profileEmail = (el) => {
    const changed = el.value.trim().toLowerCase() !== String(currentUser().email || '').toLowerCase();
    const box = body.querySelector('#pn-email-pw');
    if (box) box.hidden = !changed;
  };
  FORMS.profile = async (form) => {
    const u = currentUser();
    const full_name = val(form, 'full_name');
    const phone = val(form, 'phone');
    const email = val(form, 'email').toLowerCase();
    if (!full_name) return setMsg(form, 'Enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg(form, 'Enter a valid email address.');
    const payload = { full_name, phone, email };
    if (email !== String(u.email || '').toLowerCase()) {
      const pw = form.elements.current_password.value;
      if (!pw) return setMsg(form, 'Enter your current password to change your email.');
      payload.current_password = pw;
    }
    setMsg(form, '');
    try {
      await withBusy(form.querySelector('[type="submit"]'), () => API('/api/account-profile', { method: 'POST', json: payload }));
      await refreshUser();
      toast(payload.current_password && u.email_verification_required ? 'Profile saved. We sent a confirmation link to your new email address.' : 'Profile saved');
      current.tab = 'home';
      redraw();
    } catch (err) { setMsg(form, errText(err)); }
  };

  function acctSecurity(pane, u, ctx) {
    const courier = u.role === 'courier';
    const termsStale = !!(u.terms_version_current && u.terms_version !== u.terms_version_current);
    pane.innerHTML = `
      <section class="pn-sec" id="pn-pw-section">
        <h3>Change password</h3>
        <form data-pn-form="password" class="pn-form">
          <label class="pn-label">Current password<input class="pn-input" type="password" name="current" autocomplete="current-password" required /></label>
          <label class="pn-label">New password <span class="pn-opt">(8–72 characters)</span><input class="pn-input" type="password" name="next" autocomplete="new-password" minlength="8" maxlength="72" required /></label>
          <div class="pn-msg" role="alert"></div>
          <button type="submit" class="pn-btn">Change password</button>
        </form>
      </section>
      <section class="pn-sec">
        <h3>Agreements</h3>
        <ul class="pn-facts">
          <li>Terms &amp; Privacy: ${u.terms_accepted_at ? `accepted ${esc(when(u.terms_accepted_at))} (version ${esc(u.terms_version || '')})` : '<strong>not recorded</strong>'}</li>
          ${courier ? `<li>Location sharing on deliveries: ${u.location_consent_at ? `agreed ${esc(when(u.location_consent_at))}` : '<strong>not agreed</strong> — customers can\'t see your progress'}</li>` : ''}
        </ul>
        ${termsStale ? `<button type="button" class="pn-btn pn-btn-primary" data-pn="acceptTerms">I accept the current Terms &amp; Privacy Policy</button>` : ''}
        ${courier && !u.location_consent_at ? `<button type="button" class="pn-btn" data-pn="enableLocation">Agree to location sharing</button>` : ''}
      </section>`;
    if (ctx.focusPassword) {
      ctx.focusPassword = false;
      const section = pane.querySelector('#pn-pw-section');
      if (section) section.scrollIntoView({ block: 'start' });
      const field = pane.querySelector('input[name="current"]');
      if (field) field.focus({ preventScroll: true });
    }
  }

  function acctData(pane) {
    pane.innerHTML = `
      <p class="pn-small">Download everything we hold about you as a file, or delete your account.</p>
      <button type="button" class="pn-btn" data-pn="exportData">Download my data</button>
      <details class="pn-danger">
          <summary>Delete my account</summary>
          <p class="pn-small">Your name, email and phone number are removed and you can't sign in again. Orders, payment and refund records are kept for accounting and dispute purposes, without your name. You can't delete while a delivery is in progress.</p>
          <form data-pn-form="deleteAccount" class="pn-form">
            <label class="pn-label">Confirm with your password<input class="pn-input" type="password" name="password" autocomplete="current-password" required /></label>
            <div class="pn-msg" role="alert"></div>
            <button type="submit" class="pn-btn pn-btn-danger">Permanently delete my account</button>
          </form>
        </details>`;
  }

  function acctLegal(pane) {
    pane.innerHTML = `<div class="acct-list">${LEGAL_LINKS.map(([title, href]) => `
      <a class="acct-row" href="${href}" target="_blank" rel="noopener">
        <span class="acct-row-ico" aria-hidden="true">${ICO.file}</span>
        <span class="acct-row-text"><strong>${esc(title)}</strong></span>
      </a>`).join('')}</div>`;
  }

  // What has been paid, is owed, or was given back — from the orders the app already holds.
  function acctPayments(pane, u) {
    const jobs = ((app().jobs && app().jobs()) || []).slice().sort((x, y) => new Date(y.created_at) - new Date(x.created_at));
    const place = (a) => String(a || '').split(',')[0];
    if (u.role === 'courier') {
      const delivered = jobs.filter((j) => j.status === 'DELIVERED');
      const total = delivered.reduce((sum, j) => sum + Number(j.price_gbp || 0), 0);
      pane.innerHTML = `
        <div class="pn-cards"><div class="pn-card"><div class="pn-card-n">${money(total)}</div><div>Delivered so far (${delivered.length})</div></div></div>
        <div class="pn-note">Payouts to couriers are arranged with Vendaru support for now. If you have a question about being paid, get in touch and quote the order number.
          <div style="margin-top:8px"><button type="button" class="pn-btn" data-pn="helpPayout">Ask about a payout</button></div></div>
        ${delivered.length ? delivered.map((j) => `<div class="pn-item"><div class="pn-row"><div><strong>Order #${j.id}</strong><div class="pn-small">${esc(place(j.pickup_address))} → ${esc(place(j.dropoff_address))} · ${esc(when(j.delivered_at))}</div></div><strong>${money(j.price_gbp)}</strong></div></div>`).join('') : '<p class="pn-empty">No completed deliveries yet.</p>'}`;
      return;
    }
    const owed = jobs.filter((j) => j.payment_status === 'UNPAID').reduce((sum, j) => sum + Number(j.payment_amount_gbp != null ? j.payment_amount_gbp : j.price_gbp), 0);
    const paid = jobs.filter((j) => j.payment_status === 'PAID' || j.payment_status === 'PARTIALLY_REFUNDED')
      .reduce((sum, j) => sum + Number(j.payment_amount_gbp != null ? j.payment_amount_gbp : j.price_gbp) - Number(j.refunded_gbp || 0), 0);
    const refunded = jobs.reduce((sum, j) => sum + Number(j.refunded_gbp || 0), 0);
    const label = { UNPAID: 'Awaiting payment', PAID: 'Paid', PARTIALLY_REFUNDED: 'Part refunded', REFUNDED: 'Refunded', VOID: 'Not charged' };
    pane.innerHTML = `
      <div class="pn-cards">
        <div class="pn-card ${owed > 0 ? 'is-hot' : ''}"><div class="pn-card-n">${money(owed)}</div><div>Awaiting payment</div></div>
        <div class="pn-card"><div class="pn-card-n">${money(paid)}</div><div>Paid</div></div>
        <div class="pn-card"><div class="pn-card-n">${money(refunded)}</div><div>Refunded</div></div>
      </div>
      <div class="pn-note"><strong>How to pay</strong><div class="pn-pre" style="margin-top:4px">${esc(u.payment_instructions || 'Payment is arranged with Vendaru support.')}</div>
        <div class="pn-small" style="margin-top:6px">Use the reference <strong>VND-</strong> followed by the order number. There is no card payment yet: once we have your payment the order shows as Paid.</div></div>
      ${jobs.length ? jobs.map((j) => `
        <div class="pn-item">
          <div class="pn-row"><div><strong>Order #${j.id}</strong><div class="pn-small">${esc(place(j.pickup_address))} → ${esc(place(j.dropoff_address))} · ${esc(when(j.created_at))}</div></div>
            <div style="text-align:right"><strong>${money(j.payment_amount_gbp != null ? j.payment_amount_gbp : j.price_gbp)}</strong><div>${j.payment_status ? chip(label[j.payment_status] || nice(j.payment_status), STATUS_KIND[j.payment_status] || 'grey') : ''}</div></div></div>
          ${Number(j.refunded_gbp) ? `<div class="pn-small">Refunded ${money(j.refunded_gbp)}</div>` : ''}
          ${j.refund_status === 'PENDING' ? '<div class="pn-small">A refund request is being reviewed.</div>' : ''}
          ${j.payment_status === 'UNPAID' ? `<button type="button" class="pn-btn" data-pn="acctPay" data-arg="${j.id}">How to pay for this order</button>` : ''}
        </div>`).join('') : '<p class="pn-empty">No orders yet.</p>'}`;
  }
  ACTIONS.acctPay = (el) => {
    const job = ((app().jobs && app().jobs()) || []).find((j) => String(j.id) === el.dataset.arg);
    if (job) open('pay', { job });
  };
  ACTIONS.helpPayout = () => open('help', { tab: 'contact', category: 'payment', subject: 'Question about a payout' });
  ACTIONS.toggleTheme = () => { if (window.VendaruTheme) window.VendaruTheme.toggle(); redraw(); };
  ACTIONS.openHelpPanel = () => open('help');
  ACTIONS.openAdmin = () => open('admin');
  ACTIONS.logoutNow = () => { close(); app().logout && app().logout(); };
  async function refreshUser() { if (app().reloadUser) await app().reloadUser(); }
  ACTIONS.resendVerification = async (el) => {
    try {
      const r = await withBusy(el, () => API('/api/email-resend', { method: 'POST', json: {} }));
      if (r && r.already_verified) { await refreshUser(); redraw(); toast('Your email is already confirmed.'); return; }
      toast('Sent. Check your inbox, and your spam folder.');
    } catch (err) { toast(errText(err), 'error'); }
  };
  ACTIONS.acceptTerms = async (el) => {
    try { await withBusy(el, () => API('/api/account-consent', { method: 'POST', json: { terms: true } })); await refreshUser(); toast('Thanks — recorded.'); redraw(); }
    catch (err) { toast(errText(err), 'error'); }
  };
  ACTIONS.enableLocation = async (el) => {
    try { await withBusy(el, () => API('/api/account-consent', { method: 'POST', json: { location: true } })); await refreshUser(); toast('Location sharing agreed.'); redraw(); }
    catch (err) { toast(errText(err), 'error'); }
  };
  ACTIONS.exportData = async (el) => {
    try {
      const data = await withBusy(el, () => API('/api/account-export'));
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'vendaru-my-data.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (err) { toast(errText(err), 'error'); }
  };
  FORMS.password = async (form) => {
    const current_password = form.elements.current.value;
    const new_password = form.elements.next.value;
    if (new_password.length < 8 || new_password.length > 72) return setMsg(form, 'The new password must be 8–72 characters.');
    try {
      await withBusy(form.querySelector('[type="submit"]'), () => API('/api/account-password', { method: 'POST', json: { current_password, new_password } }));
      form.reset();
      setMsg(form, 'Password changed.', 'ok');
    } catch (err) { setMsg(form, errText(err)); }
  };
  FORMS.deleteAccount = async (form) => {
    if (!window.confirm('Delete your account permanently? This cannot be undone.')) return;
    try {
      await withBusy(form.querySelector('[type="submit"]'), () => API('/api/account-delete', { method: 'POST', json: { password: form.elements.password.value } }));
      close();
      toast('Your account has been deleted.');
      app().logout && app().logout();
    } catch (err) { setMsg(form, errText(err)); }
  };

  // =============================================================== REFUND
  const REFUND_REASONS = [
    ['damaged', 'The parcel arrived damaged'], ['not_delivered', "It wasn't delivered"], ['courier_no_show', "The courier didn't turn up"],
    ['wrong_price', 'I was charged the wrong price'], ['other', 'Something else'],
  ];
  PANELS.refund = {
    title: 'Request a refund',
    async render(ctx) {
      const job = ctx.opts.job || {};
      const remaining = Math.max(0, Number(job.price_gbp || 0) - Number(job.refunded_gbp || 0));
      if (ctx.done) {
        body.innerHTML = `<div class="pn-done"><div class="pn-done-icon">✓</div><h3>Request sent</h3>
          <p>We'll review order #${esc(job.id)} and update the status on your order card. You can add detail from <em>Help → My requests</em>.</p>
          <button type="button" class="pn-btn" data-pn="close">Done</button></div>`;
        return;
      }
      body.innerHTML = `
        <p class="pn-small">Order #${esc(job.id)} · ${money(job.price_gbp)}${job.refunded_gbp ? ` · already refunded ${money(job.refunded_gbp)}` : ''}. A team member reviews every request; see the <a href="/refund-policy.html" target="_blank" rel="noopener">Refund &amp; Cancellation Policy</a>.</p>
        <form data-pn-form="refund" class="pn-form" data-job="${esc(job.id)}" data-max="${remaining.toFixed(2)}">
          <label class="pn-label">What went wrong?
            <select class="pn-input" name="reason">${REFUND_REASONS.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}</select>
          </label>
          <label class="pn-label">Amount you're asking for <span class="pn-opt">(up to ${money(remaining)})</span>
            <input class="pn-input" name="amount" type="number" step="0.01" min="0.01" max="${remaining.toFixed(2)}" value="${remaining.toFixed(2)}" required />
          </label>
          <label class="pn-label">Details <span class="pn-opt">(what happened, when)</span><textarea class="pn-input" name="details" rows="4" maxlength="1500"></textarea></label>
          <div class="pn-msg" role="alert"></div>
          <button type="submit" class="pn-btn pn-btn-primary">Send request</button>
        </form>`;
    },
  };
  FORMS.refund = async (form) => {
    const amount = Number(form.elements.amount.value);
    const max = Number(form.dataset.max);
    if (!Number.isFinite(amount) || amount <= 0 || amount > max + 0.005) return setMsg(form, `Enter an amount between £0.01 and ${money(max)}.`);
    const reason = val(form, 'reason');
    const details = val(form, 'details');
    if (reason === 'other' && details.length < 10) return setMsg(form, 'Please tell us a little more about what went wrong.');
    try {
      await withBusy(form.querySelector('[type="submit"]'), () => API('/api/refund-request', { method: 'POST', json: { jobId: Number(form.dataset.job), reason, details, amount } }));
      current.done = true;
      redraw();
      app().refresh && app().refresh();
    } catch (err) { setMsg(form, errText(err)); }
  };

  // ================================================================= SHARE
  PANELS.share = {
    title: 'Share tracking link',
    render(ctx) {
      const job = ctx.opts.job || {};
      const link = `${location.origin}/track.html#${job.tracking_token || ''}`;
      body.innerHTML = `
        <p>Send this to whoever is receiving the parcel. They can follow it without an account.</p>
        <div class="pn-copy"><input class="pn-input" id="pn-link" readonly value="${esc(link)}" aria-label="Tracking link" /><button type="button" class="pn-btn pn-btn-primary" data-pn="copyLink">Copy</button></div>
        ${navigator.share ? '<p><button type="button" class="pn-btn" data-pn="shareLink">Share…</button></p>' : ''}
        <div class="pn-note">
          <strong>What they'll see:</strong> the status, the drop-off area, and — once the courier has collected it — the courier's first name and live position. <strong>They will never see</strong> the pickup address, price, photos, chat or your details.
          The link stops working 24 hours after delivery. Anyone with the link can view it, so only send it to the recipient.
        </div>`;
    },
  };
  ACTIONS.copyLink = async () => {
    const input = body.querySelector('#pn-link');
    try { await navigator.clipboard.writeText(input.value); toast('Link copied'); }
    catch (e) { input.select(); document.execCommand && document.execCommand('copy'); toast('Link copied'); }
  };
  ACTIONS.shareLink = async () => {
    const input = body.querySelector('#pn-link');
    try { await navigator.share({ title: 'Track my Vendaru delivery', url: input.value }); } catch (e) { /* cancelled */ }
  };

  // =================================================================== PAY
  PANELS.pay = {
    title: 'How to pay',
    render(ctx) {
      const job = ctx.opts.job || {};
      const u = (app().user && app().user()) || {};
      body.innerHTML = `
        <div class="pn-pay"><div class="pn-pay-amt">${money(job.price_gbp)}</div><div class="pn-small">Order #${esc(job.id)} · use reference <strong>VND-${esc(job.id)}</strong></div></div>
        <div class="pn-note pn-pre">${esc(u.payment_instructions || 'Payment is arranged with Vendaru support.')}</div>
        <p class="pn-small">There is no card payment yet. Once we've received your payment we mark the order <em>Paid</em> — you'll see it on the order card. If you cancel before a courier accepts, you're refunded automatically (or never charged).</p>
        <button type="button" class="pn-btn" data-pn="helpAbout" data-arg="${esc(job.id)}">Question about paying?</button>`;
    },
  };
  ACTIONS.helpAbout = (el) => open('help', { tab: 'contact', jobId: el.dataset.arg, category: 'payment' });

  // ================================================================ ADMIN
  const ADMIN_TABS = [['overview', 'Overview'], ['refunds', 'Refunds'], ['payments', 'Payments'], ['tickets', 'Tickets'], ['users', 'Users'], ['audit', 'Audit log']];
  PANELS.admin = {
    title: 'Admin dashboard',
    defaultTab: 'overview',
    render(ctx) {
      body.innerHTML = `
        <div class="pn-tabs pn-tabs-scroll" role="tablist">
          ${ADMIN_TABS.map(([id, label]) => `<button type="button" role="tab" class="pn-tab ${ctx.tab === id ? 'is-active' : ''}" aria-selected="${ctx.tab === id}" data-pn="adminTab" data-arg="${id}">${esc(label)}</button>`).join('')}
        </div>
        <form class="pn-find" data-pn-form="adminFind"><label class="pn-sr" for="pn-find-id">Find an order by number</label>
          <input id="pn-find-id" class="pn-input" name="id" inputmode="numeric" placeholder="Find order # …" /><button type="submit" class="pn-btn">Open</button></form>
        <div id="pn-admin-pane" class="pn-admin-pane"><p class="pn-empty">Loading…</p></div>`;
      adminLoad(ctx);
    },
  };
  ACTIONS.adminTab = (el) => { current.tab = el.dataset.arg; current.ticket = null; current.job = null; redraw(); };
  FORMS.adminFind = (form) => {
    const id = Number(val(form, 'id'));
    if (!Number.isInteger(id) || id < 1) return toast('Enter an order number.', 'error');
    current.job = id;
    adminLoad(current);
  };
  const adminPane = () => body && body.querySelector('#pn-admin-pane');
  function paneError(err) { const p = adminPane(); if (p) p.innerHTML = `<p class="pn-error">${esc(errText(err))}</p>`; }

  async function adminLoad(ctx) {
    const pane = adminPane();
    if (!pane) return;
    pane.innerHTML = '<p class="pn-empty">Loading…</p>';
    try {
      if (ctx.job) return await adminJob(pane, ctx.job);
      if (ctx.tab === 'overview') return await adminOverview(pane);
      if (ctx.tab === 'refunds') return await adminRefunds(pane, ctx);
      if (ctx.tab === 'payments') return await adminPayments(pane, ctx);
      if (ctx.tab === 'tickets') return await (ctx.ticket ? adminTicket(pane, ctx.ticket) : adminTickets(pane, ctx));
      if (ctx.tab === 'users') return await adminUsers(pane, ctx);
      if (ctx.tab === 'audit') return await adminAudit(pane);
    } catch (err) { paneError(err); }
  }

  async function adminOverview(pane) {
    const o = await API('/api/admin-overview');
    const n = o.needs_attention || {};
    pane.innerHTML = `
      <div class="pn-cards">
        <button type="button" class="pn-card ${n.pending_refunds ? 'is-hot' : ''}" data-pn="adminTab" data-arg="refunds"><div class="pn-card-n">${n.pending_refunds || 0}</div><div>Refund requests waiting</div></button>
        <button type="button" class="pn-card ${n.open_tickets ? 'is-hot' : ''}" data-pn="adminTab" data-arg="tickets"><div class="pn-card-n">${n.open_tickets || 0}</div><div>Open support requests</div></button>
        <button type="button" class="pn-card" data-pn="adminTab" data-arg="users"><div class="pn-card-n">${o.suspended_accounts || 0}</div><div>Suspended accounts</div></button>
      </div>
      <h3>Payments</h3>
      <table class="pn-table"><thead><tr><th>Status</th><th>Orders</th><th>Total</th><th>Refunded</th></tr></thead><tbody>
        ${(o.payments || []).map((p) => `<tr><td>${statusChip(p.status)}</td><td>${p.count}</td><td>${money(p.total_gbp)}</td><td>${money(p.refunded_gbp)}</td></tr>`).join('') || '<tr><td colspan="4">No payments yet.</td></tr>'}
      </tbody></table>
      <h3>Orders by status</h3>
      <div class="pn-chips">${Object.entries(o.jobs || {}).map(([k, v]) => `${statusChip(k)} <span class="pn-strong">${v}</span>`).join(' ') || '<span class="pn-small">None yet.</span>'}</div>
      <h3>People</h3>
      <div class="pn-small">Customers: <strong>${(o.users || {}).customer || 0}</strong> · Couriers: <strong>${(o.users || {}).courier || 0}</strong></div>`;
  }

  async function adminRefunds(pane, ctx) {
    ctx.refundFilter = ctx.refundFilter || 'PENDING';
    const rows = await API('/api/admin-refunds?status=' + encodeURIComponent(ctx.refundFilter));
    pane.innerHTML = `
      <label class="pn-label pn-inline-label">Show <select class="pn-input pn-auto" data-pn-input="refundFilter">${['PENDING', 'APPROVED', 'PARTIALLY_APPROVED', 'DENIED', 'AUTO_APPROVED', 'ALL'].map((s) => `<option value="${s}" ${s === ctx.refundFilter ? 'selected' : ''}>${nice(s)}</option>`).join('')}</select></label>
      ${rows.length ? rows.map((r) => `
        <article class="pn-item">
          <div class="pn-row"><div><strong>Order #${r.job_id}</strong> · ${esc(r.customer_name)} <span class="pn-small">${esc(r.customer_email)}</span></div>${statusChip(r.status)}</div>
          <div class="pn-small">${esc(nice(r.reason))} · asked ${money(r.amount_gbp)} of ${money(r.price_gbp)} · payment ${esc(nice(r.payment_status || 'none'))}${Number(r.refunded_gbp) ? ` (refunded ${money(r.refunded_gbp)})` : ''} · order ${esc(nice(r.job_status))} · ${esc(when(r.created_at))}</div>
          ${r.details ? `<blockquote class="pn-quote">${esc(r.details)}</blockquote>` : ''}
          ${r.decision_note ? `<div class="pn-small">Decision note: ${esc(r.decision_note)}</div>` : ''}
          ${r.status === 'PENDING' ? `
          <form data-pn-form="refundDecide" data-id="${r.id}" class="pn-form pn-inline">
            <input class="pn-input pn-amt" name="amount" type="number" step="0.01" min="0.01" max="${Number(r.amount_gbp).toFixed(2)}" value="${Number(r.amount_gbp).toFixed(2)}" aria-label="Amount to refund" />
            <input class="pn-input" name="note" placeholder="Note to customer (required to deny)" maxlength="1000" aria-label="Note to customer" />
            <div class="pn-btnrow">
              <button type="submit" class="pn-btn pn-btn-primary" data-decision="approve">Approve</button>
              <button type="submit" class="pn-btn pn-btn-danger" data-decision="deny">Deny</button>
              <button type="button" class="pn-btn" data-pn="adminJob" data-arg="${r.job_id}">View order</button>
            </div>
            <div class="pn-msg" role="alert"></div>
          </form>` : `<button type="button" class="pn-btn" data-pn="adminJob" data-arg="${r.job_id}">View order</button>`}
        </article>`).join('') : '<p class="pn-empty">Nothing here.</p>'}`;
  }
  INPUTS.refundFilter = (el) => { current.refundFilter = el.value; adminLoad(current); };
  ACTIONS.adminJob = (el) => { current.job = Number(el.dataset.arg); adminLoad(current); };
  FORMS.refundDecide = async (form, e) => {
    const decision = (e.submitter && e.submitter.dataset.decision) || 'approve';
    const note = val(form, 'note');
    if (decision === 'deny' && note.length < 3) return setMsg(form, 'Give the customer a reason to deny.');
    if (!window.confirm(decision === 'approve' ? `Approve a refund of £${Number(form.elements.amount.value).toFixed(2)}?` : 'Deny this refund request?')) return;
    try {
      await withBusy(e.submitter, () => API('/api/admin-refunds', { method: 'POST', json: { id: Number(form.dataset.id), decision, note, amount: Number(form.elements.amount.value) } }));
      toast(decision === 'approve' ? 'Refund recorded.' : 'Request denied.');
      adminLoad(current);
    } catch (err) { setMsg(form, errText(err)); }
  };

  async function adminPayments(pane, ctx) {
    ctx.payFilter = ctx.payFilter || 'UNPAID';
    const rows = await API('/api/admin-payments?status=' + encodeURIComponent(ctx.payFilter));
    pane.innerHTML = `
      <label class="pn-label pn-inline-label">Show <select class="pn-input pn-auto" data-pn-input="payFilter">${['UNPAID', 'PAID', 'PARTIALLY_REFUNDED', 'REFUNDED', 'VOID', 'ALL'].map((s) => `<option value="${s}" ${s === ctx.payFilter ? 'selected' : ''}>${nice(s)}</option>`).join('')}</select></label>
      ${rows.length ? rows.map((p) => `
        <article class="pn-item">
          <div class="pn-row"><div><strong>Order #${p.job_id}</strong> · ${money(p.amount_gbp)} · ${esc(p.customer_name)} <span class="pn-small">${esc(p.customer_email)}</span></div>${statusChip(p.status)}</div>
          <div class="pn-small">Order ${esc(nice(p.job_status))} · ${esc(shortPlace(p.pickup_address))} → ${esc(shortPlace(p.dropoff_address))}${p.paid_at ? ` · paid ${esc(when(p.paid_at))}` : ''}${p.reference ? ` · ref ${esc(p.reference)}` : ''}${Number(p.refunded_gbp) ? ` · refunded ${money(p.refunded_gbp)}` : ''}</div>
          ${p.status === 'UNPAID' && p.job_status !== 'CANCELLED' ? `
          <form data-pn-form="markPaid" data-job="${p.job_id}" class="pn-form pn-inline">
            <input class="pn-input" name="reference" placeholder="Bank reference (optional)" maxlength="100" aria-label="Payment reference" />
            <button type="submit" class="pn-btn pn-btn-primary">Mark as paid</button><div class="pn-msg" role="alert"></div>
          </form>` : ''}
          <button type="button" class="pn-btn" data-pn="adminJob" data-arg="${p.job_id}">View order</button>
        </article>`).join('') : '<p class="pn-empty">Nothing here.</p>'}`;
  }
  const shortPlace = (a) => String(a || '').split(',').slice(-3, -1).join(',').trim() || String(a || '').split(',')[0];
  INPUTS.payFilter = (el) => { current.payFilter = el.value; adminLoad(current); };
  FORMS.markPaid = async (form) => {
    if (!window.confirm(`Record payment received for order #${form.dataset.job}?`)) return;
    try {
      await withBusy(form.querySelector('[type="submit"]'), () => API('/api/admin-payments', { method: 'POST', json: { jobId: Number(form.dataset.job), action: 'mark_paid', reference: val(form, 'reference') } }));
      toast('Marked as paid.');
      adminLoad(current);
    } catch (err) { setMsg(form, errText(err)); }
  };

  async function adminTickets(pane, ctx) {
    ctx.ticketFilter = ctx.ticketFilter || 'ACTIVE';
    const rows = await API('/api/admin-tickets?status=' + encodeURIComponent(ctx.ticketFilter));
    pane.innerHTML = `
      <label class="pn-label pn-inline-label">Show <select class="pn-input pn-auto" data-pn-input="ticketFilter">${['ACTIVE', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'ALL'].map((s) => `<option value="${s}" ${s === ctx.ticketFilter ? 'selected' : ''}>${nice(s)}</option>`).join('')}</select></label>
      ${rows.length ? rows.map((t) => `
        <button type="button" class="pn-item pn-item-btn" data-pn="adminTicket" data-arg="${t.id}">
          <div class="pn-row"><div><strong>${esc(t.subject)}</strong><div class="pn-small">#${t.id} · ${esc(nice(t.category))} · ${esc(t.name)} (${esc(t.email)})${t.job_id ? ` · order #${t.job_id}` : ''}</div></div>
          <div>${statusChip(t.status)}<div class="pn-small">${t.reply_count} repl${t.reply_count === 1 ? 'y' : 'ies'} · ${esc(when(t.updated_at))}</div></div></div>
        </button>`).join('') : '<p class="pn-empty">Nothing here.</p>'}`;
  }
  INPUTS.ticketFilter = (el) => { current.ticketFilter = el.value; adminLoad(current); };
  ACTIONS.adminTicket = (el) => { current.ticket = Number(el.dataset.arg); adminLoad(current); };
  async function adminTicket(pane, id) {
    const t = await API('/api/admin-tickets?id=' + id);
    pane.innerHTML = `
      <button type="button" class="pn-link" data-pn="ticketBack">← All requests</button>
      <div class="pn-row"><h3>${esc(t.subject)}</h3>${statusChip(t.status)}</div>
      <div class="pn-small">#${t.id} · ${esc(nice(t.category))} · ${esc(t.name)} (${esc(t.email)})${t.user_id ? '' : ' · <em>not signed in</em>'}${t.job_id ? ` · <button type="button" class="pn-link" data-pn="adminJob" data-arg="${t.job_id}">order #${t.job_id}</button>` : ''}</div>
      <div class="pn-thread">
        <div class="pn-msg-you"><div class="pn-who">${esc(t.name)} · ${esc(when(t.created_at))}</div>${esc(t.message)}</div>
        ${(t.replies || []).map((r) => `<div class="${r.sender_role === 'admin' ? 'pn-msg-team' : 'pn-msg-you'}"><div class="pn-who">${esc(r.sender_name)} · ${esc(when(r.created_at))}</div>${esc(r.content)}</div>`).join('')}
      </div>
      <form data-pn-form="adminReply" data-id="${t.id}" class="pn-form">
        <label class="pn-sr" for="ar-${t.id}">Reply</label>
        <textarea id="ar-${t.id}" class="pn-input" name="content" rows="3" maxlength="2000" placeholder="Reply to ${esc(t.name)}…" required></textarea>
        <div class="pn-msg" role="alert"></div>
        <div class="pn-btnrow"><button type="submit" class="pn-btn pn-btn-primary">Send reply</button>
          ${['IN_PROGRESS', 'RESOLVED', 'CLOSED'].filter((s) => s !== t.status).map((s) => `<button type="button" class="pn-btn" data-pn="ticketStatus" data-id="${t.id}" data-arg="${s}">Mark ${esc(nice(s).toLowerCase())}</button>`).join('')}</div>
      </form>`;
  }
  ACTIONS.ticketBack = () => { current.ticket = null; adminLoad(current); };
  ACTIONS.ticketStatus = async (el) => {
    try { await withBusy(el, () => API('/api/admin-tickets', { method: 'POST', json: { id: Number(el.dataset.id), action: 'status', status: el.dataset.arg } })); toast('Updated.'); adminLoad(current); }
    catch (err) { toast(errText(err), 'error'); }
  };
  FORMS.adminReply = async (form) => {
    const content = val(form, 'content');
    if (content.length < 2) return setMsg(form, 'Write a reply first.');
    try { await withBusy(form.querySelector('[type="submit"]'), () => API('/api/admin-tickets', { method: 'POST', json: { id: Number(form.dataset.id), action: 'reply', content } })); toast('Reply sent.'); adminLoad(current); }
    catch (err) { setMsg(form, errText(err)); }
  };

  async function adminUsers(pane, ctx) {
    const q = ctx.userQ || '';
    const rows = await API('/api/admin-users?q=' + encodeURIComponent(q));
    pane.innerHTML = `
      <form data-pn-form="userSearch" class="pn-find"><label class="pn-sr" for="pn-uq">Search people</label>
        <input id="pn-uq" class="pn-input" name="q" placeholder="Search name or email" value="${esc(q)}" /><button type="submit" class="pn-btn">Search</button></form>
      ${rows.map((u) => `
        <article class="pn-item">
          <div class="pn-row"><div><strong>${esc(u.full_name)}</strong> ${chip(u.role, 'blue')}${u.is_admin ? ' ' + chip('admin', 'amber') : ''}${u.is_suspended ? ' ' + chip('suspended', 'red') : ''}<div class="pn-small">${esc(u.email)} · ${u.job_count} order${u.job_count === 1 ? '' : 's'} · joined ${esc(when(u.created_at))}</div>
            <div class="pn-small">Terms ${u.terms_accepted_at ? '✓' : '✗'}${u.role === 'courier' ? ` · Location consent ${u.location_consent_at ? '✓' : '✗'}` : ''}${u.is_suspended && u.suspended_reason ? ` · Reason: ${esc(u.suspended_reason)}` : ''}</div></div></div>
          ${u.is_admin ? '' : (u.is_suspended
            ? `<button type="button" class="pn-btn" data-pn="userAct" data-id="${u.id}" data-arg="unsuspend">Lift suspension</button>`
            : `<form data-pn-form="userSuspend" data-id="${u.id}" class="pn-form pn-inline"><input class="pn-input" name="reason" placeholder="Reason (shown to the user)" maxlength="500" required /><button type="submit" class="pn-btn pn-btn-danger">Suspend</button><div class="pn-msg" role="alert"></div></form>`)}
        </article>`).join('') || '<p class="pn-empty">No one found.</p>'}`;
  }
  FORMS.userSearch = (form) => { current.userQ = val(form, 'q'); adminLoad(current); };
  ACTIONS.userAct = async (el) => {
    try { await withBusy(el, () => API('/api/admin-users', { method: 'POST', json: { userId: Number(el.dataset.id), action: el.dataset.arg } })); toast('Done.'); adminLoad(current); }
    catch (err) { toast(errText(err), 'error'); }
  };
  FORMS.userSuspend = async (form) => {
    const reason = val(form, 'reason');
    if (reason.length < 3) return setMsg(form, 'Give a reason.');
    if (!window.confirm('Suspend this account? They will not be able to use Vendaru until you lift it.')) return;
    try { await withBusy(form.querySelector('[type="submit"]'), () => API('/api/admin-users', { method: 'POST', json: { userId: Number(form.dataset.id), action: 'suspend', reason } })); toast('Suspended.'); adminLoad(current); }
    catch (err) { setMsg(form, errText(err)); }
  };

  async function adminAudit(pane) {
    const rows = await API('/api/admin-audit');
    pane.innerHTML = rows.length ? `<table class="pn-table"><thead><tr><th>When</th><th>Who</th><th>Action</th><th>Target</th><th>Details</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td>${esc(when(r.created_at))}</td><td>${esc(r.actor_email || '—')}</td><td>${esc(r.action)}</td><td>${esc(r.target || '')}</td><td>${esc(r.details || '')}</td></tr>`).join('')}</tbody></table>` : '<p class="pn-empty">Nothing recorded yet.</p>';
  }

  async function adminJob(pane, id) {
    const d = await API('/api/admin-job?id=' + id);
    const j = d.job;
    const p = d.payment;
    pane.innerHTML = `
      <button type="button" class="pn-link" data-pn="jobBack">← Back</button>
      <div class="pn-row"><h3>Order #${j.id}</h3>${statusChip(j.status)}</div>
      <div class="pn-facts2">
        <div><span>From</span>${esc(j.pickup_address)}</div><div><span>To</span>${esc(j.dropoff_address)}</div>
        <div><span>Price</span>${money(j.price_gbp)} · ${Number(j.distance_km).toFixed(1)} km</div>
        <div><span>Customer</span>${esc(j.customer_name)} (${esc(j.customer_email)})</div>
        <div><span>Courier</span>${j.courier_id ? `${esc(j.courier_name)} (${esc(j.courier_email)})` : '—'}</div>
        <div><span>Timeline</span>listed ${esc(when(j.created_at))}${j.accepted_at ? ` · accepted ${esc(when(j.accepted_at))}` : ''}${j.collected_at ? ` · collected ${esc(when(j.collected_at))}` : ''}${j.delivered_at ? ` · delivered ${esc(when(j.delivered_at))}` : ''}${j.cancelled_at ? ` · cancelled ${esc(when(j.cancelled_at))}` : ''}</div>
        <div><span>Payment</span>${p ? `${statusChip(p.status)} ${money(p.amount_gbp)}${Number(p.refunded_gbp) ? ` · refunded ${money(p.refunded_gbp)}` : ''}${p.reference ? ` · ref ${esc(p.reference)}` : ''}` : 'no record'}</div>
        <div><span>Photos</span>${j.pickup_photo_url ? `<a href="${esc(j.pickup_photo_url)}" target="_blank" rel="noopener">pickup</a>` : 'no pickup photo'} · ${j.delivery_photo_url ? `<a href="${esc(j.delivery_photo_url)}" target="_blank" rel="noopener">delivery</a>` : 'no delivery photo'}</div>
      </div>
      ${j.status === 'ACCEPTED' ? `
        <form data-pn-form="adminCancelJob" data-id="${j.id}" class="pn-form pn-inline pn-note">
          <strong>Cancel this order</strong>
          <div class="pn-small">A courier has accepted it, so the customer can't cancel it themselves. Whatever you don't keep as a fee goes back to the customer.</div>
          <label class="pn-label">Cancellation fee to keep (£)<input class="pn-input pn-amt" name="fee" type="number" step="0.01" min="0" max="${Number(p ? p.amount_gbp : j.price_gbp).toFixed(2)}" value="0.00" /></label>
          <input class="pn-input" name="note" placeholder="Note (optional)" maxlength="500" aria-label="Note" />
          <div class="pn-msg" role="alert"></div>
          <button type="submit" class="pn-btn pn-btn-danger">Cancel order and apply fee</button>
        </form>` : ''}
      ${p && p.status === 'UNPAID' && j.status !== 'CANCELLED' ? `<form data-pn-form="markPaid" data-job="${j.id}" class="pn-form pn-inline"><input class="pn-input" name="reference" placeholder="Bank reference (optional)" maxlength="100" /><button type="submit" class="pn-btn pn-btn-primary">Mark as paid</button><div class="pn-msg" role="alert"></div></form>` : ''}
      <h3>Refund requests</h3>
      ${(d.refund_requests || []).map((r) => `<div class="pn-item"><div class="pn-row"><div>${esc(nice(r.reason))} · asked ${money(r.amount_gbp)}${Number(r.approved_gbp) ? ` · approved ${money(r.approved_gbp)}` : ''}</div>${statusChip(r.status)}</div>${r.details ? `<blockquote class="pn-quote">${esc(r.details)}</blockquote>` : ''}${r.decision_note ? `<div class="pn-small">Note: ${esc(r.decision_note)}</div>` : ''}<div class="pn-small">${esc(when(r.created_at))}</div></div>`).join('') || '<p class="pn-small">None.</p>'}
      <h3>Support requests</h3>
      ${(d.tickets || []).map((t) => `<button type="button" class="pn-item pn-item-btn" data-pn="adminTicketFromJob" data-arg="${t.id}"><div class="pn-row"><div>#${t.id} ${esc(t.subject)}</div>${statusChip(t.status)}</div></button>`).join('') || '<p class="pn-small">None.</p>'}
      <h3>Chat</h3>
      <div class="pn-thread">${(d.messages || []).map((m) => `<div class="${m.sender_role === 'courier' ? 'pn-msg-team' : 'pn-msg-you'}"><div class="pn-who">${esc(m.sender_name)} (${esc(m.sender_role)}) · ${esc(when(m.created_at))}</div>${esc(m.content)}</div>`).join('') || '<p class="pn-small">No messages.</p>'}</div>`;
  }
  FORMS.adminCancelJob = async (form) => {
    const fee = Number(form.elements.fee.value || 0);
    if (!Number.isFinite(fee) || fee < 0) return setMsg(form, 'Enter a fee of £0 or more.');
    if (!window.confirm(`Cancel order #${form.dataset.id}, keeping a £${fee.toFixed(2)} fee and returning the rest to the customer?`)) return;
    try {
      const done = await withBusy(form.querySelector('[type="submit"]'), () => API('/api/admin-job', { method: 'POST', json: { id: Number(form.dataset.id), action: 'cancel', fee_gbp: fee, note: val(form, 'note') } }));
      toast(done && done.warning ? done.warning : `Cancelled. £${Number(done.returned_gbp).toFixed(2)} returned to the customer.`, done && done.warning ? 'error' : undefined);
      adminLoad(current);
    } catch (err) { setMsg(form, errText(err)); }
  };
  ACTIONS.jobBack = () => { current.job = null; adminLoad(current); };
  ACTIONS.adminTicketFromJob = (el) => { current.job = null; current.tab = 'tickets'; current.ticket = Number(el.dataset.arg); redraw(); };

  // ------------------------------------------------------------- public API
  window.VendaruPanels = { open, close, toast };
})();
