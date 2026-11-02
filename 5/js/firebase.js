import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdIyrLVkJH-ZeyoXQQnmZYniT64uh_BYs",
    authDomain: "csci-3054-xavier-wallace.firebaseapp.com",
    projectId: "csci-3054-xavier-wallace",
    storageBucket: "csci-3054-xavier-wallace.firebasestorage.app",
    messagingSenderId: "350340003644",
    appId: "1:350340003644:web:b7c3caa5f5ce3777cd5039",
    measurementId: "G-MHWP06FQ34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

// Export Firebase services
export { app, auth, db };

