/* ============================================================
   Gonzalo Cabrera — Portfolio
   Interacciones: nav, scroll, fade-in, typewriter, skills, form.
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Navbar: toggle móvil + sombra al scrollear ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.getElementById("top-header");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Cerrar el menú al tocar un link (móvil)
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

  /* ---------- Fade-in con IntersectionObserver ---------- */
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

  /* ---------- Typewriter de la terminal del hero ---------- */
  const COL = {
    kw:   "#818cf8", // palabras clave
    name: "#e2e8f0", // identificadores
    punc: "#7a8597", // puntuación
    key:  "#34d399", // claves del objeto
    str:  "#fbbf77", // strings
    bool: "#f0abfc"  // booleanos
  };

  const code = [
    { t: "const ", c: COL.kw }, { t: "gonzalo", c: COL.name }, { t: " = {\n", c: COL.punc },
    { t: "  rol",         c: COL.key }, { t: ": [\n", c: COL.punc },
    { t: '    "Software Developer"',   c: COL.str }, { t: ",\n", c: COL.punc },
    { t: '    "Salesforce Developer"', c: COL.str }, { t: "\n", c: COL.punc },
    { t: "  ],\n", c: COL.punc },
    { t: "  empresa",     c: COL.key }, { t: ": ", c: COL.punc }, { t: '"TCS"', c: COL.str }, { t: ",\n", c: COL.punc },
    { t: "  stack",       c: COL.key }, { t: ": ", c: COL.punc }, { t: '[".NET 8", "SQL", "Apex"]', c: COL.str }, { t: ",\n", c: COL.punc },
    { t: "  enfoque",     c: COL.key }, { t: ": ", c: COL.punc }, { t: '"backend"', c: COL.str }, { t: ",\n", c: COL.punc },
    { t: "  aprendiendo", c: COL.key }, { t: ": ", c: COL.punc }, { t: "true", c: COL.bool }, { t: "\n", c: COL.punc },
    { t: "};", c: COL.punc }
  ];

  const host = document.getElementById("term-code");
  if (host) {
    const cursor = document.createElement("span");
    cursor.className = "cursor";

    if (prefersReducedMotion) {
      // Render instantáneo, sin animación.
      code.forEach((seg) => {
        const s = document.createElement("span");
        s.style.color = seg.c;
        s.textContent = seg.t;
        host.appendChild(s);
      });
      host.appendChild(cursor);
    } else {
      host.appendChild(cursor);
      let si = 0, ci = 0, span = null;

      const tick = () => {
        if (si >= code.length) return; // listo: queda el cursor titilando
        const seg = code[si];
        if (ci === 0) {
          span = document.createElement("span");
          span.style.color = seg.c;
          host.insertBefore(span, cursor);
        }
        const ch = seg.t.charAt(ci);
        span.textContent += ch;
        ci++;
        if (ci >= seg.t.length) { si++; ci = 0; }
        const delay = ch === "\n" ? 140 : 24 + Math.random() * 34;
        window.setTimeout(tick, delay);
      };

      window.setTimeout(tick, 650);
    }
  }

  /* ---------- Panel interactivo de skills ---------- */
  const skillDescriptions = {
    csharp:     "mi lenguaje principal en backend. Desarrollo con .NET 8 y Blazor aplicando TDD y buenas prácticas para construir APIs y aplicaciones web.",
    apex:       "lenguaje de Salesforce que uso en mi pasantía en TCS para desarrollar lógica de negocio sobre la plataforma.",
    java:       "base sólida para OOP y backend. Proyectos académicos con énfasis en diseño de clases, patrones y testing.",
    c:          "implementación de estructuras de datos y algoritmos, con foco en complejidad y rendimiento.",
    js:         "interactividad en front-end, validación de formularios y manejo del DOM sin frameworks pesados (como este sitio).",
    bash:       "scripts para automatizar tareas de desarrollo, compilación y manejo de entornos.",
    dotnet:     "APIs modernas, código limpio y pruebas automatizadas sobre backends.",
    salesforce: "desarrollo sobre la plataforma con Apex en un entorno profesional, siguiendo sus buenas prácticas.",
    blazor:     "interfaces web reactivas en C#, integradas con APIs y componentes reutilizables.",
    bootstrap:  "maquetado responsive rápido y coherente en proyectos web académicos y personales.",
    jest:       "pruebas automatizadas para componentes y lógica de front-end, asegurando estabilidad al refactorizar.",
    git:        "ramas claras para features, releases y hotfixes, con buenas prácticas de versionado.",
    gha:        "pipelines para ejecutar tests y validaciones automáticamente en cada push.",
    docker:     "contenedores para bases de datos y servicios, con entornos reproducibles.",
    tdd:        "enfoque red-green-refactor en proyectos .NET, priorizando diseño claro y mantenible.",
    agile:      "trabajo iterativo, feedback frecuente y priorización por valor de negocio.",
    sql:        "modelado de datos, diseño de esquemas y consultas optimizadas.",
    mongo:      "trabajo con documentos y colecciones para datos semiestructurados.",
    spanish:    "nativo, ideal para comunicación fluida con equipos y clientes en Latinoamérica.",
    english:    "lectura cómoda de documentación técnica y comunicación en equipos internacionales."
  };

  const skillsPanelMain = document.getElementById("skills-panel-main");
  const skillsPanelFooter = document.getElementById("skills-panel-footer");
  const skillTags = document.querySelectorAll(".skill-tag");

  if (skillsPanelMain && skillsPanelFooter && skillTags.length) {
    const showSkill = (tag, footerText) => {
      const description = skillDescriptions[tag.dataset.skill];
      if (!description) return;
      skillTags.forEach((t) => t.classList.remove("is-active"));
      tag.classList.add("is-active");
      skillsPanelMain.innerHTML = `<strong>${tag.textContent.trim()}:</strong> ${description}`;
      skillsPanelFooter.textContent = footerText;
    };

    skillTags.forEach((tag) => {
      tag.addEventListener("mouseenter", () =>
        showSkill(tag, "Resumen basado en proyectos académicos, personales y mi pasantía.")
      );
      tag.addEventListener("click", () =>
        showSkill(tag, "Tocá otra skill para seguir explorando el stack.")
      );
      tag.addEventListener("focus", () =>
        showSkill(tag, "Resumen basado en proyectos académicos, personales y mi pasantía.")
      );
    });
  }

  /* ---------- Formulario de contacto (validación + mailto) ---------- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      let valid = true;

      if (!name) { nameError.textContent = "Por favor ingresá tu nombre."; valid = false; }
      if (!email) {
        emailError.textContent = "El email es obligatorio."; valid = false;
      } else if (!isEmail(email)) {
        emailError.textContent = "Ingresá un email válido."; valid = false;
      }
      if (!message) { messageError.textContent = "Contame brevemente en qué puedo ayudarte."; valid = false; }

      if (!valid) return;

      // Sitio estático: abrimos el cliente de email con todo prellenado.
      const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:gcabrera3210@gmail.com?subject=${subject}&body=${body}`;
      contactForm.reset();
    });
  }

  /* ---------- Contador de visitas (localStorage) ---------- */
  try {
    const visitKey = "gonzalo-landing-visit-count";
    const visits = Number(localStorage.getItem(visitKey) || "0") + 1;
    localStorage.setItem(visitKey, String(visits));
    const visitCounterEl = document.getElementById("visit-counter");
    if (visitCounterEl) {
      visitCounterEl.textContent = visits === 1 ? "tu primera visita 👋" : `visita #${visits}`;
    }
  } catch (_) {
    /* localStorage no disponible: lo ignoramos en silencio */
  }
})();
