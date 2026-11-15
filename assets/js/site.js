/* ==========================================================================
   Henglong Dang — site.js
   Progressive enhancement only: every page is complete without this file.
   Modules: nav, progress, back-to-top, copy, contents, explorer, views,
   filter, chart tooltips. No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* Navigation toggle (mobile) ------------------------------------------ */
  function initNav() {
    var toggle = doc.querySelector(".nav-toggle");
    var nav = doc.getElementById("site-nav");
    if (!toggle || !nav) return;
    root.classList.add("nav-ready");
    var mq = window.matchMedia("(max-width: 47.99rem)");

    function set(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
    }
    function sync() { set(false); if (!mq.matches) nav.removeAttribute("data-open"); }

    toggle.addEventListener("click", function () {
      set(toggle.getAttribute("aria-expanded") !== "true");
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { set(false); toggle.focus(); }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && mq.matches) set(false);
    });
    if (mq.addEventListener) mq.addEventListener("change", sync); else mq.addListener(sync);
    sync();
  }

  /* Reading progress + back-to-top ------------------------------------- */
  function initScrollUI() {
    var bar = doc.querySelector(".progress");
    var top = doc.querySelector(".to-top");
    if (!bar && !top) return;
    var ticking = false;
    function update() {
      var max = root.scrollHeight - window.innerHeight;
      var y = window.scrollY || window.pageYOffset;
      if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      if (top) top.classList.toggle("is-visible", y > 700);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* Copy to clipboard ---------------------------------------------------- */
  function initCopy() {
    $all("[data-copy], [data-copy-target]").forEach(function (btn) {
      var original = btn.textContent;
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        if (!text) {
          var target = doc.querySelector(btn.getAttribute("data-copy-target"));
          text = target ? target.textContent.replace(/\s+/g, " ").trim() : "";
        }
        var status = btn.getAttribute("data-status") ? doc.getElementById(btn.getAttribute("data-status")) : null;
        function done(ok) {
          btn.textContent = ok ? "Copied" : "Copy failed";
          if (status) status.textContent = ok ? "Copied to clipboard." : "Could not copy. Select the text manually.";
          window.setTimeout(function () { btn.textContent = original; if (status) status.textContent = ""; }, 2200);
        }
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        } else {
          var ta = doc.createElement("textarea");
          ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
          doc.body.appendChild(ta); ta.select();
          var ok = false;
          try { ok = doc.execCommand("copy"); } catch (err) { ok = false; }
          doc.body.removeChild(ta);
          done(ok);
        }
      });
    });
  }

  /* Contents scrollspy --------------------------------------------------- */
  function initToc() {
    var links = $all(".toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    var sections = links.map(function (a) {
      var id = a.getAttribute("href").slice(1);
      map[id] = a;
      return doc.getElementById(id);
    }).filter(Boolean);
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      for (var i = 0; i < sections.length; i++) { if (visible[sections[i].id]) { current = sections[i].id; break; } }
      if (!current) return;
      links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
      map[current].classList.add("is-active");
      map[current].setAttribute("aria-current", "location");
    }, { rootMargin: "-20% 0px -60% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* Explorer: buttons + clickable SVG nodes drive one visible panel ------- */
  function initExplorers() {
    $all("[data-explorer]").forEach(function (ex) {
      var buttons = $all(".explorer__keys button[data-key]", ex);
      var nodes = $all("svg [data-key]", ex);
      var panels = $all("[data-panel]", ex);
      var related = $all("svg [data-for]", ex);
      if (!buttons.length || !panels.length) return;

      function select(key, focusButton) {
        buttons.forEach(function (b) {
          var on = b.getAttribute("data-key") === key;
          b.setAttribute("aria-pressed", String(on));
          if (on && focusButton) b.focus();
        });
        nodes.forEach(function (n) { n.classList.toggle("is-active", n.getAttribute("data-key") === key); });
        panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== key; });
        if (ex.hasAttribute("data-dim")) {
          related.forEach(function (el) {
            var keys = el.getAttribute("data-for").split(/\s+/);
            el.classList.toggle("is-dim", keys.indexOf(key) === -1);
          });
        }
      }

      buttons.forEach(function (b, i) {
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { select(b.getAttribute("data-key")); });
        b.addEventListener("keydown", function (e) {
          var dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
          if (!dir) return;
          e.preventDefault();
          var next = buttons[(i + dir + buttons.length) % buttons.length];
          select(next.getAttribute("data-key"), true);
        });
      });
      nodes.forEach(function (n) {
        n.addEventListener("click", function () { select(n.getAttribute("data-key")); });
      });
      select(ex.getAttribute("data-default") || buttons[0].getAttribute("data-key"));
    });
  }

  /* Views: a segmented control swaps alternative renderings ---------------- */
  function initViews() {
    $all("[data-views]").forEach(function (box) {
      var buttons = $all("[data-view-btn]", box);
      var views = $all("[data-view]", box);
      function show(name) {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-view-btn") === name)); });
        views.forEach(function (v) {
          var on = v.getAttribute("data-view") === name;
          if (v instanceof SVGElement) v.style.display = on ? "inline" : "none"; else v.hidden = !on;
        });
      }
      buttons.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-view-btn")); }); });
      show(box.getAttribute("data-default") || buttons[0].getAttribute("data-view-btn"));
    });
  }

  /* Filter: work index ---------------------------------------------------- */
  function initFilter() {
    $all("[data-filter]").forEach(function (box) {
      var buttons = $all("[data-filter-value]", box);
      var items = $all("[data-tags]", box);
      var status = box.querySelector(".filter-status");
      if (!buttons.length) return;

      buttons.forEach(function (b) {
        var v = b.getAttribute("data-filter-value");
        var n = v === "all" ? items.length : items.filter(function (it) { return it.getAttribute("data-tags").split(" ").indexOf(v) > -1; }).length;
        var c = doc.createElement("span"); c.className = "count"; c.textContent = n; c.setAttribute("aria-hidden", "true");
        b.appendChild(c);
        b.setAttribute("aria-label", b.firstChild.textContent.trim() + ", " + n + " items");
      });

      function apply(value, push) {
        var shown = 0;
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter-value") === value)); });
        items.forEach(function (it) {
          var on = value === "all" || it.getAttribute("data-tags").split(" ").indexOf(value) > -1;
          it.hidden = !on;
          if (on) shown++;
        });
        if (status) {
          var label = buttons.filter(function (b) { return b.getAttribute("data-filter-value") === value; })[0];
          status.textContent = value === "all"
            ? "Showing all " + items.length + " entries."
            : "Showing " + shown + " of " + items.length + " entries tagged “" + label.firstChild.textContent.trim() + "”.";
        }
        if (push && window.history && history.replaceState) {
          var url = new URL(window.location.href);
          if (value === "all") url.searchParams.delete("type"); else url.searchParams.set("type", value);
          history.replaceState(null, "", url.pathname + url.search + url.hash);
        }
      }

      buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.getAttribute("data-filter-value"), true); }); });
      var initial = new URLSearchParams(window.location.search).get("type");
      var valid = buttons.some(function (b) { return b.getAttribute("data-filter-value") === initial; });
      apply(valid ? initial : "all", false);
    });
  }

  /* Chart tooltips: enhance, never gate (values are also in tables) -------- */
  function initChartTips() {
    $all(".chart-wrap").forEach(function (wrap) {
      var marks = $all(".mark[data-tip]", wrap);
      if (!marks.length) return;
      var tip = doc.createElement("div");
      tip.className = "chart-tip"; tip.hidden = true; tip.setAttribute("aria-hidden", "true");
      wrap.appendChild(tip);
      function show(m) {
        var r = m.getBoundingClientRect(), w = wrap.getBoundingClientRect();
        tip.textContent = m.getAttribute("data-tip");
        tip.hidden = false;
        var x = r.left - w.left + r.width / 2;
        x = Math.max(80, Math.min(w.width - 80, x));
        tip.style.left = x + "px";
        tip.style.top = (r.top - w.top) + "px";
      }
      function hide() { tip.hidden = true; }
      marks.forEach(function (m) {
        m.addEventListener("pointerenter", function () { show(m); });
        m.addEventListener("pointerleave", hide);
        m.addEventListener("focus", function () { show(m); });
        m.addEventListener("blur", hide);
      });
    });
  }

  function init() {
    initNav();
    initScrollUI();
    initCopy();
    initToc();
    initExplorers();
    initViews();
    initFilter();
    initChartTips();
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init); else init();
})();
