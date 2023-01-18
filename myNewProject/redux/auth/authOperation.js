import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";

export const authSignInUser = (email, password) => async (dispatch, getState) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      dispatch(authSlice.actions.updateUserProfile({uid: userCredential.user.uid, displayName: userCredential.user.displayName, email: userCredential.user.email, avatar: userCredential.user.photoURL}))
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const authSignUpUser =
  (email, password, username, avatar) => async () => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
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
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: avatar,
      });
  };

export const writeDataToFirestore =
  (image, geocode, name, location) => async () => {
    console.log(db);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        posts: {
          uri: image,
          id: image,
          geocode: geocode,
          name: name,
          location: location,
        },
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  console.log('запуск вихода')
  const auth = getAuth();
signOut(auth).then(() => {
 console.log('Sign-out successful.')
}).catch((error) => {
  console.log(error)
});
};

export const isLoggedIn = async () => {
  const auth = getAuth();
 await auth.onAuthStateChanged(async (user) => {
  dispatch(authSlice.actions.updateUserProfile({uid: user.uid, displayName: user.displayName}))

    console.log("onAuthStateChanged called: ", user);
      return user;
  });
};
