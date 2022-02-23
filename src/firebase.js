// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH-NLxdYDBH0aI5HD5iVSa7qAqE-XEKGk",
  authDomain: "shopping-list-d1a11.firebaseapp.com",
  databaseURL: "https://shopping-list-d1a11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shopping-list-d1a11",
  storageBucket: "shopping-list-d1a11.appspot.com",
  messagingSenderId: "681447268616",
  appId: "1:681447268616:web:bb2bb5eb0748df73770cbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;