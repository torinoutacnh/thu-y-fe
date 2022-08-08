import LoginPage from "Components/Pages/authentication/Login";
import RegisterPage from "Components/Pages/authentication/Register";
import { VerifyEmail } from "Components/Pages/authentication/VerifyEmail";
import { VerifyForgotPassword } from "Components/Pages/authentication/VerifyForgotPassword";
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
