/* ============================================================
   Gonzalo Cabrera — Portfolio
   Equipo de agentes autónomo · i18n ES/EN · tema claro/oscuro
   ============================================================ */
(function () {
  "use strict";

  /* ---- Contacto · Web3Forms (https://web3forms.com) --------------------------
     Pegá acá tu Access Key (gratis) para que el formulario envíe el mail solo.
     Mientras diga REEMPLAZA…, el form vuelve a abrir tu cliente de correo.      */
  var WEB3FORMS_KEY = "68a1abbe-173e-4771-8526-70bfb009b01a";

  /* ---------------- DATA ---------------- */
  var AGENTS = [
    { mono: "PM", role: "Product",   sub: "defining scope" },
    { mono: "AR", role: "Architect", sub: "modeling data" },
    { mono: "BE", role: "Backend",   sub: "writing .NET" },
    { mono: "UX", role: "UX / UI",   sub: "building the UI" },
    { mono: "QA", role: "QA",        sub: "running tests" },
    { mono: "DO", role: "DevOps",    sub: "shipping it" }
  ];
  var FILES = ["spec.md", "schema.prisma", "OrdersController.cs", "PayButton.tsx", "SplitTests.cs", "deploy.yml"];
  var SNIPS = [
"# feature: pago en 2 cuotas para CambiaLa\n# objetivo: cerrar un swap en dos pagos\n- conciliar cada cuota con el ledger de Supabase\n- exponer POST /payments/split\npriority: P1",
"model Installment {\n  id      String    @id @default(cuid())\n  swapId  String\n  amount  Int\n  paidAt  DateTime?\n  swap    Swap      @relation(fields: [swapId], references: [id])\n}",
"[HttpPost(\"payments/split\")]\npublic async Task<IActionResult> Split(Guid swapId) {\n    var plan = await _payments.SplitAsync(swapId, parts: 2);\n    return Ok(plan);\n}",
"export function PayButton({ swapId }) {\n  const split = useSplitPayment(swapId)\n  return (\n    <button onClick={split.start} className=\"btn-pay\">\n      Pagar en 2 cuotas →\n    </button>\n  )\n}",
"[Fact]\npublic async Task Split_crea_dos_cuotas_iguales() {\n    var plan = await _payments.SplitAsync(swapId, 2);\n    Assert.Equal(2, plan.Installments.Count);\n}",
"jobs:\n  ship:\n    steps:\n      - run: dotnet test\n      - run: vercel deploy --prod\n    status: \"live ✓\""
  ];
  var LOG = [
    { a: "product",   t: "spec aprobada · P1",   c: "var(--amber)" },
    { a: "architect", t: "schema migrada",        c: "var(--accent)" },
    { a: "backend",   t: "POST /split listo",     c: "var(--accent)" },
    { a: "ux/ui",     t: "PayButton conectado",   c: "var(--accent)" },
    { a: "qa",        t: "14 tests en verde ✓",   c: "var(--green)" },
    { a: "devops",    t: "deploy a vercel ✓",     c: "var(--green)" }
  ];
  var KW = {};
  ["public","private","async","await","return","var","new","export","function","const","let","model","run","status","priority","import","from","class","void","jobs","ship","steps","default","HttpPost","Fact","Task","IActionResult","Assert","Guid","String","Int","DateTime","Swap"].forEach(function (k) { KW[k] = 1; });

  var SKILLS = [
    { g: "Lenguajes", gEn: "Languages", items: [
      ["C#", "El lenguaje de mi día a día: APIs REST, TDD y .NET 8.", "My daily driver: REST APIs, TDD and .NET 8."],
      ["TypeScript", "Tipado fuerte en CambiaLa, de la UI a las server actions.", "Strong typing across CambiaLa, from UI to server actions."],
      ["Apex", "En TCS, dentro del ecosistema Salesforce.", "At TCS, inside the Salesforce ecosystem."],
      ["Java", "Base académica en POO y estructuras de datos.", "Academic base in OOP and data structures."],
      ["JavaScript", "Pegamento del front y scripting de automatizaciones.", "Front-end glue and automation scripting."]
    ]},
    { g: "Frameworks & plataformas", gEn: "Frameworks & platforms", items: [
      [".NET 8", "Backend principal: minimal APIs, EF y tests.", "Main backend: minimal APIs, EF and tests."],
      ["Next.js", "App Router + server actions en CambiaLa.", "App Router + server actions in CambiaLa."],
      ["Angular", "Front-end SPA con TypeScript que consume APIs REST (materia ORT).", "TypeScript SPA front-end consuming REST APIs (ORT course)."],
      ["Salesforce", "Apex y buenas prácticas de plataforma en TCS.", "Apex and platform best practices at TCS."],
      ["Blazor", "UI en .NET para TaskTrackPro (proyecto ORT).", ".NET UI for TaskTrackPro (ORT project)."]
    ]},
    { g: "Herramientas & prácticas", gEn: "Tools & practices", items: [
      ["Git · GitFlow", "Ramas por feature y PRs desde el primer commit.", "Feature branches and PRs from commit one."],
      ["GitHub Actions", "CI: test + build automáticos en cada push.", "CI: automatic test + build on every push."],
      ["Docker", "Entornos reproducibles para servicios.", "Reproducible environments for services."],
      ["TDD", "Tests primero — así nació TaskTrackPro.", "Tests first — that's how TaskTrackPro started."]
    ]},
    { g: "Arquitectura & diseño", gEn: "Architecture & design", items: [
      ["API REST", "Diseño e implementación de APIs REST en .NET, consumidas desde Angular.", "Designing and building REST APIs in .NET, consumed from Angular."],
      ["Arquitectura de componentes", "Cohesión y acoplamiento entre componentes con métricas de inestabilidad y abstracción: CRP, ADP, SDP, SAP.", "Component cohesion and coupling with instability/abstractness metrics: CRP, ADP, SDP, SAP."]
    ]},
    { g: "Bases de datos", gEn: "Databases", items: [
      ["SQL", "Modelado relacional, consultas y migraciones.", "Relational modeling, queries and migrations."],
      ["Supabase", "Postgres + auth + storage en CambiaLa.", "Postgres + auth + storage in CambiaLa."],
      ["MongoDB", "Documentos para prototipos rápidos.", "Documents for quick prototypes."]
    ]}
  ];

  var TICKET_SHOT =
    "<div style=\"background:var(--code-bg);border:1px solid var(--line);border-radius:12px;aspect-ratio:16/10;padding:20px;display:flex;flex-direction:column;justify-content:center;gap:11px;font-family:var(--mono)\">" +
    "<div style=\"align-self:flex-end;background:var(--accent);color:#fff;font-size:12.5px;padding:9px 13px;border-radius:13px 13px 4px 13px;max-width:78%\">📸 ticket-super.jpg</div>" +
    "<div style=\"align-self:flex-start;background:rgba(255,255,255,.07);color:#e2e8f0;font-size:12.5px;padding:9px 13px;border-radius:13px 13px 13px 4px;max-width:84%;line-height:1.5\">✅ Guardado en Notion<br><span style=\"color:#818cf8;font-size:11px\">Supermercado · 11/06 · 3 ítems</span></div>" +
    "</div>";

  function gbar(label, left, width, kind) {
    var fill;
    if (kind === "crit") fill = "<div style='position:absolute;left:" + left + "%;width:" + width + "%;height:100%;border-radius:5px;background:#fb7185'></div>";
    else if (kind === "slack") fill = "<div style='position:absolute;left:" + left + "%;width:" + width + "%;height:100%;border-radius:5px;border:1.5px dashed var(--faint);box-sizing:border-box'></div>";
    else fill = "<div style='position:absolute;left:" + left + "%;width:" + width + "%;height:100%;border-radius:5px;background:var(--accent)'></div>";
    return "<div style='display:flex;align-items:center;gap:9px'><span style='width:20px;font-size:10px;color:var(--faint)'>" + label + "</span><div style='flex:1;height:9px;border-radius:5px;background:var(--line);position:relative'>" + fill + "</div></div>";
  }
  var TASK_SHOT =
    "<div style=\"background:var(--surface);border:1px solid var(--line);border-radius:12px;aspect-ratio:16/10;padding:18px 20px;display:flex;flex-direction:column;justify-content:center;gap:10px;font-family:var(--mono)\">" +
    "<div style=\"font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);margin-bottom:2px\">sprint · gantt</div>" +
    gbar("T1", 0, 34, "task") + gbar("T2", 28, 32, "crit") + gbar("T3", 22, 18, "slack") + gbar("T4", 56, 40, "task") +
    "<div style=\"display:flex;gap:16px;margin-top:6px;font-size:9.5px;color:var(--faint)\">" +
    "<span><span style='display:inline-block;width:9px;height:6px;border-radius:2px;background:#fb7185;margin-right:5px'></span>camino crítico</span>" +
    "<span><span style='display:inline-block;width:9px;height:6px;border-radius:2px;background:var(--accent);margin-right:5px'></span>tarea</span>" +
    "<span><span style='display:inline-block;width:9px;height:6px;border-radius:2px;border:1.5px dashed var(--faint);box-sizing:border-box;margin-right:5px'></span>holgura</span></div></div>";

  var PROJECTS = [
    { name: "CambiaLa", tag: "cambiala.uy", featured: true, img: "assets/img/sccambiala.webp",
      stack: "Next.js · TypeScript · Supabase · Prisma · Vercel",
      problem: ["Problema", "Problem"],
      problemT: ["Cuando ya cambiaste figuritas con todos tus conocidos, solo queda comprar más. Ninguna app te conectaba con coleccionistas cerca.", "Once you've swapped stickers with everyone you know, you're stuck buying more. No app connected you with collectors nearby."],
      result: ["Resultado", "Result"],
      resultT: ["En producción con dominio propio y SEO desde el día uno. Producto end-to-end: de la idea al deploy.", "In production with its own domain and SEO from day one. End-to-end product: from idea to deploy."],
      links: [["Probala →", "https://cambiala.uy"], ["LinkedIn →", "https://www.linkedin.com/posts/gonzalocabrera9_desarrollo-ia-claude-share-7470829272517992448-fKOZ/"]] },
    { name: "TicketReceiptBot", tag: "🧾", featured: false, shotHtml: TICKET_SHOT,
      stack: "Python · Claude API · Notion · Railway",
      problem: ["Problema", "Problem"],
      problemT: ["Registrar gastos a mano tiene demasiada fricción; las apps existentes son pagas o exigen carga manual.", "Logging expenses by hand has too much friction; existing apps are paid or require manual entry."],
      result: ["Resultado", "Result"],
      resultT: ["En uso diario. El repo es público con plantilla replicable, ~$0.003 por ticket.", "In daily use. Public repo with a replicable template, ~$0.003 per receipt."],
      links: [["GitHub →", "https://github.com/gonzalocvv/TicketReceiptBot"], ["LinkedIn →", "https://www.linkedin.com/posts/gonzalocabrera9_empezando-el-nuevo-semestre-quer%C3%ADa-saber-ugcPost-7448389935453388800-JPEp"]] },
    { name: "TaskTrackPro", tag: "📋", featured: false, shotHtml: TASK_SHOT,
      stack: ".NET 8 · Blazor · SQL",
      problem: ["Problema", "Problem"],
      problemT: ["Gestión de proyectos y tareas con permisos y persistencia relacional (proyecto académico, ORT).", "Project and task management with permissions and relational persistence (academic project, ORT)."],
      result: ["Resultado", "Result"],
      resultT: ["Suite de tests completa y pipeline de CI con GitHub Actions.", "Full test suite and CI pipeline with GitHub Actions."],
      links: [["Ver repo →", "https://github.com/gonzalocvv/TaskTrackPro"]] }
  ];

  var EN = {
    "nav.about": "about", "nav.skills": "skills", "nav.experience": "experience", "nav.projects": "projects", "nav.contact": "contact",
    "hero.sub": "I build real products, end to end. C#, .NET 8 and SQL. Creator of <a href=\"https://cambiala.uy\" target=\"_blank\" rel=\"noreferrer\">CambiaLa</a>. Now, Salesforce at TCS.",
    "hero.viewProjects": "View projects →", "hero.cv": "Download CV",
    "eng.building": "· building products", "eng.log": "build log", "eng.orbit": "drag to orbit",
    "intro.hint": "scroll to open", "intro.sub": "Backend developer who ships complete products.",
    "about.title": "From real problem to deploy",
    "about.p1": "I'm a third-year Software Engineering student at Universidad ORT and a Salesforce Trainee at <strong>Tata Consultancy Services</strong>. But what defines me best is what I build outside of work.",
    "about.p2": "I shipped <strong>CambiaLa</strong> (<a href=\"https://cambiala.uy\" target=\"_blank\" rel=\"noreferrer\">cambiala.uy</a>), a sticker-swap app for the 2026 World Cup — Next.js, TypeScript, Supabase, Prisma, deployed on Vercel — where product, architecture and scope decisions were all mine. Before that, a Telegram bot that logs expenses from a photo of the receipt using the Claude API; the repo is public.",
    "about.p3": "My daily base is backend: C#, .NET 8, SQL, REST APIs, TDD, GitFlow and CI with GitHub Actions. I use AI tools to move faster — the product and architecture calls stay mine.",
    "about.p4": "That's the constant across my projects: find a real problem, decide what to build (and what not to) and ship it.",
    "about.hl1": "BSc Software Eng · ORT · 3rd year", "about.hl2": "CambiaLa in production", "about.hl3": "Salesforce Trainee · TCS", "about.hl4": "TDD · GitFlow · CI",
    "profile.role": "Software Developer · backend",
    "skills.title": "Tech stack", "skills.lead": "The technologies I use daily and the ones I'm picking up during my internship. Hover or tap a skill to see how I use it.",
    "skills.panelDefault": "Hover or tap a skill to see how I use it in real projects.", "skills.panelFooter": "Every technology maps to a real project.",
    "exp.title": "Experience & education", "exp.lead": "Where I'm growing as a developer and what I'm studying alongside.",
    "exp.colExp": "Experience", "exp.colEdu": "Education", "exp.current": "ongoing", "exp.current2": "ongoing",
    "exp.tcsTitle": "Intern — Tata Consultancy Services", "exp.tcsMeta": "Montevideo · Apr 2026 — Present", "exp.tcsBody": "Development inside the Salesforce ecosystem with Apex and platform best practices. Distributed teams, version control and quality-driven work.",
    "exp.sycTitle": "Private driver — SYC Company", "exp.sycMeta": "Paso de los Toros · Jul 2022 — Mar 2023", "exp.sycBody": "Daily transport of UPM workers, coordinating routes and schedules. It sharpened my responsibility, organization and communication.",
    "exp.ortTitle": "BSc in Software Engineering — ORT", "exp.ortMeta": "Montevideo · 2023 — 2027 (est.)", "exp.ortBody": "Advanced student (3rd year). Programming, software architecture, databases, requirements engineering and methodologies.",
    "exp.fceTitle": "English B2 — First Certificate (FCE)", "exp.fceMeta": "Cambridge certification", "exp.fceBody": "Upper-intermediate. Comfortable reading technical docs and communicating with international teams.",
    "proj.title": "What I've been building", "proj.lead": "Problem, decisions and result: that's how I tackle every project.",
    "contact.title": "Let's talk?", "contact.lead": "Got a project, a proposal or just want to say hi? Use the form or email me directly.",
    "contact.name": "Name", "contact.email": "Email", "contact.message": "Message", "contact.hint": "Your message lands straight in my inbox — I'll reply soon.", "contact.send": "Send message", "contact.cardTitle": "Contact details", "contact.loc": "Location"
  };

  /* ---------------- STATE ---------------- */
  var timers = [], version = 1.4, lang = "es", ES = {};
  var rafId = 0, three = null, hubs = null, hubState = [], packet3 = null, labels3 = null, workerMat = null, edgeMat = null, col = null, ready3d = false, curPhase = 0, spin = 0;
  var tilt = { x: 0, y: 0 }, orbit = { x: 0, y: 0 };
  function wait(ms, fn) { var id = setTimeout(fn, ms); timers.push(id); return id; }
  function $(id) { return document.getElementById(id); }

  /* ---------------- ENGINE · VISIBILIDAD ----------------
     El render 3D y la simulación de build corrían para siempre, incluso con el
     panel fuera de pantalla o la pestaña oculta. Un solo controlador pausa y
     reanuda todo junto: rAF loop, timers de la sim y el tween del paquete. */
  var engine = { inView: true, pageVisible: !document.hidden, running: false, activeTween: null };
  function engineActive() { return engine.inView && engine.pageVisible; }

  var simQueue = [];
  function simWait(ms, fn) {
    var item = { fn: fn, remaining: ms, firedAt: 0, id: 0 };
    item.arm = function () {
      item.firedAt = performance.now();
      item.id = setTimeout(function () {
        var i = simQueue.indexOf(item); if (i > -1) simQueue.splice(i, 1);
        item.fn();
      }, item.remaining);
    };
    simQueue.push(item);
    if (engineActive()) item.arm(); // pausado → queda en cola y lo arma resumeSim()
    return item;
  }
  function pauseSim() {
    simQueue.forEach(function (it) {
      if (it.id) {
        clearTimeout(it.id);
        it.remaining = Math.max(0, it.remaining - (performance.now() - it.firedAt));
        it.id = 0;
      }
    });
  }
  function resumeSim() {
    simQueue.forEach(function (it) { if (!it.id) it.arm(); });
  }

  function startLoop() {
    if (REDUCE || engine.running || !three) return;
    engine.running = true;
    rafId = requestAnimationFrame(animate3D);
  }
  function stopLoop() {
    engine.running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  }
  function syncEngine() {
    if (engineActive()) { startLoop(); resumeSim(); if (engine.activeTween) engine.activeTween.play(); }
    else { stopLoop(); pauseSim(); if (engine.activeTween) engine.activeTween.pause(); }
  }
  function initEngineVisibility() {
    var panel = document.querySelector(".engine");
    if (panel && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (e) { engine.inView = e[0].isIntersecting; syncEngine(); }, { threshold: 0 });
      io.observe(panel);
    }
    document.addEventListener("visibilitychange", function () { engine.pageVisible = !document.hidden; syncEngine(); });
  }

  /* ---------------- SCROLL · LENIS ----------------
     Lenis es el único smooth-scroll (se quitó scroll-behavior del CSS) y el
     ticker de GSAP es el único dueño del rAF (autoRaf:false — nunca los dos). */
  var REDUCE = false;
  try { REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var lenis = null;
  function initLenis() {
    // reduced-motion o CDN caído → scroll nativo (scroll-padding-top cubre los anchors)
    if (REDUCE || !window.Lenis || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    lenis = new Lenis({ autoRaf: false, anchors: { offset: -80 } }); // offset = header sticky
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------------- i18n ---------------- */
  function captureES() {
    ES = {};
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) ES[nodes[i].getAttribute("data-i18n")] = nodes[i].innerHTML;
  }
  function applyLang() {
    var dict = lang === "en" ? EN : ES;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var k = nodes[i].getAttribute("data-i18n");
      if (dict[k] != null) nodes[i].innerHTML = dict[k];
    }
    var lt = $("lang-toggle"); if (lt) lt.textContent = lang === "en" ? "ES" : "EN";
  }

  /* ---------------- TOGGLES ---------------- */
  function initToggles() {
    var root = document.documentElement;
    var tt = $("theme-toggle");
    function syncThemeBtn() { if (tt) tt.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "☾"; }
    syncThemeBtn();
    if (tt) tt.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark";
      root.setAttribute("data-theme", dark ? "light" : "dark");
      try { localStorage.setItem("gc-theme", dark ? "light" : "dark"); } catch (e) {}
      applySceneColors();
      syncThemeBtn();
    });

    var lt = $("lang-toggle");
    if (lt) lt.addEventListener("click", function () {
      lang = lang === "en" ? "es" : "en";
      try { localStorage.setItem("gc-lang", lang); } catch (e) {}
      applyLang(); buildSkills(); buildProjects();
      initProjectStack(); // las cards se reconstruyeron: re-crear sus triggers
      bootLast = -1; renderBoot(); // re-tipea el boot de la intro en el idioma nuevo
    });

    var header = document.querySelector(".site-header"), burger = $("nav-burger"), panel = $("nav-panel");
    if (header && burger && panel) {
      var setOpen = function (open) {
        header.classList.toggle("nav-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        if (lenis) { if (open) lenis.stop(); else lenis.start(); }
      };
      var isOpen = function () { return header.classList.contains("nav-open"); };
      burger.addEventListener("click", function () { setOpen(!isOpen()); });
      panel.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isOpen()) { setOpen(false); burger.focus(); }
      });
      window.addEventListener("resize", function () { if (window.innerWidth > 980 && isOpen()) setOpen(false); });
    }

    var form = $("contact-form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var en = lang === "en";
      var n = ($("cf-name") || {}).value || "", em = ($("cf-email") || {}).value || "", m = ($("cf-msg") || {}).value || "";
      var status = $("cf-status"), btn = form.querySelector(".btn-submit");
      function setStatus(txt, color) { if (status) { status.textContent = txt; status.style.color = color || "var(--faint)"; } }

      if (!n.trim() || !em.trim() || !m.trim()) {
        setStatus(en ? "Please fill in every field." : "Completá todos los campos.", "var(--amber)");
        return;
      }

      // Sin Access Key → fallback: abre el cliente de correo (comportamiento viejo).
      if (!WEB3FORMS_KEY || WEB3FORMS_KEY.indexOf("REEMPLAZA") !== -1) {
        var subj = encodeURIComponent("Contacto portfolio — " + n);
        var body = encodeURIComponent(m + "\n\n— " + n + " (" + em + ")");
        window.location.href = "mailto:gcabrera3210@gmail.com?subject=" + subj + "&body=" + body;
        return;
      }

      if (btn) btn.disabled = true;
      setStatus(en ? "Sending…" : "Enviando…", "var(--muted)");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Contacto portfolio — " + n,
          from_name: "Portfolio · " + n,
          name: n, email: em, message: m
        })
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.success) {
          setStatus(en ? "Message sent ✓ I'll get back to you soon." : "Mensaje enviado ✓ Te respondo a la brevedad.", "var(--green)");
          form.reset();
        } else {
          setStatus(en ? "Could not send. Email me at gcabrera3210@gmail.com." : "No se pudo enviar. Escribime a gcabrera3210@gmail.com.", "var(--amber)");
        }
      }).catch(function () {
        setStatus(en ? "Network error. Email me at gcabrera3210@gmail.com." : "Error de red. Escribime a gcabrera3210@gmail.com.", "var(--amber)");
      }).then(function () {
        if (btn) btn.disabled = false;
      });
    });
  }

  /* ---------------- SCROLL · REVEALS / PARALLAX / TIMELINE ----------------
     Una sola familia de motion en todo el sitio: entradas power4.out con stagger
     de 80ms, "nada aparece de la nada" (scale .98 + fade). El estado oculto lo
     pone SOLO JS y solo bajo el fold — sin GSAP el contenido queda visible. */
  function initReveal() {
    if (REDUCE || !window.gsap || !window.ScrollTrigger) return;
    var els = gsap.utils.toArray(".reveal");
    if (!els.length) return;
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        gsap.set(el, { autoAlpha: 0, y: 24, scale: .98 });
      }
    });
    ScrollTrigger.batch(".reveal", {
      start: "top 88%", once: true,
      onEnter: function (batch) {
        gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: .7, ease: "power4.out", stagger: 0.08, overwrite: true });
      }
    });
  }

  function initParallax() {
    if (REDUCE || !window.gsap || !window.ScrollTrigger) return;
    var img = document.querySelector(".profile-photo img"); if (!img) return;
    gsap.matchMedia().add("(min-width: 760px)", function () {
      gsap.set(img, { scale: 1.12 }); // sangrado para que el desplazamiento no muestre bordes
      gsap.fromTo(img, { yPercent: 6 }, {
        yPercent: -6, ease: "none",
        scrollTrigger: { trigger: ".profile-card", start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  function initTimelines() {
    if (REDUCE || !window.gsap || !window.ScrollTrigger) return;
    document.querySelectorAll(".timeline").forEach(function (tl) {
      var fill = tl.querySelector(".tl-track-fill");
      if (fill) gsap.fromTo(fill, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: tl, start: "top 75%", end: "bottom 55%", scrub: true }
      });
      tl.querySelectorAll(".tl-item").forEach(function (item) {
        var node = item.querySelector(".tl-node");
        if (node) gsap.fromTo(node, { scale: .5, autoAlpha: .3 }, {
          scale: 1, autoAlpha: 1, duration: .45, ease: "back.out(1.7)",
          scrollTrigger: { trigger: item, start: "top 80%", once: true }
        });
      });
    });
  }

  /* ---------------- SKILLS ---------------- */
  function buildSkills() {
    var host = $("skill-groups"); if (!host) return;
    var en = lang === "en";
    host.innerHTML = SKILLS.map(function (grp) {
      return "<div class='skill-group'><div class='skill-group-title'>" + (en ? grp.gEn : grp.g) + "</div>" +
        "<div class='skill-tags'>" + grp.items.map(function (it) {
          return "<button class='skill-tag' type='button' data-det='" + encodeURIComponent(en ? it[2] : it[1]) + "' data-name='" + it[0] + "'>" + it[0] + "</button>";
        }).join("") + "</div></div>";
    }).join("");
    var main = $("skills-panel-main");
    var btns = host.querySelectorAll("button[data-det]");
    btns.forEach(function (b) {
      function act() {
        if (main) main.innerHTML = "<b>" + b.getAttribute("data-name") + "</b> — " + decodeURIComponent(b.getAttribute("data-det"));
        btns.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
      }
      b.addEventListener("mouseenter", act);
      b.addEventListener("focus", act);
      b.addEventListener("click", act);
    });
  }

  /* ---------------- PROJECTS ---------------- */
  function buildProjects() {
    var host = $("projects"); if (!host) return;
    var en = lang === "en";
    var steps = ["plan", "code", "test", "ship"];
    host.innerHTML = PROJECTS.map(function (p) {
      var shot = p.img
        ? "<div class='project-shot'><img src='" + p.img + "' alt='" + p.name + "' loading='lazy'></div>"
        : (p.shotHtml ? p.shotHtml
        : "<div class='project-shot' style='display:flex;align-items:center;justify-content:center;font-size:54px;background:var(--code-bg)'>" + p.tag + "</div>");
      var pipe = "<div class='pipe' data-pipe>" + steps.map(function (s) {
        return "<div class='pipe-step'><div class='pipe-bar'><span class='pipe-seg' data-seg></span></div><span class='pipe-label'>" + s + "</span></div>";
      }).join("") + "<span class='pipe-status' data-pstatus>building…</span></div>";
      var links = p.links.map(function (l) {
        return "<a class='project-link' href='" + l[1] + "' target='_blank' rel='noreferrer'>" + l[0] + "</a>";
      }).join("<span class='dot'>·</span>");
      return "<article class='project" + (p.featured ? " featured" : "") + "'>" +
        "<div>" + shot + (p.featured ? pipe : "") + "</div>" +
        "<div><div class='project-name-row'><h3 class='project-name'>" + p.name + "</h3><span class='project-tag'>" + p.tag + "</span></div>" +
        "<div class='project-brief'>" +
          "<div><div class='brief-label'>" + (en ? p.problem[1] : p.problem[0]) + "</div><p class='brief-text'>" + (en ? p.problemT[1] : p.problemT[0]) + "</p></div>" +
          "<div><div class='brief-label'>Stack</div><p class='brief-text code'>" + p.stack + "</p></div>" +
          "<div><div class='brief-label'>" + (en ? p.result[1] : p.result[0]) + "</div><p class='brief-text'>" + (en ? p.resultT[1] : p.resultT[0]) + "</p></div>" +
        "</div>" +
        "<div class='project-links'>" + links + "</div></div>" +
        "<div class='project-veil' aria-hidden='true'></div></article>";
    }).join("");
    observeProjects();
  }

  /* Card stacking (solo desktop): sticky nativo hace el pin — mucho más robusto que
     pinnear con ScrollTrigger cards de altura variable sobre Lenis — y GSAP scrubbea
     el "retroceso" (scale + velo) de la card que queda tapada. */
  var projectStackMM = null;
  function initProjectStack() {
    if (projectStackMM) { projectStackMM.revert(); projectStackMM = null; } // el toggle de idioma reconstruye las cards
    if (REDUCE || !window.gsap || !window.ScrollTrigger) return;
    projectStackMM = gsap.matchMedia();
    projectStackMM.add("(min-width: 981px)", function () {
      var cards = gsap.utils.toArray("#projects .project");
      if (cards.length < 2) return;
      gsap.set(cards, { transformOrigin: "50% 0%" });
      cards.forEach(function (card, i) {
        if (i === cards.length - 1) return;
        var veil = card.querySelector(".project-veil");
        var tl = gsap.timeline({
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 120px", scrub: true }
        });
        tl.to(card, { scale: .96, y: -8, ease: "none" }, 0);
        if (veil) tl.to(veil, { opacity: .45, ease: "none" }, 0);
      });
    });
  }
  function observeProjects() {
    var pipes = document.querySelectorAll("[data-pipe]");
    if (!("IntersectionObserver" in window)) { pipes.forEach(runProjectPipe); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { runProjectPipe(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    pipes.forEach(function (p) { io.observe(p); });
  }
  function runProjectPipe(pipe) {
    var segs = pipe.querySelectorAll("[data-seg]");
    var status = pipe.querySelector("[data-pstatus]");
    segs.forEach(function (s, i) { wait(260 * i + 200, function () { s.style.transform = "scaleX(1)"; }); });
    wait(260 * segs.length + 500, function () {
      if (status) { status.textContent = lang === "en" ? "shipped ✓" : "deploy ✓"; status.style.color = "var(--green)"; }
    });
  }

  /* ---------------- AGENT ENGINE · WebGL 3D ---------------- */
  function buildRoster() {
    hubState = AGENTS.map(function () { return "idle"; });
    // sin WebGL (o si Three falla) el resto del panel sigue funcionando
    loadThree(function () { try { init3D(); } catch (e) {} });
  }

  /* Three.js (~600KB) ya no bloquea el primer paint: se inyecta post-LCP en idle,
     o antes si el panel se acerca al viewport — lo que dispare primero. */
  function loadThree(cb) {
    if (window.THREE) return cb();
    var fired = false;
    function go() {
      if (fired) return; fired = true;
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.onload = cb; // si el CDN falla, la sim de tipeo sigue sola (guards ready3d)
      document.head.appendChild(s);
    }
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 4000 }); else setTimeout(go, 2500);
    var el = $("net3d");
    if (el && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); go(); } }, { rootMargin: "600px" });
      io.observe(el);
    }
  }

  function init3D() {
    var canvas = $("net-canvas"), wrap = $("net3d");
    if (!canvas || !wrap) return;
    if (!window.THREE) return;
    if (three) return;
    var THREE = window.THREE;
    function getW() { return wrap.clientWidth || 520; }
    function getH() { return wrap.clientHeight || 220; }
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(getW(), getH(), false);
    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(42, getW() / getH(), 0.1, 100);
    cam.position.set(0, 0, 11);
    var group = new THREE.Group(); scene.add(group);
    three = { THREE: THREE, renderer: renderer, scene: scene, cam: cam, group: group, wrap: wrap, getW: getW, getH: getH };

    applySceneColors();

    // niebla al color de fondo: da profundidad real (lo lejano se funde con la página)
    scene.fog = new THREE.Fog(col.bg, 8, 16);

    // textura radial blanca→transparente para halos/partículas suaves
    function radialTexture(size, stops) {
      var c = document.createElement("canvas"); c.width = c.height = size;
      var g = c.getContext("2d");
      var grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      stops.forEach(function (s) { grad.addColorStop(s[0], s[1]); });
      g.fillStyle = grad; g.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }

    var R = 3.15; hubs = [];
    var hubGeo = new THREE.SphereGeometry(0.26, 24, 24);
    var haloGeo = new THREE.SphereGeometry(0.5, 24, 24);
    for (var i = 0; i < 6; i++) {
      var ang = (i / 6) * Math.PI * 2 - Math.PI / 2;
      var x = Math.cos(ang) * R, z = Math.sin(ang) * R, y = Math.sin(ang * 2) * 0.55;
      var mat = new THREE.MeshBasicMaterial({ color: col.ink });
      var m = new THREE.Mesh(hubGeo, mat); m.position.set(x, y, z); group.add(m);
      // additive: el halo suma luz en vez de tapar la esfera
      var hmat = new THREE.MeshBasicMaterial({ color: col.accent, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      var halo = new THREE.Mesh(haloGeo, hmat); halo.position.set(x, y, z); group.add(halo);
      hubs.push({ m: m, mat: mat, halo: halo, hmat: hmat, base: new THREE.Vector3(x, y, z) });
    }

    var NW = 78, wpos = new Float32Array(NW * 3); var workerBase = [];
    for (var j = 0; j < NW; j++) {
      var rr = 4.3 + Math.random() * 2.4, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      var wx = rr * Math.sin(ph) * Math.cos(th), wy = rr * Math.sin(ph) * Math.sin(th) * 0.72, wz = rr * Math.cos(ph);
      wpos[j * 3] = wx; wpos[j * 3 + 1] = wy; wpos[j * 3 + 2] = wz; workerBase.push(new THREE.Vector3(wx, wy, wz));
    }
    var wgeo = new THREE.BufferGeometry(); wgeo.setAttribute("position", new THREE.BufferAttribute(wpos, 3));
    // partículas redondas y suaves (sin textura eran cuadrados duros)
    workerMat = new THREE.PointsMaterial({
      color: col.worker, size: 0.17, sizeAttenuation: true, transparent: true, opacity: 0.85,
      map: radialTexture(64, [[0, "rgba(255,255,255,1)"], [0.4, "rgba(255,255,255,.9)"], [1, "rgba(255,255,255,0)"]]),
      alphaTest: 0.01, depthWrite: false
    });
    group.add(new THREE.Points(wgeo, workerMat));

    var lp = [];
    for (var k = 0; k < 6; k++) { var aa = hubs[k].base, bb = hubs[(k + 1) % 6].base; lp.push(aa.x, aa.y, aa.z, bb.x, bb.y, bb.z); }
    for (var n = 0; n < 6; n++) {
      var a2 = hubs[n].base;
      var near = workerBase.map(function (w, idx) { return { idx: idx, d: a2.distanceTo(w) }; }).sort(function (p, q) { return p.d - q.d; }).slice(0, 3);
      near.forEach(function (o) { var w = workerBase[o.idx]; lp.push(a2.x, a2.y, a2.z, w.x, w.y, w.z); });
    }
    var lgeo = new THREE.BufferGeometry(); lgeo.setAttribute("position", new THREE.Float32BufferAttribute(lp, 3));
    edgeMat = new THREE.LineBasicMaterial({ color: col.edge, transparent: true, opacity: 0.5 });
    group.add(new THREE.LineSegments(lgeo, edgeMat));

    var core = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), new THREE.MeshBasicMaterial({ color: col.accent }));
    // glow del paquete como sprite additive: halo suave siempre de cara a cámara
    var glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture(128, [[0, "rgba(255,255,255,.95)"], [0.35, "rgba(255,255,255,.4)"], [1, "rgba(255,255,255,0)"]]),
      color: col.accent, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.scale.set(1.1, 1.1, 1);
    core.visible = false; glow.visible = false; group.add(core); group.add(glow);
    packet3 = { core: core, glow: glow, coreMat: core.material, glowMat: glow.material };

    buildLabels();

    var dragging = false, px = 0, py = 0;
    wrap.addEventListener("pointermove", function (e) {
      var b = wrap.getBoundingClientRect();
      tilt.x = ((e.clientY - b.top) / b.height - 0.5);
      tilt.y = ((e.clientX - b.left) / b.width - 0.5);
      if (dragging) { orbit.y += (e.clientX - px) * 0.006; orbit.x += (e.clientY - py) * 0.006; px = e.clientX; py = e.clientY; }
      // reduced-motion: sin loop, pero el drag (movimiento pedido por el usuario) re-renderiza on-demand
      if (REDUCE && dragging) {
        group.rotation.y = orbit.y;
        group.rotation.x = orbit.x;
        renderOnce();
      }
    });
    wrap.addEventListener("pointerdown", function (e) { dragging = true; px = e.clientX; py = e.clientY; wrap.style.cursor = "grabbing"; try { wrap.setPointerCapture(e.pointerId); } catch (_) {} });
    function endDrag() { dragging = false; wrap.style.cursor = "grab"; }
    wrap.addEventListener("pointerup", endDrag);
    wrap.addEventListener("pointercancel", endDrag);

    ready3d = true;
    if (REDUCE) {
      // frame final estático: todo el equipo en verde, un solo render
      hubState = AGENTS.map(function () { return "done"; });
      recolorHubs();
      labelsAllDone();
      renderOnce();
    } else {
      setActive(curPhase);
      startLoop();
    }
  }

  function renderOnce() {
    if (!three) return;
    three.renderer.render(three.scene, three.cam);
    updateLabels();
  }

  function applySceneColors() {
    var THREE = window.THREE; if (!THREE) return;
    var page = document.documentElement;
    var dark = page.getAttribute("data-theme") === "dark";
    var acc = "#6366f1", bgc = dark ? "#0a0e16" : "#f6f7f9";
    try { acc = (getComputedStyle(page).getPropertyValue("--accent") || acc).trim() || acc; } catch (_) {}
    try { bgc = (getComputedStyle(page).getPropertyValue("--bg") || bgc).trim() || bgc; } catch (_) {}
    col = {
      ink: new THREE.Color(dark ? 0xeef1f6 : 0x0f1722),
      accent: new THREE.Color(acc),
      green: new THREE.Color(dark ? 0x34d399 : 0x10b981),
      worker: new THREE.Color(dark ? 0x4a5870 : 0x9aa6b8),
      edge: new THREE.Color(dark ? 0x39455a : 0xb6bdc9),
      bg: new THREE.Color(bgc)
    };
    if (workerMat) workerMat.color.copy(col.worker);
    if (edgeMat) edgeMat.color.copy(col.edge);
    if (packet3) { packet3.coreMat.color.copy(col.accent); packet3.glowMat.color.copy(col.accent); }
    if (three && three.scene && three.scene.fog) three.scene.fog.color.copy(col.bg);
    recolorHubs();
    if (REDUCE) renderOnce(); // sin loop, el cambio de tema re-renderiza una vez
  }

  function recolorHubs() {
    if (!hubs || !col) return;
    hubs.forEach(function (h, i) {
      var s = hubState[i] || "idle";
      if (s === "active") { h.mat.color.copy(col.accent); h.hmat.color.copy(col.accent); h.hmat.opacity = 0.2; h.m.scale.setScalar(1.45); }
      else if (s === "done") { h.mat.color.copy(col.green); h.hmat.opacity = 0; h.m.scale.setScalar(1.05); }
      else { h.mat.color.copy(col.ink); h.hmat.opacity = 0; h.m.scale.setScalar(1); }
    });
  }

  function buildLabels() {
    var host = $("net-labels"); if (!host) return;
    host.innerHTML = "";
    labels3 = AGENTS.map(function (a) {
      var el = document.createElement("div");
      el.className = "net-label";
      el.innerHTML = "<span class='lab-mono'>" + a.mono + "</span><span class='lab-role'>" + a.role + "</span>";
      host.appendChild(el); return el;
    });
  }

  function updateLabels() {
    if (!labels3 || !three || !hubs) return;
    var cam = three.cam, group = three.group, wrap = three.wrap, THREE = three.THREE;
    var w = wrap.clientWidth, h = wrap.clientHeight;
    var v = new THREE.Vector3();
    hubs.forEach(function (hub, i) {
      v.copy(hub.base).applyMatrix4(group.matrixWorld).project(cam);
      var x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
      var el = labels3[i];
      el.style.transform = "translate(-50%,-150%) translate(" + x + "px," + y + "px)";
      el.style.opacity = v.z < 1 ? "1" : "0";
    });
  }

  function animate3D() {
    if (!three || !engine.running) return;
    var renderer = three.renderer, scene = three.scene, cam = three.cam, group = three.group;
    spin += 0.0022;
    var ty = orbit.y + tilt.y * 0.5;
    var tx = orbit.x + tilt.x * 0.4;
    group.rotation.y = spin + ty;
    group.rotation.x += (tx - group.rotation.x) * 0.06;
    group.position.y = Math.sin(spin * 1.6) * 0.12;
    var pulse = 1 + Math.sin(performance.now() * 0.004) * 0.13;
    hubs.forEach(function (h, i) { if ((hubState[i] || "") === "active") h.halo.scale.setScalar(pulse); });
    renderer.render(scene, cam);
    updateLabels();
    rafId = requestAnimationFrame(animate3D);
  }

  function measure() {
    if (!three) return;
    three.renderer.setSize(three.getW(), three.getH(), false);
    three.cam.aspect = three.getW() / three.getH(); three.cam.updateProjectionMatrix();
    if (!engine.running) renderOnce(); // pausado o reduced-motion: que el resize no deje el canvas roto
  }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function hlLine(line) {
    var cm = line.match(/^(\s*)((#|\/\/).*)$/);
    if (cm) return esc(cm[1]) + "<span style='color:#64748b'>" + esc(cm[2]) + "</span>";
    var res = "", re = /(\s+)|("[^"]*"?|'[^']*'?)|([A-Za-z_][A-Za-z0-9_]*)|([{}()\[\];:,.@<>\/=\-+?])|(\d+)/g, m;
    while ((m = re.exec(line))) {
      if (m[1]) res += esc(m[1]);
      else if (m[2]) res += "<span style='color:#fbbf77'>" + esc(m[2]) + "</span>";
      else if (m[3]) {
        var w = m[3];
        if (KW[w]) res += "<span style='color:#818cf8'>" + esc(w) + "</span>";
        else if (/^[A-Z]/.test(w)) res += "<span style='color:#38bdf8'>" + esc(w) + "</span>";
        else res += "<span style='color:#e2e8f0'>" + esc(w) + "</span>";
      }
      else if (m[4]) res += "<span style='color:#7a8597'>" + esc(m[4]) + "</span>";
      else if (m[5]) res += "<span style='color:#fbbf77'>" + esc(m[5]) + "</span>";
    }
    return res;
  }
  function hl(s) { return s.split("\n").map(hlLine).join("\n"); }
  function setActive(i) {
    hubState = AGENTS.map(function (a, k) { return k < i ? "done" : (k === i ? "active" : "idle"); });
    recolorHubs();
    if (labels3) labels3.forEach(function (el, k) {
      var mono = el.querySelector(".lab-mono"), role = el.querySelector(".lab-role"); if (!mono) return;
      if (k === i) { mono.style.background = "var(--accent)"; mono.style.borderColor = "var(--accent)"; mono.style.color = "#fff"; role.style.opacity = "1"; }
      else if (k < i) { mono.style.background = "var(--surface)"; mono.style.borderColor = "var(--green)"; mono.style.color = "var(--green)"; role.style.opacity = "0"; }
      else { mono.style.background = "var(--surface)"; mono.style.borderColor = "var(--line)"; mono.style.color = "var(--faint)"; role.style.opacity = "0"; }
    });
  }
  function resetDots() {
    hubState = AGENTS.map(function () { return "idle"; });
    recolorHubs();
    if (labels3) labels3.forEach(function (el) {
      var mono = el.querySelector(".lab-mono"), role = el.querySelector(".lab-role");
      if (mono) { mono.style.background = "var(--surface)"; mono.style.borderColor = "var(--line)"; mono.style.color = "var(--faint)"; role.style.opacity = "0"; }
    });
  }
  function labelsAllDone() {
    if (!labels3) return;
    labels3.forEach(function (el) {
      var mono = el.querySelector(".lab-mono");
      if (mono) { mono.style.background = "var(--surface)"; mono.style.borderColor = "var(--green)"; mono.style.color = "var(--green)"; }
    });
  }
  /* Tipeo O(n): antes se re-resaltaba el snippet COMPLETO en cada carácter (O(n²)).
     Ahora hay tres spans fijos — lo ya tipeado, la línea en curso y el caret — y por
     tick solo se re-resalta la línea en curso. 2 chars por tick = mitad de timers. */
  function typeCode(idx, done) {
    var el = $("editor"); if (!el) { if (done) done(); return; }
    var lines = SNIPS[idx].split("\n");
    el.innerHTML = "<span data-done></span><span data-cur></span><span class='ed-caret'>▍</span>";
    var doneEl = el.firstChild, curEl = doneEl.nextSibling;
    var li = 0, ci = 0;
    function tick() {
      var line = lines[li];
      ci = Math.min(ci + 2, line.length);
      curEl.innerHTML = hlLine(line.slice(0, ci));
      if (ci >= line.length) {
        doneEl.innerHTML += hlLine(line) + "\n";
        curEl.innerHTML = "";
        li++; ci = 0;
        if (li >= lines.length) { if (done) done(); return; }
        simWait(40, tick);
        return;
      }
      simWait(18, tick);
    }
    tick();
  }
  function appendLog(i) {
    var host = $("log"); if (!host) return;
    var L = LOG[i], row = document.createElement("div");
    row.innerHTML = "<span style='color:" + L.c + ";font-weight:600'>[" + L.a + "]</span><span style='color:var(--muted)'>" + L.t + "</span>";
    host.insertBefore(row, host.firstChild);
    while (host.children.length > 3) host.removeChild(host.lastChild);
  }
  /* Vuelo del paquete con GSAP (antes: setTimeout(16) recursivo → jitter bajo carga).
     El easing lo pone el tween; acá solo se evalúa la Bézier cuadrática en pr.t. */
  function handoff(from, to, cb) {
    if (!ready3d || !packet3 || !hubs || !window.gsap) { if (cb) cb(); return; }
    var a = hubs[from].base, b = hubs[to].base;
    var mid = a.clone().add(b).multiplyScalar(0.5);
    var ctrl = mid.clone().add(mid.clone().normalize().multiplyScalar(1.2));
    var back = to <= from;
    packet3.core.visible = true; packet3.glow.visible = true;
    var pr = { t: 0 };
    engine.activeTween = gsap.to(pr, {
      t: 1, duration: back ? 1 : 0.64, ease: "power2.inOut",
      onUpdate: function () {
        var e = pr.t;
        var x = (1 - e) * (1 - e) * a.x + 2 * (1 - e) * e * ctrl.x + e * e * b.x;
        var y = (1 - e) * (1 - e) * a.y + 2 * (1 - e) * e * ctrl.y + e * e * b.y;
        var z = (1 - e) * (1 - e) * a.z + 2 * (1 - e) * e * ctrl.z + e * e * b.z;
        packet3.core.position.set(x, y, z); packet3.glow.position.set(x, y, z);
      },
      onComplete: function () {
        engine.activeTween = null;
        packet3.core.visible = false; packet3.glow.visible = false;
        if (cb) cb();
      }
    });
    if (!engineActive()) engine.activeTween.pause();
  }
  /* Reduced-motion: el panel muestra el "frame final" — equipo completo en verde,
     último snippet resaltado, log lleno, versión shipped — sin ningún loop. La parte
     3D equivalente la setea init3D cuando Three termina de cargar (diferido). */
  function setShippedStatic() {
    var st = $("eng-status"), file = $("ed-file"), by = $("ed-by"), ed = $("editor");
    if (st) st.textContent = "shipped ✓";
    if (file) file.textContent = FILES[5];
    if (by) by.textContent = "— " + AGENTS[5].role.toLowerCase();
    if (ed) ed.innerHTML = hl(SNIPS[5]);
    for (var i = 0; i < LOG.length; i++) appendLog(i); // el cap deja las últimas 3
  }

  function runPhase(i) {
    curPhase = i;
    var A = AGENTS[i], st = $("eng-status"), file = $("ed-file"), by = $("ed-by");
    setActive(i);
    if (st) st.textContent = A.role.replace(/\s/g, "") + " · " + (i === 5 ? "shipping" : "working");
    if (file) file.textContent = FILES[i];
    if (by) by.textContent = "— " + A.role.toLowerCase();
    typeCode(i, function () {
      appendLog(i);
      simWait(620, function () {
        if (i < 5) handoff(i, i + 1, function () { runPhase(i + 1); });
        else ship();
      });
    });
  }
  function ship() {
    version = Math.round((version + 0.1) * 10) / 10;
    var ver = $("eng-ver"), st = $("eng-status");
    if (ver) ver.textContent = "v" + version.toFixed(1);
    if (st) st.textContent = "shipped ✓";
    hubState = AGENTS.map(function () { return "done"; }); recolorHubs();
    labelsAllDone();
    simWait(1100, function () {
      handoff(5, 0, function () {
        resetDots();
        var ed = $("editor"); if (ed) ed.innerHTML = "";
        runPhase(0);
      });
    });
  }

  /* ---------------- INTRO · LAPTOP 3D (scroll cinemático) ----------------
     Coreografía scrubbeada: abrir → boot tipeado → login → dolly-in → handoff.
     Todo es función pura del progress: scrollear para atrás "des-tipea" y un
     reload a mitad de pin re-renderiza el estado exacto. */

  // texto del boot por idioma — se lee en vivo (el toggle EN re-tipea en el otro idioma)
  var BOOT = {
    es: ["gc-os v2.0 — boot", "> cargando perfil… ok", "> stack: c# · .net 8 · sql", "> último deploy: cambiala.uy ✓", "> iniciando portfolio…"],
    en: ["gc-os v2.0 — boot", "> loading profile… ok", "> stack: c# · .net 8 · sql", "> latest deploy: cambiala.uy ✓", "> starting portfolio…"]
  };
  var bootProxy = { p: 0 }, bootLast = -1, bootEl = null, bootLines = BOOT.es.length;
  function renderBoot() {
    if (!bootEl) return;
    var flat = BOOT[lang === "en" ? "en" : "es"].slice(0, bootLines).join("\n");
    var n = Math.round(bootProxy.p * flat.length);
    if (n === bootLast) return;
    bootLast = n;
    bootEl.textContent = flat.slice(0, n); // 1 write como máximo por frame
  }

  function initIntro() {
    var stage = $("introStage"), hero = $("heroReveal"), lp = $("lp");
    if (!stage || !hero) return;

    var hash = "";
    try { hash = location.hash; } catch (e) {}

    // Fallbacks → hero directo ("frame final"): reduced-motion, sin GSAP (CDN caído),
    // deep-link a una sección (el pin rompería el anchor) o landscape muy bajo.
    if (REDUCE || !window.gsap || !window.ScrollTrigger || (hash && hash !== "#inicio") || window.innerHeight < 500) {
      hero.style.opacity = "1";
      return;
    }

    var rig = $("lpRig"), hinge = $("lpHinge"), world = $("lpWorld"),
        glow = $("lpGlow"), mini = $("lpMini"), hint = $("introHint"),
        fit = document.querySelector(".lp-fit"),
        header = document.querySelector(".site-header");
    bootEl = $("lpBoot");

    gsap.registerPlugin(ScrollTrigger); // idempotente (initLenis ya lo hizo si Lenis cargó)
    window.scrollTo(0, 0); // el head ya puso scrollRestoration=manual (solo sin hash)

    // Medición del handoff — reemplaza los números mágicos viejos (y:175 / scale:3.8).
    // Probe síncrono: cuadra el modelo vía GSAP (mantiene su caché de transforms en
    // sync), mide la pantalla proyectada y restaura. Coordenadas relativas al stage,
    // no al viewport, para que un refresh a mitad de scroll no las contamine.
    function measureHandoff() {
      var snap = {
        rx: gsap.getProperty(rig, "rotationX"), ry: gsap.getProperty(rig, "rotationY"),
        hx: gsap.getProperty(hinge, "rotationX"), sc: gsap.getProperty(world, "scaleX"),
        fx: gsap.getProperty(fit, "x"), fy: gsap.getProperty(fit, "y")
      };
      gsap.set(rig, { rotationX: 0, rotationY: 0 });
      gsap.set(hinge, { rotationX: 0 });
      gsap.set(world, { scale: 1 });
      gsap.set(fit, { x: 0, y: 0 });
      var r = mini.getBoundingClientRect(); // pantalla útil, con la reducción por perspectiva incluida
      var w = world.getBoundingClientRect();
      var s = stage.getBoundingClientRect();
      var vw = window.innerWidth, vh = window.innerHeight;
      var H = {
        scale: Math.max(vw / r.width, vh / r.height) * 1.03, // cover + 3% de sangrado
        dx: (s.left + s.width / 2) - (r.left + r.width / 2),
        dy: (s.top + Math.min(s.height, vh) / 2) - (r.top + r.height / 2),
        origin: ((r.left + r.width / 2 - w.left) / w.width * 100) + "% " +
                ((r.top + r.height / 2 - w.top) / w.height * 100) + "%"
      };
      gsap.set(rig, { rotationX: snap.rx, rotationY: snap.ry });
      gsap.set(hinge, { rotationX: snap.hx });
      gsap.set(world, { scale: snap.sc });
      gsap.set(fit, { x: snap.fx, y: snap.fy });
      gsap.set(world, { transformOrigin: H.origin });
      return H;
    }

    // encendido de pantalla real (parpadea antes de estabilizarse), no un fade lineal
    function flicker() {
      return { keyframes: [{ opacity: .5, duration: .12 }, { opacity: .2, duration: .08 }, { opacity: .85, duration: .15 }] };
    }
    function cleanup() {
      stage.classList.remove("intro-armed");
      bootProxy.p = 0; bootLast = -1;
      if (bootEl) bootEl.textContent = "";
    }

    var mm = gsap.matchMedia();

    // ---- DESKTOP (≥760px): secuencia completa con dolly-in a la pantalla
    mm.add("(min-width: 760px)", function () {
      bootLines = BOOT.es.length;
      stage.classList.add("intro-armed");
      var H = measureHandoff();

      gsap.set(rig, { rotationX: 16, rotationY: -30 });
      gsap.set(hinge, { rotationX: -90 });
      gsap.set(hero, { autoAlpha: 0 });
      if (header) gsap.set(header, { autoAlpha: 0 });

      var tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage, start: "top top", end: "+=320%",
          scrub: true, // Lenis ya suaviza el input; scrub:1 duplicaría el lag
          pin: stage, anticipatePin: 1, invalidateOnRefresh: true,
          onRefreshInit: function () { H = measureHandoff(); }
        }
      });

      tl.to(hint, { autoAlpha: 0, duration: .3, ease: "power1.out" }, 0);
      // A — órbita + apertura de la tapa
      tl.to(rig, { rotationY: -6, rotationX: 8, duration: 1.6, ease: "power2.inOut" }, 0);
      tl.to(hinge, { rotationX: -8, duration: 1.5, ease: "power3.inOut" }, 0.15);
      tl.to(glow, flicker(), 0.9);
      tl.set(bootEl, { opacity: 1 }, 0.95);
      // B — boot tipeado por progress (determinístico, sin timers)
      tl.to(bootProxy, { p: 1, duration: 1.3, ease: "none", onUpdate: renderBoot }, 1.4);
      // C — "login": crossfade boot→mini mientras cuadra de frente
      tl.to(bootEl, { autoAlpha: 0, duration: .5, ease: "power2.inOut" }, 2.7);
      tl.to(mini, { opacity: 1, duration: .5, ease: "power2.inOut" }, 2.75);
      tl.to(rig, { rotationX: 0, rotationY: 0, duration: .85, ease: "power2.inOut" }, 2.7);
      tl.to(hinge, { rotationX: 0, duration: .85, ease: "power2.inOut" }, 2.7);
      tl.to(".lp-shadow", { opacity: 0, duration: .5 }, 2.9);
      // D — dolly-in: primero centra la pantalla, después "entra la cámara"
      tl.to(fit, { x: function () { return H.dx; }, y: function () { return H.dy; }, duration: .7, ease: "power2.inOut" }, 3.5);
      tl.to(world, { scale: function () { return H.scale; }, duration: 1.4, ease: "power2.in" }, 3.7);
      // el teclado sale de cámara: fade de las CARAS de la base (hojas del árbol 3D —
      // animar el contenedor con preserve-3d lo aplanaría)
      tl.to(".lp-base .lp-face", { opacity: 0, duration: .4, ease: "power1.out" }, 4.6);
      // E — handoff al hero real
      tl.to(lp, { autoAlpha: 0, duration: .45, ease: "power1.out" }, 5.0);
      if (header) tl.to(header, { autoAlpha: 1, duration: .5 }, 5.15);
      tl.fromTo(hero, { autoAlpha: 0, y: 18, scale: .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: "power4.out" }, 5.25);
      tl.to({}, { duration: .35 }); // hold antes de soltar el pin

      return cleanup;
    });

    // ---- MOBILE (<760px): versión corta — abrir + boot breve + crossfade, sin dolly
    mm.add("(max-width: 759.98px)", function () {
      bootLines = 3;
      stage.classList.add("intro-armed");

      gsap.set(rig, { rotationX: 10, rotationY: -14 });
      gsap.set(hinge, { rotationX: -90 });
      gsap.set(hero, { autoAlpha: 0 });
      if (header) gsap.set(header, { autoAlpha: 0 });

      var tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage, start: "top top", end: "+=150%",
          scrub: 0.6, // en touch Lenis no suaviza: el scrub aporta el smoothing
          pin: stage, anticipatePin: 1, invalidateOnRefresh: true
        }
      });

      tl.to(hint, { autoAlpha: 0, duration: .25, ease: "power1.out" }, 0);
      tl.to(rig, { rotationX: 0, rotationY: 0, duration: 1.0, ease: "power2.inOut" }, 0);
      tl.to(hinge, { rotationX: 0, duration: 1.0, ease: "power3.inOut" }, 0.05);
      tl.to(glow, flicker(), 0.55);
      tl.set(bootEl, { opacity: 1 }, 0.6);
      tl.to(bootProxy, { p: 1, duration: .9, ease: "none", onUpdate: renderBoot }, 0.65);
      tl.to(bootEl, { autoAlpha: 0, duration: .3, ease: "power2.inOut" }, 1.6);
      tl.to(mini, { opacity: 1, duration: .3, ease: "power2.inOut" }, 1.65);
      // crossfade directo laptop→hero (el dolly zoom en pantallas chicas marea)
      tl.to(lp, { autoAlpha: 0, duration: .5, ease: "power1.out" }, 2.0);
      if (header) tl.to(header, { autoAlpha: 1, duration: .4 }, 2.1);
      tl.fromTo(hero, { autoAlpha: 0, y: 14, scale: .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: .5, ease: "power4.out" }, 2.15);
      tl.to({}, { duration: .3 });

      return cleanup;
    });

    wait(350, function () { try { ScrollTrigger.refresh(); } catch (e) {} });
  }

  /* ---------------- BOOT ---------------- */
  function init() {
    try { var sl = localStorage.getItem("gc-lang"); if (sl === "en") lang = "en"; } catch (e) {}
    initLenis();
    buildSkills();
    buildProjects();
    buildRoster();
    captureES();
    if (lang === "en") applyLang();
    initToggles();
    // ORDEN IMPORTA: el pin de la intro se crea ANTES que el resto de los triggers.
    // Un trigger creado antes del pin cuyo start natural cae dentro del rango pineado
    // no recibe el offset del pin-spacer en el refresh → dispararía ~320vh antes.
    initIntro();
    initReveal();
    initParallax();
    initTimelines();
    initProjectStack();
    initEngineVisibility();
    var y = $("year"); if (y) y.textContent = new Date().getFullYear();
    requestAnimationFrame(function () {
      measure();
      if (REDUCE) setShippedStatic(); // frame final, sin loop infinito
      else runPhase(0);
    });
    window.addEventListener("resize", measure);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
