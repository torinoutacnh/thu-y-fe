import StaffHome from "Components/Pages/Staff";
import UpdateStaff from "Components/Pages/Staff/UpdateStaff";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints, staffEndpoints } from ".";

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

export { StaffRoutes };
