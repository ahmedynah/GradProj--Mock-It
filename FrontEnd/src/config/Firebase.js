import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2zKHCOOz5zXH_JW_7R15kUKejuiXXIDQ",
  authDomain: "mock-it.firebaseapp.com",
  projectId: "mock-it",
  storageBucket: "mock-it.appspot.com",
  messagingSenderId: "880391742324",
  appId: "1:880391742324:web:d338bc6754fff6b8810221",
  measurementId: "G-CC3EVBVJ18"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
