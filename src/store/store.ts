import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import schedulerSlice from "../slices/schedulerSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["scheduler"],
};

const rootReducer = combineReducers({
  scheduler: schedulerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
