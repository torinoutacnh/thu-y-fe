import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";
import React from "react";
import { RoleType } from "Components/Shared/Models/User";
import ManageAbattoir from "../Pages/ManageAbattoir/ManageAbattoir";
import CreateAbattoir from "../Pages/ManageAbattoir/CreateAbattoir";
import UpdateAbattoir from "../Pages/ManageAbattoir/UpdateAbattoir";

const manageabattoirEndpoints = {
  get basepath() {
    return "/quan-ly-lo-mo";
  },
  get home() {
    return this.basepath;
  },
  get createabattoir() {
    return this.basepath.concat("/tao-lo-mo");
  },
  get updateabattoir() {
    return this.basepath.concat("/cap-nhat-lo-mo/:id");
  },
};

const manageabattoirRoutes = [
  <Route
    path={manageabattoirEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <ManageAbattoir />
      </PrivateRoute>
    }
    key="abattoir-page"
  />,
  <Route
    path={manageabattoirEndpoints.createabattoir}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateAbattoir />
      </PrivateRoute>
    }
    key="abattoir-page-create"
  />,
  <Route
    path={manageabattoirEndpoints.updateabattoir}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateAbattoir />
      </PrivateRoute>
    }
    key="abattoir-page-update"
  />,
];

export { manageabattoirRoutes, manageabattoirEndpoints };
