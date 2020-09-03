import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDValc2nGfWYlb2CAAqlMr6VERUbLuIYIs",
    authDomain: "whatsapp-clone-c7e59.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-c7e59.firebaseio.com",
    projectId: "whatsapp-clone-c7e59",
    storageBucket: "whatsapp-clone-c7e59.appspot.com",
    messagingSenderId: "362363873855",
    appId: "1:362363873855:web:1da72fadb4afa749fa268a",
    measurementId: "G-JR2WVYRLB5"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;