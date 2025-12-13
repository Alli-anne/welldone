import { loadHeaderFooter } from "./main.js";

const API_BASE = "https://welldone-api-fm06.onrender.com";

// -------------------------------
// API REQUESTS
// -------------------------------

// POST /auth/login
export async function checkLogin(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      console.error("Login failed with status:", response.status);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("Error checking login:", err);
    return null;
  }
}

// POST /users
export async function createUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      console.error("Create user failed:", response.status);
      return null;
    }

    return await response.json();
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

      // Adjust based on your API’s actual return format
      if (loginResponse && (loginResponse.user || loginResponse._id)) {
        const username = loginResponse.username || loginResponse.user?.username || "User";
        alert(`Welcome back, ${emailInput}!`);
        window.location.href = "dashboard.html";
      } else {
        alert("Login failed. Check your email and password.");
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

      const userData = {
        email: createEmailInput.value,
        password: createPasswordInput.value
      };

      const response = await createUser(userData);

      // Match whatever ID field your backend returns
      if (response && (response.id || response._id || response.insertedId)) {
        alert("User created successfully!");
        registerForm.reset();
      } else {
        alert("Failed to create user. Try again.");
      }
    });
  }

  // Load header + footer
  loadHeaderFooter();
});

