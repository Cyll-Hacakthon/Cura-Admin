import React, { Component } from "react";
import { ContentTitle } from "../../style/Layout";
import styled from "styled-components";
import { List, Avatar, Input, Button } from "antd";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

//Action
import { checkInPatient } from "../../store/actions/patientAction";

const { Search } = Input;

class ReceptionList extends Component {
  state = {
    idQueue: "",
  };

  handleTime = (timeStampDate) => {
    const dateInMillis = timeStampDate * 1000;
    let date = new Date(dateInMillis).toLocaleTimeString();

    return " \nArrival Time - " + date;
  };

  handleCheckIn = (id) => {
    this.props.checkInPatient(id);
  };

  renderPatientList = () => {
    if (this.props.patients) {
      return (
        <List
          itemLayout="horizontal"
          dataSource={this.props.patients}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<h4>{item.name}</h4>}
                description={
                  "Visit purpose - " +
                  item.visitPurpose +
                  this.handleTime(item.arrivalTime)
                }
              />
              <DoneButton
                type="primary"
                size="large"
                onClick={this.handleCheckIn.bind(this, item.id)}
              >
                Check In
              </DoneButton>
            </List.Item>
          )}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.Fragment>
        <ContentTitle>Check-In List</ContentTitle>
        <SearchBar placeholder="Patient's ID" />
        <PatientListContainer>{this.renderPatientList()}</PatientListContainer>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkInPatient: (id) => dispatch(checkInPatient(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    patients: state.firestore.ordered.queue,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "queue",
      where: ["accessReception", "==", true],
      orderBy: ["accessReception"],
      // eslint-disable-next-line
      orderBy: ["arrivalTime", "asc"],
    },
  ])
)(ReceptionList);

const PatientListContainer = styled.div`
  width: 90%;
  height: auto;
  padding: 20px;
  margin-left: 20px;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
`;

const SearchBar = styled(Search)`
  right: 10px;
  position: absolute;
  margin-right: 20px;
  margin-top: 30px;
  width: 250px;
  height: 44px;
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
