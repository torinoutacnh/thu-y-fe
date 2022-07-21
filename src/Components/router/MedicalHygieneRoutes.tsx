import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";
import React from "react";
import { MedicalHygiene } from "Components/Pages/MedicalHygiene";
import CreateVSYTReportPage from "Components/Pages/MedicalHygiene/CreatePage";
import UpdateVSYTReportPage from "Components/Pages/MedicalHygiene/UpdatePage";

const medicalHygieneEndpoints = {
  get basepath() {
    return "/ve-sinh-y-te";
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

const medicalHygieneRoutes = [
  <Route
    path={medicalHygieneEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <MedicalHygiene />
      </PrivateRoute>
    }
    key="medical-hygiene-page"
  />,
  <Route
    path={medicalHygieneEndpoints.createreport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateVSYTReportPage />
      </PrivateRoute>
    }
    key="medical-hygiene-page-create"
  />,
  <Route
    path={medicalHygieneEndpoints.updatereport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateVSYTReportPage />
      </PrivateRoute>
    }
    key="medical-hygiene-page-update"
  />,
];

export { medicalHygieneRoutes, medicalHygieneEndpoints };
