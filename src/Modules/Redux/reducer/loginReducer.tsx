import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginModel } from "Components/Shared/Models/User";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
  },
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
