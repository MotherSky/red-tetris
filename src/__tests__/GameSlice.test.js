import GameSlice, {
  initState,
  update,
  restart,
  gameWinner,
  gameStarted,
  audioPlay,
  audioStop,
} from "../Slice/GameSlice";
import store from "../store";
import { initialGrid, defaultState } from "../utils/utils";

// stubs so jest doesn't raise Error: Not implemented: HTMLMediaElement.prototype.pause

window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};

describe("GameSlice", () => {
  const { grid } = initialGrid();
  const defState = defaultState();
  const desiredState = {
    grid: { playground: grid },
    shape: 1,
    rotation: 1,
    x: 9,
    y: 19,
    nextShape: 1,
    score: 9999,
    gameOver: false,
    uuid: "custom",
    username: "user",
    playerList: [],
  };
  it("should init the state", () => {
    store.dispatch(initState(desiredState));
    const state = store.getState().game;
    expect(state.username).toEqual(desiredState.username);
  });
  it("should update x", () => {
    desiredState.x += 1;
    store.dispatch(update(desiredState));
    const state = store.getState().game;
    expect(state.x).toEqual(desiredState.x);
  });
  it("should pause the sound when the game is over", () => {
    desiredState.gameOver = true;
    store.dispatch(update(desiredState));
    const state = store.getState().game;
    expect(state.mute).toEqual(false);
  });
  it("should mute and unmute the sound properly", () => {
    store.dispatch(initState(desiredState));
    // stop audio, mute should be true
    store.dispatch(audioStop());
    let state = store.getState().game;
    expect(state.mute).toEqual(true);
    // play audio, mute should be false
    store.dispatch(audioPlay());
    state = store.getState().game;
    expect(state.mute).toEqual(false);
  });
  it("should start the game and set the winner", () => {
    store.dispatch(initState(defState));
    store.dispatch(gameStarted());
    let state = store.getState().game;
    expect(state.gameStart).toEqual(true);
    store.dispatch(gameWinner("player1"));
    state = store.getState().game;
    expect(state.winner).toEqual("player1");
  });
  it("should change the state back to default state", () => {
    store.dispatch(initState(desiredState));
    store.dispatch(restart());
    const state = store.getState();
    expect(state).not.toEqual(desiredState);
  });
});
