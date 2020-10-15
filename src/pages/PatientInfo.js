import React, { Component } from "react";
import { SubTitle, Title } from "../style/Layout";
import styled from "styled-components";
import { Button } from "antd";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

//Action
import { nextPatient } from "../store/actions/patientAction";

class PatientInfo extends Component {
  state = {
    currentNumber: 5,
    infoList: [
      { title: "Name", content: "Wendy Meo" },
      { title: "Age", content: "25" },
      { title: "Allergy", content: "Peanut,Pollen" },
      { title: "Height", content: "180cm" },
      { title: "Weight", content: "100kg" },
      { title: "BMI", content: "30.9(Obesity)" },
      { title: "Habit", content: "Smoking" },
    ],
  };

  componentDidMount() {
    console.log(this.props.user);
  }

  handleNextPatient = () => {
    this.props.nextPatient(this.props.match.params.id).then(() => {
      this.props.history.push("/");
    });
  };

  renderInfoTable = () => {
    const { user } = this.props;
    if (user) {
      return (
        <React.Fragment>
          <tr>
            <InfoTitle>Name</InfoTitle>
            <InfoContent>{user.name}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Age</InfoTitle>
            <InfoContent>{user.age}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Allergy</InfoTitle>
            <InfoContent>{user.allergy}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Height</InfoTitle>
            <InfoContent>{user.height}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Weight</InfoTitle>
            <InfoContent>{user.weight}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>BMI</InfoTitle>
            <InfoContent>{user.bmi}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Habit</InfoTitle>
            <InfoContent>{user.habit}</InfoContent>
          </tr>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <Container>
        <SubTitle>
          Number of patient : <Number>{this.state.currentNumber}</Number>
        </SubTitle>
        <Title>Patient Information</Title>
        <InfoMainContainer>
          {this.renderInfoTable()}
          <tr>
            <RecordText
              onClick={() => {
                console.log("r");
              }}
              colSpan={2}
            >
              Check records {">>"}
            </RecordText>
          </tr>
        </InfoMainContainer>

        <ButtonContainer>
          <Link to="/">
            <BackButton
              type="primary"
              size="large"
              onClick={() => {
                this.setState({
                  patientAccess: false,
                });
              }}
            >
              {"<"} Back
            </BackButton>
          </Link>
          <KeepTrackButton type="primary" size="large">
            Add Report
          </KeepTrackButton>

          <KeepTrackButton type="primary" size="large">
            Keep Track
          </KeepTrackButton>

          <NextPatientButton
            type="primary"
            size="large"
            onClick={this.handleNextPatient}
          >
            Next Patient {">"}
          </NextPatientButton>
        </ButtonContainer>
      </Container>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const user = users ? users[id] : null;
  console.log(user);
  return {
    user: user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { nextPatient: (id) => dispatch(nextPatient(id)) };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "users",
      where: ["role", "==", "patient"],
      // eslint-disable-next-line
      where: ["access", "==", true],
    },
  ])
)(PatientInfo);

const InfoMainContainer = styled.table`
  width: 90%;
  margin-left: 20px;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.25);
`;

const InfoTitle = styled.th`
  font-size: 32px;
  padding-left: 10px;
  border: 1px solid rgb(0, 0, 0, 0.6);
  width: 20%;
`;

const InfoContent = styled.th`
  font-size: 32px;
  font-weight: 500;
  border: 1px solid rgb(0, 0, 0, 0.6);
  padding-left: 10px;
`;

const RecordText = styled.th`
  font-size: 20px;
  padding: 5px;
  color: #09835e;
  text-align: center;
  cursor: pointer;
  column-span: all;
  &:hover {
    text-decoration: underline;
  }
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

const KeepTrackButton = styled(Button)`
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

const NextPatientButton = styled(Button)`
  background-color: #e2c217;
  border-color: #e2c217;
  margin-left: 20px;
  width: 130px;
  :hover {
    background-color: #ffe351;
    border-color: #ffe351;
  }

  :focus {
    background-color: #ffe351;
  }
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

const Number = styled.span`
  color: #09835e;
`;

const Container = styled.div`
  width: 100%;
  padding: 30px;
`;

//window.location.reload();