import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Button } from "antd";

//action
import { passToCollectList } from "../../store/actions/pharmacyAction";

class PrepareInfo extends Component {
  handleDone = () => {
    this.props.passToCollectList(this.props.match.params.id).then(() => {
      this.props.history.push("/");
    });
  };

  renderMedicineInfo = () => {
    if (this.props.medicalInfo) {
      return (
        <div style={{ padding: 20 }}>
          <h1>{"Patient Name - " + this.props.medicalInfo.patientName}</h1>
          <h2>{"Patient Ic - " + this.props.medicalInfo.patientIc}</h2>
          <h2>{"Doctor - Dr." + this.props.medicalInfo.doctorName}</h2>
          <h2 style={{ textDecoration: "underline" }}>Perscription</h2>
          <h2>
            {"Long Term Medicine : " + this.props.medicalInfo.longTermMed}
          </h2>
          <h2>
            {"Short Term Medicine : " + this.props.medicalInfo.shortTermMed}
          </h2>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <>
        <InfoMainContainer>{this.renderMedicineInfo()}</InfoMainContainer>
        <ButtonContainer>
          <Link to="/">
            <BackButton type="primary" size="large">
              {"<"} Back
            </BackButton>
          </Link>
          <DoneButton type="primary" size="large" onClick={this.handleDone}>
            Done
          </DoneButton>
        </ButtonContainer>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const medicalList = state.firestore.data.pharmacy;
  const medicalInfo = medicalList ? medicalList[id] : null;
  return {
    medicalInfo: medicalInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    passToCollectList: (id) => dispatch(passToCollectList(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "pharmacy",
    },
  ])
)(PrepareInfo);

const InfoMainContainer = styled.table`
  width: 90%;
  margin-left: 20px;
  margin-top: 50px;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ButtonContainer = styled.div`
  width: 90%;
  margin-left: 20px;
  height: auto;
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

const BackButton = styled(Button)`
  background-color: #b22222;
  border-color: #b22222;
  margin-left: 20px;
  width: 130px;
  :hover {
    background-color: #e05252fc;
    border-color: #e05252fc;
  }

  :focus {
    background-color: #e05252fc;
  }
`;

const DoneButton = styled(Button)`
  background-color: #09835e;
  border-color: #09835e;
  margin-left: 20px;
  width: 130px;
  :hover {
    background-color: #00e05a;
    border-color: #00e05a;
  }

  :focus {
    background-color: #00e05a;
  }
`;
