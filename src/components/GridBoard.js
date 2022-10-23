import React from "react";
import GridSquare from "./GridSquare";
import "../App.css";
// Representation of our 20*10 grid

export default function GridBoard() {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    grid.push([]);
    for (let col = 0; col < 10; col++) {
      grid[row].push(<GridSquare key={`${row}-${col}`} color="3" />);
    }
  }

  return <div className="grid-board">{grid}</div>;
}
