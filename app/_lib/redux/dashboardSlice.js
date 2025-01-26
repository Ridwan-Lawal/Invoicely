import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isThemeDark: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    onToggleTheme(state, action) {
      state.isThemeDark = !state.isThemeDark;
    },
    onUpdateTheme(state, action) {
      state.isThemeDark = action.payload;
    },
  },
});

export const { onToggleTheme, onUpdateTheme } = dashboardSlice.actions;

export default dashboardSlice.reducer;

export const getTheme = (store) => store.dashboard;
