import firebase from "../../util/firebase";
//Utils

export const signIn = (credentials) => {
  return async (dispatch, getState) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);

    } catch (err) {
      console.log(err);
    }
  };
};


export const signOut = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
  };
};