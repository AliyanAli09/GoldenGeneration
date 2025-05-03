import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpfV8qtMDI_ciWkLuvuL0Ay_Kl9SOEmeg",
  authDomain: "goldengeneration-600b6.firebaseapp.com",
  projectId: "goldengeneration-600b6",
  storageBucket: "goldengeneration-600b6.firebasestorage.app",
  messagingSenderId: "706430689886",
  appId: "1:706430689886:web:9fe9806e6f1fb69e728acf",
  measurementId: "G-K1RZXF0ZF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }; 