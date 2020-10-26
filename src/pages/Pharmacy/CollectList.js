import React, { Component } from "react";
import { ContentTitle } from "../../style/Layout";
import styled from "styled-components";
import { List, Avatar, Select } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const { Option } = Select;

class CollectList extends Component {
  state = {
    specialist: "",
  };

  handleFilterSpclist = (value) => {
    this.setState({
      specialist: value,
    });
  };

  handleTime = (timeStampDate) => {
    const dateInMillis = timeStampDate * 1000;

    let date = new Date(dateInMillis).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return "Created At - " + date;
  };

  renderMedicalList = () => {
    let medicalList = [];

    {
      this.props.pharmacy &&
        this.props.pharmacy.map((eachItem) => {
          if (
            eachItem.specialist === this.state.specialist ||
            this.state.specialist === ""
          )
            medicalList.push({
              patientName: eachItem.patientName,
              createdAt: eachItem.createdAt,
              id: eachItem.id,
              specialist: eachItem.specialist,
            });
        });
    }

    return (
      <List
        itemLayout="horizontal"
        dataSource={medicalList}
        renderItem={(item) => (
          <Link to={"/pharmacy/collect/" + item.id}>
            <PatientList>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<h4>{item.patientName}</h4>}
                description={
                  "Specialist : " +
                  item.specialist +
                  "\n" +
                  this.handleTime(item.createdAt)
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
        <ContentTitle>Prepare List</ContentTitle>
        <FilterBar
          size="large"
          onSelect={(defaultValue) => this.handleFilterSpclist(defaultValue)}
          style={{ width: "30%" }}
        >
          <Option value="">All</Option>
          <Option value="General">General</Option>
          <Option value="Allergists/Immunologists">
            Allergists/Immunologists
          </Option>
          <Option value="Anesthesiologists">Anesthesiologists</Option>
          <Option value="Cardiologists">Cardiologists</Option>
          <Option value="Colon and Rectal Surgeons">
            Colon and Rectal Surgeons
          </Option>
          <Option value="Critical Care Medicine Specialists">
            Critical Care Medicine Specialists
          </Option>
          <Option value="Dermatologists">Dermatologists</Option>
          <Option value="Endocrinologists">Endocrinologists</Option>
          <Option value="Emergency">Emergency</Option>
          <Option value="Gastroenterologists">Gastroenterologists</Option>
          <Option value="Geriatric Medicine Specialists">
            Geriatric Medicine Specialists
          </Option>
          <Option value="Hematologists">Hematologists</Option>
        </FilterBar>
        <PatientListContainer>{this.renderMedicalList()}</PatientListContainer>{" "}
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

    firestoreList.push({
      collection: "pharmacy",
      where: ["accessCollect", "==", true],
      // eslint-disable-next-line
      orderBy: ["accessCollect"],
      // eslint-disable-next-line
      orderBy: ["createdAt", "desc"],
    });

    return firestoreList;
  })
)(CollectList);

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

const FilterBar = styled(Select)`
  right: 10px;
  position: absolute;
  margin-right: 20px;
  margin-top: 30px;
  width: 250px;
  height: 44px;
`;
