// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhaP-xNS0twbBJyHaBNrgfQWSkAUwUvQI",
    authDomain: "webdev-portfolio-ac888.firebaseapp.com",
    projectId: "webdev-portfolio-ac888",
    storageBucket: "webdev-portfolio-ac888.appspot.com",
    messagingSenderId: "710347896295",
    appId: "1:710347896295:web:403c111bb384e1de3c3942",
    measurementId: "G-5F0RCH5LYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);