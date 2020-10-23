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

const uuid = require("uuid/v4");

export const createMedicalReport = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let uniqueIdReport = uuid();
      let uniqueIdPharmacy = uuid();
      await firebase
        .firestore()
        .collection("medicalReport")
        .doc(uniqueIdReport)
        .set({
          id: uniqueIdReport,
          createdAt: new Date(),
          title: credentials.title,
          specialist: credentials.specialist,
          subjective: credentials.subjective,
          objective: credentials.objective,
          assessment: credentials.assessment,
          rx: credentials.rx,
          patientId: credentials.patientId,
          doctorName: credentials.doctorName,
          hospital: credentials.hospital,
          patientName: credentials.patientName,
          patientIc: credentials.patientIc,
          doctorId: credentials.doctorId,
        })
        .then(async () => {
          await firebase
            .firestore()
            .collection("pharmacy")
            .doc(uniqueIdPharmacy)
            .set({
              id: uniqueIdPharmacy,
              patientId: credentials.patientId,
              doctorName: credentials.doctorName,
              rx: credentials.rx,
              patientName: credentials.patientName,
              patientIc: credentials.patientIc,
              hospital: credentials.hospital,
              createdAt: new Date(),
            });
          await firebase
            .firestore()
            .collection("users")
            .doc(credentials.patientId)
            .update({
              medicalReport: firebase.firestore.FieldValue.arrayUnion(
                uniqueIdReport
              ),
              medicineTaken: {
                longTerm: credentials.longTermMedicine,
                recent: credentials.rx,
              },
            });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePatientInfo = (credentials, id) => {
  return async (dispatch, getState) => {
    try {
      let patient = firebase.firestore().collection("users").doc(id);
      let queue = firebase.firestore().collection("queue").doc(id);
      await patient
        .update({
          height: {
            value: credentials.height,
            lastUpdated: new Date(),
          },
          weight: {
            value: credentials.weight,
            lastUpdated: new Date(),
          },
          bloodPressure: {
            value: credentials.bloodPressure,
            lastUpdated: new Date(),
          },
          bmi: (
            credentials.weight /
            ((credentials.height / 100) * (credentials.height / 100))
          ).toFixed(2),
        })
        .then(async () => {
          await queue.update({
            accessNurse: false,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const checkInPatient = (id) => {
  return async (dispatch, getState) => {
    try {
      let queue = firebase.firestore().collection("queue").doc(id);
      await queue.update({
        accessReception: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editAndVerified = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let patient = firebase
        .firestore()
        .collection("users")
        .doc(credentials.patientId);
      if (credentials.allergy !== "") {
        await patient.update({
          allergy: firebase.firestore.FieldValue.arrayUnion(
            credentials.allergy
          ),
        });
      }
      if (credentials.disease !== "") {
        await patient.update({
          disease: firebase.firestore.FieldValue.arrayUnion(
            credentials.disease
          ),
        });
      }
      if (credentials.surgery !== "") {
        await patient.update({
          surgery: firebase.firestore.FieldValue.arrayUnion(
            credentials.surgery
          ),
        });
      }
      if (credentials.disability !== "") {
        await patient.update({
          disabilities: firebase.firestore.FieldValue.arrayUnion(
            credentials.disability
          ),
        });
      }
      if (credentials.bloodType !== "") {
        await patient.update({
          bloodType: {
            value: credentials.bloodType,
            verifiedBy: credentials.doctorName,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
