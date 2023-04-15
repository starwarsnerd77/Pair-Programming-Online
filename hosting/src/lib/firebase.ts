// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuPjEO3_9gwMgCIHWKmzedMA9B4Ygpj94",
  authDomain: "pair-programming-online.firebaseapp.com",
  projectId: "pair-programming-online",
  storageBucket: "pair-programming-online.appspot.com",
  messagingSenderId: "691021243768",
  appId: "1:691021243768:web:dec62d48f230d6c200548d",
  measurementId: "G-QXYES6B1X2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);