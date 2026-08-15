/* ==========================================================================
   EVOLANCE LANDING PAGE SCRIPT
   Interactive Preview State Switcher & Counter Animations
   ========================================================================== */

const previewData = {
  fast: {
    icon: "fa-rocket",
    title: "Optimized for Speed",
    desc: "Experience instant rendering with lightweight, zero-bloat animation frames."
  },
  secure: {
    icon: "fa-shield-halved",
    title: "Enterprise Grade Security",
    desc: "Built-in protection and encrypted data flows with zero compromises."
  },
  flexible: {
    icon: "fa-wand-magic-sparkles",
    title: "Flexible & Modular",
    desc: "Seamlessly adapt layout components and animations to fit any product requirement."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupInteractivePreview();
  setupCounters();
});

function setupInteractivePreview() {
  const buttons = document.querySelectorAll(".preview-btn");
  const icon = document.querySelector(".preview-icon");
  const title = document.getElementById("preview-title");
  const desc = document.getElementById("preview-desc");
  const display = document.getElementById("preview-display");

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      buttons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");

      const stateKey = e.target.getAttribute("data-state");
      const data = previewData[stateKey];

      if (data && display) {
        display.style.opacity = "0";
        display.style.transform = "scale(0.95)";

        setTimeout(() => {
          if (icon) icon.className = `fa-solid ${data.icon} preview-icon`;
          if (title) title.innerText = data.title;
          if (desc) desc.innerText = data.desc;

          display.style.opacity = "1";
          display.style.transform = "scale(1)";
        }, 150);
      }
    });
  });
}

function setupCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    let count = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 30));

    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      if (target === 100) {
        counter.innerText = count + "%";
      } else if (target === 60) {
        counter.innerText = count;
      } else if (target === 5) {
        counter.innerText = count + "k+";
      }
    }, 30);
  });
}
