import { render } from "@testing-library/react";
import GridBoard from "../components/MainGame/GridBoard";
import { defaultState } from "../utils/utils";

describe("GridBoard", () => {
  const { grid, shape, rotation } = defaultState();
  const newGr = { playground: grid };

  it("should render without crashing ", () => {
    render(
      <GridBoard
        grid={newGr}
        username={"user"}
        spectator={true}
        shape={shape}
        rotation={rotation}
        x={4}
        y={17}
      />
    );
  });
});
