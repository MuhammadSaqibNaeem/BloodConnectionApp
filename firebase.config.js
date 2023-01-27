/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQYjKgq32uqCxup1_jpu4Zvv9VjmeUnPs",
  authDomain: "bloodconnectionapp.firebaseapp.com",
  projectId: "bloodconnectionapp",
  storageBucket: "bloodconnectionapp.appspot.com",
  messagingSenderId: "977675689260",
  appId: "1:977675689260:web:6dafe6f95d2beee2cf2089",
  measurementId: "G-PDP1MY5EEQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install -g firebase-tools
//npm install firebase
