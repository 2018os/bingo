import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Board from "./components/Board";

import { draw, init, setGame } from "./slices/boardSlice";
import { setTurn } from "./slices/optionSlice";

const BoardWrapper = styled.div`
  display: flex;
`;

const App = () => {
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useDispatch();
  const turn = useSelector((state) => state.option.turn);
  const player1Score = useSelector((state) => state.board.player1.score);
  const player2Score = useSelector((state) => state.board.player2.score);
  const run = () => {
    setIsFirst(false);
    dispatch(setTurn("player1"));
    dispatch(setGame());
  };
  useEffect(() => {
    const reset = () => {
      setIsFirst(true);
      dispatch(setTurn("player1"));
      dispatch(init());
    };
    if (player1Score >= 5) {
      if (player1Score <= player2Score) {
        alert("무승부입니다.");
        reset();
      } else {
        alert("player1이 빙고를 완성했습니다.");
        reset();
      }
    } else if (player2Score >= 5) {
      alert("player2가 빙고를 완성했습니다.");
      reset();
    }
  }, [player1Score, player2Score, dispatch]);
  return (
    <>
      <BoardWrapper>
        <Board player="player1" turn={turn} />
        <Board player="player2" turn={turn} />
      </BoardWrapper>
      <button onClick={run}>{isFirst ? "게임 시작" : "게임 재시작"}</button>
      <button
        onClick={() => {
          dispatch(draw());
        }}
      >
        무승부
      </button>
    </>
  );
};

export default App;
