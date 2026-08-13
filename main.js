/* ==========================================================================
   EVOLANCE INSTITUTE - INTERACTIVE SCRIPT
   Features: Dynamic Course Filtering, Live Search, Syllabus Modal,
   Career Roadmap Switcher, Animated Counters & Form Handling
   ========================================================================== */

// Course Dataset
const courses = [
  {
    id: "fullstack-pro",
    title: "Full-Stack Web Engineering",
    category: "software",
    badge: "Most Popular",
    badgeColor: "emerald",
    desc: "Master modern web development from HTML/CSS to React, Node.js, Next.js, TypeScript, PostgreSQL & Docker.",
    duration: "16 Weeks",
    level: "Beginner to Pro",
    rating: "4.9 (420+ reviews)",
    price: "$1,499",
    installment: "Or $299/mo (5 months)",
    techStack: ["React 19", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Git"],
    syllabus: [
      { week: "Weeks 1-3", topic: "Modern JavaScript (ES6+), HTML5/CSS3 & Responsive Design System" },
      { week: "Weeks 4-7", topic: "React Architecture, State Management, Hooks & Next.js App Router" },
      { week: "Weeks 8-11", topic: "Backend REST & GraphQL APIs, Node.js, Express & Prisma ORM" },
      { week: "Weeks 12-14", topic: "Database Architecture (PostgreSQL & MongoDB), Authentication & Security" },
      { week: "Weeks 15-16", topic: "DevOps, Docker, CI/CD Pipeline & Live Capstone Project Deployment" }
    ]
  },
  {
    id: "ai-ml-mastery",
    title: "AI & Machine Learning Mastery",
    category: "ai",
    badge: "High Demand",
    badgeColor: "purple",
    desc: "Build real-world AI applications, custom Large Language Models (LLMs), RAG pipelines, PyTorch & Data Science.",
    duration: "20 Weeks",
    level: "Intermediate",
    rating: "5.0 (310+ reviews)",
    price: "$1,899",
    installment: "Or $379/mo (5 months)",
    techStack: ["Python", "PyTorch", "LangChain", "OpenAI API", "Scikit-Learn", "FastAPI", "VectorDB"],
    syllabus: [
      { week: "Weeks 1-4", topic: "Advanced Python Data Science (NumPy, Pandas, Matplotlib, Seaborn)" },
      { week: "Weeks 5-8", topic: "Machine Learning Algorithms, Regression, Decision Trees & Model Evaluation" },
      { week: "Weeks 9-13", topic: "Deep Learning Neural Networks, PyTorch & Computer Vision Fundamentals" },
      { week: "Weeks 14-17", topic: "Generative AI, Transformer Architecture, Fine-tuning LLMs & Prompt Engineering" },
      { week: "Weeks 18-20", topic: "Building & Deploying RAG Applications with LangChain & Vector Databases" }
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud Architecture & DevOps",
    category: "cloud",
    badge: "Industry Favorite",
    badgeColor: "cyan",
    desc: "Automate infrastructure, manage Kubernetes clusters, AWS cloud services, CI/CD pipelines & Terraform.",
    duration: "14 Weeks",
    level: "Intermediate to Adv",
    rating: "4.9 (280+ reviews)",
    price: "$1,699",
    installment: "Or $339/mo (5 months)",
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux", "Prometheus"],
    syllabus: [
      { week: "Weeks 1-3", topic: "Linux Administration, Shell Scripting & Git Workflow Automation" },
      { week: "Weeks 4-6", topic: "Docker Containerization & Microservices Orchestration" },
      { week: "Weeks 7-9", topic: "AWS Cloud Infrastructure (EC2, S3, RDS, VPC, IAM, Lambda)" },
      { week: "Weeks 10-12", topic: "Infrastructure as Code (IaC) with Terraform & Kubernetes Cluster Mgmt" },
      { week: "Weeks 13-14", topic: "Enterprise CI/CD Pipelines, Monitoring & Site Reliability Engineering (SRE)" }
    ]
  },
  {
    id: "cybersecurity-pro",
    title: "Cybersecurity & Ethical Hacking",
    category: "security",
    badge: "Certification Track",
    badgeColor: "emerald",
    desc: "Learn offensive and defensive security, network penetration testing, vulnerability assessment & SOC analyst skills.",
    duration: "16 Weeks",
    level: "Beginner to Adv",
    rating: "4.8 (190+ reviews)",
    price: "$1,599",
    installment: "Or $319/mo (5 months)",
    techStack: ["Kali Linux", "Wireshark", "Metasploit", "Nmap", "Python Security", "Burp Suite"],
    syllabus: [
      { week: "Weeks 1-4", topic: "Computer Networking Protocols, Packet Analysis & Linux Security" },
      { week: "Weeks 5-8", topic: "Vulnerability Scanning, Penetration Testing & Exploit Development" },
      { week: "Weeks 9-12", topic: "Web Application Hacking (OWASP Top 10) & Wireless Security" },
      { week: "Weeks 13-14", topic: "Defensive Security, Incident Response, SIEM Tools & SOC Monitoring" },
      { week: "Weeks 15-16", topic: "CompTIA Security+ & CEH Exam Preparation + Live Cyber Lab" }
    ]
  },
  {
    id: "uiux-design",
    title: "UI/UX Product Design Pro",
    category: "design",
    badge: "Creative Tech",
    badgeColor: "gold",
    desc: "Design intuitive digital products, wireframes, high-fidelity prototypes, user research & interactive design systems.",
    duration: "12 Weeks",
    level: "All Levels",
    rating: "4.9 (230+ reviews)",
    price: "$1,299",
    installment: "Or $259/mo (5 months)",
    techStack: ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing", "Framer"],
    syllabus: [
      { week: "Weeks 1-3", topic: "Design Fundamentals, Typography, Color Theory & Grid Layouts" },
      { week: "Weeks 4-6", topic: "User Research Methods, Information Architecture & Wireframing" },
      { week: "Weeks 7-9", topic: "Mastering Figma: Components, Auto-Layout & Interactive Tokens" },
      { week: "Weeks 10-11", topic: "Building Scalable Enterprise Design Systems & Micro-Interactions" },
      { week: "Weeks 12", topic: "Portfolio Presentation & Design Handoff to Developers" }
    ]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development (React Native)",
    category: "software",
    badge: "Cross-Platform",
    badgeColor: "purple",
    desc: "Build cross-platform iOS & Android mobile applications using React Native, Expo, Firebase & Mobile APIs.",
    duration: "14 Weeks",
    level: "Intermediate",
    rating: "4.8 (175+ reviews)",
    price: "$1,399",
    installment: "Or $279/mo (5 months)",
    techStack: ["React Native", "Expo", "TypeScript", "Firebase", "Redux Toolkit", "REST APIs"],
    syllabus: [
      { week: "Weeks 1-3", topic: "React Native Core Architecture, Flexbox & Native Styling" },
      { week: "Weeks 4-6", topic: "Navigation, State Management & Custom Hooks" },
      { week: "Weeks 7-9", topic: "Integrating Mobile Features (Camera, GPS, Push Notifications, Storage)" },
      { week: "Weeks 10-12", topic: "Backend Integration, Firebase Auth, Realtime Database & Payment Gateways" },
      { week: "Weeks 13-14", topic: "App Store (iOS) & Google Play Store Publishing & Deployment" }
    ]
  }
];

// Career Pathways Dataset
const careerPaths = {
  fullstack: {
    title: "Full-Stack Software Engineer",
    avgSalary: "$105,000 / year",
    growth: "+24% Job Growth (2026-2030)",
    skills: ["React", "TypeScript", "Node.js", "System Design", "Databases", "Cloud Deployments"],
    roles: ["Frontend Developer", "Backend Engineer", "Full-Stack Tech Lead", "Solutions Architect"],
    desc: "Full-stack engineers are the core backbone of modern tech companies, capable of architecting scalable user interfaces and high-performance server APIs."
  },
  ai: {
    title: "AI & Machine Learning Architect",
    avgSalary: "$135,000 / year",
    growth: "+38% Exponential Demand",
    skills: ["Python", "PyTorch", "LLM Fine-tuning", "RAG Systems", "Vector Databases", "Prompt Engineering"],
    roles: ["AI Engineer", "Machine Learning Specialist", "Data Scientist", "NLP Researcher"],
    desc: "AI engineers build the next generation of intelligent software, fine-tuning large language models and integrating artificial intelligence into enterprise applications."
  },
  devops: {
    title: "Cloud & DevOps Engineer",
    avgSalary: "$120,000 / year",
    growth: "+28% High Demand",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD Pipelines", "Site Reliability"],
    roles: ["DevOps Architect", "Cloud Systems Engineer", "SRE Specialist", "Infrastructure Lead"],
    desc: "DevOps specialists bridge software development and operations, building bulletproof automated infrastructure and managing multi-cloud deployments."
  },
  cyber: {
    title: "Cybersecurity & SOC Analyst",
    avgSalary: "$115,000 / year",
    growth: "+32% Critical Need",
    skills: ["Penetration Testing", "Network Defense", "SIEM Monitoring", "Ethical Hacking", "Threat Hunting"],
    roles: ["Cybersecurity Specialist", "Penetration Tester", "SOC Analyst", "Security Consultant"],
    desc: "Cybersecurity professionals protect critical corporate infrastructure and data against evolving global cyber threats and vulnerabilities."
  }
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  renderCourses("all");
  setupEventListeners();
  renderCareerPath("fullstack");
  animateCounters();
});

// Render Course Cards
function renderCourses(filterCategory = "all", searchQuery = "") {
  const courseGrid = document.getElementById("course-grid");
  if (!courseGrid) return;

  const filtered = courses.filter(course => {
    const matchesFilter = filterCategory === "all" || course.category === filterCategory;
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    courseGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;" class="glass-card">
        <i class="fa-solid fa-graduation-cap" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 16px;"></i>
        <h3>No matching programs found</h3>
        <p style="color: var(--text-muted); margin-top: 8px;">Try searching for a different keyword like "React", "Python", or "DevOps".</p>
      </div>
    `;
    return;
  }

  courseGrid.innerHTML = filtered.map(course => `
    <div class="course-card glass-card">
      <div class="course-top">
        <span class="course-category">${course.category.toUpperCase()}</span>
        <span class="course-badge">${course.badge}</span>
      </div>

      <h3 class="course-title">${course.title}</h3>
      <p class="course-desc">${course.desc}</p>

      <div class="course-specs">
        <div class="spec-item"><i class="fa-regular fa-clock"></i> ${course.duration}</div>
        <div class="spec-item"><i class="fa-solid fa-chart-line"></i> ${course.level}</div>
        <div class="spec-item"><i class="fa-solid fa-star"></i> ${course.rating.split(' ')[0]}</div>
      </div>

      <div class="course-tech-stack">
        ${course.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>

      <div class="course-footer">
        <div>
          <div class="course-price">${course.price}</div>
          <span class="course-installment">${course.installment}</span>
        </div>
        <div class="course-actions">
          <button class="btn btn-outline btn-syllabus" data-id="${course.id}" title="View Syllabus">
            Syllabus
          </button>
          <button class="btn btn-primary btn-enroll" data-title="${course.title}">
            Apply
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Attach syllabus modal listeners
  document.querySelectorAll(".btn-syllabus").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const courseId = e.currentTarget.getAttribute("data-id");
      openSyllabusModal(courseId);
    });
  });

  // Attach quick enroll buttons
  document.querySelectorAll(".btn-enroll").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const title = e.currentTarget.getAttribute("data-title");
      const courseSelect = document.getElementById("applicant-course");
      if (courseSelect) {
        courseSelect.value = title;
      }
      const applySection = document.getElementById("apply");
      if (applySection) {
        applySection.scrollIntoView({ behavior: "smooth" });
      }
      showToast(`Selected "${title}"! Complete your details below.`);
    });
  });
}

// Event Listeners Setup
function setupEventListeners() {
  // Sticky Navbar Blur effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile navigation toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      const filter = e.target.getAttribute("data-filter");
      const searchInput = document.getElementById("hero-course-search");
      renderCourses(filter, searchInput ? searchInput.value : "");
    });
  });

  // Hero Search Input
  const searchInput = document.getElementById("hero-course-search");
  const searchBtn = document.getElementById("btn-hero-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activeFilterBtn = document.querySelector(".filter-btn.active");
      const filter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
      renderCourses(filter, e.target.value);
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const coursesSection = document.getElementById("courses");
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Quick search tags
  document.querySelectorAll(".quick-tag").forEach(tagBtn => {
    tagBtn.addEventListener("click", (e) => {
      const tagText = e.target.getAttribute("data-tag");
      if (searchInput) {
        searchInput.value = tagText;
        renderCourses("all", tagText);
        const coursesSection = document.getElementById("courses");
        if (coursesSection) {
          coursesSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Career Path Tabs
  const pathTabs = document.querySelectorAll(".path-tab");
  pathTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      pathTabs.forEach(t => t.classList.remove("active"));
      const target = e.currentTarget;
      target.classList.add("active");
      const pathKey = target.getAttribute("data-path");
      renderCareerPath(pathKey);
    });
  });

  // Modal Close Button
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const syllabusModal = document.getElementById("syllabus-modal");
  if (modalCloseBtn && syllabusModal) {
    modalCloseBtn.addEventListener("click", () => {
      syllabusModal.classList.remove("active");
    });
    syllabusModal.addEventListener("click", (e) => {
      if (e.target === syllabusModal) {
        syllabusModal.classList.remove("active");
      }
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
    question.addEventListener("click", (e) => {
      const item = e.currentTarget.parentElement;
      const isActive = item.classList.contains("active");
      
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
      
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Demo Lab Request Button
  const demoBtn = document.getElementById("btn-request-demo");
  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      showToast("🚀 Interactive Lab Session Initiated! Redirecting to sandbox...");
    });
  }

  // Enrollment Form Submission
  const enrollmentForm = document.getElementById("enrollment-form");
  if (enrollmentForm) {
    enrollmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("applicant-name").value;
      const course = document.getElementById("applicant-course").value;

      showToast(`🎉 Thank you, ${name}! Your application for "${course}" has been submitted. Our admissions counselor will contact you shortly.`);
      enrollmentForm.reset();
    });
  }
}

// Render Career Path Details
function renderCareerPath(pathKey) {
  const pathContent = document.getElementById("path-details-content");
  const path = careerPaths[pathKey];
  if (!pathContent || !path) return;

  pathContent.innerHTML = `
    <div class="path-details-grid">
      <div>
        <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 12px; color: var(--text-main);">${path.title}</h3>
        <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 24px;">${path.desc}</p>
        
        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 0.95rem; color: var(--primary-cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Core Skills Taught</h4>
          <div class="course-tech-stack">
            ${path.skills.map(skill => `<span class="tech-tag" style="padding: 6px 12px; font-size: 0.85rem;">${skill}</span>`).join('')}
          </div>
        </div>

        <div>
          <h4 style="font-size: 0.95rem; color: var(--primary-cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Common Job Titles</h4>
          <ul style="display: flex; flex-wrap: wrap; gap: 12px; color: var(--text-muted);">
            ${path.roles.map(role => `<li><i class="fa-solid fa-angle-right text-accent"></i> ${role}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div>
        <div class="path-stat-card">
          <span style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Average Entry Level Salary</span>
          <div class="salary-badge">${path.avgSalary}</div>
          <span style="font-size: 0.8rem; color: var(--text-dim);">Source: Industry Tech Benchmark 2026</span>
        </div>

        <div class="path-stat-card">
          <span style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Market Demand & Outlook</span>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-cyan); margin: 8px 0;">${path.growth}</div>
          <span style="font-size: 0.8rem; color: var(--text-dim);">High demand across US, Europe & Global Remote Markets</span>
        </div>
      </div>
    </div>
  `;
}

// Open Syllabus Modal
function openSyllabusModal(courseId) {
  const course = courses.find(c => c.id === courseId);
  const modalContent = document.getElementById("modal-dynamic-content");
  const syllabusModal = document.getElementById("syllabus-modal");

  if (!course || !modalContent || !syllabusModal) return;

  modalContent.innerHTML = `
    <div style="margin-bottom: 24px;">
      <span class="course-badge" style="margin-bottom: 10px; display: inline-block;">${course.category.toUpperCase()}</span>
      <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 8px;">${course.title}</h2>
      <p style="color: var(--text-muted);">${course.desc}</p>
    </div>

    <div class="course-specs" style="margin-bottom: 24px;">
      <div class="spec-item"><i class="fa-regular fa-clock"></i> <strong>Duration:</strong> ${course.duration}</div>
      <div class="spec-item"><i class="fa-solid fa-chart-line"></i> <strong>Level:</strong> ${course.level}</div>
      <div class="spec-item"><i class="fa-solid fa-tag"></i> <strong>Price:</strong> ${course.price}</div>
    </div>

    <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: var(--primary-cyan);">Week-by-Week Curriculum</h3>
    <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 30px;">
      ${course.syllabus.map(item => `
        <div style="padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: var(--radius-sm);">
          <span style="font-family: var(--font-code); font-size: 0.8rem; color: var(--primary-cyan); font-weight: 700; display: block; margin-bottom: 4px;">${item.week}</span>
          <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-main);">${item.topic}</p>
        </div>
      `).join('')}
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
      <div>
        <span style="font-size: 0.8rem; color: var(--text-dim);">Guaranteed 1-on-1 Mentorship included</span>
      </div>
      <button class="btn btn-primary btn-enroll" data-title="${course.title}">
        Apply for Next Cohort
      </button>
    </div>
  `;

  syllabusModal.classList.add("active");

  // Rebind modal inner enroll button
  const innerEnrollBtn = modalContent.querySelector(".btn-enroll");
  if (innerEnrollBtn) {
    innerEnrollBtn.addEventListener("click", () => {
      syllabusModal.classList.remove("active");
      const courseSelect = document.getElementById("applicant-course");
      if (courseSelect) {
        courseSelect.value = course.title;
      }
      const applySection = document.getElementById("apply");
      if (applySection) {
        applySection.scrollIntoView({ behavior: "smooth" });
      }
      showToast(`Selected "${course.title}"! Complete your details below.`);
    });
  }
}

// Counter Animations
function animateCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute("data-target"), 10);
    let count = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      count += Math.ceil(target / 50);
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }

      if (target === 98) {
        stat.innerText = count + "%";
      } else if (target === 5000) {
        stat.innerText = count.toLocaleString() + "+";
      } else if (target === 49) {
        stat.innerText = (count / 10).toFixed(1);
      }
    }, 40);
  });
}

// Toast Helper
function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: var(--primary-cyan); font-size: 1.2rem;"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
