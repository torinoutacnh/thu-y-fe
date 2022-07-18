import { AbattoirPage } from "Components/Pages/Abattoir";
import CreateAbattoirReport from "Components/Pages/Abattoir/CreateReportPage";
import UpdateAbattoirReport from "Components/Pages/Abattoir/UpdateReportPage";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import React from "react";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";

const abattoirEndpoints = {
  get basepath() {
    return "/lo-mo";
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

const AbattoirRoutes = [
  <Route
    path={abattoirEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <AbattoirPage />
      </PrivateRoute>
    }
    key="abattoir-page"
  />,
  <Route
    path={abattoirEndpoints.createreport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateAbattoirReport />
      </PrivateRoute>
    }
    key="abattoir-page-create"
  />,
  <Route
    path={abattoirEndpoints.updatereport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateAbattoirReport />
      </PrivateRoute>
    }
    key="abattoir-page-update"
  />,
];

export { abattoirEndpoints, AbattoirRoutes };
