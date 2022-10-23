import "./App.css";
import GridBoard from "./components/GridBoard";
import NextGrid from "./components/NextBlock";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Tetris Redux</h1>
      </header>
      <GridBoard />
      <NextGrid />
      <ScoreBoard />
    </div>
  );
}

export default App;
