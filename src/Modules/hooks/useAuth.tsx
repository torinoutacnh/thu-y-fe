import { useStoreDispatch, useStoreSelector } from "Modules/Redux";
import { login } from "Modules/Redux/reducer/loginReducer";
import { userInfo } from "Modules/Redux/reducer/loginReducer";

export const useAuth = () => {
  const dispatch = useStoreDispatch();

  const RefreshToken = (token: string) => {
    return;
  };

  const setUser = (user: userInfo) => {
    dispatch(login(user));
  };

  const user = useStoreSelector((state: any) => state?.login?.user);
  return { user, setUser };
};
