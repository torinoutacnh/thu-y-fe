import { QuarantinePage } from "Components/Pages/Quarantine";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";
import React from "react";
import { RoleType } from "Components/Shared/Models/User";
import UpdateQuarantineReportPage from "Components/Pages/Quarantine/update";
import CreateQuarantineReportPage from "Components/Pages/Quarantine/create";

const quarantineEndpoints = {
  get basepath() {
    return "/kiem-dich";
  },
  get home() {
    return this.basepath;
  },
  get vsyt() {
    return this.basepath.concat("/bien-ban-ve-sinh-y-te");
  },
  get cnkd() {
    return this.basepath.concat("/chung-nhan-kiem-dich");
  },
  get createreport() {
    return this.basepath.concat("/tao-bao-cao");
  },
  get updatereport() {
    return this.basepath.concat("/cap-nhat-bao-cao");
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
        {/* <CreateReportPage /> */}
        <CreateQuarantineReportPage />
      </PrivateRoute>
    }
    key="quarantine-page-create"
  />,
  <Route
    path={quarantineEndpoints.updatereport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        {/* <UpdateReportPage /> */}
        <UpdateQuarantineReportPage />
      </PrivateRoute>
    }
    key="quarantine-page-update"
  />,
];

export { QuarantineRoutes, quarantineEndpoints };
