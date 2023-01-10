import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import MasterBoard from "../components/MainGame/MasterBoard";
import { defaultState } from "../utils/utils";
import store from "../store";

describe("MasterBoard", () => {
  const { grid, shape, rotation } = defaultState();
  const newGr = { playground: grid };

  it("should render without crashing ", () => {
    render(
      <Provider store={store}>
        <MasterBoard
          grid={newGr}
          username={"user"}
          spectator={true}
          shape={shape}
          rotation={rotation}
          x={4}
          y={16}
        />
      </Provider>
    );
  });
});
