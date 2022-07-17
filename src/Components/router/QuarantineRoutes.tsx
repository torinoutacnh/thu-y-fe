import { QuarantinePage } from "Components/Pages/Quarantine";
import CreateReportPage from "Components/Pages/Quarantine/CreateReportPage";
import UpdateReportPage from "Components/Pages/Quarantine/UpdateReportPage";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";
import React from "react";

const quarantineEndpoints = {
  get basepath() {
    return "/kiem-dich";
  },
  get home() {
    return this.basepath;
  },
  get createreport() {
    return this.basepath.concat("/tao-bao-cao");
  },
  get updatereport() {
    return this.basepath.concat("/cap-nhat-bao-cao/:id");
  },
};

const QuarantineRoutes = [
  <Route
    path={quarantineEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <QuarantinePage />
      </PrivateRoute>
    }
    key="quarantine-page"
  />,
  <Route
    path={quarantineEndpoints.createreport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateReportPage />
      </PrivateRoute>
    }
    key="quarantine-page-create"
  />,
  <Route
    path={quarantineEndpoints.updatereport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateReportPage />
      </PrivateRoute>
    }
    key="quarantine-page-update"
  />,
];

export { QuarantineRoutes, quarantineEndpoints };
