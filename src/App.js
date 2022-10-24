import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";

import "./App.css";
import Controls from "./components/Controls";
import GridBoard from "./components/GridBoard";
import NextBlock from "./components/NextBlock";
import Popup from "./components/Popup";
import ScoreBoard from "./components/ScoreBoard";

const store = createStore(reducers);

function App() {
  return (
    <Provider>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tetris Redux</h1>
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

export default App;
