import React from "react";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import { initialGrid, randomShape } from "../../utils/utils";
import { shapes } from "../../utils/shapes";
import GridBoard from "./GridBoard";
import reducers from "../../reducers";
import SpectatorArea from "./SpectatorArea";
import NextBlock from "./NextBlock";
import ScoreBoard from "./ScoreBoard";
import Controls from "./Controls";
import Popup from "./Popup";

function RedaGame() {
  const store = createStore(reducers);
  const grid = initialGrid();
  const nextBlock = shapes[randomShape()][0];
  console.log(nextBlock[0]);
  const obj = [grid, grid, grid, grid];

  const players = [
    { id: 0, name: "Ayoub", score: 0 },
    { id: 1, name: "Random", score: 69 },
    { id: 2, name: "3mara", score: 420 },
    { id: 3, name: "3mara", score: 420 },
    { id: 4, name: "3mara", score: 420 },
  ];

  return (
    <Provider store={store}>
      <div className="grid sm:grid-cols-4 gap-10 font-pixel">
        <div className="m-auto sm:col-span-3">
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
        <div className="my-auto border h-screen overflow-y-auto border-4 border-blue-500">
          <SpectatorArea players={players}></SpectatorArea>
        </div>
      </div>
    </Provider>
  );
}
export default RedaGame;
