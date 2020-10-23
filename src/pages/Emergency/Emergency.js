import React, { Component } from "react";
import styled from "styled-components";
import { ContentTitle } from "../../style/Layout";
import { Button, Form, Input, Typography } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const { Title } = Typography;

class Emergency extends Component {
  state = {
    patientIc: null,
    patientId: null,
  };

  handleChange = (event) => {
    let eventId = event.target.id;
    this.setState({
      [eventId]: event.target.value,
    });
  };

  handleSearch = () => {
    if (this.props.patient) {
      this.props.patient
        .filter((eachPatient) => eachPatient.ic === this.state.patientIc)
        // eslint-disable-next-line
        .map((eachPatient) => {
          this.setState(
            {
              patientId: eachPatient.id,
            },
            () => {
              this.props.history.push("/emergency/" + this.state.patientId);
            }
          );
        });
    }
  };

  render() {
    return (
      <>
        <ContentTitle>Emergency</ContentTitle>
        <Container>
          <CardContainer>
            <LogoContainer>
              <Title style={{ marginBottom: 0, marginLeft: 10 }} level={3}>
                Emergency Search
              </Title>
            </LogoContainer>

            <InputContainer>
              <SearchInput
                id="patientIc"
                onChange={this.handleChange}
                placeholder="Patient IC"
                value={this.state.patientIc}
                type="number"
              />
            </InputContainer>
            <LoginButton onClick={this.handleSearch}>Search</LoginButton>
          </CardContainer>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.firestore.ordered.patient);
  return {
    patient: state.firestore.ordered.patient,
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, null),
    firestoreConnect((props) => {
      let firestoreList = [];

      firestoreList.push({
        collection: "users",
        where: ["role", "==", "patient"],
        storeAs: "patient",
      });
      return firestoreList;
    })
  )(Emergency)
);

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled(Input)`
  width: 500px;
  height: 50px;
  border-radius: 10px !important;
  margin: 10px;
  font-size: 16px;
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

const InputContainer = styled(Form.Item)`
  margin-bottom: 0px;
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
