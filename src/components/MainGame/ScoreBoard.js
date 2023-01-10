import React from "react";
import "./MainGame.css";
import { useSelector } from "react-redux";

export default function ScoreBoard() {
  const store = useSelector((state) => state.game);
  const { score, lines} = store;

  return (
    <div className="score-board uppercase">
      <div className="text-zinc-200 text-xl font-bold">Score: {score}</div>
      <div className="text-zinc-200 text-xl font-bold">Lines: {lines}</div>
    </div>
  );
}
