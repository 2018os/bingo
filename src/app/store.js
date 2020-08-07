import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../slices/boardSlice";
import optionReducer from "../slices/optionSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
    option: optionReducer,
  },
  devTools: true,
});
