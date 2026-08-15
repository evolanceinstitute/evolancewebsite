/* ==========================================================================
   EVOLANCE INSTITUTE OF IT — SCRIPT
   Features: Fullscreen Preloader Reveal, Program Syllabus Modal,
   Counter Animations, Admissions Form Handler
   ========================================================================== */

// Authentic Syllabus Data Extracted from IMP Folder
const syllabusData = {
  ignite: {
    title: "Capstone Ignite (Empowering Women Through Technology)",
    subtitle: "Rawalpindi, Pakistan · Founded by NoorAbbas",
    duration: "25 Class Days | 4 Phases | 10+ Real Skills",
    desc: "Built from scratch for women, homemakers, and job seekers. Every student works on their own dedicated laptop in a supportive, judgment-free environment.",
    phases: [
      { name: "Phase 1: Foundations (Days 1–6)", detail: "Computer hardware parts, Windows navigation, file/folder management, proper typing technique & computer confidence." },
      { name: "Phase 2: Productivity (Days 7–14)", detail: "MS Word formatting, Excel spreadsheets, PowerPoint presentations, Google Workspace & Canva graphic design." },
      { name: "Phase 3: Digital Skills (Days 15–20)", detail: "Safe browsing, online privacy, AI prompt engineering (ChatGPT/Gemini), and social media content creation." },
      { name: "Phase 4: Earn & Grow (Days 21–25)", detail: "Freelancing profiles on Fiverr & Upwork, client communication, proposal writing, portfolio building & graduation." }
    ]
  },
  juniors: {
    title: "Capstone Juniors (Ages 11–15)",
    subtitle: "Building Next-Gen Tech & Coding Mindset",
    duration: "30 Days | 4 Phases | 15+ Skills | 3 Projects",
    desc: "A hands-on technology programme designed to give young learners real computer confidence, problem-solving logic, and AI literacy.",
    phases: [
      { name: "Phase 1: IT Foundations (Days 1–5)", detail: "What's inside a computer, Windows desktop navigation, settings, keyboard shortcuts, typing speed & accuracy." },
      { name: "Phase 2: Internet & Productivity (Days 6–10)", detail: "Safe web browsing, online safety, MS Word document creation, PowerPoint & Canva poster design project." },
      { name: "Phase 3: Coding & Logic (Days 11–15)", detail: "Computational thinking, Scratch drag-and-drop game programming, Python language basics, building & presenting a mini game." },
      { name: "Phase 4: AI & Showcase (Days 16–20)", detail: "Understanding AI, prompt engineering, final showcase project & parent presentation day with certificate award." }
    ]
  },
  master: {
    title: "Master IT Program (60+ Skills)",
    subtitle: "Complete Workplace & Career Readiness Track",
    duration: "11 Structured Modules | Practical & Job-Ready",
    desc: "A complete IT breakdown equipping students with hardware knowledge, office productivity, cybersecurity, databases, programming, web design, and freelancing.",
    phases: [
      { name: "Modules 1 & 2: Computer & OS Foundations", detail: "Hardware specs, RAM/CPU/Storage roles, Windows settings, file management, software installation & shortcuts." },
      { name: "Modules 3 & 4: Office Tools & Google Workspace", detail: "MS Word, Excel formulas/spreadsheets, PowerPoint, Gmail setup, Docs, Sheets, Slides & real-time collaboration." },
      { name: "Modules 5 & 6: Internet, Networks & Cybersecurity", detail: "LAN/WAN/WiFi, DNS, virus/malware threat protection, 2FA/OTPs, strong password management & online safety." },
      { name: "Modules 7 & 8: Databases & AI Tools", detail: "Flat vs relational databases, spreadsheet data entry, ChatGPT/Gemini prompt writing & responsible AI use." },
      { name: "Modules 9 & 10: Programming & Web Development", detail: "HTML structure, Scratch logic, Python fundamentals, C/C++ basics, WordPress & Webflow no-code site creation." },
      { name: "Module 11: Creative Design & Freelancing", detail: "Canva graphic design (posters/socials), Fiverr & Upwork profile setup, proposal writing, pricing & client work." }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCounters();
  initBackToTop();
  initModal();
  initAdmissionsForm();
});

// Preloader Reveal
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

// Counters
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

// Modal for Syllabus
function initModal() {
  const modal = document.getElementById("syllabus-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close-btn");
  const triggers = document.querySelectorAll(".modal-trigger");

  if (!modal || !modalBody) return;

  triggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const key = e.currentTarget.getAttribute("data-program");
      const data = syllabusData[key];
      if (!data) return;

      modalBody.innerHTML = `
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 4px;">${data.title}</h2>
        <p style="color: var(--accent-warm); font-size: 0.85rem; font-weight: 600; margin-bottom: 12px;">${data.subtitle} · ${data.duration}</p>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">${data.desc}</p>
        
        <h3 class="modal-section-title">Curriculum Breakdown</h3>
        <div class="module-list">
          ${data.phases.map(p => `
            <div class="module-item">
              <h4>${p.name}</h4>
              <p>${p.detail}</p>
            </div>
          `).join('')}
        </div>
      `;

      modal.classList.add("active");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
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

// Back to Top
function initBackToTop() {
  const topBtn = document.getElementById("back-to-top");
  if (topBtn) {
    topBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
