import { UserLoginModel } from "Components/Shared/Models/User";
import { useStoreDispatch, useStoreSelector } from "Modules/Redux";
import loginReducer, {
  login,
  logout,
} from "Modules/Redux/reducer/loginReducer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AccountApiEndpoint from "Api/AccountApiRoute";
import { publicEndpoints } from "Components/router/routes";

export const useAuth = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const exptime = 1;

  const RefreshToken = async (token: string) => {
    return fetch(
      process.env.REACT_APP_API.concat(AccountApiEndpoint.refreshToken),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
  };

  const setUser = (user: UserLoginModel) => {
    const newexp = moment(new Date(), "DD-MM-YYYY hh:mm:ss")
      .add(exptime, "hours")
      .toString();
    user.expired = user?.expired ?? newexp;

    Cookies.set("user", JSON.stringify(user), {
      path: "/",
      expires: exptime / 24,
      sameSite: "Strict",
    });

    const expired = moment(new Date(user.expired), "DD-MM-YYYY hh:mm:ss");
    const now = moment(new Date(), "DD-MM-YYYY hh:mm:ss");

    if (!expired.isBefore(now.add(15, "seconds"))) {
      const timediff = expired.diff(now, "milliseconds", false);
      dispatch(login(user));
      setTimeout(() => {
        RefreshToken(user.refreshToken)
          .then((data) => {
            if (data) {
              setUser(data);
            } else {
              singOut();
              navigate(publicEndpoints.login);
            }
          })
          .catch((error) => {
            console.log(error);
            singOut();
            navigate(publicEndpoints.login);
          });
      }, timediff);
    } else {
      singOut();
      navigate(publicEndpoints.login);
    }
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
