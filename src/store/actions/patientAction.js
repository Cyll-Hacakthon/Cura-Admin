import firebase from "../../util/firebase";

export const nextPatient = (id) => {
  return async (dispatch, getState) => {
    try {
      let patient = firebase.firestore().collection("users").doc(id);
      let queue = firebase.firestore().collection("queue").doc(id);
      await patient
        .update({
          access: false,
        })
        .then(async () => {
          await queue.delete();
        });
    } catch (err) {
      console.log(err);
    }
  };
};
