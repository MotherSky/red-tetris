import React from "react";
import "./ScoreBoard.css"

export default function ScoreBoard({ score, level }) {
  return (
    <div className="score-board">
      <div>Score: {score}</div>
      <div>Level: {level}</div>
      <button className="score-board-button" onClick={(e) => {}}>
        Play
      </button>
      <button className="score-board-button" onClick={(e) => {}}>
        Restard
      </button>
    </div>
  );
}
