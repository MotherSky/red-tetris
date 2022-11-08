import React from "react";
import GridBoard from "./GridBoard";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../reducers";

const store = createStore(reducers);

function SpectatorGrids() {
  return (
    <Provider store={store}>
      <div className="flex gap-10 flex-col col-span-4">
        <GridBoard spectator={true} />
        <GridBoard spectator={true} />
        <GridBoard spectator={true} />
      </div>
    </Provider>
  );
}

export default SpectatorGrids;
