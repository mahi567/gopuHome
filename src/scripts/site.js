/* Browser behaviour for every page. The HTML is already built by Astro;
   this only adds interaction: menu, theme, filters, gallery, form. */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const cfg = document.body.dataset; // whatsapp (set in Base.astro from site.json)
const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const AUTO_MS = 3500;

/* ---------- Mobile menu ---------- */
const header = $("#site-header");
const navToggle = $(".nav-toggle");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", header.classList.toggle("open"));
  });
}

/* ---------- Light / dark theme ---------- */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".theme-toggle")) return;
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("gopu-theme", next); } catch (err) { /* private mode: just not remembered */ }
});

/* ---------- Stays page: type filter ---------- */
const filters = $("#filters");
if (filters) {
  const grid = $("#stays-grid");
  let current = "all";

  const apply = () => {
    let shown = 0;
    $$(".stay-card", grid).forEach((card) => {
      const ok = (current === "all" || card.dataset.type === current);
      card.hidden = !ok;
      if (ok) shown++;
    });
    $("#stays-empty").hidden = shown > 0;
    $$("button[data-type]", filters).forEach((b) => b.classList.toggle("active", b.dataset.type === current));
    const active = $(`button[data-type="${current}"]`, filters);
    const title = $("#stays-title");
    const sub = $("#stays-sub");
    if (title && active.dataset.title) title.textContent = active.dataset.title;
    if (sub && active.dataset.sub) sub.textContent = active.dataset.sub;
  };

  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    current = b.dataset.type;
    if (!("inline" in filters.dataset)) history.replaceState(null, "", current === "all" ? location.pathname : "?type=" + current);
    apply();
  });
  const wanted = new URLSearchParams(location.search).get("type");
  if (wanted && $(`button[data-type="${wanted}"]`, filters)) current = wanted;
  apply();
}

/* ---------- Property page: photo gallery with auto-scroll ---------- */
// Tall (portrait) photos are shown whole instead of being cropped to a wide strip.
function fitPhoto(img) {
  const apply = () => img.classList.toggle("tall", img.naturalHeight > img.naturalWidth);
  img.onload = apply;
  if (img.complete && img.naturalWidth) apply();
}
const pdGallery = $(".pd-gallery");
if (pdGallery) {
  const slider = $(".pd-slider", pdGallery);
  const track = $(".pd-track", slider);
  const photos = JSON.parse(pdGallery.dataset.photos || "[]");
  const title = pdGallery.dataset.title;
  const items = photos.map((p) => ({ src: p.image, title: p.caption || title, sub: p.caption ? title : "", alt: `${title} ${p.caption || ""}` }));
  const dots = $$(".pd-dots i", slider);
  let at = 0;
  let timer = null;
  $$("img", track).forEach(fitPhoto);

  const go = (n) => {
    at = (n + photos.length) % photos.length;
    track.style.transform = `translateX(${-at * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("on", i === at));
    const cap = $(".pd-caption", slider);
    if (cap) cap.textContent = photos[at].caption || "";
    const count = $(".pd-count", slider);
    if (count) count.textContent = `${at + 1} / ${photos.length}`;
  };
  // Photos slide on their own; they wait while the pointer is on the photo,
  // the tab is in the background, or the full-screen viewer is open.
  const start = () => {
    clearInterval(timer);
    if (reducedMotion || photos.length < 2) return;
    timer = setInterval(() => {
      if (document.hidden || slider.matches(":hover") || $(".lightbox.show")) return;
      go(at + 1);
    }, AUTO_MS);
  };
  pdGallery.addEventListener("click", (e) => {
    const tile = e.target.closest("[data-open]");
    if (e.target.closest(".pd-prev")) go(at - 1);
    else if (e.target.closest(".pd-next")) go(at + 1);
    else if (tile) lightbox().open(items, +tile.dataset.open);
    else if (e.target.closest(".pd-zoom, .pd-slide")) lightbox().open(items, at);
    start(); // restart the wait after a manual choice
  });
  // Swipe on phones
  let downX = null;
  slider.addEventListener("touchstart", (e) => { downX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener("touchend", (e) => {
    if (downX === null) return;
    const dx = e.changedTouches[0].clientX - downX;
    downX = null;
    if (Math.abs(dx) > 40) { go(at + (dx < 0 ? 1 : -1)); start(); }
  });
  start();
}

/* ---------- Listing cards rotate through a property's photos ---------- */
if (!reducedMotion) {
  setInterval(() => {
    if (document.hidden) return;
    $$(".stay-card[data-photos]").forEach((card) => {
      if (card.hidden || card.matches(":hover")) return;
      const photos = JSON.parse(card.dataset.photos);
      const next = ((+card.dataset.photo || 0) + 1) % photos.length;
      // Cross-fade: the next photo fades in on top of the current one.
      const fresh = new Image();
      fresh.alt = "";
      fresh.style.opacity = 0;
      fresh.onload = () => {
        const currentImg = $(".media img", card);
        if (!currentImg) return;
        currentImg.after(fresh);
        setTimeout(() => {
          fresh.style.opacity = 1;
          setTimeout(() => currentImg.remove(), 700);
        }, 40);
        card.dataset.photo = next;
      };
      fresh.src = photos[next];
    });
  }, AUTO_MS + 1000);
}

/* ---------- Gallery page: category filter + full-screen viewer ---------- */
const gGrid = $("#gallery-grid");
if (gGrid) {
  const gFilters = $("#gallery-filters");
  gFilters.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-type]");
    if (!b) return;
    $$("button", gFilters).forEach((x) => x.classList.toggle("active", x === b));
    $$(".g-tile", gGrid).forEach((t) => (t.hidden = b.dataset.type !== "all" && t.dataset.type !== b.dataset.type));
  });

  gGrid.addEventListener("click", (e) => {
    const tile = e.target.closest(".g-tile");
    if (!tile) return;
    const tiles = $$(".g-tile", gGrid).filter((t) => !t.hidden); // browse only what is currently shown
    const items = tiles.map((t) => ({
      src: t.dataset.src,
      alt: t.getAttribute("aria-label"),
      title: t.dataset.caption || t.dataset.title,
      sub: t.dataset.caption ? t.dataset.title : "",
      href: t.dataset.href,
    }));
    lightbox().open(items, Math.max(0, tiles.indexOf(tile)));
  });
}

/* ---------- Blocks rise into view while scrolling; numbers count up ---------- */
if (!reducedMotion) {
  const countUp = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 1400);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const arrive = (el) => {
    if (el.dataset.count) return countUp(el);
    el.style.transitionDelay = (el.dataset.delay || 0) + "ms";
    el.classList.add("in");
    // Hand the element back to its normal styles (hover effects) once it has arrived.
    setTimeout(() => { el.classList.remove("reveal", "in"); el.style.transitionDelay = ""; }, 900 + (+el.dataset.delay || 0));
  };

  let waiting = $$(".section-head, .grid > .card, .about-gallery figure, .mission, .about-stats div, .about-person, .pd-block, .pd-facts div, .stat, .cta")
    .filter((el) => el.getBoundingClientRect().top >= innerHeight); // already on screen: leave as is
  waiting.forEach((el) => {
    // Neighbours in the same row arrive one after another.
    el.dataset.delay = ([...el.parentElement.children].indexOf(el) % 4) * 90;
    el.classList.add("reveal");
  });
  waiting.push(...$$("[data-count]"));

  // Anything at or above the bottom edge of the screen has been reached,
  // including blocks skipped over by a jump to the end of the page.
  let queued = false;
  const check = () => {
    queued = false;
    waiting = waiting.filter((el) => {
      if (el.getBoundingClientRect().top > innerHeight * 0.92) return true;
      arrive(el);
      return false;
    });
    if (!waiting.length) removeEventListener("scroll", onScroll);
  };
  const onScroll = () => { if (!queued) { queued = true; setTimeout(check, 60); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  check();
}

/* ---------- Full-screen photo viewer (Gallery page and property pages) ---------- */
let lightboxApi = null;
function lightbox() {
  if (lightboxApi) return lightboxApi;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `
    <button class="lb-close" aria-label="Close">×</button>
    <button class="lb-nav lb-prev" aria-label="Previous photo">‹</button>
    <figure><img alt=""><figcaption><b></b><span></span><a>View property →</a></figcaption></figure>
    <button class="lb-nav lb-next" aria-label="Next photo">›</button>`;
  document.body.append(box);
  const img = $("img", box);
  const link = $("figcaption a", box);
  let items = [];
  let at = 0;

  const paint = () => {
    const it = items[at];
    img.src = it.src;
    img.alt = it.alt || "";
    $("figcaption b", box).textContent = it.title || "";
    $("figcaption span", box).textContent = it.sub || `${at + 1} / ${items.length}`;
    link.hidden = !it.href;
    if (it.href) link.href = it.href;
    $$(".lb-nav", box).forEach((b) => (b.hidden = items.length < 2));
  };
  const close = () => { box.classList.remove("show"); document.body.classList.remove("no-scroll"); };
  const move = (n) => { at = (at + n + items.length) % items.length; paint(); };

  box.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) move(-1);
    else if (e.target.closest(".lb-next")) move(1);
    else if (e.target === box || e.target.closest(".lb-close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("show")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
  });

  lightboxApi = {
    open(list, index) {
      items = list;
      at = index;
      paint();
      box.classList.add("show");
      document.body.classList.add("no-scroll");
    },
  };
  return lightboxApi;
}

/* ---------- Contact page: enquiry form ---------- */
const form = $("#enquiry-form");
if (form) {
  const typeSel = $("#f-type");
  const staySel = $("#f-stay");
  const status = $("#form-status");
  const allStayOptions = $$("option[data-type]", staySel);

  const fillStays = (selected) => {
    const keep = selected ?? staySel.value;
    allStayOptions.forEach((o) => {
      const visible = !typeSel.value || o.dataset.type === typeSel.value;
      o.hidden = !visible;
      o.disabled = !visible;
    });
    const opt = allStayOptions.find((o) => o.value === keep && !o.disabled);
    staySel.value = opt ? keep : "";
  };
  typeSel.addEventListener("change", () => fillStays());

  // Arriving from a property's "Send enquiry" button pre-selects that property.
  const params = new URLSearchParams(location.search);
  const preset = allStayOptions.find((o) => o.value === params.get("stay"));
  if (preset) typeSel.value = preset.dataset.type;
  else if ($(`option[value="${params.get("type")}"]`, typeSel)) typeSel.value = params.get("type");
  fillStays(preset ? preset.value : "");

  const enquiryText = () => {
    const d = Object.fromEntries(new FormData(form));
    const stayOpt = allStayOptions.find((o) => o.value === d.stay);
    return [
      "Enquiry from the gopuhomestays website",
      "",
      "Name: " + d.name,
      "Phone: " + d.phone,
      "Type of stay: " + (d.type ? typeSel.selectedOptions[0].textContent : "Any"),
      "Property: " + (stayOpt ? stayOpt.dataset.label : "Any / not sure"),
      d.checkin ? "Check-in: " + d.checkin : null,
      d.checkout ? "Check-out: " + d.checkout : null,
      "Guests: " + (d.guests || "-"),
      d.message ? "\nMessage:\n" + d.message : null,
    ].filter((line) => line !== null).join("\n");
  };
  // The form does not send anything itself: it opens WhatsApp with the details
  // written as a message to our number, and the visitor presses send there.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(enquiryText())}`, "_blank", "noopener");
    status.textContent = "WhatsApp has opened with your enquiry. Press send there to reach us.";
  });
}
