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
    //const state = store.getState().game;
    const state = store.dispatch(initState(desiredState));
    expect(state.payload).toEqual(desiredState);
  });
  it("should get next rotation", () => {
    desiredState.nextShape = nextRotation(
      desiredState.shape,
      desiredState.rotation
    );
    const state = store.dispatch(rotate(desiredState));
    expect(state.payload.rotation).toEqual(desiredState.rotation);
  });
  it("should get move right", () => {
    desiredState.x += 1;
    const state = store.dispatch(moveRight(desiredState));
    expect(state.payload.x).toEqual(desiredState.x);
  });
  it("should get move left", () => {
    desiredState.x -= 1;
    const state = store.dispatch(moveLeft(desiredState));
    expect(state.payload.x).toEqual(desiredState.x);
  });
  it("should get move down", () => {
    desiredState.y += 1;
    const state = store.dispatch(moveDown(desiredState));
    expect(state.payload.y).toEqual(desiredState.y);
  });
});
