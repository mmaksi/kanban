import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  currentBoard: string | null;
}

const initialState: BoardState = {
  currentBoard: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<string>) {
      state.currentBoard = action.payload;
    },
  },
});

export const { setCurrentBoard } = boardSlice.actions;
export default boardSlice.reducer;
