import LoginPage from "Components/Pages/Login/Login";
import RegisterPage from "Components/Pages/Register/Register";
import { Route } from "react-router-dom";
import React from "react";

const publicEndpoints = {
  login: "/dang-nhap",
  register: "/dang-ky",
  home: "/",
};

const PublicRoutes = [
  <Route path={publicEndpoints.login} element={<LoginPage />} key={"login"} />,
  <Route
    path={publicEndpoints.register}
    element={<RegisterPage />}
    key="register-page"
  />,
];

export { publicEndpoints, PublicRoutes };
