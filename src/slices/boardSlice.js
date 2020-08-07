import { createSlice } from "@reduxjs/toolkit";

import { eventLines } from "../lib/index";

function shuffle() {
  // fisher-yates shuffle
  const array = Array.from(Array(25), (_, i) => i + 1); // 1 to 25
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getScore(pickedCells) {
  let score = 0;
  eventLines.forEach((line) => {
    const isCorrect = line.every((number) => pickedCells.includes(number));
    if (isCorrect) score++;
  });
  return score;
}

const initialState = {
  pickedCells: [],
  player1: {
    cells: [],
    score: 0,
  },
  player2: {
    cells: [],
    score: 0,
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    checkBingo: (state) => {
      const { pickedCells } = state;
      ["player1", "player2"].forEach((player) => {
        const playerPickedCells = pickedCells.map(
          (cell) => state[player].cells.indexOf(cell) + 1
        );
        const score =
          playerPickedCells.length >= 5 ? getScore(playerPickedCells) : 0;
        state[player].score = score;
      });
    },
    pick: (state, action) => {
      state.pickedCells.push(action.payload);
    },
    setGame: (state) => {
      ["player1", "player2"].forEach((player) => {
        state[player].cells = shuffle();
        state[player].score = 0;
      });
      state.pickedCells = [];
    },
    init: (state) => {
      ["player1", "player2"].forEach((player) => {
        state[player].cells = [];
        state[player].score = 0;
      });
      state.pickedCells = [];
    },
  },
});

export const { checkBingo, pick, setGame, init } = boardSlice.actions;

export const draw = () => (dispatch) => {
  // for test
  const array = Array.from(Array(25), (_, i) => i + 1);
  array.forEach((number) => {
    dispatch(pick(number));
    dispatch(checkBingo());
  });
};

export default boardSlice.reducer;
