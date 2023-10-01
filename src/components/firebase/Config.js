// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
//we are using Version 9 of the Firebase JS SDK, which is modular and tree-shakeable.
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { storage } from "firebase-admin";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//https://firebase.google.com/docs/web/setup

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//https://github.com/firebase/quickstart-js/blob/master/firestore/README.md   EXAMPLE LESSON!!!!

//Cloud Firestore
const app = firebase.initializeApp({
  apiKey: "AIzaSyCc4VDdcILKqoihOUTc_lTfdmRFymbEAUc",
  authDomain: "vms2-9515b.firebaseapp.com",
  projectId: "vms2-9515b",
  storageBucket: "vms2-9515b.appspot.com",
  messagingSenderId: "930164019977",
  appId: "1:930164019977:web:25c6187f4908005861b9d8",
  measurementId: "G-PB48QZQJXJ"
});

// Initialize Firebase
//export const auth = app.auth()


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


//USERid 4wRIS6ProAeWv0dkKw9ILJnqjRH2




//export default app

// import * as firebase from "firebase";

// const firebaseConfig = firebase.initializeApp({
//   apiKey: "AIzaSyCkXSfbk3a6LpdTUwvQrainQQ9PMAeWEO4",
//   authDomain: "digitalvisitorregister.firebaseapp.com",
//   databaseURL: "https://digitalvisitorregister.firebaseio.com",
//   projectId: "digitalvisitorregister",
//   storageBucket: "digitalvisitorregister.appspot.com",
//   messagingSenderId: "955851912111"
// });
// firebase.initializeApp(firebaseConfig);


