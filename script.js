import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAROSSAUXVxpryNIhlYYVRVXhSVWWrI3Ls",
    authDomain: "test-project-f9e1d.firebaseapp.com",
    projectId: "test-project-f9e1d",
    storageBucket: "test-project-f9e1d.appspot.com",
    messagingSenderId: "355473801444",
    appId: "1:355473801444:web:82fdc2eff84ff82aed6cf1",
    measurementId: "G-WT66SMWGMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form and error elements
const form = document.querySelector("#contactForm");
const errors = document.querySelectorAll(".error");

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    errors.forEach(error => error.textContent = "");

    const nameValue = form.name.value.trim();
    const emailValue = form.email.value.trim();
    const phoneValue = form.phone.value.trim();
    const messageValue = form.message.value.trim();

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phonePattern = /^09[0-9]{9}$/;
    const messagePattern = /^.{5,127}$/;

    let valid = true;

    if (!namePattern.test(nameValue)) {
        errors[0].textContent = "Enter a valid name.";
        valid = false;
    }
    if (!emailPattern.test(emailValue)) {
        errors[1].textContent = "Enter a valid email.";
        valid = false;
    }
    if (!phonePattern.test(phoneValue)) {
        errors[2].textContent = "Must be a Philippine phone number, starting with 09 and be 11 digits.";
        valid = false;
    }
    if (!messagePattern.test(messageValue)) {
        errors[3].textContent = "Message must be 5–127 characters.";
        valid = false;
    }

    if (!valid) {
        alert("Please fix the errors in the form.");
        return;
    }

    try {
        await addDoc(collection(db, "messages"), {
            name: nameValue,
            email: emailValue,
            phone: phoneValue,
            message: messageValue,
            created_at: new Date()
        });
        alert("Form submitted successfully!");
        form.reset();
    } catch (error) {
        console.error(error);
        alert("Error submitting form. Check console.");
    }
});
