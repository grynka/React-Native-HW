import { collection, addDoc } from "firebase/firestore"; 
import {db} from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";


export const authSignInUser = (email, password) => async () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)

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

export const writeDataToFirestore = (image, geocode, name, location) => async () => {
  console.log(db)
   try {
        const docRef = await addDoc(collection(db, "users"), {
         posts: {
          uri: image,
          id: image,
          geocode: geocode,
          name: name,
          location: location,
         }
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

export const authSignOutUser = () => async (dispatch, getState) => {};

export const isLoggedIn  = async () => {
  const auth = getAuth();

auth.onAuthStateChanged(async (user) => {
  console.log("onAuthStateChanged called: ", user);
  if (user) {
      await AsyncStorage.setItem('@isLoggedIn', '1');
  } else {
      await AsyncStorage.setItem('@isLoggedIn', '0');
  }
});}