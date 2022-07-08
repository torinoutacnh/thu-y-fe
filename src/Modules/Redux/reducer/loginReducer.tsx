import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInfo {
    token?: string;
    name?: string;
    account?: string;
    role?: number;
}

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action: PayloadAction<userInfo>) => {
            state.user = action.payload;
        },
        logout: (state, action: PayloadAction<userInfo>) => {
            state.user = action.payload;
        },
    }
})

export const { login } = loginSlice.actions;
export default loginSlice.reducer;