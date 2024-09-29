import { createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
  colourMode: "dark" | "light" | "system";
}

const initialState: PreferencesState = {
  colourMode:
    localStorage.getItem("colourMode") === "dark"
      ? "dark"
      : localStorage.getItem("colourMode") === "light"
        ? "light"
        : "system",
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    nextColourMode: (state) => {
      if (state.colourMode === "system") {
        state.colourMode = "dark";
      } else if (state.colourMode === "dark") {
        state.colourMode = "light";
      } else if (state.colourMode === "light") {
        state.colourMode = "system";
      }
      localStorage.setItem("colourMode", state.colourMode);
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextColourMode } = preferencesSlice.actions;

export default preferencesSlice.reducer;
