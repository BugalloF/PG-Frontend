import { initializeApp } from "firebase/app" ;

import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyD6SlIY838LFqMVEnJkWb8ny3KxtqhzobU",

  authDomain: "upload-66659.firebaseapp.com",

  projectId: "upload-66659",

  storageBucket: "upload-66659.appspot.com",

  messagingSenderId: "782687491283",

  appId: "1:782687491283:web:9cde9bd52372d6242af026"

};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage

// Initialize Firebase
