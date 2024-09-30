import { configureStore } from "@reduxjs/toolkit";
import schedulerSlice from "../slices/schedulerSlice";

export const store = configureStore({
  reducer: {
    scheduler: schedulerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
