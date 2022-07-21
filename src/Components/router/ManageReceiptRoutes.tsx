import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Route } from "react-router-dom";
import { publicEndpoints } from "./PublicRoutes";
import React from "react";
import ManageReceipt from "Components/Pages/ManageReceipt/ManageReceipt";
import CreateReceipt from "Components/Pages/ManageReceipt/CreateReceipt";
import UpdateReceipt from "Components/Pages/ManageReceipt/UpdateReceipt";

const managereceiptEndpoints = {
  get basepath() {
    return "/quan-ly-hoa-don";
  },
  get home() {
    return this.basepath;
  },
  get createreceipt() {
    return this.basepath.concat("/tao-hoa-don");
  },
  get updatereceipt() {
    return this.basepath.concat("/cap-nhat-hoa-don/:id");
  },
};

const managereceiptRoutes = [
  <Route
    path={managereceiptEndpoints.basepath}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <ManageReceipt />
      </PrivateRoute>
    }
    key="abattoir-page"
  />,
  <Route
    path={managereceiptEndpoints.createreceipt}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <CreateReceipt />
      </PrivateRoute>
    }
    key="abattoir-page-create"
  />,
  <Route
    path={managereceiptEndpoints.updatereceipt}
    element={
      <PrivateRoute path={publicEndpoints.login}>
        <UpdateReceipt />
      </PrivateRoute>
    }
    key="abattoir-page-update"
  />,
];

export { managereceiptRoutes, managereceiptEndpoints };
