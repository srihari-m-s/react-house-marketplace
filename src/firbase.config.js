// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmw4mtVS5JB7y6cqYRQx0FcUSHxJ5AJ5Y",
  authDomain: "react-house-marketplace-eedb1.firebaseapp.com",
  projectId: "react-house-marketplace-eedb1",
  storageBucket: "react-house-marketplace-eedb1.appspot.com",
  messagingSenderId: "417075486078",
  appId: "1:417075486078:web:4d91a7105e2aee0e15e72f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
