import React, { Component } from "react";
import DashBoard from "./pages/Dashbaord";
import PatientInfo from "./pages/PatientInfo";
import MedicineInfo from "./pages/Pharmacy/MedicineInfo";
import PreconsultationInfo from "./pages/Nurse/PreconsultationInfo";
import EmergencyInfo from "./pages/Emergency/EmergencyInfo";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route exact path="/:id" component={PatientInfo} />
          <Route exact path="/pharmacy/:id" component={MedicineInfo} />
          <Route exact path="/emergency/:id" component={EmergencyInfo} />
          <Route exact path="/nurse/:id" component={PreconsultationInfo} />
        </Switch>
      </BrowserRouter>
    );
  }
}
