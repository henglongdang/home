/* Housing Friction Index — excise-tax arithmetic for the calculator.
   Educational only. State brackets are those used in the source exhibit
   (Washington graduated REET, thresholds in effect from January 2023).
   The page shows a static table when JavaScript is unavailable. */
(function () {
  "use strict";

  var BRACKETS = [
    { cap: 525000, rate: 0.011 },
    { cap: 1525000, rate: 0.0128 },
    { cap: 3025000, rate: 0.0275 },
    { cap: Infinity, rate: 0.03 }
  ];
  var LOCAL_RATE = 0.005; // Bellevue local REET

  function stateTax(price) {
    var tax = 0, floor = 0;
    for (var i = 0; i < BRACKETS.length; i++) {
      var b = BRACKETS[i];
      if (price <= floor) break;
      tax += (Math.min(price, b.cap) - floor) * b.rate;
      floor = b.cap;
    }
    return tax;
  }

  var money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  function init() {
    var box = document.querySelector("[data-reet]");
    if (!box) return;
    var num = document.getElementById("reet-price");
    var range = document.getElementById("reet-range");
    var out = document.getElementById("reet-price-out");
    var el = {
      state: document.getElementById("reet-state"),
      local: document.getElementById("reet-local"),
      total: document.getElementById("reet-total"),
      rate: document.getElementById("reet-rate"),
      barState: document.getElementById("reet-bar-state"),
      barLocal: document.getElementById("reet-bar-local")
    };
    var MAX_BAR = stateTax(5000000) + 5000000 * LOCAL_RATE;

    function render(price, source) {
      if (!isFinite(price) || price <= 0) return;
      price = Math.min(Math.max(price, 0), 100000000);
      var s = stateTax(price), l = price * LOCAL_RATE, t = s + l;
      out.textContent = money.format(price);
      el.state.textContent = money.format(s);
      el.local.textContent = money.format(l);
      el.total.textContent = money.format(t);
      el.rate.textContent = (t / price * 100).toFixed(2) + "%";
      el.barState.style.width = Math.min(100, s / MAX_BAR * 100) + "%";
      el.barLocal.style.width = Math.min(100, l / MAX_BAR * 100) + "%";
      if (source !== "num") num.value = Math.round(price);
      if (source !== "range") range.value = Math.min(Math.max(price, +range.min), +range.max);
    }

    num.addEventListener("input", function () { render(parseFloat(num.value), "num"); });
    range.addEventListener("input", function () { render(parseFloat(range.value), "range"); });
    render(parseFloat(num.value), "init");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
