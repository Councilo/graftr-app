/* Light / dark theme for the whole site.
 *
 * Loaded first, and synchronously, in the <head> of every page: it sets
 * <html data-theme> before anything is painted, so a visitor who chose dark
 * never sees a flash of the light page. The choice is kept in localStorage
 * under one key shared by the app and the legal pages, so switching on one
 * page carries to the others (and to other open tabs).
 *
 * Light is the default. It deliberately does not follow the operating
 * system's setting: the site's designed look is the light one, and dark is
 * something a visitor opts into with the sun / crescent button.
 */
(function () {
  var KEY = 'vendaru_theme';
  var META_COLOR = { light: null, dark: '#0a0c0f' };
  var lightMetaColor = null;

  function read() {
    try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; }
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      if (lightMetaColor === null) lightMetaColor = meta.getAttribute('content');
      meta.setAttribute('content', META_COLOR[theme] || lightMetaColor);
    }
    syncButtons(theme);
  }

  // Keeps every toggle button's label honest: it names what pressing it does.
  function syncButtons(theme) {
    var next = theme === 'dark' ? 'light' : 'dark';
    var label = 'Switch to ' + next + ' mode';
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-label', label);
      buttons[i].setAttribute('title', label);
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  function set(theme) {
    theme = theme === 'dark' ? 'dark' : 'light';
    try { localStorage.setItem(KEY, theme); } catch (e) { /* private mode: still works for this page */ }
    apply(theme);
  }

  function get() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function toggle() { set(get() === 'dark' ? 'light' : 'dark'); }

  // The two icons; CSS shows whichever matches the current theme.
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var BUTTON_INNER = '<span class="icon-moon">' + MOON + '</span><span class="icon-sun">' + SUN + '</span>';

  window.VendaruTheme = { get: get, set: set, toggle: toggle, sync: function () { syncButtons(get()); }, buttonInner: BUTTON_INNER };

  apply(read());

  // Another tab switched theme: follow it.
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(read()); });

  // Static pages (the legal pages) have no app to draw a button, so they ask
  // for one with <body data-theme-button> and get a floating one here.
  document.addEventListener('DOMContentLoaded', function () {
    // Stylesheets marked data-defer-style were fetched at low priority under
    // media="print"; apply them now (see index.html for why it isn't inline).
    var deferred = document.querySelectorAll('link[data-defer-style]');
    for (var d = 0; d < deferred.length; d++) deferred[d].media = 'all';
    syncButtons(get());
    if (!document.body || !document.body.hasAttribute('data-theme-button')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle theme-toggle-floating';
    btn.innerHTML = BUTTON_INNER;
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);
    syncButtons(get());
  });
})();
