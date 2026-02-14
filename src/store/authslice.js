import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
      localStorage.setItem("accessToken", accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");

    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;