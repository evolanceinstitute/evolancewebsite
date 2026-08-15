/* ==========================================================================
   EVOLANCE INSTITUTE OF IT — SCRIPT
   Features: Single-Page Navigation / Tab Switcher, Preloader Reveal,
   Faculty Pre-Approved Student Roster, Verification on Sign Up,
   Session Persistence & Interactive Faculty & Student Portals
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

// Single-Page Tab Switcher
function initTabNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  const tabViews = document.querySelectorAll(".tab-view");

  if (!tabs.length || !tabViews.length) return;

  function switchTab(targetTabId) {
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

// Interactive Portal Dashboards & Session Verification
function initPortalDashboards() {
  const loginViewBox = document.getElementById("login-view-box");
  const facultyDash = document.getElementById("faculty-dashboard");
  const studentDash = document.getElementById("student-dashboard");

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

  // Open Student Dashboard
  function openStudentDashboard(userObj) {
    if (!loginViewBox || !studentDash) return;
    loginViewBox.style.display = "none";
    if (facultyDash) facultyDash.style.display = "none";
    studentDash.style.display = "block";

    const welcomeHeader = document.getElementById("student-dashboard-welcome");
    const metaHeader = document.getElementById("student-dashboard-meta");

    if (welcomeHeader) welcomeHeader.innerText = `Welcome Back, ${userObj.name || 'Student'}`;
    if (metaHeader) metaHeader.innerText = `Roll No: ${userObj.rollNo || 'EVO-2026-001'} · ${userObj.programName || 'Evolance IT Course'}`;
  }

  // Open Faculty Dashboard
  function openFacultyDashboard() {
    if (!loginViewBox || !facultyDash) return;
    loginViewBox.style.display = "none";
    if (studentDash) studentDash.style.display = "none";
    facultyDash.style.display = "block";
    renderFacultyRosterTable();
    populateFacultyStudentSelect();
    renderFacultyAttendanceTable("master");
  }

  function hideDashboards() {
    if (loginViewBox) loginViewBox.style.display = "block";
    if (facultyDash) facultyDash.style.display = "none";
    if (studentDash) studentDash.style.display = "none";
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

      // Check registered account
      const account = state.registeredAccounts[email];
      if (account) {
        if (shouldSave) {
          localStorage.setItem("evolance_saved_user", JSON.stringify(account));
        }
        openStudentDashboard(account);
      } else {
        // Fallback for demo student
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

  // SIGN UP Form Submit with PRE-APPROVAL VERIFICATION
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim().toLowerCase();
      const programKey = document.getElementById("signup-program").value;
      const pass = document.getElementById("signup-password").value;
      const shouldSave = document.getElementById("signup-save-checkbox").checked;

      // STEP 1: Verify if email exists in Faculty Roster for target course
      const courseRoster = state.approvedRoster[programKey] || [];
      const approvedStudent = courseRoster.find(st => st.email.toLowerCase() === email);

      if (!approvedStudent) {
        const progTitle = programKey === "ignite" ? "Capstone Ignite" : (programKey === "juniors" ? "Capstone Juniors" : "Master IT Program");
        alert(`❌ Access Denied: Your email (${email}) has NOT been pre-approved by Evolance Faculty for ${progTitle}.\n\nPlease contact administration or wait for faculty to add your email to the course roster.`);
        return;
      }

      // STEP 2: Pre-approved! Register account & sign in
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

      alert(`✅ Verification Successful! Welcome to Evolance ${progNames[programKey]}.\nYour account is now active and saved.`);
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

  const facultyLogout = document.getElementById("faculty-logout");
  const studentLogout = document.getElementById("student-logout");

  if (facultyLogout) facultyLogout.addEventListener("click", hideDashboards);
  if (studentLogout) {
    studentLogout.addEventListener("click", () => {
      localStorage.removeItem("evolance_saved_user");
      hideDashboards();
    });
  }

  // Inner Faculty Tab Navigation
  const fTabBtns = document.querySelectorAll(".portal-tab-btn[data-f-tab]");
  const fTabContents = document.querySelectorAll(".f-tab-content");

  fTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-f-tab");
      fTabBtns.forEach(b => b.classList.remove("active"));
      fTabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const activeContent = document.getElementById(`f-tab-${target}`);
      if (activeContent) activeContent.classList.add("active");
    });
  });

  // Faculty Course Roster Sub-Tabs
  const rosterSubBtns = document.querySelectorAll(".roster-sub-btn");
  rosterSubBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      rosterSubBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentRosterCourse = btn.getAttribute("data-course-sub");
      renderFacultyRosterTable();
    });
  });

  // Faculty Add Student to Roster Form
  const addRosterForm = document.getElementById("add-student-roster-form");
  if (addRosterForm) {
    addRosterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("roster-email").value.trim().toLowerCase();
      const name = document.getElementById("roster-name").value.trim();
      const roll = document.getElementById("roster-roll").value.trim();
      const programKey = document.getElementById("roster-program-select").value;

      state.approvedRoster[programKey].push({ email, name, roll });
      renderFacultyRosterTable();
      populateFacultyStudentSelect();

      alert(`✓ Added ${name} (${email}) to pre-approved roster for ${programKey.toUpperCase()}!\nThey can now sign up using this email.`);
      addRosterForm.reset();
    });
  }

  // Inner Student Tab Navigation
  const sTabBtns = document.querySelectorAll(".portal-tab-btn[data-s-tab]");
  const sTabContents = document.querySelectorAll(".s-tab-content");

  sTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-s-tab");
      sTabBtns.forEach(b => b.classList.remove("active"));
      sTabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const activeContent = document.getElementById(`s-tab-${target}`);
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
  const studentTranscriptTable = document.getElementById("student-transcript-body");

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

      // Append to Faculty Log
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
