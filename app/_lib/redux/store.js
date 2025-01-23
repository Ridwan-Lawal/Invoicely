import dashboardReducer from "@/app/_lib/redux/dashboardSlice";
import formReducer from "@/app/_lib/redux/formSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    form: formReducer,
  },
});

export default store;
