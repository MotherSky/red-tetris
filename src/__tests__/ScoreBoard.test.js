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
  });
});
