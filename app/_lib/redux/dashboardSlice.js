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
  },
});

export const { onToggleTheme } = dashboardSlice.actions;

export default dashboardSlice.reducer;

export const getTheme = (store) => store.dashboard;
