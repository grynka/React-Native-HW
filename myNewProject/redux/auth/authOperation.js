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
  signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      console.log(userCredential)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const authSignUpUser =
  (email, password, username, photo) => async (dispatch) => {
    const { user } = await createUserWithEmailAndPassword(getAuth(), email, password)
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      await updateProfile(user, {
        displayName: username,
        photoURL: photo,
      }).then(
        dispatch(authSlice.actions.authStateChange({stateChange: true})),
        dispatch(authSlice.actions.updateUserProfile({uid: user.uid, displayName: username, email: user.email, avatar: photo})),
       );
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  const auth = getAuth();
signOut(auth).then(() => {
 console.log('Sign-out successful.')
 dispatch(authSlice.actions.authSignOut())
}).catch((error) => {
  console.log(error)
});
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  await auth.onAuthStateChanged((user) => {
    if(user){
      dispatch(authSlice.actions.updateUserProfile({uid: user.uid, displayName: user.displayName, email: user.email, avatar: user.photoURL}));
      dispatch(authSlice.actions.authStateChange({stateChange: true}))
    }
  });
};
