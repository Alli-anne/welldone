import { loadHeaderFooter } from "./main.js";

// const API_BASE = "https://welldone-api-fm06.onrender.com";

// -------- Login form --------
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!emailInput.value || !passwordInput.value) {
        alert("Please enter both email and password");
        return;
    }

    const loginData = { email: emailInput.value, password: passwordInput.value };
    const loginResponse = await createLogin(loginData);

    if (loginResponse && loginResponse._id) {
        alert(`Welcome back! ${loginResponse.username}`);
        window.location.href = "dashboard.html";
    } else {
        alert("Login failed. Check your email and password.");
    }
});

// -------- Registration form --------
const registerForm = document.getElementById("create-account-form");
const createEmailInput = document.getElementById("create-email-input");
const createPasswordInput = document.getElementById("create-password-input");

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
    if (response && response.insertedId) {
        alert("User created successfully!");
        // optionally clear the form
        registerForm.reset();
    } else {
        alert("Failed to create user. Try again.");
    }
});

// -------- API calls --------
export async function createLogin(loginData) {
    try {
        const res = await fetch(`${API_BASE}/auth/login
`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (err) {
        console.error("Error sending login:", err);
        return null;
    }
}

export async function createUser(userData) {
    try {
        const res = await fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (err) {
        console.error("Error creating user:", err);
        return null;
    }
}

loadHeaderFooter();

