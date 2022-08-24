import { AbattoirPage } from "Components/Pages/Abattoir/nhat-ky-giet-mo";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { abattoirEndpoints, publicEndpoints } from ".";
import CNKDSPDV from "Components/Pages/Abattoir/CN-kiem-dich-san-pham-dong-vat";
import CreateAbattoirReportPage from "Components/Pages/Abattoir/create";
import UpdateAbattoirReportPage from "Components/Pages/Abattoir/update";
import CreateAbattoir from "Components/Pages/ManageAbattoir/CreateAbattoir";
import { SlaughterRevenue } from "Components/Pages/Revenue/SlaughterRevenue";

const AbattoirRoutes = [
  <Route
    path={abattoirEndpoints.nkgm}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <AbattoirPage />
      </PrivateRoute>
    }
    key="abattoir-butcher-diary-page"
  />,
  <Route
    path={abattoirEndpoints.cnkdxkdv}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CNKDSPDV />
      </PrivateRoute>
    }
    key="abattoir-confirm-qarantine-animal-product-page"
  />,
  <Route
    path={abattoirEndpoints.createreport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateAbattoirReportPage />
      </PrivateRoute>
    }
    key="abattoir-page-create"
  />,
  <Route
    path={abattoirEndpoints.updatereport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateAbattoirReportPage />
      </PrivateRoute>
    }
    key="abattoir-page-update"
  />,

  <Route
    path={abattoirEndpoints.createAbattoi}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateAbattoir />
      </PrivateRoute>
    }
    key="abattoir-create"
  />,

  <Route
    path={abattoirEndpoints.revenue}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <SlaughterRevenue />
      </PrivateRoute>
    }
    key="slaughter-revenue"
  />,


];

export { AbattoirRoutes };
