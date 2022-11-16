import React from "react";
import GridSquare from "./GridSquare";
import "./MainGame.css";

import { useSelector } from "react-redux";
import { shapes } from "../../utils/shapes";

export default function NextBlock({ spectator }) {
  const nextShape = useSelector((state) => state.nextShape);
  const box = shapes[nextShape][0]; // 0 is constant since we will always want to the first rotation
  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return (
        <GridSquare spectator={spectator} key={`${row}${col}`} color={square} />
      );
    });
  });

  return (
    <div className={spectator ? "spectator-next-block" : "next-block"}>
      {grid}
    </div>
  );
}
