import AnimalHome from "Components/Pages/Animal";
import HomePage from "Components/Pages/Home/Home";

import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { publicEndpoints, PublicRoutes } from "./PublicRoutes";
import { QuarantineRoutes } from "./QuarantineRoutes";
import { StaffRoutes } from "./StaffRoutes";
import React from "react";
import { AbattoirRoutes } from "./AbattoirRoutes";
import { useAuth } from "Modules/hooks/useAuth";

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
    // get delete() {
    //   return this.basepath.concat("/:id");
    // },
    // get create() {
    //   return this.basepath.concat("/create");
    // },
    // get update() {
    //   return this.basepath.concat("/update");
    // },
  };
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
      {StaffRoutes.map((route) => route)}
      {/* /////////////////////////////////////////////// */}

      <Route
        path={RouteEndpoints.animal.basepath}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <AnimalHome />
          </PrivateRoute>
        }
        key="staff"
      />

      {/* /////////////////////////////////////////////// */}

      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
