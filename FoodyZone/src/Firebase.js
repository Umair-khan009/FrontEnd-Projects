// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvT9zYMa7Zu2y7AV_UMirZHKLHv5rRTgw",
  authDomain: "foodzone-auth.firebaseapp.com",
  projectId: "foodzone-auth",
  storageBucket: "foodzone-auth.firebasestorage.app",
  messagingSenderId: "251645545997",
  appId: "1:251645545997:web:1599dc91dc26ea22cc0f44"
};

// Initialize Firebase
export const app=initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const db = getFirestore(app);