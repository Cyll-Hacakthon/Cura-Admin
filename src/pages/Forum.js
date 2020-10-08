import React, { Component } from "react";
import { ContentTitle, NoticeText, NoticeTime } from "../style/Layout";
import styled from "styled-components";
import { Tabs, Input, Divider } from "antd";
import Profile from "../assests/Profile.png";

const { TabPane } = Tabs;

const { Search } = Input;

export default class Forum extends Component {
  renderNotification = () => {
    return (
      <ListContainer>
        <ProfileImg src={Profile} size={1} />
        <NoticeContainer>
          <NoticeText>
            Mr. Muhammad has approved your request to access his record
          </NoticeText>
          <NoticeTime>10 mins ago</NoticeTime>
        </NoticeContainer>
      </ListContainer>
    );
  };

  render() {
    return (
      <>
        <ContentTitle>Forum</ContentTitle>
        <SearchBar placeholder="Search" />
        <Divider />
        <TabBar defaultActiveKey="1" centered size={"large"} tabBarGutter={50}>
          <TabPane tab="Notification" key="1">
            {this.renderNotification()}
            {this.renderNotification()}
            {this.renderNotification()}
          </TabPane>
          <TabPane tab="Question" key="2">
            Question
          </TabPane>
        </TabBar>
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

const TabBar = styled(Tabs)`
  height: fit-content;
  color: black;
  outline: none;
`;

const ListContainer = styled.div`
  margin-left: 20px;
  width: 90%;
  display: flex;
  flex-direction: row;
`;

const NoticeContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const ProfileImg = styled.img`
  padding: 20px;
  height: 100px;
  width: 100px;
`;
