import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

// Get HTML elements
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const authForms = document.getElementById("authForms");
const userSection = document.getElementById("userSection");
const authMessage = document.getElementById("authMessage");
const userEmail = document.getElementById("userEmail");

const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

// Display messages to the user
function showMessage(message) {
    authMessage.textContent = message;
}

// Create a new account
registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    registerButton.disabled = true;
    loginButton.disabled = true;
    showMessage("Creating your account... Please wait.");

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        showMessage("Your account was created successfully!");

        registerForm.reset();

    } catch (error) {
        showMessage("Registration error: " + error.message);

    } finally {
        registerButton.disabled = false;
        loginButton.disabled = false;
    }
});

// Log into an existing account
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    loginButton.disabled = true;
    registerButton.disabled = true;
    showMessage("Logging in... Please wait.");

    try {
        await signInWithEmailAndPassword(auth, email, password);

        showMessage("Login successful!");

        loginForm.reset();

    } catch (error) {
        showMessage("Login error: " + error.message);

    } finally {
        loginButton.disabled = false;
        registerButton.disabled = false;
    }
});

// Log out of the account
logoutButton.addEventListener("click", async function() {
    logoutButton.disabled = true;
    showMessage("Logging out... Please wait.");

    try {
        await signOut(auth);

        showMessage("You have successfully logged out.");

    } catch (error) {
        showMessage("Logout error: " + error.message);

    } finally {
        logoutButton.disabled = false;
    }
});

// Check whether a user is logged in
onAuthStateChanged(auth, function(user) {

    if (user) {
        authForms.hidden = true;
        userSection.hidden = false;

        userEmail.textContent = "Logged in as: " + user.email;

    } else {
        authForms.hidden = false;
        userSection.hidden = true;
    }

});

