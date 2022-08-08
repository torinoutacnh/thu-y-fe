import AnimalHome from "Components/Pages/Animal";
import UpdateAnimal from "Components/Pages/Animal/UpdateAnimal";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { animalEndpoints, publicEndpoints } from ".";

const AnimalRoutes = [
  <Route
    path={animalEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <AnimalHome />
      </PrivateRoute>
    }
    key="animal"
  />,
  <Route
    path={animalEndpoints.updateAnimal}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateAnimal />
      </PrivateRoute>
    }
    key="animal-update"
  />,
];

export { AnimalRoutes };
