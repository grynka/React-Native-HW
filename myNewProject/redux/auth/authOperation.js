import firebase from "../../firebase/config";

export const authSignInUser = () => async (dispatch, getState) => {
try {
const user = await firebase.auth().createUserWithEmailAndPassword();

}    
catch (error) {
    console.log(error.message)
}
};
export const authSignUpUser = ({email, password, username}) => async (dispatch, getState) => {
    try {
        const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
        console.log(user)
        }    
        catch (error) {
            console.log(error.message)
        }
};
export const authSignOutUser = () => async (dispatch, getState) => {};
