import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// Get HTML elements
const contactForm = document.getElementById("contactForm");
const loginRequired = document.getElementById("loginRequired");
const contactEmail = document.getElementById("contactEmail");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");

// Check whether a user is logged in
onAuthStateChanged(auth, function(user) {

    if (user) {
        loginRequired.hidden = true;
        contactForm.hidden = false;

        contactEmail.value = user.email || "";

    } else {
        loginRequired.hidden = false;
        contactForm.hidden = true;
    }

});

// Submit contact information to Firebase
contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const user = auth.currentUser;

    if (!user) {
        formStatus.textContent =
            "You must be logged in to submit a message.";
        return;
    }

    // Collect information from the form
    const name = document.getElementById("contactName").value.trim();
    const email = contactEmail.value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Check that all fields contain information
    if (!name || !email || !subject || !message) {
        formStatus.textContent =
            "Please complete all fields before submitting.";
        return;
    }

    // Prevent duplicate submissions while uploading
    submitButton.disabled = true;
    formStatus.textContent = "Sending your message... Please wait.";

    try {

        // Upload information to the contacts collection
        await addDoc(collection(db, "contacts"), {
            userId: user.uid,
            name: name,
            email: email,
            subject: subject,
            message: message,
            createdAt: serverTimestamp()
        });

        // Confirm successful upload
        formStatus.textContent =
            "Success! Your message was received and saved to Firebase.";

        // Clear the form after successful submission
        contactForm.reset();

        // Restore the user's email
        contactEmail.value = user.email || "";

    } catch (error) {

        // Display Firebase errors
        formStatus.textContent =
            "Unable to submit your message: " + error.message;

    } finally {

        // Allow the user to submit again
        submitButton.disabled = false;

    }

});

