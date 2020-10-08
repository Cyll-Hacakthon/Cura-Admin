import React, { Component } from "react";
import {
  ContentTitle,
  Title,
  SubTitle,
  BarText,
  BarTitle,
} from "../style/Layout";
import styled from "styled-components";
import { Input, Divider } from "antd";
import Profile from "../assests/Profile.png";
import { EyeOutlined } from "@ant-design/icons";

const { Search } = Input;

export default class Record extends Component {
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

  renderFUPatientList = () => {
    return (
      <ListContainer>
        <ProfileImg src={Profile} />
        <BarContainer>
          <BarTitle>Brian R. Little</BarTitle>
          <BarText>Abdomen Pain, Last Visit : 5 / August / 2020</BarText>
        </BarContainer>
      </ListContainer>
    );
  };

  render() {
    return (
      <>
        <ContentTitle>Patient Records</ContentTitle>
        <SearchBar placeholder="Patient's ID" />
        <Title>Active Records</Title>
        <SubTitle>Forum</SubTitle>
        {this.renderForumList()}
        <Divider />
        <SubTitle>Follow Up Patient / Hospitalized</SubTitle>
        {this.renderFUPatientList()}
      </>
    );
  }
}

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
