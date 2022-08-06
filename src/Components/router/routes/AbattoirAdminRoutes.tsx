import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import ManageAbattoir from "../../Pages/ManageAbattoir/ManageAbattoir";
import CreateAbattoir from "../../Pages/ManageAbattoir/CreateAbattoir";
import UpdateAbattoir from "../../Pages/ManageAbattoir/UpdateAbattoir";
import { manageabattoirEndpoints, publicEndpoints } from ".";

const ManageAbattoirRoutes = [
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

export { ManageAbattoirRoutes };
