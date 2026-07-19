// Theme bootstrap: applies the resolved theme before first paint so the
// wrong theme never flashes. Loaded as a tiny same-origin blocking script
// from <head>, which keeps the strict CSP (script-src 'self', no inline)
// intact. Stores only the preference string under one key; nothing else.
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem('derekwei-theme');
  } catch (e) {
    /* storage unavailable: fall back to system */
  }
  var pref = stored === 'dark' || stored === 'light' ? stored : 'system';
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var resolved = pref === 'system' ? (systemDark ? 'dark' : 'light') : pref;
  document.documentElement.setAttribute('data-theme', resolved);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', resolved === 'dark' ? '#0a0f1a' : '#f6f8fb');
  }
})();
