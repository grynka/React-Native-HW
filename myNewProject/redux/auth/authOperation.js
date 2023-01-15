import { collection, addDoc } from "firebase/firestore"; 
import db from "../../firebase/config";

export const authSignInUser = () => async (dispatch, getState) => {
try {


}    
catch (error) {
    console.log(error.message)
}
};

export const createUser = () => async (email, password) => {
    try {
        const user = await db.auth().createUserWithEmailAndPassword(email, password);
        console.log(user)
    }  
    catch (error) {
        console.log(error.message)
    }
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
