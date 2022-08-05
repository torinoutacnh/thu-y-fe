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
import { NotFound } from "Components/Pages/NotFound";
import { managereceiptRoutes } from "./ManageReceiptRoutes";
import { useAuth } from "Modules/hooks/useAuth";
import { manageabattoirRoutes } from "./ManageAbattoirRoutes";
import { Verify } from "crypto";
import { VerifyEmail } from "Components/Pages/Register/VerifyEmail";
import { MyAllocateReceipt } from "Components/Pages/ManageReceipt/MyAllocateReceipt";
import ReceiptReportIndex from "Components/Pages/ReceiptReport";
import { VerifyForgotPassword } from "Components/Pages/User/VerifyForgotPassword";
import { PrintPDF12B } from "Components/Pages/PrintPDF/PrintPDF12B";
import FormTest from "Components/Pages/TestPages";
import { PrintPDF12D } from "Components/Pages/PrintPDF/PrintPDF12D";
import { PrintPDF1 } from "Components/Pages/PrintPDF/PrintPDF1";
import { PrintPDF7 } from "Components/Pages/PrintPDF/PrintPDF7";

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

  static printPdf12b = "/pdf12b"
  static printPdf12d = "/pdf12d"
  static printPdf7 = "/pdf7"
  static printPdf1 = "/pdf1"

  static verifyEmail = "/verify"


  static forgotPass = "/forgotpass";

  static myAllocate = "/hoa-don-cua-toi";

  // static updateAllocate = "/cap-nhat-hoa-don/:id"
  static receiptReportWithIdAllocate = "/chi-tiet-hoa-don-cua-toi/:id";

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
        path={RouteEndpoints.notfound}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <NotFound />
          </PrivateRoute>
        }
        key="chuc-nang-dang-phat-trien"
      />

      <Route
        path={RouteEndpoints.verifyEmail}
        element={<VerifyEmail />}
        key="verifyEmail"
      />
      <Route
        path={RouteEndpoints.forgotPass}
        element={<VerifyForgotPassword />}
        key="forgotPassword"
      />

      <Route
        path={RouteEndpoints.myAllocate}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <MyAllocateReceipt />
          </PrivateRoute>
        }
        key="my-allocate-receipt"
      />

      {/* <Route
        path={RouteEndpoints.updateAllocate}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <MyAllocateReceipt />
          </PrivateRoute>
        }
        key="update-allocate-receipt"
      /> */}
      <Route
        path={RouteEndpoints.receiptReportWithIdAllocate}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <ReceiptReportIndex />
          </PrivateRoute>
        }
        key="update-allocate-receipt"
      />

      <Route
        path={RouteEndpoints.printPdf12b}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <PrintPDF12B />
          </PrivateRoute>
        }
        key="print-pdf12b"
      />

      <Route
        path={RouteEndpoints.printPdf12d}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <PrintPDF12D />
          </PrivateRoute>
        }
        key="print-pdf12d"
      />
      <Route
        path={RouteEndpoints.printPdf1}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <PrintPDF1 />
          </PrivateRoute>
        }
        key="print-pdf1"
      />
      <Route
        path={RouteEndpoints.printPdf7}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <PrintPDF7 />
          </PrivateRoute>
        }
        key="print-pdf7"
      />




      {/* /////////////////////////////////////////////// */}
      <Route path={"/test"} element={<FormTest />} key="test form" />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
