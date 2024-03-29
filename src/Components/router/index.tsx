import { PrivateRoute } from "Modules/PrivateRoute/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { QuarantineRoutes } from "./routes/QuarantineRoutes";
import { StaffRoutes } from "./routes/StaffRoutes";
import { AbattoirRoutes } from "./routes/AbattoirRoutes";
import { ManageReceiptRoutes } from "./routes/ReceiptRoutes";
import { useAuth } from "Modules/hooks/useAuth";
import { MyAllocateReceipt } from "Components/Pages/ManageReceipt/MyAllocateReceipt";
import ReceiptReportIndex from "Components/Pages/ReceiptReport";
import { GeneralRoutes } from "./routes/GeneralRoutes";
import { AnimalRoutes } from "./routes/AnimalEndpoints";
import { ManageAbattoirRoutes } from "./routes/AbattoirAdminRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { publicEndpoints } from "./routes";
import { RoleType } from "Components/Shared/Models/User";

export class RouteEndpoints {
  static userInfo = "/thong-tin-ca-nhan";

  static myAllocate = "/hoa-don-cua-toi";

  static receiptReportWithIdAllocate = "/chi-tiet-hoa-don-cua-toi/:id";
}

export default function MainRouter() {
  const { user } = useAuth();
  return (
    <Routes>
      {PublicRoutes.map((route) => route)}

      {/* home, not found,... etc */}
      {GeneralRoutes.map((route) => route)}

      {/* Employee routes */}
      {QuarantineRoutes.map((route) => route)}
      {AbattoirRoutes.map((route) => route)}

      {/* Manager routes */}
      {user?.role === RoleType["Quản lý"] &&
        ManageAbattoirRoutes.map((route) => route)}
      {user?.role === RoleType["Quản lý"] &&
        ManageReceiptRoutes.map((route) => route)}
      {user?.role === RoleType["Quản lý"] && StaffRoutes.map((route) => route)}
      {user?.role === RoleType["Quản lý"] && AnimalRoutes.map((route) => route)}

      <Route
        path={RouteEndpoints.myAllocate}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <MyAllocateReceipt />
          </PrivateRoute>
        }
        key="my-allocate-receipt"
      />

      <Route
        path={RouteEndpoints.receiptReportWithIdAllocate}
        element={
          <PrivateRoute path={publicEndpoints.login}>
            <ReceiptReportIndex />
          </PrivateRoute>
        }
        key="update-allocate-receipt"
      />

      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
