/* ==========================================================================
   EVOLANCE MINIMALIST STUDIO SCRIPT
   Features: Fullscreen Preloader Intro Reveal, Counter Animations, Smooth Scroll
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCounters();
  initBackToTop();
});

// Intro Preloader Reveal Animation
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const progress = document.getElementById("preloader-progress");
  const counter = document.getElementById("preloader-counter");
  const body = document.body;

  if (!preloader || !progress || !counter) return;

  let count = 0;
  const duration = 1200; // 1.2s preloader duration
  const interval = 20;
  const step = Math.ceil(100 / (duration / interval));

  const timer = setInterval(() => {
    count += step;
    if (count >= 100) {
      count = 100;
      clearInterval(timer);

      // Smooth curtain reveal
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

// Minimalist Stat Counter
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
        stat.innerText = count;
      } else {
        stat.innerText = "0.0s";
      }
    }, 40);
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
