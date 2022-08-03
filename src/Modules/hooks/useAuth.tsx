import { UserLoginModel } from "Components/Shared/Models/User";
import { useStoreDispatch, useStoreSelector } from "Modules/Redux";
import loginReducer, {
  login,
  logout,
} from "Modules/Redux/reducer/loginReducer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { publicEndpoints } from "Components/router/PublicRoutes";
import moment from "moment";

export const useAuth = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const RefreshToken = (token: string) => {
    return;
  };

  const setUser = (user: UserLoginModel) => {
    Cookies.set("user", JSON.stringify(user), {
      path: "/",
      expires: 1 / 24,
      sameSite: "Strict",
    });

    const expired = moment(new Date(user.expired), "DD-MM-YYYY hh:mm:ss");
    const now = moment(new Date(), "DD-MM-YYYY hh:mm:ss");

    if (!expired.isBefore(now.add(-15, "seconds"))) {
      const timediff = expired.diff(now, "milliseconds", false);
      console.log(timediff);

      setTimeout(() => {
        singOut();
        navigate(publicEndpoints.login);
      }, timediff);
    } else {
    }

    dispatch(login(user));
  };

  const singOut = () => {
    Cookies.remove("user", { path: "/" });
    dispatch(logout());
  };

  const user: UserLoginModel = useStoreSelector((state: any) => {
    return state?.login?.user;
  });

  const userCookie = Cookies.get("user");
  const curUser = userCookie ? JSON.parse(userCookie) : null;
  if (curUser && !user) {
    setUser(curUser);
    return { user: curUser as UserLoginModel, setUser, singOut };
  }

  return { user, setUser, singOut };
};
