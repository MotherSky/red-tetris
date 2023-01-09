import GameSlice, {
  initState,
  rotate,
  moveRight,
  moveLeft,
  moveDown,
} from "../Slice/GameSlice";
import store from "../store";
import { initialGrid, nextRotation } from "../utils/utils";

describe("GameSlice", () => {
  const { grid } = initialGrid();
  const desiredState = {
    grid: { playground: grid },
    shape: 1,
    rotation: 1,
    x: 9,
    y: 19,
    nextShape: 1,
    score: 9999,
    isRunning: true,
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
  it("should get next rotation", () => {
    desiredState.nextShape = nextRotation(
      desiredState.shape,
      desiredState.rotation
    );
    store.dispatch(rotate(desiredState));
    const state = store.getState().game;
    expect(state.rotation).toEqual(desiredState.rotation);
  });
  it("should get move right", () => {
    desiredState.x += 1;
    store.dispatch(moveRight(desiredState));
    const state = store.getState().game;
    expect(state.x).toEqual(desiredState.x);
  });
  it("should get move left", () => {
    desiredState.x -= 1;
    store.dispatch(moveLeft(desiredState));
    const state = store.getState().game;
    expect(state.x).toEqual(desiredState.x);
  });
  it("should get move down", () => {
    desiredState.y += 1;
    store.dispatch(moveDown(desiredState));
    const state = store.getState().game;
    expect(state.y).toEqual(desiredState.y);
  });
});
