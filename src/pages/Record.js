import React, { Component } from "react";
import { ContentTitle, Title, BarText, BarTitle } from "../style/Layout";
import styled from "styled-components";
import { Input, Modal } from "antd";
import Profile from "../assests/Profile.png";
import { EyeOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const { Search } = Input;

class Record extends Component {
  state = {
    visible: false,
    idReport: "",
  };

  handleVisible = (check, id) => {
    this.setState({
      visible: check,
      idReport: id,
    });
  };

  renderReportContent = () => {
    let reportContent = [];
    // eslint-disable-next-line
    {
      this.props.patientReports &&
        this.props.patientReports
          .filter((eachReport) => eachReport.id === this.state.idReport)
          // eslint-disable-next-line
          .map((eachReport) => {
            reportContent.push(
              <React.Fragment>
                <h1>
                  {"Medical Report from " +
                    eachReport.hospital +
                    "(" +
                    this.handleTime(eachReport.createdAt) +
                    ")"}
                </h1>
                <ReportContentText>
                  {"Doctor - " + eachReport.doctorName}
                </ReportContentText>
                <br />
                <ReportContentText>
                  {"Specialist - " + eachReport.specialist}
                </ReportContentText>
                <br />
                <ReportContentText>
                  {"Title - " + eachReport.title}
                </ReportContentText>
                <br />
                <ReportContentText>
                  {"Subjective - " + eachReport.subjective}
                </ReportContentText>
                <br />
                <ReportContentText>
                  {"Assessment - " + eachReport.assessment}
                </ReportContentText>
                <br />
                <ReportContentText style={{ textDecoration: "underline" }}>
                  Prescription
                </ReportContentText>
                <br />
                <ReportContentText style={{ whiteSpace: "break-spaces" }}>
                  {"Long Term Medicine : " +
                    eachReport.longTermMed +
                    "\n" +
                    "Short Term Medicine : " +
                    eachReport.shortTermMed}
                </ReportContentText>
              </React.Fragment>
            );
          });
    }
    return reportContent;
  };

  renderForumList = () => {
    return (
      <ListContainer>
        <ProfileImg src={Profile} />
        <BarContainer>
          <BarTitle>Tan Ah Beng</BarTitle>
          <ViewContainer>
            <BarText>On Issue “Why Can’t I See When I Close My Eye”</BarText>
            <BarText style={{ float: "right", marginRight: 10 }}>
              100 <EyeOutlined />
            </BarText>
          </ViewContainer>
        </BarContainer>
      </ListContainer>
    );
  };

  handleTime = (timeStampDate) => {
    console.log(timeStampDate);
    const dateInMillis = timeStampDate.seconds * 1000;
    var date = new Date(dateInMillis).toDateString();

    return date;
  };

  renderFUPatientList = () => {
    let patientReportList = [];
    // eslint-disable-next-line
    {
      this.props.patientReports &&
        // eslint-disable-next-line
        this.props.patientReports.map((eachReport) => {
          patientReportList.push(
            <ListContainer
              onClick={this.handleVisible.bind(this, true, eachReport.id)}
            >
              <ProfileImg src={Profile} />
              <BarContainer>
                <BarTitle>{eachReport.patientName}</BarTitle>
                <BarText>
                  {"Title - " +
                    eachReport.title +
                    ", created at - " +
                    this.handleTime(eachReport.createdAt)}
                </BarText>
              </BarContainer>
            </ListContainer>
          );
        });
    }

    return patientReportList;
  };

  render() {
    return (
      <>
        <ContentTitle>Patient Records</ContentTitle>
        <SearchBar placeholder="Patient's ID" />
        <Title>Active Records</Title>
        {/* <SubTitle>Forum</SubTitle>
        {this.renderForumList()}
        <Divider />
        <SubTitle>Follow Up Patient / Hospitalized</SubTitle> */}
        {this.renderFUPatientList()}
        <Modal
          visible={this.state.visible}
          title={null}
          onCancel={this.handleVisible.bind(this, false, "")}
          footer={null}
          className="customModal"
          width={1000}
        >
          {this.renderReportContent()}
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patientReports: state.firestore.ordered.medicalReport,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    let firestoreList = [];

    if (props.firebase.auth().currentUser) {
      firestoreList.push({
        collection: "medicalReport",
        where: ["doctorId", "==", props.firebase.auth().currentUser.uid],
        orderBy: ["doctorId"],
        // eslint-disable-next-line
        orderBy: ["createdAt", "desc"],
      });
    }

    return firestoreList;
  })
)(Record);

const SearchBar = styled(Search)`
  right: 10px;
  position: absolute;
  margin-right: 20px;
  margin-top: 30px;
  width: 250px;
  height: 44px;
`;

const ListContainer = styled.div`
  width: 85%;
  height: auto;
  background-color: #09835e;
  margin-left: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin-bottom: 23px;
  margin-top: 10px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ViewContainer = styled.div`
  width: 100%;
`;

const ProfileImg = styled.img`
  padding: 20px;
`;

const ReportContentText = styled.span`
  font-size: 18px;
`;
