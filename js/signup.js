import { auth } from './firebase.js';  // Import the Firebase auth instance
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";  // Import the required functions

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Get the signup button element
    const signupButton = document.querySelector('.btn');

    // Add click event listener to the signup button
    signupButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission

        // Get the form input elements by their IDs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        // Log inputs to check if they exist
        console.log('nameInput:', nameInput);
        console.log('emailInput:', emailInput);
        console.log('passwordInput:', passwordInput);

        // Check if the inputs exist
        if (!nameInput || !emailInput || !passwordInput) {
            console.error("One or more input elements are missing.");
            return;
        }

        // Get the values from the input fields
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validate if fields are not empty
        if (name && email && password) {
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Password:', password);

            // Proceed with Firebase Authentication (signup)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Successfully signed up
                    const user = userCredential.user;
                    console.log('User signed up:', user);

                    // Optionally, update the user's display name
                    updateProfile(user, {
                        displayName: name
                    }).then(() => {
                        // Redirect to login page after successful signup
                        window.location.href = 'login.html'; // Or any page you prefer
                    }).catch((error) => {
                        console.error("Error updating display name:", error);
                    });
                })
                .catch((error) => {
                    // Handle errors during signup
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Error during signup:', errorCode, errorMessage);
                    alert(errorMessage); // Show error message to the user
                });
        } else {
            alert('Please fill in all the fields!');
        }
    });
});
