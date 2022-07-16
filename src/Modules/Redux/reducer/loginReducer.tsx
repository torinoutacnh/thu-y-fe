import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginModel } from "Components/Shared/Models/User";

type initProp = {
  user: UserLoginModel;
};

const initValue: initProp = {
  user: undefined,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initValue,
  reducers: {
    login: (state, action: PayloadAction<UserLoginModel>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
