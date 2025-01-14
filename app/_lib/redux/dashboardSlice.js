import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInvoiceFormOpen: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    onToggleInvoiceForm(state) {
      state.isInvoiceFormOpen = !state.isInvoiceFormOpen;
    },
  },
});

export const { onToggleInvoiceForm } = dashboardSlice.actions;

export default dashboardSlice.reducer;
