
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.setAttribute("aria-expanded", isOpen);
});

// Auth Modal Management
function showAuthModal(form) {
    document.getElementById("authModal").classList.remove("hidden");
    switchForm(form);
    document.body.style.overflow = "hidden";
}

function closeAuthModal() {
    document.getElementById("authModal").classList.add("hidden");
    document.body.style.overflow = "auto";
}

function switchForm(form) {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (form === "login") {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        document.getElementById("authTitle").textContent = "Welcome Back";
    } else {
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
        document.getElementById("authTitle").textContent = "Create Account";
    }
}

// Password Visibility Toggle
function togglePasswordVisibility(fieldId) {
    const field = document.getElementById(fieldId);
    const isPassword = field.type === "password";
    field.type = isPassword ? "text" : "password";
}

// Password Strength Checker
function checkPasswordStrength(password) {
    const strengthBar = document.getElementById("passwordStrengthBar");
    const strengthText = document.getElementById("passwordStrengthText");
    if (!password) {
        strengthBar.classList.add("hidden");
        strengthText.textContent = "";
        return;
    }
    strengthBar.classList.remove("hidden");
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    strengthBar.classList.remove(
        "strength-weak",
        "strength-fair",
        "strength-good",
        "strength-strong"
    );
    if (strength < 2) {
        strengthBar.classList.add("strength-weak");
        strengthText.textContent = "Weak password";
    } else if (strength < 3) {
        strengthBar.classList.add("strength-fair");
        strengthText.textContent = "Fair password";
    } else if (strength < 4) {
        strengthBar.classList.add("strength-good");
        strengthText.textContent = "Good password";
    } else {
        strengthBar.classList.add("strength-strong");
        strengthText.textContent = "Strong password";
    }
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById("signupEmailError");
    if (!emailRegex.test(email)) {
        errorElement.textContent = "Please enter a valid email address";
        errorElement.classList.remove("hidden");
    } else {
        errorElement.classList.add("hidden");
    }
}

// Form Handlers
async function handleLogin(e) {
    e.preventDefault();
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;
    try {
        const res = await axios.post('http://localhost:3000/api/login', { loginEmail, loginPassword }, { withCredentials: true });
        console.log(res)
        if (res.data.status === 200) {
            setTimeout(() => {
                // window.location.href = "dashboard/index.html";
            }, 1000);
            alert(res.data.message);
        } else {
            alert("Invalid credentials");
        }
    } catch (error) {
        console.log(error);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match";
        confirmPasswordError.classList.remove("hidden");
        return;
    }
    confirmPasswordError.classList.add("hidden");
    try {
        const res = await axios.post("http://localhost:3000/api/signup", { name, email, password });
        if (res.data.status == 200) {
        setTimeout(() => {
            showAuthModal('login');
        }, 1000);
        alert("Account created successfully");
    } else {
        console.log(res.data.message);
    }
    } catch (err) {
        console.log(err.response.data.message);
    }
}

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAuthModal();
    }
});

// Close modal on background click
document.getElementById("authModal").addEventListener("click", (e) => {
    if (e.target.id === "authModal") {
        closeAuthModal();
    }
});
