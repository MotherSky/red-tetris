import React from "react";
import GridSquare from "./GridSquare";
import "../App.css";
import { useSelector } from "react-redux";
import { shapes } from "../utils/shapes";

// Representation of our 20*10 grid

export default function GridBoard() {
  const game = useSelector((state) => state.game);
  const { grid, shape, rotation, x, y, isRunning, speed } = game;

  const block = shapes[shape][rotation];
  const blockColor = shape;
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
      return <GridSquare key={`${col}--${row}`} color="0" />;
    });
  });

  console.log(game);
  return <div className="grid-board">{newGrid}</div>;
}
