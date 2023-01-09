import Spectators from "../Slice/SpectatorsSlice";
import {
  getSpectatorsList,
  pushSpectators,
  deletePlayer,
  onCollision,
} from "../Slice/SpectatorsSlice";
import store from "../store";

describe("Spectators", () => {
  const user1 = {
    uuid: "bb7b4d1d-a89e-42e8-9989-80677f149e82",
    username: "user1",
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
  const user2 = {
    uuid: "bb7b4d1d-a89e-42e8-9989-80677f149e83",
    username: "user2",
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
  beforeAll(() => {
    store.dispatch(pushSpectators(user1));
    store.dispatch(pushSpectators(user2));
  });
  it("should get the list of spectators", () => {
    //add user1 again
    store.dispatch(getSpectatorsList([user1]));
    //then delete user2 by uuid
    store.dispatch(deletePlayer("bb7b4d1d-a89e-42e8-9989-80677f149e83"));
    //test onCollision (need to pass generatedTetros and generatedTetrosIndexer) to be able to pass the last branch
    store.dispatch(onCollision({}));
    const state = store.getState().spectators;
    expect(state.playersList.length).toEqual(2);
  });
});
