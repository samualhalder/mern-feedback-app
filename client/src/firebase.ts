// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-feedback-app.firebaseapp.com",
  projectId: "mern-feedback-app",
  storageBucket: "mern-feedback-app.appspot.com",
  messagingSenderId: "418391069798",
  appId: "1:418391069798:web:6505cd8fb5ba05c0fb09a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);