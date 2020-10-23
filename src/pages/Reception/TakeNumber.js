import React, { Component } from "react";
import styled from "styled-components";
import { ContentTitle } from "../../style/Layout";
import { Button, Form, Input, Typography, Select } from "antd";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Action
import { addQueue } from "../../store/actions/queueAction";

const { Title } = Typography;
const { Option } = Select;

class TakeNumber extends Component {
  state = {
    patientName: "",
    patientIc: "",
    visitPurpose: "",
    doctor: "",
    patientBirthDate: null,
    patientAge: null,
  };

  handleChange = (event) => {
    let eventId = event.target.id;
    this.setState({
      [eventId]: event.target.value,
    });
  };

  handleChooseDoctor = (value) => {
    this.setState({
      doctor: value,
    });
  };

  handleTakeNumber = () => {
    this.props.addQueue(this.state).then(() => {
      window.location.reload();
    });
  };

  render() {
    return (
      <>
        <ContentTitle>Take Number</ContentTitle>
        <Container>
          <CardContainer>
            <LogoContainer>
              <Title style={{ marginBottom: 0, marginLeft: 10 }} level={3}>
                Patient Info
              </Title>
            </LogoContainer>

            <FormContainer>
              <Form ref={this.formRef}>
                <Form.Item label="Name" name="patientName">
                  <Input
                    size="large"
                    placeholder="Patient Name"
                    style={{ width: "98%" }}
                    defaultValue={this.state.patientName}
                    id="patientName"
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Item>
                <Form.Item label="Ic" name="patientIc">
                  <Input
                    size="large"
                    placeholder="Patient Ic"
                    style={{ width: "98%" }}
                    defaultValue={this.state.patientIc}
                    id="patientIc"
                    onChange={this.handleChange.bind(this)}
                    type="number"
                  />
                </Form.Item>

                <Form.Item label="Visit Purpose" name="visitPurpose">
                  <Input
                    size="large"
                    placeholder="Visit Purpose"
                    style={{ width: "98%" }}
                    defaultValue={this.state.visitPurpose}
                    id="visitPurpose"
                    onChange={this.handleChange.bind(this)}
                  />
                </Form.Item>
                <Form.Item label="Doctor" name="doctor">
                  <Select
                    size="large"
                    onSelect={(defaultValue) =>
                      this.handleChooseDoctor(defaultValue)
                    }
                    style={{ width: "98%" }}
                  >
                    {this.props.doctor &&
                      this.props.doctor.map((eachDoctor) => {
                        return (
                          <Option value={eachDoctor.name}>
                            {eachDoctor.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Form>
            </FormContainer>
            <LoginButton onClick={this.handleTakeNumber}>
              Take Number
            </LoginButton>
          </CardContainer>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQueue: (credentials) => dispatch(addQueue(credentials)),
  };
};

const mapStateToProps = (state) => {
  return {
    doctor: state.firestore.ordered.doctor,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    let firestoreList = [];

    firestoreList.push({
      collection: "users",
      where: ["role", "==", "Doctor"],
      storeAs: "doctor",
    });
    return firestoreList;
  })
)(TakeNumber);

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  padding: 30px 0px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  margin-top: 50px;
`;

const Container = styled(Form)`
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LoginButton = styled(Button)`
  width: 500px;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  margin-top: 20px;
  background: #09835e !important;
  border: none;
  color: white !important;
  font-weight: 600;

  &:hover {
    background: #12c08c !important;
    color: white !important;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
`;
