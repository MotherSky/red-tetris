import React from "react";
import GridBoard from "./GridBoard";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../reducers";
import NextBlock from "./NextBlock";

const store = createStore(reducers);

function SpectatorArea({ players }) {
  return (
    <Provider store={store}>
      <div className="my-12 mx-24 top-0 max-h-screen container col-span-4 overflow-y-auto">
        <div>
          <h1>Spectator area</h1>
        </div>
        <div
          className={
            /*" overflow-scroll  flex justify-self-end gap-10 justify-around flex-col col-span-4"*/ ""
          }
        >
          {players.map(({ id, name, score }) => {
            return (
              <div key={id} className="spectator-game">
                <p className="text-zinc-100">
                  {name} : {score}
                </p>
                {/* <NextBlock spectator={true} /> */}
                <GridBoard spectator={true} />
              </div>
            );
          })}
        </div>
      </div>
    </Provider>
  );
}

export default SpectatorArea;
