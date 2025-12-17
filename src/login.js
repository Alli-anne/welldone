import { loadHeaderFooter } from "./main.js";

const API_BASE = "https://welldone-api-fm06.onrender.com";

// -------------------------------
// API REQUESTS
// -------------------------------

// POST /auth/login
export async function checkLogin(email, password) {
  try {
    console.log("Attempting login with:", email); // Debug log
    
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    console.log("Login response status:", response.status); // Debug log

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Login failed:", errorData);
      return null;
    }

    const data = await response.json();
    console.log("Login response data:", data); // Debug log
    return data;
    
  } catch (err) {
    console.error("Error checking login:", err);
    return null;
  }
}

// POST /users
export async function createUser(userData) {
  try {
    console.log("Creating user with:", userData.email); // Debug log
    
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    console.log("Create user response status:", response.status); // Debug log

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Create user failed:", errorData);
      return null;
    }

    const data = await response.json();
    console.log("Create user response data:", data); // Debug log
    return data;
    
  } catch (err) {
    console.error("Error creating user:", err);
    return null;
  }
}

// -------------------------------
// DOM INITIALIZATION
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // LOGIN FORM
  // -------------------------------
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  if (loginForm && emailInput && passwordInput) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!emailInput.value || !passwordInput.value) {
        alert("Please enter both email and password");
        return;
      }

      const loginResponse = await checkLogin(emailInput.value, passwordInput.value);
     
      console.log("Full login response:", loginResponse); // Debug - see what you actually get back
            


      if (loginResponse) {
        // Store user info in localStorage for later use
        localStorage.setItem("user", JSON.stringify(loginResponse));
        
        // Get display name (adjust based on what your API actually returns)
        const displayName = loginResponse.email || loginResponse.username || "User";
        
        alert(`Welcome back, ${emailInput.value}!`);
        login = localStorage.setItem("_id", JSON.stringify(result._id));
        console.log(login);
        // Redirect to main page (change if you want different page)
        window.location.href = "index.html";
      } else {
        alert("Login failed. Please check your email and password.");
      }
    });
  }

  // -------------------------------
  // REGISTRATION FORM
  // -------------------------------
  const registerForm = document.getElementById("create-account-form");
  const createEmailInput = document.getElementById("create-email-input");
  const createPasswordInput = document.getElementById("create-password-input");

  if (registerForm && createEmailInput && createPasswordInput) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!createEmailInput.value || !createPasswordInput.value) {
        alert("Please enter both email and password");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(createEmailInput.value)) {
        alert("Please enter a valid email address");
        return;
      }

      // Basic password validation
      if (createPasswordInput.value.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      const userData = {
        email: createEmailInput.value,
        password: createPasswordInput.value
      };

      const response = await createUser(userData);

      console.log("Create user full response:", response); // Debug

      // Check if account was created successfully
      if (response && (response.id || response._id || response.insertedId || response.user_id || response.email)) {
        alert("Account created successfully! You can now log in.");
        registerForm.reset();
        
        // Optionally switch focus to login form
        if (emailInput) {
          emailInput.value = createEmailInput.value;
          emailInput.focus();
        }
      } else {
        alert("Failed to create account. Email may already be in use.");
      }
    });
  }

  // Load header + footer
  loadHeaderFooter();
});


