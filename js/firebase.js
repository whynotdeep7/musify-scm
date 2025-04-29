// firebase.js (Firebase Initialization)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';

// Firebase config (Replace these with your actual Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDM5UHCtcdur3_rFK5LvsBxAEmdYsXaOGE",
    authDomain: "musifyuni.firebaseapp.com",
    projectId: "musifyuni",
    storageBucket: "musifyuni.firebasestorage.app",
    messagingSenderId: "484708437167",
    appId: "1:484708437167:web:3cb5978d7203509e28185a",
    measurementId: "G-X07NCCPQER"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, sendPasswordResetEmail }; // Export the necessary functions for use in other scripts
