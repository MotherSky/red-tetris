import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ScoreBoard from "../components/MainGame/ScoreBoard";
import store from "../store";

describe("Scoreboard", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <ScoreBoard />
      </Provider>
    );
    fireEvent.click(screen.getByText("PAUSE"));
    fireEvent.click(screen.getByText("RESUME"));
    fireEvent.click(screen.getByText("RESTART"));
  });
});

//ScoreBoard.js|   72.72 | 66.66 | 75 | 70 | 19,24-33
