import React from "react";
import MainGame from "../MainGame/MainGame";
import SpectatorArea from "../MainGame/SpectatorArea";

function GamePage() {
  const players = [
    { id: 0, name: "Ayoub", score: 0 },
    { id: 1, name: "Random", score: 69 },
    { id: 2, name: "3mara", score: 420 },
    { id: 3, name: "3mara", score: 420 },
    { id: 4, name: "3mara", score: 420 },
  ];

  return (
    <div className="w-full grid grid-cols-9">
      <MainGame />
      <SpectatorArea players={players} />
    </div>
  );
}

export default GamePage;
