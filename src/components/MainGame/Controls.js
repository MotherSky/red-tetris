import React from "react";

import { moveDown, moveLeft, moveRight, rotate } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

export default function Controls(props) {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.game.isRunning);
  const gameOver = useSelector((state) => state.game.gameOver);

  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;
    if (e.keyCode === 37) {
      if (isRunning && !gameOver) {
        dispatch(moveLeft());
      }
    } else if (e.keyCode === 38) {
      if (isRunning && !gameOver) {
        dispatch(rotate());
      }
    } else if (e.keyCode === 39) {
      if (isRunning && !gameOver) {
        dispatch(moveRight());
      }
    } else if (e.keyCode === 40) {
      if (isRunning && !gameOver) {
        dispatch(moveDown());
      }
    }
  }

  return (
    <div className="controls">
      <button
        disabled={!isRunning || gameOver}
        className="control-button left-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(moveLeft());
          }
        }}
      >
        LEFT
      </button>
      <button
        disabled={!isRunning || gameOver}
        className="control-button right-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(moveRight());
          }
        }}
      >
        RIGHT
      </button>
      <button
        disabled={!isRunning || gameOver}
        className="control-button up-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(rotate());
          }
        }}
      >
        ROTATE
      </button>
      <button
        disabled={!isRunning || gameOver}
        className="control-button down-button"
        onClick={(e) => {
          if (isRunning && !gameOver) {
            dispatch(moveDown());
          }
        }}
      >
        DOWN
      </button>
    </div>
  );
}
