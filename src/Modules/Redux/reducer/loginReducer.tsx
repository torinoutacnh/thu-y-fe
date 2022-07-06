import { createSlice } from "@reduxjs/toolkit";

export interface userInfo {
    accesstoken?: string;
    name?: string;
    emai?: string;
    phone?: string;
    role?: number;
}

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: state => {
            state.user = null;
        }
    }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;