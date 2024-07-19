// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9UtSIA3ou9RfUNjxOJAoBNr1Ku4Bc10A",
  authDomain: "snugstaff-3d9e5.firebaseapp.com",
  projectId: "snugstaff-3d9e5",
  storageBucket: "snugstaff-3d9e5.appspot.com",
  messagingSenderId: "654803849072",
  appId: "1:654803849072:web:04a164fc77b05312ae49b5",
  measurementId: "G-G9R7ZGDXYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);