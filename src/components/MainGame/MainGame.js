import GridBoard from "./GridBoard";
import NextBlock from "./NextBlock";
import ScoreBoard from "./ScoreBoard";
import Controls from "./Controls";
import Popup from "./Popup";
import "./MainGame.css";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../reducers";

const store = createStore(reducers);

function MainGame() {
  return (
    <Provider store={store}>
      <div className="Main-game">
        <header className="Game-header">
          <h1 className="Game-title">Tetris Redux</h1>
        </header>
        <GridBoard />
        <NextBlock />
        <ScoreBoard />
        <Controls />
        <Popup />
      </div>
    </Provider>
  );
}

export default MainGame;
