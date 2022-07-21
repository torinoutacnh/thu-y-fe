import AnimalHome from "Components/Pages/Animal";
import HomePage from "Components/Pages/Home/Home";
import UpdateAnimal from "Components/Pages/Animal/UpdateAnimal";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { publicEndpoints, PublicRoutes } from "./PublicRoutes";
import { QuarantineRoutes } from "./QuarantineRoutes";

import { StaffRoutes } from "./StaffRoutes";
import React from "react";
import { AbattoirRoutes } from "./AbattoirRoutes";

import UserInfo from "Components/Pages/Password";
import { NotFound } from "Components/Pages/NotFound";
import { managereceiptRoutes } from "./ManageReceiptRoutes";
import { useAuth } from "Modules/hooks/useAuth";
import { manageabattoirRoutes } from "./ManageAbattoirRoutes";

export class RouteEndpoints {
  static home = { basepath: "/" };

  //////////////////////////////////////////////////
  static animal = {
    get basepath() {
      return "/dong-vat";
    },
    get updateAnimal() {
      return this.basepath.concat("/sua-dong-vat/:id");
    },
  };

  static userInfo = "/thong-tin-ca-nhan";

  static notfound = "/chuc-nang-dang-phat-trien";

  ///////////////////////////////////////////////////
}

export default function MainRouter() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path={RouteEndpoints.home.basepath}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <HomePage />
          </PrivateRoute>
        }
        key="home-page"
      />
      {PublicRoutes.map((route) => route)}
      {QuarantineRoutes.map((route) => route)}
      {AbattoirRoutes.map((route) => route)}
      {managereceiptRoutes.map((route) => route)}
      {StaffRoutes.map((route) => route)}
      {manageabattoirRoutes.map((route) => route)}
      <Route
        path={RouteEndpoints.animal.basepath}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <AnimalHome />
          </PrivateRoute>
        }
        key="animal"
      />
      <Route
        path={RouteEndpoints.animal.updateAnimal}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <UpdateAnimal />
          </PrivateRoute>
        }
        key="animal-update"
      />
      <Route
        path={RouteEndpoints.userInfo}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <UserInfo />
          </PrivateRoute>
        }
        key="reset-password"
      />
      <Route
        path={RouteEndpoints.notfound}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <NotFound />
          </PrivateRoute>
        }
        key="chuc-nang-dang-phat-trien"
      />
      ec6089d2d4eb0ae7867bbdb032fe6c2ebf649f76
      {/* /////////////////////////////////////////////// */}
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
