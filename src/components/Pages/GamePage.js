import React from "react";
import MainGame from "../MainGame/MainGame";
import SpectatorGrids from "../MainGame/SpectatorGrids";

function GamePage() {
  return (
    <div className="grid grid-cols-7">
      <MainGame className="col-span-5" />
      <SpectatorGrids className="col-span-2"/>
    </div>
  );
}

export default GamePage;
