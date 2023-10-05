import { configureStore } from "@reduxjs/toolkit";

import posterReducer from "./feature/poster/posterSlice";
import loginReducer from "./feature/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    poster: posterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
