import LoginPage from "Components/Pages/Login/Login";
import RegisterPage from "Components/Pages/Register/Register";
import { VerifyEmail } from "Components/Pages/Register/VerifyEmail";
import { VerifyForgotPassword } from "Components/Pages/User/VerifyForgotPassword";
import { Route } from "react-router-dom";
import { publicEndpoints } from ".";

const PublicRoutes = [
  <Route path={publicEndpoints.login} element={<LoginPage />} key={"login"} />,
  <Route
    path={publicEndpoints.register}
    element={<RegisterPage />}
    key="register-page"
  />,
  <Route
    path={publicEndpoints.verifyEmail}
    element={<VerifyEmail />}
    key="verifyEmail"
  />,
  <Route
    path={publicEndpoints.forgotPass}
    element={<VerifyForgotPassword />}
    key="forgotPassword"
  />,
];

export { PublicRoutes };
