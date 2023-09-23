// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { Firestore, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBB3-oIhRJGYZz1fLfyh0qWBiGfLlvGYCk',
  authDomain: 'kevinagyeman-db.firebaseapp.com',
  projectId: 'kevinagyeman-db',
  storageBucket: 'kevinagyeman-db.appspot.com',
  messagingSenderId: '1860106427',
  appId: '1:1860106427:web:4e3c261454bae0651d919e',
  measurementId: 'G-THFVBS56D2',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db: Firestore = getFirestore(app);
