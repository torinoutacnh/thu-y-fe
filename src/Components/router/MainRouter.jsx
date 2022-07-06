import Abattoir from "Components/Pages/Abattoir/Abattoir";
import HomePage from "Components/Pages/Home/Home";
import LoginPage from "Components/Pages/Login/Login";
import Quarantine from "Components/Pages/Quarantine/Quarantine";
import RegisterPage from "Components/Pages/Register/Register";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import React from "react";
import { Routes, Route } from "react-router-dom";

// export const RouteEndpoints = {
//   home:{basepath:"/"},
//   user:{
//     basepath: "/tai-khoan",
//     login: "/dang-nhap",
//     register: "/dang-ky"
//   },
//   quarantine:{basepath:"/kiem-dich"},
//   abattoir:{
//     basepath:"/lo-mo"

//   }
// }

export class RouteEndpoints{
  static home = {basepath:"/"};
  static user = {
    basepath: "/tai-khoan",
    login: "/dang-nhap",
    register: "/dang-ky"
  };
  static quarantine = {basepath:"/kiem-dich"};
  static abattoir = {
    get basepath(){
      return "/lo-mo";
    },
    get detail(){
      return this.basepath.concat("/:id");
    },
    get create(){
      return this.basepath.concat("/create");
    },
    get update(){
      return this.basepath.concat("/update");
    }
  }
}

export default function MainRouter(){
  return (
    <Routes>
      <Route exact path={RouteEndpoints.user.login} element={<LoginPage/>} />
      <Route exact path={RouteEndpoints.user.register} element={<RegisterPage/>} />
      <Route exact path={RouteEndpoints.home.basepath} element={
        <PrivateRoute path={RouteEndpoints.user.login}>
          <HomePage/>
        </PrivateRoute>
      } key="home-page"/>
      <Route exact path={RouteEndpoints.quarantine.basepath} element={
        <PrivateRoute path={RouteEndpoints.user.login}>
          <Quarantine/>
        </PrivateRoute>
      } key="quarantine-page"/>
       <Route exact path={RouteEndpoints.abattoir.basepath} element={
        <PrivateRoute path={RouteEndpoints.user.login}>
          <Abattoir/>
        </PrivateRoute>
      } key="abattoir-page"/>
    </Routes>
  );
}