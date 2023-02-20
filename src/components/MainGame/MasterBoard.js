import React from "react";
import GridSquare from "./GridSquare";
import "./MainGame.css";
import { useSelector } from "react-redux";
import { shapes } from "../../utils/shapes";

// Representation of our 20*10 grid

export default function MasterGridBoard({ spectator }) {
  const store = useSelector((state) => state.game);
  const { grid, shape, rotation, x, y } = store;

  const block = shapes[shape][rotation];
  const blockColor = shape;
  const newGrid = grid.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      // Find the block x and y on the shape grid
      // By subtracting the x and y from the col and the row we get the position of the upper left corner of the block array as if it was superimposed over the main grid
      const blockX = col - x;
      const blockY = row - y;
      let color = square;
      // Map current falling block to grid.
      // For any squares that fall on the grid we need to look at the block array and see if there is a 1 in this case we use the block color.
      if (
        blockX >= 0 &&
        blockX < block?.length &&
        blockY >= 0 &&
        blockY < block?.length
      ) {
        color = block[blockY][blockX] === 0 ? color : blockColor;
      }
      // Generate a unique key for every block
      return (
        <GridSquare
          key={`${col}--${row}`}
          color={color}
          spectator={spectator}
        />
      );
    });
  });

  return (
    <div className={spectator ? "spectator-grid-board" : "grid-board"}>
      {newGrid}
    </div>
  );
}
