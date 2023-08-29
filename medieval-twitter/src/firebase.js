import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_GqifS9WcILupC5xNqIyNnyCnkQ1Laqg",
  authDomain: "back-up-back-up-6b024.firebaseapp.com",
  projectId: "back-up-back-up-6b024",
  storageBucket: "back-up-back-up-6b024.appspot.com",
  messagingSenderId: "16045824952",
  appId: "1:16045824952:web:e02f3d5e682d528e0c8d4d",
  measurementId: "G-0CVS6FHV7T"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };