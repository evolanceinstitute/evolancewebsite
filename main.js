/* ==========================================================================
   EVOLANCE INSTITUTE OF IT — SCRIPT
   Features: Single-Page Navigation / Tab Switcher, Preloader Reveal,
   Stats Counter Animations, Admissions Form Handler
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initTabNavigation();
  initCounters();
  initAdmissionsForm();
  initBackToTop();
});

// Single-Page Tab Switcher
function initTabNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  const tabViews = document.querySelectorAll(".tab-view");

  if (!tabs.length || !tabViews.length) return;

  function switchTab(targetTabId) {
    // Update active nav button state
    tabs.forEach(btn => {
      if (btn.getAttribute("data-tab") === targetTabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update active view tab
    tabViews.forEach(view => {
      if (view.id === `tab-${targetTabId}`) {
        view.classList.add("active");
      } else {
        view.classList.remove("active");
      }
    });

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute("data-tab");
      if (targetTab) {
        switchTab(targetTab);
      }
    });
  });
}

// Preloader Reveal Animation
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const progress = document.getElementById("preloader-progress");
  const counter = document.getElementById("preloader-counter");
  const body = document.body;

  if (!preloader || !progress || !counter) return;

  let count = 0;
  const duration = 1200;
  const interval = 20;
  const step = Math.ceil(100 / (duration / interval));

  const timer = setInterval(() => {
    count += step;
    if (count >= 100) {
      count = 100;
      clearInterval(timer);

      setTimeout(() => {
        preloader.classList.add("completed");
        body.classList.remove("loading");
        body.classList.add("loaded");
      }, 200);
    }

    progress.style.width = count + "%";
    counter.innerText = count + "%";
  }, interval);
}

// Stats Counter
function initCounters() {
  const statVals = document.querySelectorAll(".stat-val");
  statVals.forEach(stat => {
    const target = parseInt(stat.getAttribute("data-target"), 10);
    let count = 0;
    const duration = 1500;
    const step = Math.ceil((target || 1) / 30);

    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }

      if (target === 100) {
        stat.innerText = count + "%";
      } else if (target === 60) {
        stat.innerText = count + "+";
      } else {
        stat.innerText = count;
      }
    }, 40);
  });
}

// Form Handler
function initAdmissionsForm() {
  const form = document.getElementById("admissions-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("student-name").value;
    const program = document.getElementById("student-program").value;

    alert(`Thank you ${name}! Your inquiry for "${program}" at Evolance Institute of IT has been received. Our team will contact you shortly.`);
    form.reset();
  });
}

// Back to Top Link
function initBackToTop() {
  const topBtn = document.getElementById("back-to-top");
  if (topBtn) {
    topBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
