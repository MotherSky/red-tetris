import React from "react";
import "./MainGame.css";
import { useSelector, useDispatch } from "react-redux";
import { pause, resume, restart } from "../../actions";

export default function ScoreBoard({ level = 1 }) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const { score, isRunning, gameOver } = game;

  return (
    <div className="score-board">
      <div>Score: {score}</div>
      <div>Level: {level}</div>
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
        {isRunning ? "Pause" : "Resume"}
      </button>
      <button
        className="score-board-button"
        onClick={(e) => {
          dispatch(restart());
        }}
      >
        Restart
      </button>
    </div>
  );
}
