/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// npm install -g firebase-tools
//npm install firebase
