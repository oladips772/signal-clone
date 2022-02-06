/** @format */

// initialize app from firebase/app
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYi5a6jARMFgizy3BMUTT1Uv8PRNedowM",
  authDomain: "signal-clone-c3521.firebaseapp.com",
  projectId: "signal-clone-c3521",
  storageBucket: "signal-clone-c3521.appspot.com",
  messagingSenderId: "356439941999",
  appId: "1:356439941999:web:0006ebce28cf9f6ebfbe9a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };
