// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ_dK-k84wlABQ-WEvOh50el69nhetwyw",
  authDomain: "drop-box-ae191.firebaseapp.com",
  projectId: "drop-box-ae191",
  storageBucket: "drop-box-ae191.appspot.com",
  messagingSenderId: "833022241152",
  appId: "1:833022241152:web:10a8059c494c171b91b965"
};

// Initialize Firebase
const app = getApps().length? getApp(): initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);

export {auth, db, storage};