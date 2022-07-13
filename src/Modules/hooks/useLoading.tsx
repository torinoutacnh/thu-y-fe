import { useStoreDispatch, useStoreSelector } from "Modules/Redux";
import { loading } from "Modules/Redux/reducer/CommonReducer";

export const useLoading = () => {
  const dispatch = useStoreDispatch();

  function setLoading(load: boolean) {
    dispatch(loading(load));
  }

  const isloading = useStoreSelector((state: any) => {
    return state?.common?.loading;
  });
  return { isloading, setLoading };
};
