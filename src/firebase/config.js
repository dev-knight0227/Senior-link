// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdsO8XoPTby35S1T3swVUV6sjUzVMSlf4",
  authDomain: "senior-link.firebaseapp.com",
  projectId: "senior-link",
  storageBucket: "senior-link.firebasestorage.app",
  messagingSenderId: "815358619308",
  appId: "1:815358619308:web:67b19c9b9cf456af3d7909",
  measurementId: "G-W2799HJJPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
export default app;   