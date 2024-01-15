import { combineReducers } from "@reduxjs/toolkit";

import boardReducer from "./slices/board.slice";

export const rootReducer = combineReducers({
  board: boardReducer,
});
