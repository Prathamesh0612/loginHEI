// Global State
let currentRole = null;
let currentPage = 'role-selection'; // 'login', 'registration', 'registration-complete'
let registrationStep = 1;
let demoMode = false;
const maxSteps = { student: 4, teacher: 4, admin: 5 };

// Demo Credentials
const demoCredentials = {
  student: { email: "demo.student@college.edu", password: "password123", name: "John Doe" },
  teacher: { email: "demo.teacher@college.edu", password: "password123", name: "Dr. Sarah Wilson" },
  admin: { email: "demo.admin@college.edu", password: "password123", name: "Admin User" }
};

// Cached DOM
const roleSection = document.getElementById("role-selection");
const loginSection = document.getElementById("login-section");
const regSection = document.getElementById("registration-section");
const regCompleteSection = document.getElementById("registration-complete");
const demoBanner = document.getElementById("demo-banner");
const demoToggleBtn = document.getElementById("demo-toggle");

// Input fields
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginRoleLabel = document.getElementById("login-role-label");
const regRoleLabel = document.getElementById("registration-role-label");
const regWizard = document.getElementById("registration-wizard");
const prevBtn = document.getElementById("prev-step");
const nextBtn = document.getElementById("next-step");
const completeBtn = document.getElementById("complete-registration");
const genUsername = document.getElementById("gen-username");
const genPassword = document.getElementById("gen-password");
const continueDashboardBtn = document.getElementById("continue-dashboard");

// Initialization
function init() {
  // Show role selection initially
  showSection('role-selection');
  attachEventListeners();
  updateDemoUI();
}

function attachEventListeners() {
  // Role card clicks
  document.querySelectorAll(".role-card").forEach(card => {
    card.addEventListener("click", () => {
      currentRole = card.dataset.role;
      loginRoleLabel.textContent = capitalize(currentRole);
      regRoleLabel.textContent = capitalize(currentRole);
      showSection('login-section');
      clearLoginForm();
    });
  });

  // Login Form
  document.getElementById("login-form").onsubmit = e => {
    e.preventDefault();
    handleLogin();
  };

  // Navigation buttons
  document.getElementById("start-registration").onclick = () => {
    startRegistration();
  };
  document.getElementById("back-role-selection").onclick = () => {
    showSection('role-selection');
  };
  document.getElementById("back-to-login").onclick = () => {
    showSection('login-section');
  };
  prevBtn.onclick = () => {
    if (registrationStep > 1) {
      registrationStep--;
      renderRegistrationStep();
    }
  };
  nextBtn.onclick = () => {
    if (registrationStep < maxSteps[currentRole]) {
      registrationStep++;
      renderRegistrationStep();
    }
  };
  completeBtn.onclick = () => completeRegistration();

  // Demo toggle
  demoToggleBtn.onclick = () => {
    demoMode = !demoMode;
    updateDemoUI();
  };

  // Continue Dashboard (dummy)
  continueDashboardBtn.onclick = () => {
    alert("Logged in! Dashboard feature coming soon.");
  };
}

function updateDemoUI() {
  demoBanner.classList.toggle("hidden", !demoMode);
  demoToggleBtn.textContent = demoMode ? "Disable Demo Mode" : "Enable Demo Mode";
}

function showSection(section) {
  ['role-selection', 'login-section', 'registration-section', 'registration-complete'].forEach(sec => {
    document.getElementById(sec).classList.toggle('hidden', sec !== section);
  });
  currentPage = section;
}

function clearLoginForm() {
  loginEmailInput.value = "";
  loginPasswordInput.value = "";
}

function handleLogin() {
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();

  if (demoMode) {
    const demo = demoCredentials[currentRole];
    if (email.toLowerCase() === demo.email && password === demo.password) {
      alert(`Welcome ${demo.name}! (Demo Login)`);
    } else {
      alert("Invalid demo credentials for selected role.");
      return;
    }
  } else {
    alert("Normal login flow to be implemented.");
  }
  // Proceed to dashboard (placeholder)
  alert("Login successful. Dashboard coming soon!");
}

function startRegistration() {
  registrationStep = 1;
  renderRegistrationStep();
  showSection('registration-section');
}

function renderRegistrationStep() {
  regWizard.innerHTML = ""; // Clear
  // Depending on currentRole and registrationStep, render step form
  let html = "";
  if (currentRole === 'student') {
    if (registrationStep === 1) html = studentStep1();
    else if (registrationStep === 2) html = studentStep2();
    else if (registrationStep === 3) html = studentStep3();
    else if (registrationStep === 4) html = studentStep4();
  } else if (currentRole === 'teacher') {
    if (registrationStep === 1) html = teacherStep1();
    else if (registrationStep === 2) html = teacherStep2();
    else if (registrationStep === 3) html = teacherStep3();
    else if (registrationStep === 4) html = teacherStep4();
  } else if (currentRole === 'admin') {
    if (registrationStep === 1) html = adminStep1();
    else if (registrationStep === 2) html = adminStep2();
    else if (registrationStep === 3) html = adminStep3();
    else if (registrationStep === 4) html = adminStep4();
    else if (registrationStep === 5) html = adminStep5();
  }
  regWizard.innerHTML = html;
  prevBtn.disabled = registrationStep === 1;
  nextBtn.style.display = registrationStep === maxSteps[currentRole] ? 'none' : 'inline-block';
  completeBtn.style.display = registrationStep === maxSteps[currentRole] ? 'inline-block' : 'none';
}

// Example Student Steps (Simplified for demonstration)
function studentStep1() {
  return `
    <h3>Basic Details</h3>
    <label>Full Name: <input type="text" id="student-name" required></label><br/>
    <label>Email: <input type="email" id="student-email" required></label><br/>
    <label>Phone: <input type="tel" id="student-phone"></label><br/>
    <label>Date of Birth: <input type="date" id="student-dob"></label><br/>
    <label>Address: <input type="text" id="student-address"></label><br/>
    <label>Emergency Contact: <input type="tel" id="student-emergency"></label><br/>
    <label>Department: <select id="student-dept" required>
      <option value="CS">Computer Science</option>
      <option value="ECE">Electronics & Communication</option>
      <option value="ME">Mechanical Engineering</option>
      <option value="CE">Civil Engineering</option>
    </select></label><br/>
    <label>Semester: <input type="number" id="student-semester" min="1" max="8" required></label><br/>
    <label>Student ID: <input type="text" id="student-id" required></label><br/>
    <label>Previous Education: <input type="text" id="student-previous-edu"></label><br/>
  `;
}

function studentStep2() {
  return `
    <h3>Upload Certificates & Qualifications</h3>
    <p>Drag and drop files or click below to upload</p>
    <input type="file" id="student-certificates" multiple />
    <small>Categories: Academic transcripts, professional certificates, online courses, awards</small>
  `;
}

function studentStep3() {
  return `
    <h3>Proof of Enrollment</h3>
    <p>Upload your admission letter, fee receipt, ID card photo, enrollment confirmation</p>
    <input type="file" id="student-enrollment-proofs" multiple />
    <p>Verification status: <em>Pending</em></p>
    <progress max="100" value="20"></progress>
  `;
}

function studentStep4() {
  return `
    <h3>Account Created!</h3>
    <p>Generated Credentials will be shown here.</p>
    <p>CIBIL Score initialized at 500 points.</p>
  `;
}

// Simplified placeholders for teacher and admin steps

function teacherStep1() {
  return `<h3>Teacher Step 1 - Unique Identifier Verification</h3><input type="text" placeholder="Employee ID or Govt Key" />`;
}

function teacherStep2() {
  return `<h3>Teacher Step 2 - Basic Details & Qualifications</h3><input type="text" placeholder="Name" />`;
}

function teacherStep3() {
  return `<h3>Teacher Step 3 - Proof of Employment</h3><input type="file" multiple />`;
}

function teacherStep4() {
  return `<h3>Teacher Step 4 - Course & Department Assignment</h3><p>Select courses and assign roles soon.</p>`;
}

function adminStep1() {
  return `<h3>Admin Step 1 - Institution Identifier</h3><input type="text" placeholder="College Registration Code" />`;
}

function adminStep2() {
  return `<h3>Admin Step 2 - Email OTP Verification</h3><p>Send OTP and verify.</p>`;
}

function adminStep3() {
  return `<h3>Admin Step 3 - Institution Details & Accreditation</h3><input type="text" placeholder="Institution Name" />`;
}

function adminStep4() {
  return `<h3>Admin Step 4 - System Configuration & Rights</h3><p>Configure verification policies.</p>`;
}

function adminStep5() {
  return `<h3>Admin Step 5 - Faculty & Department Setup</h3><p>Setup departments and invite faculty.</p>`;
}

function completeRegistration() {
  genUsername.textContent = `${currentRole}.${Date.now()}@college.edu`;
  genPassword.textContent = `TempPass${Math.floor(Math.random() * 10000)}`;
  showSection('registration-complete');
}

// Utilities
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start
init();
