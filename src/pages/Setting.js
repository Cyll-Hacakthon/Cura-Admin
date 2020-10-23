import React, { Component } from "react";
import styled from "styled-components";
import { ContentTitle } from "../style/Layout";
import { Button, Form, Input } from "antd";

export default class Setting extends Component {
  state = {
    timeSlot: null,
    minTime: null,
    maxTime: null,
  };

  handleChange = (event) => {
    let eventId = event.target.id;
    this.setState(
      {
        [eventId]: event.target.value,
      },
      () => {
        console.log(this.state.height);
      }
    );
  };

  handleUpdate = () => {
    window.location.reload();
  };

  renderSettingForm = () => {
    return (
      <FormContainer>
        <h1>{"Diagnosis Setting"}</h1>
        <Form ref={this.formRef}>
          <Form.Item label="Time Slot" name="timeSlot">
            <Input
              size="large"
              placeholder="in hour"
              style={{ width: "98%" }}
              id="timeSlot"
              defaultValue={this.state.timeSlot}
              onChange={this.handleChange.bind(this)}
              type="number"
            />
          </Form.Item>
          <Form.Item label="Minimum Diagnosis Time" name="minTime">
            <Input
              size="large"
              placeholder="in minute"
              style={{ width: "98%" }}
              id="weight"
              defaultValue={this.state.minTime}
              onChange={this.handleChange.bind(this)}
              type="number"
            />
          </Form.Item>
          <Form.Item label="Maximum Diagnosis Time" name="maxTime">
            <Input
              size="large"
              placeholder="in minute"
              style={{ width: "98%" }}
              id="maxTIme"
              defaultValue={this.state.maxTime}
              onChange={this.handleChange.bind(this)}
              type="number"
            />
          </Form.Item>
        </Form>
      </FormContainer>
    );
  };

  render() {
    return (
      <>
        <ContentTitle>Setting</ContentTitle>
        <InfoMainContainer>{this.renderSettingForm()}</InfoMainContainer>
        <ButtonContainer>
          <DoneButton type="primary" size="large" onClick={this.handleUpdate}>
            Update
          </DoneButton>
        </ButtonContainer>
      </>
    );
  }
}

const InfoMainContainer = styled.table`
  width: 90%;
  margin-left: 20px;
  margin-top: 50px;
  box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.25);
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

const DoneButton = styled(Button)`
  background-color: #09835e;
  border-color: #09835e;
  margin-left: 20px;
  width: 130px;
  :hover {
    background-color: #00e05a;
    border-color: #00e05a;
  }

  :focus {
    background-color: #00e05a;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 20px;
`;
