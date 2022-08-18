import {
  CreateQuarantineReportPage,
  MedicalHygiene,
  QuarantinePage,
  RegisterQuarantinePage,
  UpdateQuarantineReportPage,
} from "Components/Pages/Quarantine";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints, quarantineEndpoints } from ".";

const QuarantineRoutes = [
  <Route
    path={quarantineEndpoints.cnkd}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <QuarantinePage />
      </PrivateRoute>
    }
    key="quarantine-page"
  />,
  <Route
    path={quarantineEndpoints.vsyt}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <MedicalHygiene />
      </PrivateRoute>
    }
    key="quarantine-page"
  />,
  <Route
    path={quarantineEndpoints.dkkd}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <RegisterQuarantinePage />
      </PrivateRoute>
    }
    key="quarantine-page"
  />,
  <Route
    path={quarantineEndpoints.createreport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateQuarantineReportPage />
      </PrivateRoute>
    }
    key="quarantine-page-create"
  />,

  <Route
    path={quarantineEndpoints.updatereport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateQuarantineReportPage />
      </PrivateRoute>
    }
    key="quarantine-page-update"
  />,
];

export { QuarantineRoutes };
