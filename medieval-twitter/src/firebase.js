import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMNJ9N5LdtDNSasPybkV5UR5iQmxjFFvI",
  authDomain: "sesaxwdcc-hackathon.firebaseapp.com",
  projectId: "sesaxwdcc-hackathon",
  storageBucket: "sesaxwdcc-hackathon.appspot.com",
  messagingSenderId: "387315050100",
  appId: "1:387315050100:web:1a8d9d77356ed3905c9321",
  measurementId: "G-MB889WR4DE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };