import React, { Component } from "react";
import { ContentTitle, SubTitle } from "../style/Layout";
import styled from "styled-components";
import { List, Avatar, Input } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const { Search } = Input;

class Home extends Component {
  state = {
    patientList: [],
    currentTimeslot: "9:00 am - 10:00 am",
    patientAccess: false,
  };

  componentDidMount() {
    console.log(this.props.patients);
  }

  handleTime = (timeStampDate) => {
    const dateInMillis = timeStampDate * 1000;

    let date = new Date(dateInMillis).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return "\nArrival Time - " + date;
  };

  renderPatientList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.patients}
        renderItem={(item) => (
          <Link to={"/" + item.id}>
            <PatientList>
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
            </PatientList>
          </Link>
        )}
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <ContentTitle>Home</ContentTitle>
        <SearchBar placeholder="Patient's ID" />
        <SubTitle>
          TimeSlot : <Number>{this.state.currentTimeslot}</Number>
        </SubTitle>
        <PatientListContainer>{this.renderPatientList()}</PatientListContainer>{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patients: state.firestore.ordered.queue,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "queue",
      orderBy: ["arrivalTime", "asc"],
    },
  ])
)(Home);

const Number = styled.span`
  color: #09835e;
`;

const PatientListContainer = styled.div`
  width: 90%;
  height: auto;
  padding: 20px;
  margin-left: 20px;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
`;
const PatientList = styled(List.Item)`
  cursor: pointer;
  :hover {
    background: rgb(9, 131, 94, 0.5);
    transition: all 1s;
  }
`;

const SearchBar = styled(Search)`
  right: 10px;
  position: absolute;
  margin-right: 20px;
  margin-top: 30px;
  width: 250px;
  height: 44px;
`;
