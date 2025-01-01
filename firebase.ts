// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeOJNLWaewn_0-yqJpjma2vpp8mcQ-vls",
  authDomain: "todo-fullstack-cdd30.firebaseapp.com",
  projectId: "todo-fullstack-cdd30",
  storageBucket: "todo-fullstack-cdd30.firebasestorage.app",
  messagingSenderId: "119569830170",
  appId: "1:119569830170:web:f8369f573733b897a75ca3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

