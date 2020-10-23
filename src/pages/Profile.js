import React, { Component } from "react";
import styled from "styled-components";
import { ContentTitle } from "../style/Layout";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Profile extends Component {
  render() {
    return (
      <>
        <ContentTitle>Profile</ContentTitle>
        {this.props.doctor ? (
          <InfoMainContainer>
            <FormContainer>
              <h1 style={{ fontSize: 28 }}>
                {"Name - " + this.props.doctor[0].name}
              </h1>
              <h1>{"Specialist - " + this.props.doctor[0].specialist}</h1>
              <h1>{"Hospital - " + this.props.doctor[0].hospital}</h1>
            </FormContainer>
          </InfoMainContainer>
        ) : (
          <InfoMainContainer>Loading...</InfoMainContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.firestore.ordered.doctor);
  return {
    doctor: state.firestore.ordered.doctor,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    let firestoreList = [];
    if (props.firebase.auth().currentUser) {
      firestoreList.push({
        collection: "users",
        where: ["id", "==", props.firebase.auth().currentUser.uid],
        storeAs: "doctor",
      });
    }
    return firestoreList;
  })
)(Profile);

const InfoMainContainer = styled.table`
  width: 90%;
  margin-left: 20px;
  margin-top: 50px;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
`;
