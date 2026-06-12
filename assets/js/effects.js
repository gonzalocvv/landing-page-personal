/* ============================================================
   Gonzalo Cabrera — Portfolio · FX
   GSAP + ScrollTrigger + Lenis: smooth scroll, intro del hero,
   reveals, tilt 3D, spotlight, cursor custom, magnetic buttons.
   Si GSAP no carga o el usuario prefiere menos movimiento,
   no se toca nada: el contenido queda visible y estático.
   ============================================================ */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  if (reduced || typeof window.gsap === "undefined") return;

  var gsap = window.gsap;
  var ST = window.ScrollTrigger || null;
  if (ST) gsap.registerPlugin(ST);

  /* ============================================================
     Lenis: smooth scroll + anclas
     ============================================================ */
  var lenis = null;
  if (typeof window.Lenis !== "undefined") {
    // lerp en vez de duration: responde al instante y no se siente "trancado"
    lenis = new window.Lenis({ lerp: 0.16, wheelMultiplier: 1.1 });
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    if (ST) lenis.on("scroll", ST.update);

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -72, duration: 0.9, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
      });
    });
  }

  /* ============================================================
     Barra de progreso de scroll
     ============================================================ */
  var progressEl = document.querySelector(".scroll-progress");
  function updateProgress() {
    if (!progressEl) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progressEl.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

  /* ============================================================
     Intro del hero: título por palabras + entrada escalonada
     ============================================================ */
  function splitWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    var out = [];
    words.forEach(function (w, i) {
      var mask = document.createElement("span");
      mask.className = "w-mask";
      var inner = document.createElement("span");
      inner.className = "w";
      inner.textContent = w;
      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
      out.push(inner);
    });
    return out;
  }

  var titleWords = [];
  var heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.querySelectorAll(":scope > span").forEach(function (s) {
      titleWords = titleWords.concat(splitWords(s));
    });
  }

  var intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".nav", { y: -16, autoAlpha: 0, duration: 0.6 }, 0)
    .from(".pill", { y: 18, autoAlpha: 0, duration: 0.5 }, 0.1)
    .from(".hero-loc", { y: 18, autoAlpha: 0, duration: 0.5 }, 0.18);
  if (titleWords.length) {
    intro.from(titleWords, { yPercent: 120, duration: 0.9, stagger: 0.09, ease: "expo.out" }, 0.28);
  }
  intro
    .from(".hero-subtitle", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.6)
    .from(".hero-actions .btn", { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.75)
    .from(".hero-tags .tag-mono", { y: 14, autoAlpha: 0, duration: 0.4, stagger: 0.05 }, 0.85)
    .from(".term", { y: 44, autoAlpha: 0, rotateX: 8, transformPerspective: 700, duration: 0.9 }, 0.5);

  /* ============================================================
     Reveals al scrollear
     ============================================================ */
  if (ST) {
    // Encabezados de sección
    document.querySelectorAll("main section").forEach(function (sec) {
      if (sec.id === "inicio") return;
      var header = sec.querySelectorAll(".section-subtitle, h2, .section-lead");
      if (!header.length) return;
      gsap.from(header, {
        scrollTrigger: { trigger: sec, start: "top 78%" },
        y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "power3.out"
      });
    });

    // Grupos de contenido
    [
      { sel: "#sobre-mi .about-text p", y: 24, stagger: 0.1 },
      { sel: "#sobre-mi .about-highlight span", y: 18, stagger: 0.08 },
      { sel: "#experiencia .timeline-item", x: -26, stagger: 0.12 },
      { sel: "#proyectos .project-card", y: 44, stagger: 0.12 },
      { sel: "#contacto .field, #contacto .input-hint, #contacto form .btn", y: 24, stagger: 0.08 }
    ].forEach(function (g) {
      var els = document.querySelectorAll(g.sel);
      if (!els.length) return;
      gsap.from(els, {
        scrollTrigger: { trigger: els[0].closest("section"), start: "top 70%" },
        y: g.y || 0, x: g.x || 0, autoAlpha: 0,
        duration: 0.8, stagger: g.stagger, ease: "power3.out"
      });
    });

    // Cards laterales
    [".profile-card", ".skills-panel", ".contact-card"].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 80%" },
        y: 36, autoAlpha: 0, scale: 0.97, duration: 0.9, ease: "power3.out"
      });
    });

    // Skill tags con pop
    document.querySelectorAll("#skills .skill-tags").forEach(function (group) {
      gsap.from(group.children, {
        scrollTrigger: { trigger: group, start: "top 86%" },
        y: 12, autoAlpha: 0, scale: 0.92, duration: 0.45, stagger: 0.04, ease: "back.out(1.6)"
      });
    });

    // Footer
    gsap.from(".footer-inner", {
      scrollTrigger: { trigger: "footer", start: "top 95%" },
      y: 16, autoAlpha: 0, duration: 0.7, ease: "power3.out"
    });

    // Parallax suave de la terminal
    gsap.to(".term", {
      yPercent: -6, ease: "none",
      scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: true }
    });

    // Link activo en navbar según sección
    document.querySelectorAll("main section[id]").forEach(function (sec) {
      var link = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
      if (!link) return;
      ST.create({
        trigger: sec, start: "top 50%", end: "bottom 50%",
        onToggle: function (self) { link.classList.toggle("is-active", self.isActive); }
      });
    });
  }

  /* ============================================================
     Spotlight: las cards siguen el mouse con --mx / --my
     ============================================================ */
  document.querySelectorAll(".project-card, .profile-card, .skills-panel, .contact-card").forEach(function (card) {
    card.classList.add("glow-card");
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ============================================================
     Solo desktop (pointer fino): cursor, tilt 3D y magnetic
     ============================================================ */
  if (!finePointer) return;

  // Cursor custom: punto + anillo con lag
  document.documentElement.classList.add("has-cursor");
  var dot = document.createElement("div");
  dot.className = "cursor-dot";
  var ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

  var dotX = gsap.quickTo(dot, "x", { duration: 0.07, ease: "power2.out" });
  var dotY = gsap.quickTo(dot, "y", { duration: 0.07, ease: "power2.out" });
  var ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
  var ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

  window.addEventListener("mousemove", function (e) {
    dotX(e.clientX); dotY(e.clientY);
    ringX(e.clientX); ringY(e.clientY);
  });

  var hoverSel = "a, button, .skill-tag, .project-card, input, textarea";
  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(hoverSel)) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(hoverSel)) ring.classList.remove("is-hover");
  });
  document.documentElement.addEventListener("mouseleave", function () {
    gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
  });
  document.documentElement.addEventListener("mouseenter", function () {
    gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
  });

  // Tilt 3D en cards de proyectos y terminal (no en la featured, es muy ancha)
  document.querySelectorAll(".project-card:not(.project-card--featured), .term").forEach(function (card) {
    gsap.set(card, { transformPerspective: 700 });
    var rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
    var rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      rotY(px * 7);
      rotX(-py * 7);
    });
    card.addEventListener("mouseleave", function () { rotX(0); rotY(0); });
  });

  // Botones magnéticos
  document.querySelectorAll(".btn, .theme-toggle, .lang-toggle, .pill-link").forEach(function (el) {
    var xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    var yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
    });
    el.addEventListener("mouseleave", function () { xTo(0); yTo(0); });
  });
})();
