import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import Popup from "../components/MainGame/Popup";
import { pause } from "../Slice/GameSlice";
import store from "../store";
import ScoreBoard from "../components/MainGame/ScoreBoard";

describe("Popup", () => {
  it("should render without crashing when the game is paused or over", () => {
    render(
      <Provider store={store}>
        <ScoreBoard />
        <Popup />
      </Provider>
    );
    fireEvent.click(screen.getByText("PAUSE"));
    expect(screen.getByText(/the game is paused/i)).toBeInTheDocument();
  });
  // gameOver test
});
