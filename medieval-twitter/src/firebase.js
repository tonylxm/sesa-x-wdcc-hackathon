import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU_5wHd29MGvEd7cF99PLhngtLks7MQH0",
  authDomain: "wdcc-hackathon.firebaseapp.com",
  projectId: "wdcc-hackathon",
  storageBucket: "wdcc-hackathon.appspot.com",
  messagingSenderId: "721883017727",
  appId: "1:721883017727:web:8c97025d242446a19377ca",
  measurementId: "G-SXKH1TZKXD"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };