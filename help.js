// Behaviour for /help.html: the searchable FAQ (data from /faq.js) and the
// contact form. No inline script or handlers anywhere, and FAQ text is only
// ever put on the page with textContent, never innerHTML.
(function () {
  'use strict';

  var CATS = ['ordering', 'payments', 'couriers', 'tracking', 'safety', 'account'];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function $(id) { return document.getElementById(id); }

  // ---------------------------------------------------------------- FAQ
  var faq = Array.isArray(window.VENDARU_FAQ) ? window.VENDARU_FAQ : [];
  var listEl = $('faq-list');
  var countEl = $('faq-count');
  var searchEl = $('faq-search');
  var chipsEl = $('faq-chips');
  var activeCat = 'all';
  var itemEls = {};

  function paragraphs(text) {
    return String(text || '').split(/\n\s*\n/);
  }

  function buildItem(item) {
    var d = document.createElement('details');
    d.className = 'faq-item';
    d.id = 'faq-' + item.id;

    var s = document.createElement('summary');
    s.textContent = item.q;
    d.appendChild(s);

    var body = document.createElement('div');
    body.className = 'faq-answer';
    paragraphs(item.a).forEach(function (para) {
      var p = document.createElement('p');
      p.textContent = para;
      body.appendChild(p);
    });
    // Only same-site paths become links.
    if (item.link && typeof item.link.href === 'string' && item.link.href.charAt(0) === '/' && item.link.href.charAt(1) !== '/') {
      var p2 = document.createElement('p');
      var a = document.createElement('a');
      a.href = item.link.href;
      a.textContent = item.link.label || 'Read more';
      p2.appendChild(a);
      body.appendChild(p2);
    }
    d.appendChild(body);
    return d;
  }

  function matches(item, words) {
    if (activeCat !== 'all' && item.cat !== activeCat) return false;
    if (!words.length) return true;
    var hay = (item.q + ' ' + item.a).toLowerCase();
    for (var i = 0; i < words.length; i++) {
      if (hay.indexOf(words[i]) === -1) return false;
    }
    return true;
  }

  function applyFilter() {
    if (!listEl) return;
    var q = searchEl ? searchEl.value.toLowerCase().replace(/\s+/g, ' ').trim() : '';
    var words = q ? q.split(' ') : [];
    var shown = 0;
    faq.forEach(function (item) {
      var el = itemEls[item.id];
      if (!el) return;
      var ok = matches(item, words);
      el.hidden = !ok;
      if (ok) shown++;
    });
    if (!countEl) return;
    if (!faq.length) return;
    if (shown === 0) {
      countEl.textContent = 'No matching questions. Try different words, or use the contact form below.';
    } else {
      countEl.textContent = 'Showing ' + shown + ' of ' + faq.length + (faq.length === 1 ? ' question' : ' questions') + '.';
    }
  }

  function openFromHash() {
    var h = '';
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
    if (h.indexOf('faq-') !== 0) return;
    var el = document.getElementById(h);
    if (el && el.tagName === 'DETAILS') {
      // Make sure a filter isn't hiding it.
      activeCat = 'all';
      if (searchEl) searchEl.value = '';
      setChips();
      applyFilter();
      el.open = true;
      el.scrollIntoView();
    }
  }

  function setChips() {
    if (!chipsEl) return;
    var btns = chipsEl.querySelectorAll('button[data-cat]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-cat') === activeCat ? 'true' : 'false');
    }
  }

  function initFaq() {
    if (!listEl) return;
    if (!faq.length) {
      if (countEl) countEl.textContent = "The FAQ couldn't be loaded. You can still send us a message with the form below.";
      return;
    }
    faq.forEach(function (item) {
      if (!item || !item.id || CATS.indexOf(item.cat) === -1) return;
      var el = buildItem(item);
      itemEls[item.id] = el;
      listEl.appendChild(el);
    });
    if (searchEl) searchEl.addEventListener('input', applyFilter);
    if (chipsEl) {
      chipsEl.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('button[data-cat]') : null;
        if (!b) return;
        activeCat = b.getAttribute('data-cat');
        setChips();
        applyFilter();
      });
    }
    setChips();
    applyFilter();
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
  }

  // ------------------------------------------------------ contact form
  var form = $('support-form');
  var statusEl = $('sf-status');
  var submitBtn = $('sf-submit');
  var guestBox = $('sf-guest');
  var signedNote = $('sf-signed-in');
  var successEl = $('sf-success');
  var successMsg = $('sf-success-msg');
  var signedIn = false;
  var authToken = null;

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.className = 'sf-status' + (isError ? ' is-error' : '');
  }

  function clearInvalid() {
    if (!form) return;
    var bad = form.querySelectorAll('[aria-invalid="true"]');
    for (var i = 0; i < bad.length; i++) bad[i].removeAttribute('aria-invalid');
  }

  function fail(field, msg) {
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.focus();
    }
    setStatus(msg, true);
    return false;
  }

  function validate(v) {
    clearInvalid();
    if (!v.category) return fail($('sf-category'), 'Please choose what your message is about.');
    if (v.subject.length < 3 || v.subject.length > 120) return fail($('sf-subject'), 'Please give a subject of 3 to 120 characters.');
    if (v.message.length < 10 || v.message.length > 3000) return fail($('sf-message'), 'Please write a message of 10 to 3,000 characters.');
    if (!signedIn) {
      if (!v.name || v.name.length > 100) return fail($('sf-name'), 'Please tell us your name.');
      if (!EMAIL_RE.test(v.email) || v.email.length > 254) return fail($('sf-email'), 'Please give a valid email address so we can reply.');
    }
    return true;
  }

  function showSuccess(id) {
    if (!successEl || !form) return;
    var msg = "Thanks, we've received your message" + (id ? ' (reference ' + id + ')' : '') + '. ';
    if (signedIn) {
      msg += 'It is linked to your account. Sign in to the Vendaru app and open Help to see our replies.';
    } else {
      msg += 'To follow our replies, sign in to the Vendaru app and open Help, where your tickets are shown. If you sent this without signing in, we may contact you at the email address you gave.';
    }
    if (successMsg) successMsg.textContent = msg;
    form.hidden = true;
    successEl.hidden = false;
    successEl.focus();
  }

  function submit(e) {
    e.preventDefault();
    if (!form || (submitBtn && submitBtn.disabled)) return;
    var v = {
      category: $('sf-category').value,
      subject: $('sf-subject').value.trim(),
      message: $('sf-message').value.trim(),
      name: $('sf-name') ? $('sf-name').value.trim() : '',
      email: $('sf-email') ? $('sf-email').value.trim() : '',
      website: $('sf-website') ? $('sf-website').value : ''
    };
    setStatus('');
    if (!validate(v)) return;

    var payload = { category: v.category, subject: v.subject, message: v.message, website: v.website };
    if (!signedIn) { payload.name = v.name; payload.email = v.email; }
    var headers = { 'Content-Type': 'application/json' };
    if (signedIn && authToken) headers.Authorization = 'Bearer ' + authToken;

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
    setStatus('Sending your message…');

    fetch('/api/support-create', { method: 'POST', headers: headers, body: JSON.stringify(payload) })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data }; });
      })
      .then(function (r) {
        if (r.res.status === 201) {
          showSuccess(r.data && r.data.id);
          return;
        }
        if (r.res.status === 429) {
          setStatus("You've sent several messages recently. Please wait a while before trying again.", true);
        } else if (r.res.status >= 500) {
          setStatus('Something went wrong on our side. Please try again in a minute.', true);
        } else {
          var d = r.data && r.data.detail;
          setStatus(typeof d === 'string' && d ? d : 'We could not send your message. Please check it and try again.', true);
        }
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
      })
      .catch(function () {
        setStatus("We couldn't reach Vendaru. Please check your connection and try again.", true);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
      });
  }

  function updateCount() {
    var c = $('sf-count');
    var m = $('sf-message');
    if (c && m) c.textContent = m.value.length + ' / 3000';
  }

  // If the person is signed in to the app, the ticket is attached to their
  // account (and they can see replies in the app), so name and email aren't
  // asked for again. A stale token simply leaves the form as it was.
  function checkSignedIn() {
    try { authToken = window.localStorage.getItem('vendaru_token'); } catch (e) { authToken = null; }
    if (!authToken || !window.fetch) return;
    fetch('/api/me', { headers: { Authorization: 'Bearer ' + authToken } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (me) {
        if (!me) return;
        signedIn = true;
        if (guestBox) guestBox.hidden = true;
        var n = $('sf-name'); var em = $('sf-email');
        if (n) n.required = false;
        if (em) em.required = false;
        if (signedNote) {
          signedNote.textContent = 'You are signed in' + (me.full_name ? ' as ' + me.full_name : '') + '. Your message will be linked to your account, and you can follow replies in the app.';
          signedNote.hidden = false;
        }
      })
      .catch(function () { /* stay in signed-out mode */ });
  }

  function initForm() {
    if (!form) return;
    form.addEventListener('submit', submit);
    var m = $('sf-message');
    if (m) m.addEventListener('input', updateCount);
    updateCount();
    checkSignedIn();
  }

  initFaq();
  initForm();
})();
