import { UserLoginModel } from "Components/Shared/Models/User";
import { useStoreDispatch, useStoreSelector } from "Modules/Redux";
import loginReducer, {
  login,
  logout,
} from "Modules/Redux/reducer/loginReducer";
import Cookies from "js-cookie";

export const useAuth = () => {
  const dispatch = useStoreDispatch();

  const RefreshToken = (token: string) => {
    return;
  };

  const setUser = (user: UserLoginModel) => {
    Cookies.set("user", JSON.stringify(user), {
      path: "/",
      expires: 1 / 24,
      sameSite: "Strict",
    });
    dispatch(login(user));
  };

  const user: UserLoginModel = useStoreSelector((state: any) => {
    return state?.login?.user;
  });

  const userCookie = Cookies.get("user");
  const curUser = userCookie ? JSON.parse(userCookie) : null;
  if (curUser && !user) {
    dispatch(login(curUser));
    return { user: curUser as UserLoginModel, setUser };
  }

  return { user, setUser };
};
