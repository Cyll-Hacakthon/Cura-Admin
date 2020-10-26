import React, { Component } from "react";
import styled from "styled-components";
import { Menu, Layout, Divider } from "antd";
import { ButtonText } from "../../style/Layout";
import Logo from "../../assests/LogoPharmacy.png";
import {
  UserOutlined,
  LogoutOutlined,
  SwitcherOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { signOut } from "../../store/actions/authAction";
import { connect } from "react-redux";

//Dashboard content
import PrepareList from "./PrepareList";
import HandleList from "./HandleList";
import CollectList from "./CollectList";

class DashboardPharmacy extends Component {
  state = {
    selectedMenu: 0,
  };

  handleNavigation = (menu) => {
    switch (menu) {
      case "Patient": {
        this.setState({
          selectedMenu: 0,
        });
        break;
      }
      case "Handle": {
        this.setState({
          selectedMenu: 1,
        });
        break;
      }
      case "Collect": {
        this.setState({
          selectedMenu: 2,
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
        return <PrepareList />;
      }
      case 1: {
        return <HandleList />;
      }
      case 2: {
        return <CollectList />;
      }
      default: {
        return <PrepareList />;
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
        <Menu.Item
          key="0"
          onClick={this.handleNavigation.bind(this, "Patient")}
        >
          <UserOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Patient list</ButtonText>
        </Menu.Item>

        <Menu.Item key="1" onClick={this.handleNavigation.bind(this, "Handle")}>
          <SwitcherOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Handle list</ButtonText>
        </Menu.Item>

        <Menu.Item
          key="2"
          onClick={this.handleNavigation.bind(this, "Collect")}
        >
          <CopyOutlined style={{ color: "#ffffff", fontSize: 20 }} />
          <ButtonText>Collect list</ButtonText>
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

export default connect(null, mapDispatchToProps)(DashboardPharmacy);

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
