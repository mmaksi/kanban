import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsSidebarOpen(state) {
      state.isOpen = !state.isOpen;
    },
    closeSidebar(state) {
      state.isOpen = false;
    },
  },
});

export const { setIsSidebarOpen, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
