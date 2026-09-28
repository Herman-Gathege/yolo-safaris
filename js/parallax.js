/* ==========================================================================
   YOLO Safaris — parallax helper
   --------------------------------------------------------------------------
   Copy this markup for a new parallax banner (js/app.js builds the same two
   elements for the banners it renders):

     <div class="banner" data-parallax="0.15">
       <div class="parallax-layer">
         <img src="images/destinations/maasai-mara.svg" alt=""
              width="1600" height="900">
       </div>
       <div class="wrap banner__content">
         <h2>Maasai Mara</h2>
       </div>
     </div>

   The banner is a fixed height (--parallax-height in css/styles.css) with
   overflow hidden. .parallax-layer is 115% tall, so the layer can move up and
   down without ever exposing a gap at the top or bottom of the banner.

   Keep the data-parallax number between 0.05 and 0.2. Below 0.05 you cannot
   see it; above 0.2 it stops reading as depth and starts reading as a bug.

   The helper writes nothing but `transform`, at most once per animation frame.
   It does nothing at all under prefers-reduced-motion: reduce, and it is
   skipped below 768px where movement costs more than it adds.
   ========================================================================== */
(function () {
  "use strict";

  var BASE_SPEED = 0.15; /* the speed that uses the full available travel */
  var MIN_SPEED = 0.05;
  var MAX_SPEED = 0.2;
  var MIN_WIDTH = 768;

  var items = [];
  var queued = false;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var narrow = window.matchMedia("(max-width: " + (MIN_WIDTH - 1) + "px)");

  function isOn() {
    return !reduced.matches && !narrow.matches;
  }

  function collect() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    items = nodes.map(function (node) {
      var layer = node.querySelector(".parallax-layer");
      if (!layer) return null;
      var speed = parseFloat(node.getAttribute("data-parallax"));
      if (isNaN(speed)) speed = BASE_SPEED;
      return {
        node: node,
        layer: layer,
        speed: Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed)),
        top: 0,
        height: 0,
        slack: 0,
      };
    }).filter(Boolean);
  }

  /* Cache document offsets so the scroll handler never reads layout. */
  function measure() {
    var y = window.pageYOffset;
    items.forEach(function (item) {
      var rect = item.node.getBoundingClientRect();
      item.top = rect.top + y;
      item.height = rect.height;
      item.slack = Math.max(0, (item.layer.offsetHeight - rect.height) / 2);
    });
  }

  function reset() {
    items.forEach(function (item) { item.layer.style.transform = ""; });
  }

  function render() {
    queued = false;
    if (!isOn()) return;

    var y = window.pageYOffset;
    var viewport = window.innerHeight;

    items.forEach(function (item) {
      /* Anything outside the viewport is left alone. */
      if (item.top > y + viewport || item.top + item.height < y) return;

      /* progress runs 0 -> 1 as the banner crosses the viewport. */
      var progress = (y + viewport - item.top) / (viewport + item.height);
      var travel = item.slack * (item.speed / BASE_SPEED);
      var shift = (progress - 0.5) * 2 * travel;

      item.layer.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
    });
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(render);
  }

  function onResize() {
    measure();
    onScroll();
  }

  /* Attach or detach the scroll loop, then re-measure. */
  function apply() {
    if (isOn()) {
      window.addEventListener("scroll", onScroll, { passive: true });
      measure();
      onScroll();
    } else {
      window.removeEventListener("scroll", onScroll);
      reset();
    }
  }

  function start() {
    collect();
    apply();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", measure);
    if (reduced.addEventListener) reduced.addEventListener("change", apply);
    if (narrow.addEventListener) narrow.addEventListener("change", apply);
  }

  /* app.js renders the banners, so it can ask us to re-measure afterwards. */
  window.Parallax = { refresh: function () { collect(); apply(); } };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
