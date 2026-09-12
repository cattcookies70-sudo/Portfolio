/* ==========================================================================
   PORTFOLIO — script.js
   Nav toggle · scroll reveal · hero canvas · project modal · carousels
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initHeroField();
  initModal();
});

/* -------------------------------------------------------------------- */
/* Mobile nav                                                            */
/* -------------------------------------------------------------------- */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.textContent = isOpen ? "✕" : "☰";
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.textContent = "☰";
    })
  );
}

/* -------------------------------------------------------------------- */
/* Scroll reveal                                                         */
/* -------------------------------------------------------------------- */

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* -------------------------------------------------------------------- */
/* Hero background field — subtle Data x AI x Health particle mesh       */
/* -------------------------------------------------------------------- */

function initHeroField() {
  const canvas = document.querySelector("#hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, points;
  const COUNT = 46;
  const LINK_DIST = 130;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }

  function setup() {
    resize();
    points = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const dist = LINK_DIST * devicePixelRatio;
        if (d < dist) {
          ctx.strokeStyle = `rgba(76, 224, 166, ${0.12 * (1 - d / dist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = "rgba(76, 224, 166, 0.55)";
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  setup();
  frame();
  window.addEventListener("resize", () => setup());
}

/* -------------------------------------------------------------------- */
/* Project data — case studies                                           */
/* -------------------------------------------------------------------- */

const PROJECTS = {
  synergy: {
    kicker: "HealthTech · PLBD · Team Project",
    title: "Synergy Medical Assistant",
    overview:
      "Synergy Medical Assistant is a HealthTech platform built with my team to explore how digital tools and connected hardware can support everyday healthcare. The project pairs a web application — an AI assistant, a patient health space, medical records and a consultation interface — with a physical prototype for automated medication dispensing.",
    carousels: [
      {
        heading: "Digital interface",
        images: [
          { src: "assets/images/Synergy Medical Assistant/App_web/AI_assisstant.png", alt: "AI assistant interface" },
          { src: "assets/images/Synergy Medical Assistant/App_web/espace_santé.png", alt: "Patient health space" },
          { src: "assets/images/Synergy Medical Assistant/App_web/consult.png", alt: "Consultation interface" },
          { src: "assets/images/Synergy Medical Assistant/App_web/dossier med.png", alt: "Medical record interface" },
          { src: "assets/images/Synergy Medical Assistant/App_web/med_web.png", alt: "Medication management interface" },
        ],
      },
      {
        heading: "Physical / 3D prototype",
        images: [
          { src: "assets/images/Synergy Medical Assistant/3D1.jpeg", alt: "3D model of the dispensing kiosk, view 1" },
          { src: "assets/images/Synergy Medical Assistant/3D2.jpeg", alt: "3D model of the dispensing kiosk, view 2" },
          { src: "assets/images/Synergy Medical Assistant/dispensing_mech.jpeg", alt: "Medication dispensing mechanism" },
          { src: "assets/images/Synergy Medical Assistant/Prototype.jpeg", alt: "Physical prototype" },
        ],
      },
    ],
    contribution: [
      { label: "Healthcare problem", text: "Identifying where patients lose track of care — medication routines, records, access to guidance." },
      { label: "Solution concept", text: "Designing a connected assistant that links a digital health space to a physical dispensing device." },
      { label: "Technical development", text: "Building the web application and coordinating it with the embedded prototype as tech lead." },
      { label: "Teamwork / prototyping", text: "Leading a multidisciplinary team across software, interface design and hardware prototyping." },
    ],
    takeaway:
      "Synergy is the project that turned my interest in engineering toward healthcare — it showed me how software, hardware and patient experience have to work together.",
  },
  mediobes: {
    kicker: "HealthTech · Data · Team Project",
    title: "MediObes",
    overview:
      "MediObes is a clinical decision-support tool developed with my team to estimate obesity risk from patient data, giving clinicians an interpretable, data-driven second opinion.",
    carousels: [
      {
        heading: "Patient interface & results",
        images: [
          { src: "assets/images/MediObes/MO_patientSpace.jpeg", alt: "MediObes patient interface" },
          { src: "assets/images/MediObes/MO_Result.jpeg", alt: "MediObes risk result screen" },
          { src: "assets/images/MediObes/Shap_MO.jpeg", alt: "SHAP explainability view for MediObes" },
        ],
      },
    ],
    contribution: [
      { label: "Healthcare problem", text: "Supporting earlier, more consistent identification of obesity risk in clinical settings." },
      { label: "Solution concept", text: "A risk-estimation tool built on patient data with a clear, explainable output." },
      { label: "Technical development", text: "Building the prediction pipeline and the patient-facing result interface." },
      { label: "Explainability", text: "Using SHAP to make the model's reasoning transparent to clinicians." },
    ],
    takeaway:
      "MediObes showed me the value of explainable AI in medicine — a prediction only helps a clinician if they can trust why it was made.",
  },
  coremetrics: {
    kicker: "HealthTech · Data · Individual Project",
    title: "CoreMetrics",
    overview:
      "CoreMetrics is an individual academic project: a web application supporting clinical assessment of mortality risk related to heart failure, from data exploration to an interpretable result screen.",
    carousels: [
      {
        heading: "Application & analysis",
        images: [
          { src: "assets/images/CoreMetrics/homepage.png", alt: "CoreMetrics homepage" },
          { src: "assets/images/CoreMetrics/analy_resul.png", alt: "CoreMetrics analysis results" },
          { src: "assets/images/CoreMetrics/SHAP_EXP.png", alt: "SHAP explainability for CoreMetrics" },
          { src: "assets/images/CoreMetrics/BT_C_R.png", alt: "Bootstrap confidence results" },
          { src: "assets/images/CoreMetrics/QR_HP.png", alt: "Quick-reference health panel" },
        ],
      },
    ],
    contribution: [
      { label: "Healthcare problem", text: "Supporting risk assessment for heart-failure patients with an accessible tool." },
      { label: "Solution concept", text: "A single-page application that turns clinical inputs into an interpretable risk profile." },
      { label: "Technical development", text: "Built individually, from data processing to the interface and explainability layer." },
    ],
    takeaway:
      "Working on CoreMetrics alone pushed me to own every layer of a HealthTech product, from the model to the interface.",
  },
  ram: {
    kicker: "Data · AI · Supply Chain",
    title: "Royal Air Maroc — Data Analyst Internship",
    overview:
      "During a Data Analyst internship at Royal Air Maroc, I built Power BI dashboards and AI-assisted analysis (Python / Streamlit) to support supply-chain decisions across purchasing, inventory and supplier quality.",
    carousels: [
      {
        heading: "Dashboards",
        images: [
          { src: "assets/images/RAM_Dashboard/overview_dashboard.png", alt: "Executive overview dashboard" },
          { src: "assets/images/RAM_Dashboard/achat.png", alt: "Purchasing performance dashboard" },
          { src: "assets/images/RAM_Dashboard/inventory.png", alt: "Inventory & forecasting dashboard" },
          { src: "assets/images/RAM_Dashboard/qualit.png", alt: "Supplier quality dashboard" },
        ],
      },
    ],
    contribution: [
      { label: "Business problem", text: "Giving supply-chain teams a clearer, faster read on purchasing and inventory performance." },
      { label: "Solution concept", text: "A set of Power BI dashboards paired with Python/Streamlit AI-assisted analysis." },
      { label: "Technical development", text: "Data modelling, DAX measures and dashboard design across four functional views." },
    ],
    takeaway:
      "This internship gave me hands-on industrial data experience — the analytical discipline I now want to bring back into HealthTech.",
  },
};

/* -------------------------------------------------------------------- */
/* Modal + carousel logic                                                */
/* -------------------------------------------------------------------- */

function initModal() {
  const overlay = document.querySelector("#project-modal");
  if (!overlay) return;
  const modal = overlay.querySelector(".modal");
  const closeBtn = overlay.querySelector(".modal-close");
  let lastFocused = null;

  document.querySelectorAll("[data-project]").forEach((trigger) => {
    trigger.addEventListener("click", () => openProject(trigger.dataset.project));
  });

  function openProject(key) {
    const data = PROJECTS[key];
    if (!data) return;
    lastFocused = document.activeElement;
    modal.innerHTML = buildModalMarkup(data);
    overlay.classList.add("open");
    document.body.classList.add("modal-open");
    modal.querySelectorAll(".carousel").forEach(setupCarousel);
    modal.querySelector(".modal-close").addEventListener("click", closeProject);
    closeBtn.focus();
  }

  function closeProject() {
    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProject();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeProject();
  });
}

function buildModalMarkup(data) {
  const carouselsHtml = data.carousels
    .map((c, i) => buildCarousel(c, i))
    .join("");

  const contribHtml = data.contribution
    .map(
      (c) => `
      <div class="contrib-card">
        <h5>${escapeHtml(c.label)}</h5>
        <p>${escapeHtml(c.text)}</p>
      </div>`
    )
    .join("");

  return `
    <div class="modal-head">
      <button class="modal-close" aria-label="Close project">✕</button>
      <span class="modal-kicker">${escapeHtml(data.kicker)}</span>
      <h3>${escapeHtml(data.title)}</h3>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <h4>Overview</h4>
        <p>${escapeHtml(data.overview)}</p>
      </div>
      ${carouselsHtml}
      <div class="modal-section">
        <h4>Contribution</h4>
        <div class="contrib-grid">${contribHtml}</div>
      </div>
      <div class="modal-section">
        <h4>Takeaway</h4>
        <p class="takeaway">${escapeHtml(data.takeaway)}</p>
      </div>
    </div>
  `;
}

function buildCarousel(carousel, index) {
  const slides = carousel.images
    .map((img) => `<img src="${encodeURI(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy">`)
    .join("");
  const thumbs = carousel.images
    .map(
      (img, i) =>
        `<img src="${encodeURI(img.src)}" alt="" data-index="${i}" class="${i === 0 ? "active" : ""}">`
    )
    .join("");

  return `
    <div class="modal-section">
      <h4>${escapeHtml(carousel.heading)}</h4>
      <div class="carousel" data-count="${carousel.images.length}">
        <div class="carousel-stage">
          <div class="carousel-track">${slides}</div>
          <button class="carousel-arrow prev" aria-label="Previous image">‹</button>
          <button class="carousel-arrow next" aria-label="Next image">›</button>
          <div class="carousel-counter"><span class="cur">01</span> / <span class="total">${pad(carousel.images.length)}</span></div>
        </div>
        <div class="carousel-thumbs">${thumbs}</div>
      </div>
    </div>
  `;
}

function setupCarousel(root) {
  const track = root.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const thumbs = Array.from(root.querySelectorAll(".carousel-thumbs img"));
  const curEl = root.querySelector(".cur");
  const prevBtn = root.querySelector(".prev");
  const nextBtn = root.querySelector(".next");
  let index = 0;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    curEl.textContent = pad(index + 1);
    thumbs.forEach((t, i) => t.classList.toggle("active", i === index));
  }

  function go(delta) {
    index = (index + delta + slides.length) % slides.length;
    render();
  }

  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  thumbs.forEach((t) =>
    t.addEventListener("click", () => {
      index = Number(t.dataset.index);
      render();
    })
  );

  root.tabIndex = 0;
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  render();
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}