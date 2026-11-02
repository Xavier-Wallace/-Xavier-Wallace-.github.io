import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// Get HTML elements
const organizationContainer =
    document.getElementById("organizationContainer");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");

const retryButton =
    document.getElementById("retryButton");

// Retrieve organizations from Firebase
async function loadOrganizations() {

    loadingMessage.hidden = false;
    loadingMessage.textContent = "Loading organizations from Firebase...";

    errorMessage.hidden = true;
    retryButton.hidden = true;

    organizationContainer.replaceChildren();

    try {

        // Get all documents from the divineNine collection
        const querySnapshot = await getDocs(
            collection(db, "divineNine")
        );

        // Check whether any organizations were found
        if (querySnapshot.empty) {
            loadingMessage.textContent =
                "No organizations were found in the database.";
            return;
        }

        // Convert Firebase documents into an array
        const organizations = [];

        querySnapshot.forEach(function(document) {
            organizations.push(document.data());
        });

        // Sort organizations alphabetically
        organizations.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        // Display each organization
        organizations.forEach(function(org) {

            const card = document.createElement("article");
            card.className = "organization-card";

            const name = document.createElement("h3");
            name.textContent = org.name || "Organization";

            const founded = document.createElement("p");
            founded.textContent = "Founded: " + (org.founded || "Not available");

            const nickname = document.createElement("p");
            nickname.textContent = "Nickname: " + (org.nickname || "Not available");

            const category = document.createElement("p");
            category.textContent = "Category: " + (org.category || "Not available");

            const description = document.createElement("p");
            description.textContent =
                org.description || "No description available.";

            card.appendChild(name);
            card.appendChild(founded);
            card.appendChild(nickname);
            card.appendChild(category);
            card.appendChild(description);

            organizationContainer.appendChild(card);
        });

        loadingMessage.hidden = true;

    } catch (error) {

        loadingMessage.hidden = true;

        errorMessage.textContent =
            "Unable to load organizations: " + error.message;

        errorMessage.hidden = false;
        retryButton.hidden = false;

    }
}

// Allow users to retry if loading fails
retryButton.addEventListener("click", loadOrganizations);

// Load organizations when the page opens
loadOrganizations();

