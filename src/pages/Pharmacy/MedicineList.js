import React, { Component } from "react";
import { ContentTitle } from "../../style/Layout";
import styled from "styled-components";
import { List, Avatar, Input } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const { Search } = Input;

class MedicineList extends Component {
  handleTime = (timeStampDate) => {
    const dateInMillis = timeStampDate * 1000;

    let date = new Date(dateInMillis).toLocaleTimeString();
    return "Created At - " + date;
  };

  renderMedicalList = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.pharmacy}
        renderItem={(item) => (
          <Link to={"/pharmacy/" + item.id}>
            <PatientList>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<h4>{item.patientName}</h4>}
                description={this.handleTime(item.createdAt)}
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
        <ContentTitle>Medical List</ContentTitle>
        <SearchBar placeholder="Patient's ID" />
        <PatientListContainer>
          {this.renderMedicalList()}
        </PatientListContainer>{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pharmacy: state.firestore.ordered.pharmacy,
    user: state.firestore.ordered.user,
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
        storeAs: "user",
      });
      if (props.user) {
        firestoreList.push({
          collection: "pharmacy",
          where: ["hospital", "==", props.user[0].hospital],
          orderBy: ["hospital"],
          // eslint-disable-next-line
          orderBy: ["createdAt", "desc"],
        });
      }
    }

    return firestoreList;
  })
)(MedicineList);

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
