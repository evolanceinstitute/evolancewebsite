/* ==========================================================================
   EVOLANCE INSTITUTE OF IT — SCRIPT
   Features: Single-Page Navigation / Tab Switcher, Preloader Reveal,
   Vertical Left Sidebar Portal Navigation with Accordion Dropdowns,
   Top Navbar Hiding, Pre-Approved Email Verification, Session Persistence
   ========================================================================== */

// Global State
const state = {
  approvedRoster: {
    ignite: [
      { email: "fatima@evolance.edu.pk", name: "Fatima Noor", roll: "EVO-IGN-001" }
    ],
    juniors: [
      { email: "zain@evolance.edu.pk", name: "Zain Ali", roll: "EVO-JUN-001" }
    ],
    master: [
      { email: "ayesha@evolance.edu.pk", name: "Ayesha Khan", roll: "EVO-MAS-001" },
      { email: "hamza@evolance.edu.pk", name: "Hamza Ahmed", roll: "EVO-MAS-002" }
    ]
  },
  registeredAccounts: {
    "ayesha@evolance.edu.pk": {
      name: "Ayesha Khan",
      email: "ayesha@evolance.edu.pk",
      program: "master",
      programName: "Master IT Program",
      rollNo: "EVO-MAS-001",
      pass: "password123"
    }
  },
  currentRosterCourse: "ignite"
};

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initTabNavigation();
  initCounters();
  initAdmissionsForm();
  initPortalDashboards();
  initBackToTop();
});

// Single-Page Tab Switcher & Top Navbar Dynamic Visibility
function initTabNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  const tabViews = document.querySelectorAll(".tab-view");
  const body = document.body;

  if (!tabs.length || !tabViews.length) return;

  function switchTab(targetTabId) {
    // When switching to Portal Login tab -> Hide top nav links
    if (targetTabId === "login") {
      body.classList.add("portal-mode-active");
    } else {
      body.classList.remove("portal-mode-active");
    }

    tabs.forEach(btn => {
      if (btn.getAttribute("data-tab") === targetTabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    tabViews.forEach(view => {
      if (view.id === `tab-${targetTabId}`) {
        view.classList.add("active");
      } else {
        view.classList.remove("active");
      }
    });

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

// Interactive Portal Dashboards & Vertical Sidebar Logic
function initPortalDashboards() {
  const loginViewBox = document.getElementById("login-view-box");
  const authenticatedView = document.getElementById("portal-authenticated-view");
  const facultyWorkspace = document.getElementById("faculty-workspace");
  const studentWorkspace = document.getElementById("student-workspace");
  const facultyVGroup = document.getElementById("faculty-v-group");
  const studentVGroup = document.getElementById("student-v-group");

  const modeSigninBtn = document.getElementById("mode-signin-btn");
  const modeSignupBtn = document.getElementById("mode-signup-btn");
  const signinRoleSelector = document.getElementById("signin-role-selector");

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  
  const savedSessionBanner = document.getElementById("saved-session-banner");
  const savedUserName = document.getElementById("saved-user-name");
  const savedUserEmail = document.getElementById("saved-user-email");
  const btnResumeSession = document.getElementById("btn-resume-session");

  let selectedSignInRole = "student";

  // Check saved session in localStorage
  function checkSavedSession() {
    const savedUserJSON = localStorage.getItem("evolance_saved_user");
    if (savedUserJSON && savedSessionBanner) {
      try {
        const savedUser = JSON.parse(savedUserJSON);
        if (savedUser && savedUser.email) {
          savedSessionBanner.style.display = "flex";
          savedUserName.innerText = `Saved Account: ${savedUser.name || 'Student'}`;
          savedUserEmail.innerText = savedUser.email;
        }
      } catch (e) {
        console.error("Session parse error", e);
      }
    }
  }

  checkSavedSession();

  if (btnResumeSession) {
    btnResumeSession.addEventListener("click", () => {
      const savedUserJSON = localStorage.getItem("evolance_saved_user");
      if (savedUserJSON) {
        const savedUser = JSON.parse(savedUserJSON);
        openStudentDashboard(savedUser);
      }
    });
  }

  // Toggle Mode: Sign In vs Sign Up
  if (modeSigninBtn && modeSignupBtn) {
    modeSigninBtn.addEventListener("click", () => {
      modeSigninBtn.classList.add("active");
      modeSignupBtn.classList.remove("active");
      if (signinRoleSelector) signinRoleSelector.style.display = "flex";
      if (loginForm) loginForm.style.display = "block";
      if (signupForm) signupForm.style.display = "none";
    });

    modeSignupBtn.addEventListener("click", () => {
      modeSignupBtn.classList.add("active");
      modeSigninBtn.classList.remove("active");
      if (signinRoleSelector) signinRoleSelector.style.display = "none";
      if (loginForm) loginForm.style.display = "none";
      if (signupForm) signupForm.style.display = "block";
    });
  }

  // Role selector pills in Sign In mode
  const rolePills = document.querySelectorAll("#signin-role-selector .role-pill");
  rolePills.forEach(pill => {
    pill.addEventListener("click", () => {
      rolePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedSignInRole = pill.getAttribute("data-role");
    });
  });

  // Toggle Password
  const pwdInput = document.getElementById("login-password");
  const toggleBtn = document.getElementById("toggle-pwd");
  if (toggleBtn && pwdInput) {
    toggleBtn.addEventListener("click", () => {
      const type = pwdInput.getAttribute("type") === "password" ? "text" : "password";
      pwdInput.setAttribute("type", type);
      toggleBtn.innerHTML = type === "password" ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
    });
  }

  // Open Student Dashboard Layout
  function openStudentDashboard(userObj) {
    document.body.classList.add("portal-mode-active");
    if (loginViewBox) loginViewBox.style.display = "none";
    if (authenticatedView) authenticatedView.style.display = "grid";

    if (facultyWorkspace) facultyWorkspace.style.display = "none";
    if (studentWorkspace) studentWorkspace.style.display = "block";

    if (facultyVGroup) facultyVGroup.style.display = "none";
    if (studentVGroup) studentVGroup.style.display = "block";

    const roleBadge = document.getElementById("portal-role-badge");
    const nameEl = document.getElementById("portal-user-name");
    const emailEl = document.getElementById("portal-user-email");

    if (roleBadge) {
      roleBadge.innerText = "Verified Student Portal";
      roleBadge.className = "page-badge";
    }
    if (nameEl) nameEl.innerText = userObj.name || "Ayesha Khan";
    if (emailEl) emailEl.innerText = userObj.email || "ayesha@evolance.edu.pk";
  }

  // Open Faculty Dashboard Layout
  function openFacultyDashboard() {
    document.body.classList.add("portal-mode-active");
    if (loginViewBox) loginViewBox.style.display = "none";
    if (authenticatedView) authenticatedView.style.display = "grid";

    if (studentWorkspace) studentWorkspace.style.display = "none";
    if (facultyWorkspace) facultyWorkspace.style.display = "block";

    if (studentVGroup) studentVGroup.style.display = "none";
    if (facultyVGroup) facultyVGroup.style.display = "block";

    const roleBadge = document.getElementById("portal-role-badge");
    const nameEl = document.getElementById("portal-user-name");
    const emailEl = document.getElementById("portal-user-email");

    if (roleBadge) {
      roleBadge.innerText = "Faculty Admin Portal";
      roleBadge.className = "page-badge gold";
    }
    if (nameEl) nameEl.innerText = "Prof. NoorAbbas";
    if (emailEl) emailEl.innerText = "director@evolance.edu.pk";

    renderFacultyRosterTable();
    populateFacultyStudentSelect();
    renderFacultyAttendanceTable("master");
  }

  function hideDashboards() {
    document.body.classList.remove("portal-mode-active");
    if (loginViewBox) loginViewBox.style.display = "block";
    if (authenticatedView) authenticatedView.style.display = "none";
    checkSavedSession();
  }

  // SIGN IN Form Submit
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const pass = document.getElementById("login-password").value;
      const shouldSave = document.getElementById("save-login-checkbox").checked;

      if (selectedSignInRole === "faculty") {
        openFacultyDashboard();
        return;
      }

      const account = state.registeredAccounts[email];
      if (account) {
        if (shouldSave) {
          localStorage.setItem("evolance_saved_user", JSON.stringify(account));
        }
        openStudentDashboard(account);
      } else {
        const demoUser = {
          name: email.split("@")[0].toUpperCase(),
          email: email,
          programName: "Master IT Program",
          rollNo: "EVO-2026-001"
        };
        if (shouldSave) {
          localStorage.setItem("evolance_saved_user", JSON.stringify(demoUser));
        }
        openStudentDashboard(demoUser);
      }
    });
  }

  // SIGN UP Form Submit with Verification
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim().toLowerCase();
      const programKey = document.getElementById("signup-program").value;
      const pass = document.getElementById("signup-password").value;
      const shouldSave = document.getElementById("signup-save-checkbox").checked;

      const courseRoster = state.approvedRoster[programKey] || [];
      const approvedStudent = courseRoster.find(st => st.email.toLowerCase() === email);

      if (!approvedStudent) {
        const progTitle = programKey === "ignite" ? "Capstone Ignite" : (programKey === "juniors" ? "Capstone Juniors" : "Master IT Program");
        alert(`❌ Access Denied: Your email (${email}) has NOT been pre-approved by Evolance Faculty for ${progTitle}.\n\nPlease contact administration or wait for faculty to add your email to the course roster.`);
        return;
      }

      const progNames = {
        ignite: "Capstone Ignite (Women Track)",
        juniors: "Capstone Juniors (Ages 11-15)",
        master: "Master IT Program (60+ Skills)"
      };

      const newAccount = {
        name: approvedStudent.name || name,
        email: email,
        program: programKey,
        programName: progNames[programKey],
        rollNo: approvedStudent.roll || "EVO-2026-NEW",
        pass: pass
      };

      state.registeredAccounts[email] = newAccount;

      if (shouldSave) {
        localStorage.setItem("evolance_saved_user", JSON.stringify(newAccount));
      }

      alert(`✅ Verification Successful! Welcome to Evolance ${progNames[programKey]}.`);
      openStudentDashboard(newAccount);
    });
  }

  // Demo preview buttons
  const btnDemoStudent = document.getElementById("btn-demo-student");
  const btnDemoFaculty = document.getElementById("btn-demo-faculty");

  if (btnDemoStudent) {
    btnDemoStudent.addEventListener("click", () => {
      openStudentDashboard({
        name: "Ayesha Khan",
        email: "ayesha@evolance.edu.pk",
        programName: "Master IT Program",
        rollNo: "EVO-MAS-001"
      });
    });
  }

  if (btnDemoFaculty) {
    btnDemoFaculty.addEventListener("click", openFacultyDashboard);
  }

  const portalLogoutBtn = document.getElementById("portal-logout-btn");
  if (portalLogoutBtn) {
    portalLogoutBtn.addEventListener("click", () => {
      localStorage.removeItem("evolance_saved_user");
      hideDashboards();
    });
  }

  // =========================================================================
  // ACCORDION DROPDOWN & VERTICAL LEFT SIDEBAR MENU NAVIGATION
  // =========================================================================
  const dropdownToggles = document.querySelectorAll(".v-menu-link.dropdown-toggle");
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const parentItem = toggle.closest(".v-menu-item");
      parentItem.classList.toggle("open");
    });
  });

  // Vertical Sub-Link Dropdown Click Handlers (Faculty)
  const vSubLinks = document.querySelectorAll(".v-sub-link");
  const fTabContents = document.querySelectorAll(".f-tab-content");

  vSubLinks.forEach(sub => {
    sub.addEventListener("click", () => {
      vSubLinks.forEach(s => s.classList.remove("active"));
      sub.classList.add("active");

      const targetFTab = sub.getAttribute("data-f-tab");
      const courseSub = sub.getAttribute("data-course-sub");
      const batchKey = sub.getAttribute("data-batch");

      // Switch active faculty workspace tab
      fTabContents.forEach(c => c.classList.remove("active"));
      const activeContent = document.getElementById(`f-tab-${targetFTab}`);
      if (activeContent) activeContent.classList.add("active");

      // Handle course sub-filter
      if (courseSub) {
        state.currentRosterCourse = courseSub;
        renderFacultyRosterTable();
        const badge = document.getElementById("current-roster-badge");
        if (badge) badge.innerText = courseSub.toUpperCase();
      }

      if (batchKey) {
        renderFacultyAttendanceTable(batchKey);
        const batchSelect = document.getElementById("attendance-batch-select");
        if (batchSelect) batchSelect.value = batchKey;
      }
    });
  });

  // Single Vertical Menu Links (Faculty: Grade Quizzes & Broadcast Notice)
  const singleFLinks = document.querySelectorAll(".v-menu-link[data-f-tab]");
  singleFLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetFTab = link.getAttribute("data-f-tab");
      fTabContents.forEach(c => c.classList.remove("active"));
      const activeContent = document.getElementById(`f-tab-${targetFTab}`);
      if (activeContent) activeContent.classList.add("active");
    });
  });

  // Vertical Menu Links (Student)
  const studentVLinks = document.querySelectorAll(".v-menu-link[data-s-tab]");
  const sTabContents = document.querySelectorAll(".s-tab-content");

  studentVLinks.forEach(link => {
    link.addEventListener("click", () => {
      studentVLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const targetSTab = link.getAttribute("data-s-tab");
      sTabContents.forEach(c => c.classList.remove("active"));
      const activeContent = document.getElementById(`s-tab-${targetSTab}`);
      if (activeContent) activeContent.classList.add("active");
    });
  });

  // Save Attendance Button
  const saveAttBtn = document.getElementById("save-attendance-btn");
  const saveAttStatus = document.getElementById("attendance-save-status");
  if (saveAttBtn && saveAttStatus) {
    saveAttBtn.addEventListener("click", () => {
      saveAttStatus.innerText = "✓ Attendance saved & synced to student records!";
      setTimeout(() => {
        saveAttStatus.innerText = "";
      }, 4000);
    });
  }

  // Faculty Record Grade Form
  const gradeForm = document.getElementById("faculty-grade-form");
  const gradesLogTable = document.querySelector("#grades-log-table tbody");

  if (gradeForm && gradesLogTable) {
    gradeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const studentSelect = document.getElementById("grade-student-select");
      if (!studentSelect.options.length) return;
      const studentText = studentSelect.options[studentSelect.selectedIndex].text.split("—")[1]?.trim() || "Student";
      const title = document.getElementById("grade-type-select").value;
      const score = document.getElementById("grade-score-input").value;
      const total = document.getElementById("grade-total-input").value;

      const pct = Math.round((score / total) * 100);
      let gradeBadge = `<span class="status-badge green">A+ (${pct}%)</span>`;
      if (pct < 70) gradeBadge = `<span class="status-badge yellow">C (${pct}%)</span>`;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>15 Aug 2026</td>
        <td>${studentText}</td>
        <td>${title}</td>
        <td>${score} / ${total}</td>
        <td>${gradeBadge}</td>
      `;
      gradesLogTable.prepend(newRow);

      alert(`Grade recorded for ${studentText}: ${score}/${total} (${pct}%)`);
      gradeForm.reset();
    });
  }
}

// Render Faculty Approved Roster Table
function renderFacultyRosterTable() {
  const tbody = document.getElementById("roster-table-body");
  if (!tbody) return;

  const currentList = state.approvedRoster[state.currentRosterCourse] || [];
  tbody.innerHTML = "";

  if (!currentList.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No pre-approved students in this roster. Add one above!</td></tr>`;
    return;
  }

  currentList.forEach((st, idx) => {
    const isSignedUp = !!state.registeredAccounts[st.email];
    const statusBadge = isSignedUp 
      ? `<span class="status-badge green"><i class="fa-solid fa-check"></i> Account Active</span>`
      : `<span class="status-badge yellow"><i class="fa-solid fa-clock"></i> Pending Sign-Up</span>`;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${st.roll}</td>
      <td><strong>${st.email}</strong></td>
      <td>${st.name}</td>
      <td><span class="page-badge" style="margin:0;">${state.currentRosterCourse.toUpperCase()}</span></td>
      <td>${statusBadge}</td>
      <td><button class="remove-btn" onclick="removeStudentFromRoster('${state.currentRosterCourse}', ${idx})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Remove Student from Roster
window.removeStudentFromRoster = function(courseKey, idx) {
  if (confirm("Remove this student from approved roster?")) {
    state.approvedRoster[courseKey].splice(idx, 1);
    renderFacultyRosterTable();
    populateFacultyStudentSelect();
  }
};

// Populate Student Select dropdown in Faculty Grade Form
function populateFacultyStudentSelect() {
  const select = document.getElementById("grade-student-select");
  if (!select) return;
  select.innerHTML = "";

  Object.keys(state.approvedRoster).forEach(courseKey => {
    state.approvedRoster[courseKey].forEach(st => {
      const opt = document.createElement("option");
      opt.value = st.email;
      opt.innerText = `${st.roll} — ${st.name} (${courseKey.toUpperCase()})`;
      select.appendChild(opt);
    });
  });
}

// Render Faculty Attendance Table
function renderFacultyAttendanceTable(batchKey) {
  const tbody = document.getElementById("attendance-table-body");
  if (!tbody) return;

  const currentList = state.approvedRoster[batchKey] || [];
  tbody.innerHTML = "";

  currentList.forEach((st) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${st.roll}</td>
      <td><strong>${st.name}</strong></td>
      <td>${batchKey.toUpperCase()} Track</td>
      <td><span class="status-badge green">96%</span></td>
      <td><button class="att-toggle-btn present">PRESENT</button></td>
    `;
    tbody.appendChild(row);
  });

  const attToggleBtns = tbody.querySelectorAll(".att-toggle-btn");
  attToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("present")) {
        btn.classList.remove("present");
        btn.classList.add("absent");
        btn.innerText = "ABSENT";
      } else {
        btn.classList.remove("absent");
        btn.classList.add("present");
        btn.innerText = "PRESENT";
      }
    });
  });
}

// Admissions Form Handler
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
