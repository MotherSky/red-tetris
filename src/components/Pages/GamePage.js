import React from "react";
import MainGame from "../MainGame/MainGame";
import SpectatorGrids from "../MainGame/SpectatorGrids";

function GamePage() {
  const players = [{ id: 0 }, { id: 1 }, { id: 2 }];
  return (
    <div className="w-full grid grid-cols-9 overflow-hidden">
      <MainGame />
      <SpectatorGrids players={players} />
    </div>
  );
}

export default GamePage;
