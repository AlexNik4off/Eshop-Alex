import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-alex.firebaseapp.com",
  projectId: "eshop-alex",
  storageBucket: "eshop-alex.appspot.com",
  messagingSenderId: "570171472310",
  appId: "1:570171472310:web:f8a57b2775ace292a12917"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
