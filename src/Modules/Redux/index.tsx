import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducer/loginReducer";
import commonSlice from "./reducer/CommonReducer";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

const appStore = configureStore({
  reducer: {
    login: loginSlice,
    common: commonSlice,
  },
});

type storeDispatch = typeof appStore.dispatch;
type storeState = typeof appStore.getState;

export default appStore;
export const useStoreDispatch: () => storeDispatch = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<storeState> = useSelector;
