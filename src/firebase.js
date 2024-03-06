import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbDn1GIqI6qOzd000BHhb94ah4E-odJUs",
  authDomain: "crud-firebase-72053.firebaseapp.com",
  projectId: "crud-firebase-72053",
  storageBucket: "crud-firebase-72053.appspot.com",
  messagingSenderId: "984363913746",
  appId: "1:984363913746:web:61f9ba723065b9ef00becb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);
export default app;
