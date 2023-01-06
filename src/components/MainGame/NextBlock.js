import React from "react";
import GridSquare from "./GridSquare";
import "./MainGame.css";

import { useSelector } from "react-redux";
import { shapes } from "../../utils/shapes";

export default function NextBlock({ spectator }) {
  const nextShape = useSelector((state) => state.game.nextShape);
  const rotation = 0; // 0 is constant since we will always want to the first rotation
  const box = shapes[nextShape][rotation];
  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      const color = square ? nextShape : square;
      return (
        <GridSquare spectator={spectator} key={`${row}${col}`} color={color} />
      );
    });
  });

  return (
    <div className={spectator ? "spectator-next-block" : "next-block"}>
      {grid}
    </div>
  );
}
