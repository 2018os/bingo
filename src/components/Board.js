import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { checkBingo, pick } from "../slices/boardSlice";
import { setTurn } from "../slices/optionSlice";

import Cell from "../styles/Cell";

const PlayerBoard = styled.div`
  display: grid;
  width: 500px;
  padding: 50px;
  grid-template-columns: repeat(5, 1fr);
`;

const EmptyBoard = styled.div`
  width: 500px;
  height: 500px;
  background-color: #cfcfc4;
`;

const Board = ({ player, turn }) => {
  const cells = useSelector((state) => state.board[player].cells);
  const pickedCells = useSelector((state) => state.board.pickedCells);
  const dispatch = useDispatch();
  const pickCell = (number) => {
    dispatch(pick(number));
    dispatch(checkBingo());
    dispatch(setTurn(player === "player1" ? "player2" : "player1"));
  };
  return (
    <PlayerBoard>
      {cells.length > 0 ? (
        cells.map((cellNumber) => (
          <Cell
            picked={pickedCells.includes(cellNumber)}
            key={`cell-${cellNumber}`}
            onClick={() =>
              player === turn
                ? pickCell(cellNumber)
                : alert("잘못된 차레입니다.")
            }
            disabled={pickedCells.includes(cellNumber)}
          >
            {cellNumber}
          </Cell>
        ))
      ) : (
        <EmptyBoard />
      )}
    </PlayerBoard>
  );
};

export default Board;
