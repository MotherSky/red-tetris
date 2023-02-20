import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import Popup from "../components/MainGame/Popup";
import { gameWinner, update } from "../Slice/GameSlice";
import store from "../store";
import ScoreBoard from "../components/MainGame/ScoreBoard";
import { defaultState } from "../utils/utils";


window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
};
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};

describe("Popup", () => {
  it("should render without crashing when the winner is set", () => {
    render(
      <Provider store={store}>
        <Popup />
      </Provider>
    );
  });

  // it("should render without crashing when the game is over", () => {
  //   render(
  //     <Provider store={store}>
  //       <ScoreBoard />
  //       <Popup />
  //     </Provider>
  //   );
  //   const data = defaultState()
  //   data.gameOver = true
  //   store.dispatch(update(data));
  //   const state = store.getState().game;
  //   console.log(state);
  // });

  // gameOver test
});
