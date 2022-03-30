// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW_-35wHd6cNG8jFVQKmZuhDU5qkxGeoY",
  authDomain: "govamos-47302.firebaseapp.com",
  projectId: "govamos-47302",
  storageBucket: "govamos-47302.appspot.com",
  messagingSenderId: "478458555708",
  appId: "1:478458555708:web:36948b80a3fa60f6384239"
};



export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

// Initialize Firebase

