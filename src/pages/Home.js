import React, { Component } from "react";
import { ContentTitle, SubTitle, Title } from "../style/Layout";
import styled from "styled-components";
import { Button } from "antd";

export default class Home extends Component {
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

  renderInfoTable = () => {
    let infoList = [];
    if (this.state.infoList.length > 0) {
      // eslint-disable-next-line
      this.state.infoList.map((eachInfo) => {
        infoList.push(
          <tr>
            <InfoTitle>{eachInfo.title}</InfoTitle>
            <InfoContent>{eachInfo.content}</InfoContent>
          </tr>
        );
      });
    }

    return infoList;
  };

  render() {
    return (
      <React.Fragment>
        <ContentTitle>Home</ContentTitle>
        <SubTitle>
          Current Number : <Number>{this.state.currentNumber}</Number>
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
          <NextPatientButton type="primary" size="large">
            Next Patient {">"}
          </NextPatientButton>

          <KeepTrackButton type="primary" size="large">
            Keep Track
          </KeepTrackButton>
        </ButtonContainer>
      </React.Fragment>
    );
  }
}

const Number = styled.span`
  color: #09835e;
`;

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
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const KeepTrackButton = styled(Button)`
  background-color: #09835e;
  border-color: #09835e;
  margin-left: 20px;
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

  :hover {
    background-color: #ffe351;
    border-color: #ffe351;
  }

  :focus {
    background-color: #ffe351;
  }
`;
