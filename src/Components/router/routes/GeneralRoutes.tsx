import HomePage from "Components/Pages/Home/Home";
import { NotFound } from "Components/Pages/Home/NotFound";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { generalEndpoints, publicEndpoints } from ".";

const GeneralRoutes = [
  <Route
    path={generalEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <HomePage />
      </PrivateRoute>
    }
    key="home-page"
  />,
  <Route
    path={generalEndpoints.notfound}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <NotFound />
      </PrivateRoute>
    }
    key="chuc-nang-dang-phat-trien"
  />,
];

export { GeneralRoutes };
