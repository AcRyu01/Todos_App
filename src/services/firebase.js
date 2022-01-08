import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR2ofVTKQL53gs5-Jv_-NhLsSppfsoRtw",
  authDomain: "todo-app-d9f5e.firebaseapp.com",
  projectId: "todo-app-d9f5e",
  storageBucket: "todo-app-d9f5e.appspot.com",
  messagingSenderId: "344741844674",
  appId: "1:344741844674:web:1fe471df191496a0034d5b",
  measurementId: "G-X2YSY81WD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
