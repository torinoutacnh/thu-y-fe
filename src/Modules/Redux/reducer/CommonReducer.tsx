import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonInfo {
  loading?: boolean;
}

const init: CommonInfo = {
  loading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: init,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loading } = commonSlice.actions;
export default commonSlice.reducer;
