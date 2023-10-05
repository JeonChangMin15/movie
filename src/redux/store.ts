import { configureStore } from "@reduxjs/toolkit";

import chartReducer from "./feature/chart/chartSlice";
import posterReducer from "./feature/poster/posterSlice";
import loginReducer from "./feature/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    poster: posterReducer,
    chart: chartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
