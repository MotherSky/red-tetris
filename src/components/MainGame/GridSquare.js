import React from "react";
import "./MainGame.css";

export default function GridSquare(props) {
  const classes = `grid-square color-${props.color}`;
  return <div className={classes} />;
}
