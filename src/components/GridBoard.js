import React, { useEffect, useRef } from "react";
import GridSquare from "./GridSquare";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { shapes } from "../utils/shapes";
import { moveDown } from "../actions";

// Representation of our 20*10 grid

export default function GridBoard() {
  const requestRef = useRef();
  const lastUpdateTimeRef = useRef(0);
  const progressTimeRef = useRef(0);
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const { grid, shape, rotation, x, y, isRunning, speed } = game;

  /*const update = (time) => {
    requestRef.current = requestAnimationFrame(update);
    if (!isRunning) {
      return;
    }
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = time;
    }
    const deltaTime = time - lastUpdateTimeRef.current;
    progressTimeRef.current += deltaTime;
    if (progressTimeRef.current > speed) {
      dispatch(moveDown());
      progressTimeRef.current = 0;
    }
    lastUpdateTimeRef.current = time;
  };*/

  /*useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);
*/
  const block = shapes[shape][rotation];
  const blockColor = shape;
  console.log(game);
  console.log(grid);
  const newGrid = grid.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      const blockX = col - x;
      const blockY = col - y;
      let color = square;
      if (
        blockX >= 0 &&
        blockX < block.length &&
        blockY >= 0 &&
        blockY < block.length
      ) {
        color = block[blockY][blockX] === 0 ? color : blockColor;
      }
      return <GridSquare key={`${col}--${row}`} color={color} />;
    });
  });

  return <div className="grid-board">{newGrid}</div>;
}
