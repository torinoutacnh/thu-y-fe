import { useStoreSelector } from "Modules/Redux";
import { userInfo } from "Modules/Redux/reducer/loginReducer";

export const useAuth = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = useStoreSelector((state: any) => state?.login?.user);
    return user as userInfo;
};