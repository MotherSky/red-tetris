import React from "react";
import GridSquare from "./GridSquare";
import "../App.css";

import { useSelector } from "react-redux";
import { shapes } from "../utils/shapes";

export default function NextBlock(props) {
  const nextShape = useSelector((state) => state.game.nextShape);
  const box = shapes[nextShape][0]; // 0 is constant since we will always want to the first rotation
  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return <GridSquare key={`${row}${col}`} color={square} />;
    });
  });

  return <div className="next-block">{grid}</div>;
}
