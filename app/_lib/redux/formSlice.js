import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formDataToEdit: null,
  formType: "create",
  isInvoiceFormOpen: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    editForm(state, action) {
      state.formDataToEdit = action.payload;
      state.formType = "edit";
    },

    onToggleInvoiceForm(state) {
      state.isInvoiceFormOpen = !state.isInvoiceFormOpen;
      state.formType = "create";
    },

    clearForm(state) {
      state.formDataToEdit = null;
      state.formType = "create";
    },
  },
});

export const { editForm, clearForm, onToggleInvoiceForm } = formSlice.actions;

export default formSlice.reducer;
