import Spectators, { hideEmoji, showEmoji } from "../Slice/SpectatorsSlice";
import SpectatorsSlice, {
  getSpectatorsList,
  pushSpectators,
  deletePlayer,
  onCollision,
} from "../Slice/SpectatorsSlice";
import store from "../store";

describe("Spectators", () => {
  let user1 = {
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
    gameOver: false,
    generatedTetros: [3, 2, 3, 4, 6, 7, 6, 2],
    generatedTetrosIndexer: 0,
    gameMaster: false,
    emoji: undefined,
  };
  let user2 = {
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
    gameOver: false,
    generatedTetros: [3, 2, 3, 4, 6, 7, 6, 2],
    generatedTetrosIndexer: 0,
    gameMaster: false,
    emoji: undefined,
  };
  beforeAll(() => {
    store.dispatch(pushSpectators(user1));
    store.dispatch(pushSpectators(user2));
  });
  it("should get the list of spectators", () => {
    //add user1 again
    store.dispatch(getSpectatorsList([user1]));
    //then delete user2 by uuid
    store.dispatch(deletePlayer(user2.uuid));
    //test onCollision (need to pass generatedTetros and generatedTetrosIndexer) to be able to pass the last branch
    store.dispatch(onCollision(user2));
    const state = store.getState().spectators;
    expect(state.playersList.length).toEqual(2);
  });
  it("should show the emoji or hide it", () => {
    store.dispatch(showEmoji({ emoji: "🤬", uuid: user1.uuid }));
    let state = store.getState().spectators;
    expect(state.playersList[0].emoji).toEqual("🤬");
    store.dispatch(hideEmoji(user1.uuid));
    state = store.getState().spectators;
    expect(state.playersList[0].emoji).toEqual(undefined);
  });
});
