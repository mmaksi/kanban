import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  currentBoard: string | null;
  currentBoardIndex: number;
}

const initialState: BoardState = {
  currentBoard: "",
  currentBoardIndex: 0,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<string>) {
      state.currentBoard = action.payload;
    },
    setCurrentBoardIndex(state, action: PayloadAction<number>) {
      state.currentBoardIndex = action.payload;
    },
  },
});

export const { setCurrentBoard, setCurrentBoardIndex } = boardSlice.actions;
export default boardSlice.reducer;
