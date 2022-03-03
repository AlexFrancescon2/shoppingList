import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH-NLxdYDBH0aI5HD5iVSa7qAqE-XEKGk",
  authDomain: "shopping-list-d1a11.firebaseapp.com",
  databaseURL:
    "https://shopping-list-d1a11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shopping-list-d1a11",
  storageBucket: "shopping-list-d1a11.appspot.com",
  messagingSenderId: "681447268616",
  appId: "1:681447268616:web:bb2bb5eb0748df73770cbd",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
