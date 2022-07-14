import { UserLoginModel } from "Components/Shared/Models/User";
import { useStoreDispatch, useStoreSelector } from "Modules/Redux";
import { login } from "Modules/Redux/reducer/loginReducer";

export const useAuth = () => {
  const dispatch = useStoreDispatch();

  const RefreshToken = (token: string) => {
    return;
  };

  const setUser = (user: UserLoginModel) => {
    dispatch(login(user));
  };

  const user: UserLoginModel = useStoreSelector(
    (state: any) => state?.login?.user
  );
  return { user, setUser };
};
