import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBky0jPj-jrBir6rqGA8VznbFtVxfOLLrU",
    authDomain: "health-33de2.firebaseapp.com",
    projectId: "health-33de2",
    storageBucket: "health-33de2.appspot.com",
    messagingSenderId: "1045611145661",
    appId: "1:1045611145661:web:3affa72dca85fb939f4ad4"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase};