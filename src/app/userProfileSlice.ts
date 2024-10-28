import { createSlice } from "@reduxjs/toolkit";
import { api } from "./apiSlice";

interface UserProfileState {
  loggedIn: boolean;
  level: "user" | "admin" | "superuser";
  exp: string;
  token: string;
}

export const userProfileSlice = createSlice({
  name: "sessionMetadata",
  initialState: () => {
    const loadedLoginDetails: UserProfileState = JSON.parse(
      localStorage.getItem("yps-login") || "{}",
    );
    const loginExpirationTime = new Date(
      loadedLoginDetails.exp || "1995-12-17T03:24:00",
    ).getTime();
    if (loadedLoginDetails && new Date().getTime() < loginExpirationTime) {
      return loadedLoginDetails;
    }

    const initialState: UserProfileState = {
      loggedIn: false,
      level: "user",
      exp: "",
      token: "",
    };
    return initialState;
  },
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.level = "user";
      state.exp = "";
      state.token = "";
      localStorage.removeItem("yps-login");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.loggedIn = true;
        state.level = payload.level;
        state.exp = payload.exp;
        state.token = payload.token;
        console.log("login matcher reducer ran!");
        localStorage.setItem(
          "yps-login",
          JSON.stringify({
            loggedIn: true,
            level: payload.level,
            exp: payload.exp,
            token: payload.token,
          }),
        );
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userProfileSlice.actions;

export default userProfileSlice.reducer;
