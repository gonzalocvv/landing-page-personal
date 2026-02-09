// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar: toggle en móvil + sombra al hacer scroll
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.getElementById("top-header");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("nav-scrolled");
  } else {
    header.classList.remove("nav-scrolled");
  }
});

// Cerrar menú al hacer clic en un link (móvil)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Intersection Observer para animaciones
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

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Contador de visitas
const visitKey = "gonzalo-landing-visit-count";
let visits = Number(localStorage.getItem(visitKey) || "0");
visits += 1;
localStorage.setItem(visitKey, String(visits));

const visitCounterEl = document.getElementById("visit-counter");
if (visitCounterEl) {
  visitCounterEl.textContent =
    visits === 1
      ? "Esta es tu primera visita desde este navegador."
      : `Esta página se abrió ${visits} veces desde este navegador.`;
}

// Panel interactivo de skills
const skillDescriptions = {
  java: "Java: base sólida para OOP y backend...",
  csharp: "C#: desarrollo con .NET 8 y Blazor...",
  c: "C / C++: estructuras y algoritmos...",
  bash: "Bash: automatización...",
  js: "JavaScript: DOM, validaciones...",
  dotnet: ".NET 8: APIs modernas...",
  blazor: "Blazor: UI en C#...",
  bootstrap: "Bootstrap: front responsivo...",
  jest: "Jest: testing front...",
  git: "GitFlow...",
  gha: "CI/CD con GitHub Actions...",
  docker: "Contenedores...",
  tdd: "TDD: red-green-refactor...",
  agile: "Ágil: iteraciones...",
  sql: "Modelado + consultas...",
  mongo: "Documentos...",
  spanish: "Español nativo.",
  english: "Inglés B2 (FCE)."
};

const skillsPanelMain = document.getElementById("skills-panel-main");
const skillsPanelFooter = document.getElementById("skills-panel-footer");

document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    const key = tag.dataset.skill;
    const description = skillDescriptions[key] || "";
    if (description) {
      skillsPanelMain.innerHTML = `<strong>${tag.textContent.trim()}:</strong> ${description}`;
      skillsPanelFooter.textContent =
        "Este resumen se basa en experiencias de proyectos académicos y personales.";
    }
  });

  tag.addEventListener("click", () => {
    const key = tag.dataset.skill;
    const description = skillDescriptions[key] || "";
    if (description) {
      skillsPanelMain.innerHTML = `<strong>${tag.textContent.trim()}:</strong> ${description}`;
      skillsPanelFooter.textContent =
        "Tap de nuevo en otra skill para seguir explorando.";
    }
  });
});

// Validación del formulario
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
}

function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  let valid = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = "Por favor ingresá tu nombre.";
    valid = false;
  }

  if (!emailInput.value.trim()) {
    emailError.textContent = "El email es obligatorio.";
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Ingresá un email válido.";
    valid = false;
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = "Contame brevemente en qué podemos trabajar juntos.";
    valid = false;
  }

  if (!valid) return;

  alert("Gracias por tu mensaje. Esta demo simula el envío.");
  contactForm.reset();
});