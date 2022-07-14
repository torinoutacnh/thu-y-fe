import Abattoir from "Components/Pages/Abattoir/Abattoir";
import HomePage from "Components/Pages/Home/Home";
import LoginPage from "Components/Pages/Login/Login";
import Quarantine from "Components/Pages/Quarantine";
import CreateReportPage from "Components/Pages/Quarantine/CreateReportPage";
import UpdateReportPage from "Components/Pages/Quarantine/UpdateReportPage";

import RegisterPage from "Components/Pages/Register/Register";
import Report from "Components/Pages/Report/Report";
import StaffHome from "Components/Pages/Staff";
import CreateStaff from "Components/Pages/Staff/CreateStaff";
import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import React from "react";
import { Routes, Route } from "react-router-dom";

export class RouteEndpoints {
  static home = { basepath: "/" };
  static user = {
    basepath: "/tai-khoan",
    login: "/dang-nhap",
    register: "/dang-ky",
    report: "/bao-cao",
  };
  static quarantine = {
    get basepath() {
      return "/kiem-dich";
    },
    get createreport() {
      return this.basepath.concat("/tao-bao-cao");
    },
    get updatereport() {
      return this.basepath.concat("/cap-nhat-bao-cao/:id");
    },
  };
  static staff = {
    get basepath() {
      return "/nhan-vien";
    },
    get createStaff() {
      return this.basepath.concat("/them-nhan-vien");
    },
    get updateStaff() {
      return this.basepath.concat("/thong-tin-nhan-vien/:id");
    },
  };
  static abattoir = {
    get basepath() {
      return "/lo-mo";
    },
    get detail() {
      return this.basepath.concat("/:id");
    },
    get create() {
      return this.basepath.concat("/create");
    },
    get update() {
      return this.basepath.concat("/update");
    },
  };
}

export default function MainRouter() {
  return (
    <Routes>
      <Route exact path={RouteEndpoints.user.login} element={<LoginPage />} />
      <Route
        exact
        path={RouteEndpoints.user.register}
        element={<RegisterPage />}
        key="register-page"
      />
      <Route
        exact
        path={RouteEndpoints.home.basepath}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <HomePage />
          </PrivateRoute>
        }
        key="home-page"
      />
      <Route
        exact
        path={RouteEndpoints.quarantine.basepath}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <Quarantine />
          </PrivateRoute>
        }
        key="quarantine-page"
      />
      <Route
        exact
        path={RouteEndpoints.quarantine.createreport}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <CreateReportPage />
          </PrivateRoute>
        }
        key="quarantine-page-create"
      />
      <Route
        exact
        path={RouteEndpoints.quarantine.updatereport}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <UpdateReportPage />
          </PrivateRoute>
        }
        key="quarantine-page-update"
      />
      <Route
        exact
        path={RouteEndpoints.abattoir.basepath}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <Abattoir />
          </PrivateRoute>
        }
        key="abattoir-page"
      />
      <Route exact path={RouteEndpoints.user.report} element={<Report />} />
      <Route
        exact
        path={RouteEndpoints.quarantine.quarantine}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <Quarantine />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={RouteEndpoints.staff.basepath}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <StaffHome />
          </PrivateRoute>
        }
        key="staff"
      />
      <Route
        exact
        path={RouteEndpoints.staff.createStaff}
        element={
          <PrivateRoute path={RouteEndpoints.user.login}>
            <CreateStaff />
          </PrivateRoute>
        }
        key="staff"
      />

      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
