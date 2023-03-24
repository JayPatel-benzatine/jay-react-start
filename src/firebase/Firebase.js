// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4EuwpwXNk2DmaEGiD9kHELuOIh4OLyt0",
    authDomain: "magic-club-6529c.firebaseapp.com",
    projectId: "magic-club-6529c",
    storageBucket: "magic-club-6529c.appspot.com",
    messagingSenderId: "995907982687",
    appId: "1:995907982687:web:bf9f5bec6ed5d2e47dd2ea"
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);