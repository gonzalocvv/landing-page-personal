/* ============================================================
   Gonzalo Cabrera — Portfolio · Partículas del hero
   Partículas 3D que pasan del caos a formar una red de agentes
   (hubs conectados con etiquetas), con repulsión suave del mouse
   y dispersión al scrollear. Versión sutil de la referencia.
   Sin dependencias. Se apaga con prefers-reduced-motion.
   ============================================================ */

(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var hero = document.getElementById("inicio");
  if (!hero) return;

  var cv = document.createElement("canvas");
  cv.className = "hero-canvas";
  cv.setAttribute("aria-hidden", "true");
  hero.insertBefore(cv, hero.firstChild);
  var cx = cv.getContext("2d");

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, S = 1;
  var small = window.matchMedia("(max-width: 768px)").matches;
  var N = small ? 260 : 540;
  var F = 620; // distancia focal para la proyección 3D

  /* ---------- Color según el tema ---------- */
  var rgb = [129, 140, 248];
  function readAccent() {
    var v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    var m = /^#?([0-9a-f]{6})$/i.exec(v);
    if (m) {
      rgb = [
        parseInt(m[1].slice(0, 2), 16),
        parseInt(m[1].slice(2, 4), 16),
        parseInt(m[1].slice(4, 6), 16)
      ];
    }
  }
  readAccent();
  new MutationObserver(readAccent).observe(document.documentElement, {
    attributes: true, attributeFilter: ["data-theme"]
  });

  /* ---------- Red de agentes: hubs + conexiones ---------- */
  // Coordenadas base (se escalan al tamaño del hero)
  var HUBS = [
    { x: -250, y: -90, z: 40, l: "plan" },
    { x: -10, y: -130, z: -30, l: "code" },
    { x: 245, y: -80, z: 20, l: "review" },
    { x: -150, y: 95, z: -40, l: "tests" },
    { x: 55, y: 130, z: 50, l: "build" },
    { x: 260, y: 100, z: -20, l: "deploy" }
  ];
  var EDGES = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [1, 3], [2, 4]];

  function g() { return (Math.random() + Math.random() + Math.random() - 1.5) * 2; }

  /* ---------- Partículas ---------- */
  var P = [];
  function buildParticles() {
    P = [];
    for (var i = 0; i < N; i++) {
      var nx, ny, nz, hub = false;
      if (Math.random() < 0.34) {
        // agrupadas alrededor de un hub
        var h = HUBS[Math.floor(Math.random() * HUBS.length)];
        nx = h.x + g() * 15; ny = h.y + g() * 15; nz = h.z + g() * 15;
        hub = Math.random() < 0.25;
      } else {
        // a lo largo de una conexión
        var e = EDGES[Math.floor(Math.random() * EDGES.length)];
        var a = HUBS[e[0]], b = HUBS[e[1]], t = Math.random();
        nx = a.x + (b.x - a.x) * t + g() * 6;
        ny = a.y + (b.y - a.y) * t + g() * 6;
        nz = a.z + (b.z - a.z) * t + g() * 6;
      }
      var da = Math.random() * Math.PI * 2;
      var dr = 500 + Math.random() * 420;
      P.push({
        x: (Math.random() - 0.5) * W * 1.1,
        y: (Math.random() - 0.5) * H * 1.1,
        z: (Math.random() - 0.5) * 340,
        tx: nx, ty: ny, tz: nz,
        fx: Math.cos(da) * dr, fy: Math.sin(da) * dr * 0.7, fz: (Math.random() - 0.5) * 600,
        ph: Math.random() * Math.PI * 2,
        hub: hub
      });
    }
  }

  function resize() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    S = Math.min(W / 720, H / 480) * 1.05; // escala de la red
    if (!P.length) buildParticles();
  }
  resize();
  var rT = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(rT);
    rT = window.setTimeout(resize, 150);
  });

  /* ---------- Mouse (repulsión suave, solo pointer fino) ---------- */
  var mouse = { x: -9999, y: -9999 };
  if (window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mousemove", function (e) {
      var r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("mouseleave", function () { mouse.x = -9999; });
  }

  /* ---------- Loop ---------- */
  function ss(f) { return f * f * (3 - 2 * f); }
  var t = 0, running = false, rafId = null;

  function frame() {
    if (!running) return;
    t += 0.016;

    // progreso de salida del hero: 0 = arriba, 1 = hero fuera de vista
    var p = Math.max(0, Math.min(1, window.scrollY / (H * 0.9)));
    var disp = ss(p);                       // dispersión al scrollear
    var settle = ss(Math.min(1, t / 3.2));  // caos inicial -> red
    var netW = settle * (1 - disp);         // visibilidad de la red

    var ang = Math.sin(t * 0.16) * 0.22;    // oscilación 3D suave
    var ca = Math.cos(ang), sa = Math.sin(ang);
    cx.clearRect(0, 0, W, H);

    var cxm = W / 2, cym = H / 2;
    var chaos = 1 - settle;
    var baseA = 0.5 * (1 - disp * 0.9);

    // Conexiones + etiquetas de la red
    if (netW > 0.04) {
      var hp = [];
      for (var hI = 0; hI < HUBS.length; hI++) {
        var hh = HUBS[hI];
        var hx = hh.x * S, hz = hh.z * S;
        var hrx = hx * ca + hz * sa;
        var hrz = -hx * sa + hz * ca;
        var hsc = F / (F + hrz);
        hp.push([cxm + hrx * hsc, cym + hh.y * S * hsc, hsc]);
      }
      cx.lineWidth = 1;
      cx.strokeStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (0.22 * netW) + ")";
      for (var eI = 0; eI < EDGES.length; eI++) {
        var ed = EDGES[eI];
        cx.beginPath();
        cx.moveTo(hp[ed[0]][0], hp[ed[0]][1]);
        cx.lineTo(hp[ed[1]][0], hp[ed[1]][1]);
        cx.stroke();
      }
      cx.font = "10px 'JetBrains Mono', monospace";
      cx.textAlign = "center";
      cx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (0.55 * netW) + ")";
      for (var lI = 0; lI < HUBS.length; lI++) {
        cx.fillText(HUBS[lI].l, hp[lI][0], hp[lI][1] - 13 * hp[lI][2] - 6);
      }
    }

    // Partículas
    for (var i = 0; i < P.length; i++) {
      var q = P[i];
      // objetivo: red mezclada hacia "lejos" según el scroll
      var tx = q.tx * S + (q.fx - q.tx * S) * disp;
      var ty = q.ty * S + (q.fy - q.ty * S) * disp;
      var tz = q.tz * S + (q.fz - q.tz * S) * disp;
      // deriva orgánica permanente + caos inicial
      tx += Math.sin(t * 0.6 + q.ph) * (4 + 26 * chaos);
      ty += Math.cos(t * 0.5 + q.ph * 2) * (3 + 20 * chaos);

      q.x += (tx - q.x) * 0.055;
      q.y += (ty - q.y) * 0.055;
      q.z += (tz - q.z) * 0.055;

      var rx = q.x * ca + q.z * sa;
      var rz = -q.x * sa + q.z * ca;
      var sc = F / (F + rz);
      var sx = cxm + rx * sc;
      var sy = cym + q.y * sc;

      var mdx = sx - mouse.x, mdy = sy - mouse.y;
      var md2 = mdx * mdx + mdy * mdy;
      if (md2 < 8100 && md2 > 0.01) {
        var md = Math.sqrt(md2);
        var push = (1 - md / 90) * 20;
        sx += mdx / md * push;
        sy += mdy / md * push;
      }

      var a = baseA * Math.min(1, sc * 1.1);
      if (q.hub && netW > 0.1) {
        // nodos "agente": laten suavemente
        var pl = 1 + Math.sin(t * 2.2 + q.ph) * 0.35;
        cx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + Math.min(0.9, a * 1.8) + ")";
        cx.beginPath(); cx.arc(sx, sy, 2.3 * sc * pl, 0, 7); cx.fill();
      } else {
        cx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + a + ")";
        cx.beginPath(); cx.arc(sx, sy, 1.4 * sc, 0, 7); cx.fill();
      }
    }
    rafId = window.requestAnimationFrame(frame);
  }

  /* Solo corre mientras el hero está en pantalla */
  var io = new IntersectionObserver(function (entries) {
    var vis = entries[0].isIntersecting;
    if (vis && !running) {
      running = true;
      cv.classList.add("is-on");
      rafId = window.requestAnimationFrame(frame);
    } else if (!vis && running) {
      running = false;
      if (rafId) window.cancelAnimationFrame(rafId);
    }
  });
  io.observe(hero);
})();
