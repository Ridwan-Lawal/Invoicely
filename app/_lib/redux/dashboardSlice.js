import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isThemeDark: false,
  isDeleteModalOpen: false,
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
    onToggleDeleteModal(state) {
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
    },
  },
});

export const { onToggleTheme, onUpdateTheme, onToggleDeleteModal } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;

export const getTheme = (store) => store.dashboard;

export const getDeleteModalValue = (store) => store.dashboard.isDeleteModalOpen;
