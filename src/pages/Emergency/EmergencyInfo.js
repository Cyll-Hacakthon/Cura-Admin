import React, { Component } from "react";
import { Title } from "../../style/Layout";
import styled from "styled-components";
import { Button, Modal, Tabs, Form, Input, Select, Card, Col, Row } from "antd";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

class EmergencyInfo extends Component {
  state = {
    currentNumber: 5,
    visible: false,
    visibleReport: false,
    visibleContent: false,
    filterSpecialist: "",
    filterHospital: "",
    idReport: "",
    //Report
    specialist: null,
    title: "",
    subjective: "",
    objective: "",
    assessment: "",
    rx: "",
    doctorName: "",
    patientId: "",
    patientName: "",
    patientIc: "",
    doctorId: "",
  };

  handleFilterSpclist = (value) => {
    this.setState({
      filterSpecialist: value,
    });
  };

  handleChange = (event) => {
    let eventId = event.target.id;
    this.setState(
      {
        [eventId]: event.target.value,
      },
      () => {
        console.log(this.state.rx);
      }
    );
  };

  handleVisibleReport = (check) => {
    this.setState({
      visibleReport: check,
    });
  };

  handleVisibleContent = (check, id) => {
    this.setState({
      visibleContent: check,
      idReport: id,
    });
  };

  handleTime = (timeStampDate) => {
    console.log(timeStampDate);
    const dateInMillis = timeStampDate.seconds * 1000;
    var date = new Date(dateInMillis).toDateString();

    return date;
  };

  handleDateAndTime = (timeStampDate) => {
    const dateInMillis = timeStampDate.seconds * 1000;

    let date =
      new Date(dateInMillis).toDateString() +
      " at " +
      new Date(dateInMillis).toLocaleTimeString();

    return date;
  };

  handleArray = (arrayList) => {
    let index = 0;
    let convertString = "";

    // eslint-disable-next-line
    arrayList.map((eachArray) => {
      if (index === 0) {
        convertString = convertString + eachArray;
        index++;
      } else {
        convertString = convertString + ", " + eachArray;
      }
    });
    return convertString;
  };

  handleLongTermMed = (arrayList) => {
    let index = 0;
    let convertString = "";

    if (arrayList) {
      // eslint-disable-next-line
      arrayList.map((eachArray) => {
        if (index === 0) {
          convertString = convertString + eachArray.medicine;
          index++;
        } else {
          if (eachArray.medicine === "")
            convertString = convertString + eachArray.medicine;
          else convertString = convertString + ", " + eachArray.medicine;
        }
      });
    } else {
      return null;
    }
    return convertString;
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
            <InfoTitle>Blood Type</InfoTitle>
            <InfoContent>
              {user.bloodType.verifiedBy === ""
                ? user.bloodType.value
                : user.bloodType.value +
                  " (Verified By: Dr." +
                  user.bloodType.verifiedBy +
                  ")"}
            </InfoContent>
          </tr>
          <tr>
            <InfoTitle>Blood Pressure</InfoTitle>
            <InfoContent>
              {user.bloodPressure.value +
                "mm Hg" +
                " (Updated : " +
                this.handleDateAndTime(user.bloodPressure.lastUpdated) +
                ")"}
            </InfoContent>
          </tr>
          <tr>
            <InfoTitle>Allergy</InfoTitle>
            <InfoContent>{this.handleArray(user.allergy)}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Height</InfoTitle>
            <InfoContent>
              {
                /*eslint-disable-next-line*/
                user.height.value +
                  "cm" +
                  " (Updated : " +
                  this.handleDateAndTime(user.height.lastUpdated) +
                  ")"
              }
            </InfoContent>
          </tr>
          <tr>
            <InfoTitle>Weight</InfoTitle>
            <InfoContent>
              {
                /*eslint-disable-next-line*/ user.weight.value +
                  "kg" +
                  " (Updated : " +
                  this.handleDateAndTime(user.weight.lastUpdated) +
                  ")"
              }
            </InfoContent>
          </tr>
          <tr>
            <InfoTitle>BMI</InfoTitle>
            <InfoContent>{user.bmi}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Habit</InfoTitle>
            <InfoContent>{user.habit}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Surgery</InfoTitle>
            <InfoContent>{this.handleArray(user.surgery)}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Disability</InfoTitle>
            <InfoContent>{this.handleArray(user.disabilities)}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Emergency Contact</InfoTitle>
            <InfoContent>{this.handleArray(user.emergencyContact)}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Language</InfoTitle>
            <InfoContent>{this.handleArray(user.language)}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Disease</InfoTitle>
            <InfoContent>{this.handleArray(user.disease)}</InfoContent>
          </tr>
          <tr>
            <InfoTitle>Medicine Taken</InfoTitle>
            <InfoContent>
              {"Long term medicine taken : " +
                this.handleLongTermMed(user.longTermMed) +
                "\n" +
                "Recent medicine taken: " +
                user.shortTermMed}
            </InfoContent>
          </tr>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  componentDidMount() {
    console.log(this.state.specialList);
  }

  renderMedicalForm = () => {
    return (
      <TabBar defaultActiveKey="1" centered size={"large"} tabBarGutter={50}>
        <TabPane tab="Clinical Notes" key="1">
          <FormContainer>
            <Form ref={this.formRef}>
              <Form.Item label="Title" name="title">
                <Input
                  size="large"
                  placeholder="Title"
                  style={{ width: "98%" }}
                  defaultValue={this.state.title}
                  id="title"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
              <Form.Item label="Subjective" name="subjective">
                <Input
                  size="large"
                  placeholder="Subjective"
                  style={{ width: "98%" }}
                  defaultValue={this.state.subjective}
                  id="subjective"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
              <Form.Item label="Objective" name="objective">
                <TextArea
                  placeholder="Objective"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  style={{ width: "98%" }}
                  defaultValue={this.state.objective}
                  id="objective"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
              <Form.Item label="Assessment" name="assessment">
                <TextArea
                  placeholder="Assessment"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  style={{ width: "98%" }}
                  defaultValue={this.state.assessment}
                  id="assessment"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
            </Form>
          </FormContainer>
        </TabPane>
        <TabPane tab="Prescription" key="2">
          <FormContainer>
            <Form>
              <Form.Item label="Rx" name="rx">
                <TextArea
                  placeholder="Rx"
                  autoSize={{ minRows: 5, maxRows: 7 }}
                  style={{ width: "98%", whiteSpace: "pre-line" }}
                  defaultValue={this.state.rx}
                  id="rx"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Item>
            </Form>
          </FormContainer>
        </TabPane>
      </TabBar>
    );
  };

  renderMedicalReport = () => {
    return (
      <React.Fragment>
        <h1>Medical Report</h1>
        <SelectBarContainer>
          <Select
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
          </Select>
          <Input
            size="large"
            placeholder="Search Hospital"
            style={{ width: "30%", marginLeft: 20 }}
            defaultValue={this.state.filterHospital}
            id="filterHospital"
            onChange={this.handleChange.bind(this)}
          />
        </SelectBarContainer>
        <Row gutter={16}>{this.renderMedicalList()}</Row>
      </React.Fragment>
    );
  };

  renderMedicalList = () => {
    let medicalList = [];
    const { medicalReport } = this.props;
    // eslint-disable-next-line
    {
      medicalReport &&
        // eslint-disable-next-line
        medicalReport.map((eachReport) => {
          if (
            (eachReport.specialist === this.state.filterSpecialist ||
              this.state.filterSpecialist === "") &&
            (eachReport.hospital
              .toLowerCase()
              .includes(this.state.filterHospital.toLowerCase()) ||
              this.state.filterHospital === "")
          ) {
            medicalList.push(
              <Col span={8} style={{ marginTop: 10 }}>
                <Card
                  title={"Title - " + eachReport.title}
                  bordered={true}
                  style={{
                    boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.25)",
                    cursor: "pointer",
                  }}
                  onClick={this.handleVisibleContent.bind(
                    this,
                    true,
                    eachReport.id
                  )}
                >
                  {"Specialist - " +
                    eachReport.specialist +
                    "\nDoctor - Dr." +
                    eachReport.doctorName +
                    "\nHospital - " +
                    eachReport.hospital +
                    "\nCreated at - " +
                    this.handleTime(eachReport.createdAt)}
                </Card>
              </Col>
            );
          }
        });
    }

    return medicalList;
  };

  renderReportContent = () => {
    let reportContent = [];
    // eslint-disable-next-line
    {
      this.props.medicalReport &&
        this.props.medicalReport
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
                <ReportContentText>
                  {"Prescription - " + eachReport.rx}
                </ReportContentText>
              </React.Fragment>
            );
          });
    }
    return reportContent;
  };

  render() {
    return (
      <>
        <Container>
          <Title>Patient Information</Title>
          <InfoMainContainer>
            {this.renderInfoTable()}
            <tr>
              <RecordText
                onClick={this.handleVisibleReport.bind(this, true)}
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
          </ButtonContainer>
        </Container>
        {/* Show Report List Modal */}
        <Modal
          visible={this.state.visibleReport}
          title={null}
          onCancel={this.handleVisibleReport.bind(this, false)}
          footer={null}
          className="customModal"
          width={1000}
        >
          {this.renderMedicalReport()}
        </Modal>

        {/* Show Report Content Modal */}
        <Modal
          visible={this.state.visibleContent}
          title={null}
          onCancel={this.handleVisibleContent.bind(this, false, "")}
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
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.user;
  const user = users ? users[id] : null;
  console.log(id);
  return {
    user: user,
    medicalReport: state.firestore.ordered.medicalReport,
    doctor: state.firestore.ordered.doctor,
  };
};

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect((props) => {
    let firestoreList = [];
    firestoreList.push({
      collection: "users",
      where: ["role", "==", "patient"],
      storeAs: "user",
    });

    firestoreList.push({
      collection: "medicalReport",
      where: ["patientId", "==", props.match.params.id],
      orderBy: ["patientId", "asc"],
      // eslint-disable-next-line
      orderBy: ["createdAt", "desc"],
      storeAs: "medicalReport",
    });

    if (props.firebase.auth().currentUser) {
      firestoreList.push({
        collection: "users",
        where: ["id", "==", props.firebase.auth().currentUser.uid],
        storeAs: "doctor",
      });
    }

    return firestoreList;
  })
)(EmergencyInfo);

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
  white-space: break-spaces;
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

const Container = styled.div`
  width: 100%;
  padding: 30px;
`;

const TabBar = styled(Tabs)`
  height: fit-content;
  color: black;
  outline: none;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const SelectBarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReportContentText = styled.span`
  font-size: 18px;
`;
