import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlzjwGcTv5GIoZUS756zU4JXMyigJ-oIM",
  authDomain: "quasagram-529be.firebaseapp.com",
  databaseURL: "https://quasagram-529be-default-rtdb.firebaseio.com",
  projectId: "quasagram-529be",
  storageBucket: "quasagram-529be.appspot.com",
  messagingSenderId: "709639636539",
  appId: "1:709639636539:web:1c93c687bb701fc200fe1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };
