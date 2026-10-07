import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEVvZk74t6Pf5RgA0ub2z3CLZu19pKl3E",
  authDomain: "tracedoc-18b50.firebaseapp.com",
  projectId: "tracedoc-18b50",
  storageBucket: "tracedoc-18b50.firebasestorage.app",
  messagingSenderId: "167473122142",
  appId: "1:167473122142:web:588bc76fd8be0f2e95ddcf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);