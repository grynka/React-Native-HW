import { initializeApp } from "firebase/app";
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEQgU7Ap6Ak0Zq9tYW8TONk3qze1FLjZI",
  authDomain: "photoapp-4cb20.firebaseapp.com",
  projectId: "photoapp-4cb20",
  storageBucket: "photoapp-4cb20.appspot.com",
  messagingSenderId: "721550258485",
  appId: "1:721550258485:web:56c420239cbaa51e731c7c"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase