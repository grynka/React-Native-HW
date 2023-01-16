import { collection, addDoc } from "firebase/firestore"; 
import {firebase} from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";


export const authSignInUser = (email, password) => async () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(email, password)

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const authSignUpUser = (email, password, username, avatar) => async () => {
  const auth = getAuth();
  await  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
     console.log(email, password, username, avatar),
     await  updateProfile(auth.currentUser, {
        displayName: username, photoURL: avatar})
     };

export const writeDataToFirestore = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

export const authSignOutUser = () => async (dispatch, getState) => {};
