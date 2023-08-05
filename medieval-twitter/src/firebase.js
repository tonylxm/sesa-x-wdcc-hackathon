import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBwWrXwVw6MmNqaQlzXnmwb3MKcnsx0G2o",
    authDomain: "react-test-a89bd.firebaseapp.com",
    projectId: "react-test-a89bd",
    storageBucket: "react-test-a89bd.appspot.com",
    messagingSenderId: "364063557695",
    appId: "1:364063557695:web:e4e26bb17122d881e4508a",
    measurementId: "G-LHPGV2205V"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();

export { db, auth };