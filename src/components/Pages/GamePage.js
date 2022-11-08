import React from "react";
import MainGame from "../MainGame/MainGame";
import SpectatorArea from "../MainGame/SpectatorArea";

function GamePage() {
  const players = [
    { id: 0, score: 0 },
    { id: 1, score: 69 },
    { id: 2, score: 420 },
  ];
  return (
    <div className="w-full grid grid-cols-9 overflow-hidden">
      <MainGame />
      <SpectatorArea players={players} />
    </div>
  );
}

export default GamePage;
