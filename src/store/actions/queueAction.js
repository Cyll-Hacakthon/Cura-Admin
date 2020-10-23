import firebase from "../../util/firebase";

const uuid = require("uuid/v4");

export const addQueue = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let uniqueId = uuid();
      await firebase
        .firestore()
        .collection("queue")
        .doc(uniqueId)
        .set({
          name: credentials.patientName,
          id: uniqueId,
          visitPurpose: credentials.visitPurpose,
          arrivalTime: new Date(),
          accessReception: true,
          accessNurse: true,
        })
        .then(async () => {
          await firebase.firestore().collection("users").doc(uniqueId).set({
            age: null,
            allergy: [],
            birthday: null,
            bloodPressure: [],
            bloodType: [],
            bmi: null,
            email: "",
            emergencyContact: [],
            gender: "",
            habit: "",
            height: {},
            ic: credentials.ic,
            id: uniqueId,
            language: [],
            medicalReport: [],
            medicineTaken: {},
            role: "patient",
            surgery: [],
            weight: {},
            name: credentials.patientName,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};
