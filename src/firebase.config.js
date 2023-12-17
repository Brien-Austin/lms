// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu_-CeRAVa2NeAF8IyTR2Jv11NvREjGTQ",
  authDomain: "blog-5ca8c.firebaseapp.com",
  projectId: "blog-5ca8c",
  storageBucket: "blog-5ca8c.appspot.com",
  messagingSenderId: "940470277606",
  appId: "1:940470277606:web:de7695419c9a754ecb3227",
  measurementId: "G-YZN573DHN2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
