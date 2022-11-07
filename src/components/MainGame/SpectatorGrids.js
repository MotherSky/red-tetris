import React from "react";
import GridBoard from "./GridBoard";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../reducers";

const store = createStore(reducers);

function SpectatorGrids() {
  return (
    <Provider store={store}>
      <div className="Spectator-grids">
        <h1 className="text-white-700">ALOOOO</h1>
      </div>
    </Provider>
  );
}

export default SpectatorGrids;
