import React, { Component } from "react";
import styled from "styled-components";
import { Input, Typography, Button, Form } from "antd";
import { signIn } from "../store/actions/authAction";
import { connect } from "react-redux";

const { Title } = Typography;

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    let eventId = event.target.id;
    this.setState({
      [eventId]: event.target.value,
    });
  };

  handleSignIn = (event) => {
    event.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    return (
      <Container>
        <CardContainer>
          <LogoContainer>
            <Title style={{ marginBottom: 0, marginLeft: 10 }} level={3}>
              Cura Admin
            </Title>
          </LogoContainer>

          <InputContainer>
            <EmailInput
              value={this.state.email}
              id="email"
              onChange={this.handleChange}
              placeholder="Email"
            />
          </InputContainer>
          <InputContainer style={{ margin: 0 }}>
            <PasswordInput
              value={this.state.password}
              id="password"
              onChange={this.handleChange}
              placeholder="Password"
            />
          </InputContainer>
          <LoginButton onClick={this.handleSignIn}>Sign In</LoginButton>
        </CardContainer>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credential) => {
      dispatch(signIn(credential));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignIn);

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const EmailInput = styled(Input)`
  width: 350px;
  height: 50px;
  border-radius: 10px !important;
  margin: 10px;
  font-size: 16px;
`;

const PasswordInput = styled(Input.Password)`
  width: 350px;
  height: 50px;
  border-radius: 10px !important;
  margin: 10px;
  font-size: 16px;
`;

const CardContainer = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 30px 0px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
`;

const Container = styled(Form)`
  height: 100vh;
  width: 100vw;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #09835e;
`;

const InputContainer = styled(Form.Item)`
  margin-bottom: 0px;
`;

const LoginButton = styled(Button)`
  width: 350px;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  margin-top: 20px;
  background: #09835e !important;
  border: none;
  color: white !important;
  font-weight: 600;

  &:hover {
    background: #12c08c !important;
    color: white !important;
  }
`;
