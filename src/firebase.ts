import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB3-oIhRJGYZz1fLfyh0qWBiGfLlvGYCk",
  authDomain: "kevinagyeman-db.firebaseapp.com",
  projectId: "kevinagyeman-db",
  storageBucket: "kevinagyeman-db.appspot.com",
  messagingSenderId: "1860106427",
  appId: "1:1860106427:web:4e3c261454bae0651d919e",
  measurementId: "G-THFVBS56D2",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db: Firestore = getFirestore(app);
export const auth = getAuth(app);
