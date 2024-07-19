import { createSlice } from "@reduxjs/toolkit";

const access_token = localStorage.getItem("access_token");
const refresh_token = localStorage.getItem("refresh_token");

const initialState = {
  isLogin: null,
  isLoggedIn: access_token && refresh_token ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showLogin(state, action) {
     state.isLogin = true; 
    },
    showSignup(state, action) {
     state.isLogin = false;
    },
    changeLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { showLogin, showSignup, changeLoggedIn } = authSlice.actions;
