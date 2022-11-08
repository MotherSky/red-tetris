import React from "react";
import MainGame from "../MainGame/MainGame";
import SpectatorGrids from "../MainGame/SpectatorGrids";

function GamePage() {
  return (
    <div className="grid grid-cols-9">
      <MainGame />
      <SpectatorGrids />
    </div>
  );
}

export default GamePage;
