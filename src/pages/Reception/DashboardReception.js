import React, { Component } from "react";
import styled from "styled-components";
import { Menu, Layout, Divider } from "antd";
import { ButtonText } from "../../style/Layout";
import Logo from "../../assests/LogoReception.png";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { signOut } from "../../store/actions/authAction";
import { connect } from "react-redux";

//Dashboard content
import ReceptionList from "./ReceptionList";
import TakeNumber from "./TakeNumber";

class DashboardReception extends Component {
  state = {
    selectedMenu: 0,
  };

  handleNavigation = (menu) => {
    switch (menu) {
      case "List": {
        this.setState({
          selectedMenu: 0,
        });
        break;
      }
      case "Take Number": {
        this.setState({
          selectedMenu: 1,
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
        return <ReceptionList />;
      }
      case 1: {
        return <TakeNumber />;
      }
      default: {
        return <ReceptionList />;
      }
    }
  };

  handleSignOut = () => {
    this.props.signOut();
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
        <Menu.Item key="0" onClick={this.handleNavigation.bind(this, "List")}>
          <UserOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Check In</ButtonText>
        </Menu.Item>
        <Menu.Item
          key="1"
          onClick={this.handleNavigation.bind(this, "Take Number")}
        >
          <UserOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Take Number</ButtonText>
        </Menu.Item>

        <Menu.Item key="5" onClick={this.handleSignOut}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export default connect(null, mapDispatchToProps)(DashboardReception);

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
