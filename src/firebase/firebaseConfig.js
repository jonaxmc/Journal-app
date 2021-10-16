  
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyAuTmAZywAs4c_bkwJIhckIYuiBG2PYx6k",
    authDomain: "react-app-cursos-601e0.firebaseapp.com",
    projectId: "react-app-cursos-601e0",
    storageBucket: "react-app-cursos-601e0.appspot.com",
    messagingSenderId: "113406430046",
    appId: "1:113406430046:web:d452cf1f0ab797dd6f1dcf"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}