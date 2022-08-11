import ManageReceipt from "Components/Pages/ManageReceipt/ManageReceipt";
import CreateReceipt from "Components/Pages/ManageReceipt/CreateReceipt";
import UpdateReceipt from "Components/Pages/ManageReceipt/UpdateReceipt";
import { manageReceiptEndpoints, publicEndpoints } from ".";
import { Route } from "react-router-dom";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { CreateAllocate } from "Components/Pages/ManageReceipt/CreateAllocate";
import { CreateReceiptReport } from "Components/Pages/ReceiptReport/CreateReceiptReport";

const ManageReceiptRoutes = [
  <Route
    path={manageReceiptEndpoints.home}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <ManageReceipt />
      </PrivateRoute>
    }
    key="Manage-Receipt-page"
  />,
  <Route
    path={manageReceiptEndpoints.createreceipt}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateReceipt />
      </PrivateRoute>
    }
    key="Create-Receipt-page"
  />,
  <Route
    path={manageReceiptEndpoints.updatereceipt}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateReceipt />
      </PrivateRoute>
    }
    key="Update-Receipt-page"
  />,
  <Route
    path={manageReceiptEndpoints.createAllocate}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateAllocate />
      </PrivateRoute>
    }
    key="create-allocate"
  />,

  <Route
    path={manageReceiptEndpoints.createReceiptReport}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateReceiptReport />
      </PrivateRoute>
    }
    key="create-receipt-report"
  />,


];

export { ManageReceiptRoutes };
