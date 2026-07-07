/* ============================================================
   NexaFlow Digital — cookie consent
   Self-contained. No libraries. No third-party services named.
   ------------------------------------------------------------
   HOW IT WORKS
   1. On first visit it shows a small bar. The visitor picks
      Accept or Decline. The choice is remembered in this
      browser so the bar does not show again.
   2. Any script you mark as "consent-gated" (see step 2 in the
      notes you were given) runs ONLY after the visitor accepts.
      Nothing non-essential runs until then.
   3. A visitor can reopen the choice from any element with
      data-cookie-settings (for example a footer link).
   ============================================================ */
(function () {
  "use strict";

  var STORE_KEY = "nf-cookie-consent";     // "granted" | "denied"
  var GATE_ATTR = "data-cc";               // <script type="text/plain" data-cc="analytics">

  function getConsent() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) {}
  }

  /* Turn any consent-gated <script type="text/plain" data-cc="..."> into a
     live script so it executes. Runs only after Accept. */
  function activateGatedScripts() {
    var gated = document.querySelectorAll('script[type="text/plain"][' + GATE_ATTR + ']');
    gated.forEach(function (old) {
      var s = document.createElement("script");
      for (var i = 0; i < old.attributes.length; i++) {
        var a = old.attributes[i];
        if (a.name === "type" || a.name === GATE_ATTR) continue;
        s.setAttribute(a.name, a.value);
      }
      s.type = "text/javascript";
      if (!old.src) s.text = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
  }

  function injectStyles() {
    if (document.getElementById("nf-cc-styles")) return;
    var css =
      '#nf-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;' +
        'max-width:760px;margin:0 auto;background:#0B1628;color:#fff;' +
        'border:1px solid rgba(0,194,255,0.28);border-radius:14px;' +
        'box-shadow:0 12px 40px rgba(0,0,0,0.35);padding:20px 22px;' +
        'font-family:Montserrat,Arial,Helvetica,sans-serif;' +
        'display:flex;gap:18px;align-items:center;flex-wrap:wrap;' +
        'opacity:0;transform:translateY(12px);transition:opacity .3s ease,transform .3s ease;}' +
      '#nf-cc.nf-cc-show{opacity:1;transform:none;}' +
      '#nf-cc p{margin:0;flex:1;min-width:240px;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.82);}' +
      '#nf-cc a{color:#00C2FF;text-decoration:underline;}' +
      '#nf-cc .nf-cc-btns{display:flex;gap:10px;flex-shrink:0;}' +
      '#nf-cc button{font-family:inherit;font-size:13px;font-weight:700;letter-spacing:.04em;' +
        'cursor:pointer;border-radius:8px;padding:11px 20px;border:2px solid transparent;transition:all .2s ease;}' +
      '#nf-cc .nf-cc-accept{background:#00C2FF;color:#0B1628;}' +
      '#nf-cc .nf-cc-accept:hover{background:#00d6ff;}' +
      '#nf-cc .nf-cc-decline{background:transparent;color:rgba(255,255,255,0.8);border-color:rgba(255,255,255,0.28);}' +
      '#nf-cc .nf-cc-decline:hover{background:#fff;color:#0B1628;border-color:#fff;}' +
      '@media (max-width:560px){#nf-cc{flex-direction:column;align-items:stretch;text-align:left;}' +
        '#nf-cc .nf-cc-btns{width:100%;}#nf-cc button{flex:1;}}';
    var tag = document.createElement("style");
    tag.id = "nf-cc-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }

  function buildBar() {
    injectStyles();
    var bar = document.createElement("div");
    bar.id = "nf-cc";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Cookie notice");
    bar.innerHTML =
      '<p>We use cookies to keep this site working and to understand how it is used. ' +
      'See our <a href="/privacy">Privacy Policy</a>.</p>' +
      '<div class="nf-cc-btns">' +
        '<button type="button" class="nf-cc-decline">Decline</button>' +
        '<button type="button" class="nf-cc-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add("nf-cc-show"); });

    bar.querySelector(".nf-cc-accept").addEventListener("click", function () {
      setConsent("granted");
      activateGatedScripts();
      closeBar(bar);
    });
    bar.querySelector(".nf-cc-decline").addEventListener("click", function () {
      setConsent("denied");
      closeBar(bar);
    });
  }

  function closeBar(bar) {
    bar.classList.remove("nf-cc-show");
    setTimeout(function () { if (bar && bar.parentNode) bar.parentNode.removeChild(bar); }, 300);
  }

  function start() {
    var choice = getConsent();
    if (choice === "granted") {
      activateGatedScripts();   // returning visitor who accepted before
    } else if (choice === "denied") {
      /* nothing to do; non-essential scripts stay off */
    } else {
      buildBar();               // no choice yet -> ask
    }

    /* Let visitors reopen the choice from any element with data-cookie-settings */
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-cookie-settings]") : null;
      if (t) {
        e.preventDefault();
        if (!document.getElementById("nf-cc")) buildBar();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  /* optional: window.nfCookieConsent.reset() clears the saved choice */
  window.nfCookieConsent = {
    reset: function () { try { localStorage.removeItem(STORE_KEY); } catch (e) {} }
  };
})();
