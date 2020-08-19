import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { checkBingo, pick } from "../slices/boardSlice";
import { setTurn } from "../slices/optionSlice";

import Cell from "../styles/Cell";

const Spacing = css`
  margin: 50px;
`;

const PlayerBoard = styled.div`
  ${Spacing};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const EmptyBoard = styled.div`
  ${Spacing};
  width: 500px;
  height: 500px;
  background-color: #cfcfc4;
`;

const Board = ({ player }) => {
  const cells = useSelector((state) => state.board[player].cells);
  const pickedCells = useSelector((state) => state.board.pickedCells);
  const turn = useSelector((state) => state.option.turn);
  const dispatch = useDispatch();
  const pickCell = (number) => {
    dispatch(pick(number));
    dispatch(checkBingo());
    dispatch(setTurn(player === "player1" ? "player2" : "player1"));
  };
  return cells.length > 0 ? (
    <PlayerBoard>
      {cells.map((cellNumber) => (
        <Cell
          picked={pickedCells.includes(cellNumber)}
          key={`cell-${cellNumber}`}
          onClick={() =>
            player === turn ? pickCell(cellNumber) : alert("잘못된 차레입니다.")
          }
          disabled={pickedCells.includes(cellNumber)}
        >
          {cellNumber}
        </Cell>
      ))}
    </PlayerBoard>
  ) : (
    <EmptyBoard />
  );
};

export default Board;
