import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    selectedSidebar: "Dashboard",
  },
  reducers: {
    setSelectedSidebar: (state, action) => {
      state.selectedSidebar = action.payload;
    },
  },
});

export const { setSelectedSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
