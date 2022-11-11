import React from "react";
import "./MainGame.css";
import { useSelector, useDispatch } from "react-redux";
import { pause, resume, restart } from "../../actions";

export default function ScoreBoard() {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const { score, isRunning, gameOver } = game;

  return (
    <div className="score-board">
      <div className="text-zinc-200 text-xl font-bold">Score: {score}</div>
      <button
        className="score-board-button"
        onClick={(e) => {
          if (gameOver) {
            return;
          }
          if (isRunning) {
            dispatch(pause());
          } else {
            dispatch(resume());
          }
        }}
      >
        {isRunning ? "PAUSE" : "RESUME"}
      </button>
      <button
        className="score-board-button"
        onClick={(e) => {
          dispatch(restart());
        }}
      >
        RESTART
      </button>
    </div>
  );
}
