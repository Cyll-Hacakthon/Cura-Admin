import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";

//action
import { updatePatientInfo } from "../../store/actions/patientAction";

class PreconsultationInfo extends Component {
  state = {
    bloodPressure: null,
    height: null,
    weight: null,
  };

  handleChange = (event) => {
    let eventId = event.target.id;
    this.setState(
      {
        [eventId]: event.target.value,
      },
      () => {
        console.log(this.state.height);
      }
    );
  };

  handleUpdate = () => {
    if (this.props.user) {
      if (this.state.height === null) {
        this.setState({
          height: this.props.user.height,
        });
      } else if (this.state.weight == null) {
        this.setState({
          weight: this.props.user.weight,
        });
      } else if (this.state.bloodPressure == null) {
        this.setState({
          bloodPressure: this.props.user.bloodPressure,
        });
      }

      if (
        this.state.weight != null &&
        this.state.height != null &&
        this.state.bloodPressure != null
      ) {
        this.props
          .updatePatientInfo(this.state, this.props.match.params.id)
          .then(() => {
            this.props.history.push("/");
          });
      }
    }
  };

  renderPreconsultationForm = () => {
    if (this.props.user) {
      return (
        <FormContainer>
          <h1>{"Pre-Consultation Form"}</h1>
          <h2>{"Patient Name - " + this.props.user.name}</h2>
          <h2>{"Patient Ic - " + this.props.user.ic}</h2>
          <Form ref={this.formRef}>
            <Form.Item label="Height" name="height">
              <Input
                size="large"
                placeholder="in cm"
                style={{ width: "98%" }}
                id="height"
                defaultValue={this.state.height}
                onChange={this.handleChange.bind(this)}
                type="number"
              />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input
                size="large"
                placeholder="in kg"
                style={{ width: "98%" }}
                id="weight"
                defaultValue={this.state.weight}
                onChange={this.handleChange.bind(this)}
                type="number"
              />
            </Form.Item>
            <Form.Item label="Blood Pressure" name="bloodPressure">
              <Input
                size="large"
                placeholder="in mmHg"
                style={{ width: "98%" }}
                id="bloodPressure"
                defaultValue={this.state.bloodPressure}
                onChange={this.handleChange.bind(this)}
                type="number"
              />
            </Form.Item>
          </Form>
        </FormContainer>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <>
        <InfoMainContainer>
          {this.renderPreconsultationForm()}
        </InfoMainContainer>
        <ButtonContainer>
          <Link to="/">
            <BackButton type="primary" size="large">
              {"<"} Back
            </BackButton>
          </Link>
          <DoneButton type="primary" size="large" onClick={this.handleUpdate}>
            Update
          </DoneButton>
        </ButtonContainer>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePatientInfo: (credential, id) =>
      dispatch(updatePatientInfo(credential, id)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const user = users ? users[id] : null;
  return {
    user: user,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    let firestoreList = [];

    firestoreList.push({
      collection: "users",
      where: ["role", "==", "patient"],
    });
    return firestoreList;
  })
)(PreconsultationInfo);

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

const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
`;
