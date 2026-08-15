/* ==========================================================================
   EVOLANCE INSTITUTE OF IT — SCRIPT
   Features: Single-Page Navigation / Tab Switcher, Preloader Reveal,
   Stats Counter Animations, Faculty & Student Portal Dashboards
   ========================================================================== */

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

// Interactive Portal Dashboards (Faculty & Student)
function initPortalDashboards() {
  const loginViewBox = document.getElementById("login-view-box");
  const facultyDash = document.getElementById("faculty-dashboard");
  const studentDash = document.getElementById("student-dashboard");

  const loginForm = document.getElementById("login-form");
  const rolePills = document.querySelectorAll(".role-selector .role-pill");
  
  const btnDemoStudent = document.getElementById("btn-demo-student");
  const btnDemoFaculty = document.getElementById("btn-demo-faculty");
  
  const facultyLogout = document.getElementById("faculty-logout");
  const studentLogout = document.getElementById("student-logout");

  let currentRole = "student";

  // Role selector pills
  rolePills.forEach(pill => {
    pill.addEventListener("click", () => {
      rolePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentRole = pill.getAttribute("data-role");
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

  function showDashboard(role) {
    if (!loginViewBox || !facultyDash || !studentDash) return;
    loginViewBox.style.display = "none";
    if (role === "faculty") {
      facultyDash.style.display = "block";
      studentDash.style.display = "none";
    } else {
      studentDash.style.display = "block";
      facultyDash.style.display = "none";
    }
  }

  function hideDashboards() {
    if (!loginViewBox || !facultyDash || !studentDash) return;
    loginViewBox.style.display = "block";
    facultyDash.style.display = "none";
    studentDash.style.display = "none";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showDashboard(currentRole);
    });
  }

  if (btnDemoStudent) {
    btnDemoStudent.addEventListener("click", () => showDashboard("student"));
  }

  if (btnDemoFaculty) {
    btnDemoFaculty.addEventListener("click", () => showDashboard("faculty"));
  }

  if (facultyLogout) facultyLogout.addEventListener("click", hideDashboards);
  if (studentLogout) studentLogout.addEventListener("click", hideDashboards);

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

  // Faculty Attendance Present/Absent Toggles
  const attToggleBtns = document.querySelectorAll(".att-toggle-btn");
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
      const studentText = studentSelect.options[studentSelect.selectedIndex].text.split("—")[1].trim();
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

      // Append to Student Transcript
      if (studentTranscriptTable && studentText.includes("Ayesha Khan")) {
        const studentRow = document.createElement("tr");
        studentRow.innerHTML = `
          <td><strong>${title}</strong></td>
          <td>Practical Assessment</td>
          <td>${score} / ${total}</td>
          <td>${pct}%</td>
          <td>${gradeBadge}</td>
        `;
        studentTranscriptTable.prepend(studentRow);
      }

      alert(`Grade recorded successfully for ${studentText}: ${score}/${total} (${pct}%)`);
      gradeForm.reset();
    });
  }

  // Student Assignment Submit
  const assignForm = document.getElementById("assignment-submit-form");
  if (assignForm) {
    assignForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Assignment submitted successfully to faculty portal!");
      assignForm.reset();
    });
  }
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
