import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BoardData } from "@/types/schemas";

type SerializedBoardColumns = { [key: string]: string } | never[];

export interface BoardState extends BoardData {
  serializedBoardColumns: SerializedBoardColumns;
}

const initialState: BoardState = {
  id: "",
  boardName: "",
  columns: [],
  serializedBoardColumns: {},
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentBoardId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setCurrentBoardName(state, action: PayloadAction<string>) {
      state.boardName = action.payload;
    },
    setCurrentBoardColumns(
      state,
      action: PayloadAction<{ id: string; name: string; boardId: string }[]>
    ) {
      state.columns = action.payload;
    },
    setCurrentBoardSerializedColumns(
      state,
      action: PayloadAction<SerializedBoardColumns>
    ) {
      state.serializedBoardColumns = action.payload;
    },
  },
});

export const {
  setCurrentBoardId,
  setCurrentBoardName,
  setCurrentBoardColumns,
  setCurrentBoardSerializedColumns,
} = boardSlice.actions;
export default boardSlice.reducer;
