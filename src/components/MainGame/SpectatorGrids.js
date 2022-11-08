import React from "react";
import GridBoard from "./GridBoard";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../reducers";

const store = createStore(reducers);

function SpectatorGrids({ players }) {
  return (
    <Provider store={store}>
      <div className=" h-full top-0 overflow-y-auto my-12 mx-24 flex justify-self-end gap-10 justify-around flex-col col-span-4">
        {players.map(({ id }) => {
          return (
            <React.Fragment key={id}>
              <p className="text-zinc-100">player {id}</p>
              <GridBoard spectator={true} />
            </React.Fragment>
          );
        })}
      </div>
    </Provider>
  );
}

export default SpectatorGrids;
