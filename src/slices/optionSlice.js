import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({
  name: "option",
  initialState: {
    turn: "player1",
  },
  reducers: {
    setTurn: (state, action) => {
      state.turn = action.payload;
    },
  },
});

export const { setTurn } = optionSlice.actions;

export default optionSlice.reducer;
