import React from "react";

import { moveDown, moveLeft, moveRight, rotate } from "../actions";
import { useSelector, useDispatch } from "react-redux";

export default function Controls(props) {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.game.isRunning);
  const gameOver = useSelector((state) => state.game.gameOver);

  return (
    <div className="controls">
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(moveLeft());
          }
        }}
      >
        left
      </button>
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(moveRight());
          }
        }}
      >
        right
      </button>
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(rotate());
          }
        }}
      >
        rotate
      </button>
      <button
        disabled={!isRunning || gameOver}
        className="control-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(moveDown());
          }
        }}
      >
        down
      </button>
    </div>
  );
}
