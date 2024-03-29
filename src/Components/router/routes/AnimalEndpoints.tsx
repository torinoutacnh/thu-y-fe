import AnimalHome from "Components/Pages/Animal";
import CreateAnimal from "Components/Pages/Animal/CreateAnimal";
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

  <Route
    path={animalEndpoints.createAnimal}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateAnimal />
      </PrivateRoute>
    }
    key="animal-create"
  />,

];

export { AnimalRoutes };
