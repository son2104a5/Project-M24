// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "ptit-son.firebaseapp.com",
  projectId: "ptit-son",
  storageBucket: "ptit-son.appspot.com",
  messagingSenderId: "178268927476",
  appId: "1:178268927476:web:b1a0b99caafa8a89fc75a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)