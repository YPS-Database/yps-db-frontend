import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, useStore } from "react-redux";

import { api } from "./apiSlice";
import { preferencesSlice } from "./preferencesSlice";

// listener middleware, used to send store data to local storage
const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    preferences: preferencesSlice.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(api.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// configure listeners using the provided defaults
setupListeners(store.dispatch);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
