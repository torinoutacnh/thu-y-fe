import StaffHome from "Components/Pages/Staff";
import UpdateStaff from "Components/Pages/Staff/UpdateStaff";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import React from "react";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";

const staffEndpoints = {
  get basepath() {
    return "/nhan-vien";
  },
  get home() {
    return this.basepath;
  },
  get createStaff() {
    return this.basepath.concat("/them-nhan-vien");
  },
  get updateStaff() {
    return this.basepath.concat("/thong-tin-nhan-vien/:id");
  },
};

const StaffRoutes = [
  <Route
    path={staffEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <StaffHome />
      </PrivateRoute>
    }
    key="staff"
  />,
  <Route
    path={staffEndpoints.updateStaff}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateStaff />
      </PrivateRoute>
    }
    key="staff-update"
  />,
];

export { staffEndpoints, StaffRoutes };
