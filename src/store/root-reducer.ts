import { combineReducers } from "@reduxjs/toolkit";

import boardReducer from "./slices/board.slice";
import sidebarSlice from "./slices/sidebar.slice";

export const rootReducer = combineReducers({
  board: boardReducer,
  sidebar: sidebarSlice,
});
