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
    console.log("KEYDOWWWWN: ", e);
    console.log(`r: ${isRunning} , o: ${gameOver}`);
    if (e.keyCode === 37) {
      if (isRunning && !gameOver) {
        console.log("left enter");
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
        className="control-button"
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
        className="control-button"
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
        className="control-button"
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
        className="control-button"
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
