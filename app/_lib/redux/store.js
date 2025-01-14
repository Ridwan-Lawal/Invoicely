import dashboardReducer from "@/app/_lib/redux/dashboardSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

export default store;
