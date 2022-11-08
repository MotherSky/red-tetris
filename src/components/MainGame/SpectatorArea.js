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
      <div className=" h-full top-0 overflow-y-auto my-12 mx-24 flex justify-self-end gap-10 justify-around flex-col col-span-4">
        {players.map(({ id, score }) => {
          return (
            <React.Fragment key={id}>
              <div className="spectator-game">
                <p className="text-zinc-100">
                  player {id} : {score}
                </p>
                <NextBlock spectator={true} />
                <GridBoard spectator={true} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </Provider>
  );
}

export default SpectatorArea;
