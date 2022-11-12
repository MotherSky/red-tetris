import React from "react";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import GridBoard from "../MainGame/GridBoard";
import reducers from "../../reducers";
import SpectatorArea from "../MainGame/SpectatorArea";
import NextBlock from "../MainGame/NextBlock";
import ScoreBoard from "../MainGame/ScoreBoard";
import Controls from "../MainGame/Controls";
import Popup from "../MainGame/Popup";

function GamePage() {
  const store = createStore(reducers);

  const players = [
    { id: 0, name: "Ayoub", score: 0 },
    { id: 1, name: "Random", score: 69 },
    { id: 2, name: "1", score: 420 },
    { id: 3, name: "2", score: 420 },
    { id: 4, name: "3", score: 420 },
  ];

  return (
    <Provider store={store}>
      <div className="grid sm:grid-cols-10 gap-10 font-pixel content-center h-screen">
        <div className="m-auto sm:col-span-7">
          <header className="Game-header mb-8">
            <h1 className="Game-title ">ROOM X</h1>
          </header>
          <div className="grid grid-cols-9 gap-2 justify-items-center position-relative">
            <div className=" col-span-2 justify-self-end">
              <NextBlock />
            </div>
            <div className=" max-h-fit min-h-fit max-w-fit min-w-fit col-span-5 border border-4 border-gray-500 mb-3">
              <GridBoard />
            </div>
            <div className="col-span-2 justify-self-end">
              <ScoreBoard />
            </div>
            <div className="col-start-3 col-span-5 m-auto">
              <Controls />
            </div>
            <Popup />
          </div>
        </div>
        <div className="sm:col-span-3 overflow-auto hide-scroll">
          <SpectatorArea players={players}></SpectatorArea>
        </div>
      </div>
    </Provider>
  );
}
export default GamePage;
