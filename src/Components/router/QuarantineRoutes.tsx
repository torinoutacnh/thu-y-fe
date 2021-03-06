import { QuarantinePage } from "Components/Pages/Quarantine";
import CreateReportPage from "Components/Pages/Quarantine/CreateReportPage";
import UpdateReportPage from "Components/Pages/Quarantine/UpdateReportPage";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";
import React from "react";
import { RoleType } from "Components/Shared/Models/User";
import { MedicalHygiene } from "Components/Pages/MedicalHygiene";

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
    path={quarantineEndpoints.vsyt}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <MedicalHygiene />
      </PrivateRoute>
    }
    key="quarantine-page-vsyt"
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
