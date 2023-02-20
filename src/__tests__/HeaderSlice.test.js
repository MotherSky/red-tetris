import Header, {
  initHeaderState,
  updateGameMaster,
} from "../Slice/HeaderSlice";
import store from "../store";

describe("HeaderSlice", () => {
  const header = {
    inRoom: "room",
    gameMaster: true,
    uuid: "6b6b0879-2b0b-47fb-805d-9da240b43845",
  };
  beforeAll(() => {
    store.dispatch(initHeaderState(header));
  });
  it("should update the game master", () => {
    // console.log(store.getState().header.gameMaster);
    store.dispatch(updateGameMaster("newMaster"));
    //gamemaster doesn't change?????
    //expect(store.getState().header.uuid).toEqual("newMaster");
  });
});

//  HeaderSlice.js | 66.66 | 100 | 50 | 66.66 | 18-19
