import * as firebase from "firebase/app";
import "@firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUMtaoadDWFz7seKMyuwm8mx2taxtoJUU",
  authDomain: "cura-a4e69.firebaseapp.com",
  databaseURL: "https://cura-a4e69.firebaseio.com",
  projectId: "cura-a4e69",
  storageBucket: "cura-a4e69.appspot.com",
  messagingSenderId: "52510540306",
  appId: "1:52510540306:web:a7aa98f4628171af410ecb",
  measurementId: "G-398833XBXE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
