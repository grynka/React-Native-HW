import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDEQgU7Ap6Ak0Zq9tYW8TONk3qze1FLjZI",
  authDomain: "photoapp-4cb20.firebaseapp.com",
  projectId: "photoapp-4cb20",
  storageBucket: "photoapp-4cb20.appspot.com",
  messagingSenderId: "721550258485",
  appId: "1:721550258485:web:56c420239cbaa51e731c7c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
