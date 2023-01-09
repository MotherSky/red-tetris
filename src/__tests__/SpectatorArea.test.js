import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import SpectatorArea from "../components/MainGame/SpectatorArea";
import { pushSpectators } from "../Slice/SpectatorsSlice";
import store from "../store";

// mock data passed by server when pushing a new spectator

const data = {
  uuid: "bb7b4d1d-a89e-42e8-9989-80677f149e82",
  username: "user3",
  inRoom: "room",
  grid: {
    rows: 20,
    cols: 10,
    playground: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  score: 0,
  lines: 0,
  shape: 3,
  nextShape: 2,
  rotation: 0,
  x: 4,
  y: -4,
  isRunning: true,
  gameOver: false,
  generatedTetros: [3, 2, 3, 4, 6, 7, 6, 2],
  generatedTetrosIndexer: 0,
  gameMaster: false,
};

describe("Spectator Area", () => {
  it("should render without crashing", () => {
    store.dispatch(pushSpectators(data));
    render(
      <Provider store={store}>
        <SpectatorArea />
      </Provider>
    );
  });
});
