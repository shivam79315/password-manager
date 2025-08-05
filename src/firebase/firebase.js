// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfnyki31ZenkQ34vRvCjUuNamwGqrlNL0",
  authDomain: "password-manager-d173f.firebaseapp.com",
  projectId: "password-manager-d173f",
  storageBucket: "password-manager-d173f.appspot.com",
  messagingSenderId: "72458726065",
  appId: "1:72458726065:web:0d4979a513baf5cb041090",
  measurementId: "G-24E864BJR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };
