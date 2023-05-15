// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr37y-i3oq2CZUtv-wZATTdERKsrAQY38",
  authDomain: "drankspel-website.firebaseapp.com",
  projectId: "drankspel-website",
  storageBucket: "drankspel-website.appspot.com",
  messagingSenderId: "84238312124",
  appId: "1:84238312124:web:42b5ac4cfca85c18b726b9",
  measurementId: "G-B9W0J2Z0EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export {db, analytics, provider}