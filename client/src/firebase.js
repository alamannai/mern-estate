// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-54740.firebaseapp.com",
  projectId: "mern-state-54740",
  storageBucket: "mern-state-54740.appspot.com",
  messagingSenderId: "90525213212",
  appId: "1:90525213212:web:0d9733409eefea80fa35d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);