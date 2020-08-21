import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { checkBingo, pick } from "../slices/boardSlice";
import { setTurn } from "../slices/optionSlice";

import Cell from "../styles/Cell";

import { SIZE } from "../lib/index";

const Spacing = css`
  margin: 50px;
`;

const PlayerBoard = styled.div`
  ${Spacing};
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
`;

const EmptyBoard = styled.div`
  ${Spacing};
  ${(props) => `
    width: ${props.size * 100}px;
    height: ${props.size * 100}px;
  `}
  background-color: #cfcfc4;
`;

const Board = ({ player }) => {
  const cells = useSelector((state) => state.board[player].cells);
  const pickedCells = useSelector((state) => state.board.pickedCells);
  const turn = useSelector((state) => state.option.turn);
  const dispatch = useDispatch();
  const clickCell = (number) => {
    if (turn === player) {
      dispatch(pick(number));
      dispatch(checkBingo());
      dispatch(setTurn(player === "player1" ? "player2" : "player1"));
    } else {
      return alert("잘못된 차레입니다.");
    }
  };
  return cells.length > 0 ? (
    <PlayerBoard size={SIZE}>
      {cells.map((cellNumber) => (
        <Cell
          key={`cell-${cellNumber}`}
          onClick={() => clickCell(cellNumber)}
          disabled={pickedCells.includes(cellNumber)}
        >
          {cellNumber}
        </Cell>
      ))}
    </PlayerBoard>
  ) : (
    <EmptyBoard size={SIZE} />
  );
};

export default Board;
