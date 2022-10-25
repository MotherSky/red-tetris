import React from "react";

import { moveDown, moveLeft, moveRight, rotate } from "../actions";
import { useSelector, useDispatch } from "react-redux";

export default function Controls(props) {
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.isRunning);

  return (
    <div className="controls">
      <button
        className="control-button"
        onClick={(e) => {
          dispatch(moveLeft());
        }}
      >
        left
      </button>
      <button
        className="control-button"
        onClick={(e) => {
          dispatch(moveRight());
        }}
      >
        right
      </button>
      <button
        className="control-button"
        onClick={(e) => {
          dispatch(rotate());
        }}
      >
        rotate
      </button>
      <button
        className="control-button"
        onClick={(e) => {
          dispatch(moveDown());
        }}
      >
        down
      </button>
    </div>
  );
}
