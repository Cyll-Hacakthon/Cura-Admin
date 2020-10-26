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

export const passToHandleList = (id, handleId) => {
  return async (dispatch, getState) => {
    try {
      let prescription = firebase.firestore().collection("pharmacy").doc(id);
      await prescription.update({
        accessPrepare: false,
        handleId: handleId,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const passToCollectList = (id) => {
  return async (dispatch, getState) => {
    try {
      let prescription = firebase.firestore().collection("pharmacy").doc(id);
      await prescription.update({
        accessCollect: true,
        handleId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
