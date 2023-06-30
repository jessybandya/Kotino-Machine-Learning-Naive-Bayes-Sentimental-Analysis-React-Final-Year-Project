import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyw9AfkVVApgoB-VDdbgUc62LkRqzB9T4",
  authDomain: "sentimental-analysis-app.firebaseapp.com",
  projectId: "sentimental-analysis-app",
  storageBucket: "sentimental-analysis-app.appspot.com",
  messagingSenderId: "519718531939",
  appId: "1:519718531939:web:d846776a3e1937ed3a1956",
  measurementId: "G-MR03THTTY7"
};
const firebaseSApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export default {auth};
export  {auth};
