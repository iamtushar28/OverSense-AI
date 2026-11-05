import { configureStore } from "@reduxjs/toolkit";
import { cricketApi } from "./services/cricketApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [cricketApi.reducerPath]: cricketApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cricketApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
