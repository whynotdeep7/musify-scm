import { auth } from './firebase.js';  // Import Firebase auth instance
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // Get the login button element
    const loginButton = document.querySelector('.btn');

    // Attach click event listener to the login button
    loginButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Get values from input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate if email and password fields are filled
        if (email && password) {
            console.log('Email:', email);
            console.log('Password:', password);

            // Firebase login authentication
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Successfully logged in
                    const user = userCredential.user;
                    console.log('User logged in:', user);

                    // Optionally, redirect to a homepage or dashboard
                    window.location.href = 'index.html'; // Or any page you want to redirect
                })
                .catch((error) => {
                    // Handle errors during login
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Error during login:', errorCode, errorMessage);
                    alert(errorMessage); // Show error message to the user
                });
        } else {
            alert('Please fill in both email and password!');
        }
    });
});