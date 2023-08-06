import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLH4CP6GeDjiHKva_XEC35yyAmE2YGBf8",
  authDomain: "back-up-server-626bd.firebaseapp.com",
  projectId: "back-up-server-626bd",
  storageBucket: "back-up-server-626bd.appspot.com",
  messagingSenderId: "84589976542",
  appId: "1:84589976542:web:08dacd3b8ef91c39659b4f",
  measurementId: "G-M2ZVG16V93"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };