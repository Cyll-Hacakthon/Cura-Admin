import firebase from "../../util/firebase";

export const deletePrescription = (id) => {
  return async (dispatch, getState) => {
    try {
      let prescription = firebase.firestore().collection("pharmacy").doc(id);
      await prescription.delete();
    } catch (error) {
      console.log(error);
    }
  };
};
