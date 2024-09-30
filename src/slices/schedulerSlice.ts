import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectOptions } from "../interface";
import { RootState } from "../store/store";

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState: {
    currentDate: new Date().toISOString(),
    selectedView: "day" as selectOptions,
  },
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setSelectedView: (state, action) => {
      state.selectedView = action.payload;
    },
  },
});

export const { setCurrentDate, setSelectedView } = schedulerSlice.actions;

export default schedulerSlice.reducer;

const selectSchedulerState = (state: RootState): string =>
  state.scheduler.currentDate;

export const selectCurrentDate = createSelector(
  [selectSchedulerState],
  (currentDate) => new Date(currentDate)
);
