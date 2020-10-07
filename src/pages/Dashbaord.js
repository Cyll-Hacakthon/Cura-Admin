import React, { Component } from "react";
import styled from "styled-components";
import { Menu, Layout, Divider } from "antd";
import { ButtonText } from "../style/Layout";
import Logo from "../assests/Logo.png";
import {
  HomeFilled,
  UserOutlined,
  LaptopOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

//Dashboard content
import Home from "../pages/Home";
import Forum from "../pages/Forum";
import Profile from "../pages/Profile";
import Record from "../pages/Record";

export default class Dashboard extends Component {
  state = {
    selectedMenu: 0,
  };

  handleNavigation = (menu) => {
    switch (menu) {
      case "Home": {
        this.setState({
          selectedMenu: 0,
        });
        break;
      }

      case "Profile": {
        this.setState({
          selectedMenu: 1,
        });
        break;
      }

      case "Patient Records": {
        this.setState({
          selectedMenu: 2,
        });
        break;
      }

      case "Forum": {
        this.setState({
          selectedMenu: 3,
        });
        break;
      }

      default: {
        this.setState({
          selectedMenu: 0,
        });
      }
    }
  };

  renderContent = () => {
    switch (this.state.selectedMenu) {
      case 0: {
        return <Home />;
      }

      case 1: {
        return <Profile />;
      }
      case 2: {
        return <Record />;
      }
      case 3: {
        return <Forum />;
      }
      default: {
        return <Home />;
      }
    }
  };

  renderLeftBar = () => {
    return (
      <LeftNavBar mode="inline">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoCura src={Logo} />
        </div>
        <Divider />
        <Menu.Item key="0" onClick={this.handleNavigation.bind(this, "Home")}>
          <HomeFilled style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Home</ButtonText>
        </Menu.Item>

        <Menu.Item
          key="1"
          onClick={this.handleNavigation.bind(this, "Profile")}
        >
          <UserOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Profile</ButtonText>
        </Menu.Item>

        <Menu.Item
          key="2"
          onClick={this.handleNavigation.bind(this, "Patient Records")}
        >
          <ProfileOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Patient Records</ButtonText>
        </Menu.Item>

        <Menu.Item key="3" onClick={this.handleNavigation.bind(this, "Forum")}>
          <LaptopOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Forum</ButtonText>
        </Menu.Item>

        <Menu.Item key="4">
          <LogoutOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Log Out</ButtonText>
        </Menu.Item>
      </LeftNavBar>
    );
  };

  render() {
    return (
      <Layout>
        {this.renderLeftBar()}
        <DashboardContent>{this.renderContent()}</DashboardContent>
      </Layout>
    );
  }
}

const LeftNavBar = styled(Menu)`
  width: 240px;
  height: 100vh;
  background-color: #09835e;
`;

const LogoCura = styled.img`
  margin-top: 10px;
  margin-bottom: -10px;
`;

const DashboardContent = styled.div`
  position: absolute;
  width: calc(100vw - 240px);
  max-width: calc(100vw - 240px);
  min-height: 100vh;
  background: #fafafa;
  top: 0;
  left: 240px;
`;
