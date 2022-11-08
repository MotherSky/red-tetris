import React from "react";
import "./MainGame.css";

export default function GridSquare({ spectator, color }) {
  const classes = spectator
    ? `spectator-grid-square color-${color}`
    : `grid-square color-${color}`;
  return <div className={classes} />;
}
