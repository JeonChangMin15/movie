import { configureStore } from "@reduxjs/toolkit";

import thunkPosterRuducer from "./feature/poster/thunkposterSlice";
import chartReducer from "./feature/chart/chartSlice";
import pageRuducer from "./feature/poster/pageSlice";
import loginReducer from "./feature/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    page: pageRuducer,
    chart: chartReducer,
    thunkPoster: thunkPosterRuducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
