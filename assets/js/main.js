/* ============================================================
   Gonzalo Cabrera — Portfolio
   Interacciones: tema, idioma (ES/EN), nav, fade-in, typewriter,
   skills, formulario.
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     Estado de idioma
     ============================================================ */
  const LANG_KEY = "gc-lang";

  function initialLang() {
    try {
      const s = localStorage.getItem(LANG_KEY);
      if (s === "es" || s === "en") return s;
    } catch (_) {}
    const nav = (navigator.language || "es").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  }

  let currentLang = initialLang();

  // Diccionario inglés. El español se captura del propio DOM (es el contenido base).
  const EN = {
    "nav.about": "about",
    "nav.skills": "skills",
    "nav.experience": "experience",
    "nav.projects": "projects",
    "nav.contact": "contact",

    "hero.pill": "Intern at Tata Consultancy Services",
    "hero.loc": "Montevideo, Uruguay · Native Spanish · English B2",
    "hero.greeting": "Hi, I'm",
    "hero.subtitle":
      "Software Developer focused on backend. I work with C#, .NET 8 and SQL, and I'm gaining experience with Salesforce (Apex) during my internship at TCS.",
    "hero.viewProjects": "View projects",
    "hero.downloadCV": "Download CV",

    "about.eyebrow": "about",
    "about.title": "Backend-focused developer",
    "about.p1":
      "I'm an advanced student (3rd year) of the Bachelor's in Computer Systems at Universidad ORT, with a solid foundation in object-oriented programming (C#, Java) and data structures.",
    "about.p2":
      "I currently work as an intern at <strong>Tata Consultancy Services</strong>, where I'm gaining experience in the Salesforce ecosystem developing with Apex, while continuing to strengthen my backend foundation with C#, .NET 8 and SQL.",
    "about.p3":
      "I apply TDD on .NET 8 to write clean, maintainable code, work with Git following a GitFlow workflow, and use GitHub Actions for continuous integration, with an eye on algorithmic efficiency and performance.",
    "about.p4":
      "I bring AI tools (Claude, GitHub Copilot) into my workflow to speed up prototyping and refactor with assistance, always keeping a critical eye on the quality of the result.",
    "about.hl1": "🎓 <strong>BSc in Comp. Systems</strong> · ORT · 3rd year",
    "about.hl2": "💼 <strong>Intern</strong> at TCS · Salesforce",
    "about.hl3": "🧠 Backend · OOP · SQL",
    "about.hl4": "🛠️ Git · GitHub Actions · TDD",

    "skills.eyebrow": "skills",
    "skills.title": "Tech stack",
    "skills.lead": "The technologies I work with daily and the ones I'm picking up during my internship.",
    "skills.g1Title": "Languages",
    "skills.g1Small": "Strong foundation in backend and data structures",
    "skills.g2Title": "Frameworks & platforms",
    "skills.g2Small": ".NET, Salesforce and web environments",
    "skills.g3Title": "Tools & practices",
    "skills.g3Small": "A modern, quality-oriented workflow",
    "skills.g4Title": "Databases & languages",
    "skills.g4Small": "Data + communication",
    "skills.spanish": "Spanish (native)",
    "skills.english": "English B2 (FCE)",
    "skills.panelTitle": "// detail",
    "skills.panelDefault": "<strong>Hover or tap a skill</strong> to see how I use it in real projects.",
    "skills.panelFooter": "Each technology connects to a project: e.g. .NET 8 + SQL + TDD in TaskTrackPro.",

    "exp.eyebrow": "background",
    "exp.title": "Experience & education",
    "exp.lead": "Where I'm growing as a developer and what I'm studying in parallel.",
    "exp.colExp": "Experience",
    "exp.colEdu": "Education",
    "exp.tcsTitle": "Intern – Tata Consultancy Services",
    "exp.tcsMeta": "Montevideo, Uruguay · Apr 2026 – Present",
    "exp.tcsBody":
      "Development within the Salesforce ecosystem, working with Apex and platform best practices. Gaining experience in a professional environment with distributed teams, version control and quality-oriented work.",
    "exp.sycTitle": "Private driver – SYC Company",
    "exp.sycMeta": "Paso de los Toros, Uruguay · Jul 2022 – Mar 2023",
    "exp.sycBody":
      "Daily transport of UPM workers, coordinating routes and schedules. A role that strengthened my responsibility, organization and communication with diverse teams.",
    "exp.ortTitle": "BSc in Computer Systems – ORT",
    "exp.ortMeta": "Montevideo, Uruguay · 2023 – 2027 (estimated)",
    "exp.ortBody":
      "Advanced student (3rd year). Taking courses in programming, software architecture, databases, requirements engineering and development methodologies.",
    "exp.fceTitle": "English B2 – First Certificate (FCE)",
    "exp.fceMeta": "Cambridge certification",
    "exp.fceBody":
      "Upper-intermediate level. Comfortable reading technical documentation and communicating with international teams.",

    "proj.eyebrow": "projects",
    "proj.title": "What I've been building",
    "proj.lead": "A selection of academic and personal projects where I put the stack to work.",
    "proj.trbDesc":
      "Telegram bot that processes receipt photos with AI: it extracts merchant, date and items, and saves them automatically to Notion. It also logs expenses and income via text.",
    "proj.trbLinkedin": "LinkedIn post →",
    "proj.cambBadge": "in progress · private repo",
    "proj.cambDesc":
      "A platform to find sticker-swap matches. Designed and built by me end to end —frontend, backend and deploy—.",
    "proj.cambDemo": "Try the demo →",
    "proj.taskDesc":
      "App for managing projects and tasks, built with a focus on TDD, GitFlow, CI with GitHub Actions and relational database persistence.",
    "proj.taskGithub": "View on GitHub →",

    "contact.eyebrow": "contact",
    "contact.title": "Let's talk",
    "contact.lead":
      "Got a project, an offer, or just want to say hi? Reach out with the form or directly by email or LinkedIn.",
    "contact.name": "Name",
    "contact.emailLabel": "Email",
    "contact.message": "Message",
    "contact.hint": "On submit, your email client opens with the message ready to send.",
    "contact.send": "Send message",
    "contact.cardTitle": "Contact details",
    "contact.emailLabel2": "Email",
    "contact.location": "Location",

    "meta.title": "Gonzalo Cabrera — Software Developer",
    "meta.description":
      "Gonzalo Cabrera — backend-focused Software Developer. Intern at Tata Consultancy Services. C#, .NET 8, SQL and Apex (Salesforce). Montevideo, Uruguay."
  };

  // Captura del español desde el DOM + cabecera.
  const i18nEls = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  const esStore = {};
  i18nEls.forEach((el) => { esStore[el.getAttribute("data-i18n")] = el.innerHTML; });

  const metaDesc = document.querySelector('meta[name="description"]');
  const esTitle = document.title;
  const esDesc = metaDesc ? metaDesc.getAttribute("content") : "";
  const langToggle = document.querySelector(".lang-toggle");

  function applyLang(lang) {
    currentLang = lang;
    const useEn = lang === "en";

    i18nEls.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = useEn ? EN[key] : esStore[key];
      if (val != null) el.innerHTML = val;
    });

    document.documentElement.setAttribute("lang", lang);
    document.title = useEn ? EN["meta.title"] : esTitle;
    if (metaDesc) metaDesc.setAttribute("content", useEn ? EN["meta.description"] : esDesc);

    if (langToggle) {
      langToggle.textContent = lang === "es" ? "EN" : "ES";
      langToggle.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    }

    refreshActiveSkill();
    refreshVisitCounter();
    clearFormErrors();
  }

  /* ============================================================
     Año dinámico en el footer
     ============================================================ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ============================================================
     Tema claro/oscuro
     El <head> ya seteó data-theme antes del paint. Acá cableamos
     el botón, persistimos y seguimos al sistema si no hubo elección.
     ============================================================ */
  const THEME_KEY = "gc-theme";
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");

  function syncThemeLabel() {
    if (!themeToggle) return;
    const isLight = root.getAttribute("data-theme") === "light";
    themeToggle.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
  }
  syncThemeLabel();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
      syncThemeLabel();
    });
  }

  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = (e) => {
      let stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch (_) {}
      if (stored !== "light" && stored !== "dark") {
        root.setAttribute("data-theme", e.matches ? "light" : "dark");
        syncThemeLabel();
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  /* ============================================================
     Navbar: toggle móvil + sombra al scrollear
     ============================================================ */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.getElementById("top-header");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  if (header) {
    const onScroll = () => header.classList.toggle("nav-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     Fade-in con IntersectionObserver
     ============================================================ */
  const fadeEls = document.querySelectorAll(".fade-in");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    fadeEls.forEach((el) => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     Typewriter de la terminal (consciente del idioma)
     Cada segmento referencia una clase .syn-* (los colores los
     define el CSS por tema).
     ============================================================ */
  const COL = { kw: "syn-kw", name: "syn-name", punc: "syn-punc", key: "syn-key", str: "syn-str", bool: "syn-bool" };
  const termHost = document.getElementById("term-code");
  let typingTimer = null;

  function buildCode(lang) {
    const k = lang === "en"
      ? { role: "role", company: "company", stack: "stack", focus: "focus", learning: "learning" }
      : { role: "rol", company: "empresa", stack: "stack", focus: "enfoque", learning: "aprendiendo" };
    return [
      { t: "const ", c: COL.kw }, { t: "gonzalo", c: COL.name }, { t: " = {\n", c: COL.punc },
      { t: "  " + k.role, c: COL.key }, { t: ": [\n", c: COL.punc },
      { t: '    "Software Developer"', c: COL.str }, { t: ",\n", c: COL.punc },
      { t: '    "Salesforce Developer"', c: COL.str }, { t: "\n", c: COL.punc },
      { t: "  ],\n", c: COL.punc },
      { t: "  " + k.company, c: COL.key }, { t: ": ", c: COL.punc }, { t: '"TCS"', c: COL.str }, { t: ",\n", c: COL.punc },
      { t: "  " + k.stack, c: COL.key }, { t: ": ", c: COL.punc }, { t: '[".NET 8", "SQL", "Apex"]', c: COL.str }, { t: ",\n", c: COL.punc },
      { t: "  " + k.focus, c: COL.key }, { t: ": ", c: COL.punc }, { t: '"backend"', c: COL.str }, { t: ",\n", c: COL.punc },
      { t: "  " + k.learning, c: COL.key }, { t: ": ", c: COL.punc }, { t: "true", c: COL.bool }, { t: "\n", c: COL.punc },
      { t: "};", c: COL.punc }
    ];
  }

  function renderTerminal(animated) {
    if (!termHost) return;
    if (typingTimer) { window.clearTimeout(typingTimer); typingTimer = null; }
    termHost.textContent = "";

    const code = buildCode(currentLang);
    const cursor = document.createElement("span");
    cursor.className = "cursor";

    if (!animated || prefersReducedMotion) {
      code.forEach((seg) => {
        const s = document.createElement("span");
        s.className = seg.c;
        s.textContent = seg.t;
        termHost.appendChild(s);
      });
      termHost.appendChild(cursor);
      return;
    }

    termHost.appendChild(cursor);
    let si = 0, ci = 0, span = null;
    const tick = () => {
      if (si >= code.length) { typingTimer = null; return; }
      const seg = code[si];
      if (ci === 0) {
        span = document.createElement("span");
        span.className = seg.c;
        termHost.insertBefore(span, cursor);
      }
      const ch = seg.t.charAt(ci);
      span.textContent += ch;
      ci++;
      if (ci >= seg.t.length) { si++; ci = 0; }
      const delay = ch === "\n" ? 140 : 24 + Math.random() * 34;
      typingTimer = window.setTimeout(tick, delay);
    };
    typingTimer = window.setTimeout(tick, 650);
  }

  /* ============================================================
     Panel interactivo de skills (consciente del idioma)
     ============================================================ */
  const skillDescriptions = {
    es: {
      csharp: "mi lenguaje principal en backend. Desarrollo con .NET 8 y Blazor aplicando TDD y buenas prácticas para construir APIs y aplicaciones web.",
      apex: "lenguaje de Salesforce que uso en mi pasantía en TCS para desarrollar lógica de negocio sobre la plataforma.",
      java: "base sólida para OOP y backend. Proyectos académicos con énfasis en diseño de clases, patrones y testing.",
      c: "implementación de estructuras de datos y algoritmos, con foco en complejidad y rendimiento.",
      js: "interactividad en front-end, validación de formularios y manejo del DOM sin frameworks pesados (como este sitio).",
      bash: "scripts para automatizar tareas de desarrollo, compilación y manejo de entornos.",
      dotnet: "APIs modernas, código limpio y pruebas automatizadas sobre backends.",
      salesforce: "desarrollo sobre la plataforma con Apex en un entorno profesional, siguiendo sus buenas prácticas.",
      blazor: "interfaces web reactivas en C#, integradas con APIs y componentes reutilizables.",
      bootstrap: "maquetado responsive rápido y coherente en proyectos web académicos y personales.",
      jest: "pruebas automatizadas para componentes y lógica de front-end, asegurando estabilidad al refactorizar.",
      git: "ramas claras para features, releases y hotfixes, con buenas prácticas de versionado.",
      gha: "pipelines para ejecutar tests y validaciones automáticamente en cada push.",
      docker: "contenedores para bases de datos y servicios, con entornos reproducibles.",
      tdd: "enfoque red-green-refactor en proyectos .NET, priorizando diseño claro y mantenible.",
      agile: "trabajo iterativo, feedback frecuente y priorización por valor de negocio.",
      sql: "modelado de datos, diseño de esquemas y consultas optimizadas.",
      mongo: "trabajo con documentos y colecciones para datos semiestructurados.",
      spanish: "nativo, ideal para comunicación fluida con equipos y clientes en Latinoamérica.",
      english: "lectura cómoda de documentación técnica y comunicación en equipos internacionales."
    },
    en: {
      csharp: "my main backend language. I build with .NET 8 and Blazor, applying TDD and best practices to create APIs and web apps.",
      apex: "Salesforce's language, which I use in my internship at TCS to build business logic on the platform.",
      java: "a solid base for OOP and backend. Academic projects focused on class design, patterns and testing.",
      c: "implementing data structures and algorithms, with a focus on complexity and performance.",
      js: "front-end interactivity, form validation and DOM handling without heavy frameworks (like this site).",
      bash: "scripts to automate development, builds and environment management.",
      dotnet: "modern APIs, clean code and automated tests on backends.",
      salesforce: "building on the platform with Apex in a professional environment, following its best practices.",
      blazor: "reactive web UIs in C#, integrated with APIs and reusable components.",
      bootstrap: "fast, consistent responsive layouts in academic and personal web projects.",
      jest: "automated tests for front-end components and logic, keeping things stable when refactoring.",
      git: "clear branches for features, releases and hotfixes, with solid versioning practices.",
      gha: "pipelines that run tests and checks automatically on every push.",
      docker: "containers for databases and services, with reproducible environments.",
      tdd: "a red-green-refactor approach on .NET projects, prioritizing clear, maintainable design.",
      agile: "iterative work, frequent feedback and value-based prioritization.",
      sql: "data modeling, schema design and optimized queries.",
      mongo: "working with documents and collections for semi-structured data.",
      spanish: "native, ideal for fluent communication with teams and clients in Latin America.",
      english: "comfortable reading technical documentation and communicating with international teams."
    }
  };

  const skillsPanelMain = document.getElementById("skills-panel-main");
  const skillsPanelFooter = document.getElementById("skills-panel-footer");
  const skillTags = document.querySelectorAll(".skill-tag");
  let activeSkillKey = null;

  function showSkill(tag) {
    if (!skillsPanelMain || !skillsPanelFooter) return;
    const key = tag.getAttribute("data-skill");
    const descs = skillDescriptions[currentLang] || skillDescriptions.es;
    const desc = descs[key];
    if (!desc) return;
    activeSkillKey = key;
    skillTags.forEach((t) => t.classList.remove("is-active"));
    tag.classList.add("is-active");
    skillsPanelMain.innerHTML = "<strong>" + tag.textContent.trim() + ":</strong> " + desc;
    skillsPanelFooter.textContent = currentLang === "en"
      ? "Summary based on academic, personal and internship projects."
      : "Resumen basado en proyectos académicos, personales y mi pasantía.";
  }

  function refreshActiveSkill() {
    if (!activeSkillKey) return;
    const tag = document.querySelector('.skill-tag[data-skill="' + activeSkillKey + '"]');
    if (tag) showSkill(tag);
  }

  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", () => showSkill(tag));
    tag.addEventListener("click", () => showSkill(tag));
    tag.addEventListener("focus", () => showSkill(tag));
  });

  /* ============================================================
     Formulario de contacto (validación + mailto, por idioma)
     ============================================================ */
  const contactForm = document.getElementById("contact-form");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  function clearFormErrors() {
    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (messageError) messageError.textContent = "";
  }

  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const MSG = {
      es: {
        name: "Por favor ingresá tu nombre.",
        emailReq: "El email es obligatorio.",
        emailBad: "Ingresá un email válido.",
        message: "Contame brevemente en qué puedo ayudarte.",
        subject: "Contacto desde el portfolio — "
      },
      en: {
        name: "Please enter your name.",
        emailReq: "Email is required.",
        emailBad: "Enter a valid email.",
        message: "Tell me briefly how I can help.",
        subject: "Portfolio contact — "
      }
    };

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFormErrors();
      const m = MSG[currentLang] || MSG.es;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      let valid = true;

      if (!name) { nameError.textContent = m.name; valid = false; }
      if (!email) { emailError.textContent = m.emailReq; valid = false; }
      else if (!isEmail(email)) { emailError.textContent = m.emailBad; valid = false; }
      if (!message) { messageError.textContent = m.message; valid = false; }

      if (!valid) return;

      const subject = encodeURIComponent(m.subject + name);
      const body = encodeURIComponent(message + "\n\n— " + name + "\n" + email);
      window.location.href = "mailto:gcabrera3210@gmail.com?subject=" + subject + "&body=" + body;
      contactForm.reset();
    });
  }

  /* ============================================================
     Contador de visitas (localStorage, por idioma)
     ============================================================ */
  const visitCounterEl = document.getElementById("visit-counter");
  let visitCount = null;
  try {
    const visitKey = "gonzalo-landing-visit-count";
    visitCount = Number(localStorage.getItem(visitKey) || "0") + 1;
    localStorage.setItem(visitKey, String(visitCount));
  } catch (_) {
    visitCount = null;
  }

  function refreshVisitCounter() {
    if (!visitCounterEl || visitCount == null) return;
    if (currentLang === "en") {
      visitCounterEl.textContent = visitCount === 1 ? "your first visit 👋" : "visit #" + visitCount;
    } else {
      visitCounterEl.textContent = visitCount === 1 ? "tu primera visita 👋" : "visita #" + visitCount;
    }
  }

  /* ============================================================
     Wiring del toggle de idioma + arranque
     ============================================================ */
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const next = currentLang === "es" ? "en" : "es";
      try { localStorage.setItem(LANG_KEY, next); } catch (_) {}
      applyLang(next);
      renderTerminal(false);
    });
  }

  applyLang(currentLang);
  renderTerminal(true);
})();
