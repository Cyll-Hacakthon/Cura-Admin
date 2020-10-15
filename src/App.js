import React, { Component } from "react";
import DashBoard from "./pages/Dashbaord";
import PatientInfo from "./pages/PatientInfo";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/:id" component={PatientInfo} />
        </Switch>
      </BrowserRouter>
    );
  }
}
