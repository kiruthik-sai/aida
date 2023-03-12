// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDef0K75xai1_A_saJKc4jE5AYyXJepNdE",
  authDomain: "testapi-15563.firebaseapp.com",
  databaseURL: "https://testapi-15563-default-rtdb.firebaseio.com",
  projectId: "testapi-15563",
  storageBucket: "testapi-15563.appspot.com",
  messagingSenderId: "575697743346",
  appId: "1:575697743346:web:69367950672d80bc55cf6b",
  measurementId: "G-K0KFDBSDQ8"
};

// Initialize Firebase
let app
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
}else{
  app=firebase.app()
}



const analytics = getAnalytics(app);
let auth = firebase.auth();
let database = firebase.database();
let fireBaseAuth = getAuth(app);

export { auth, database,fireBaseAuth };