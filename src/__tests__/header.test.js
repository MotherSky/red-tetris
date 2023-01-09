import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import Header from "../components/MainGame/header";
import { initHeaderState } from "../Slice/Header";

describe("Header", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });

  it("should start the game correctly if it's the owner", () => {
    // mock the header state so to test if we can start the game
    const header = {
      inRoom: "room",
      gameMaster: true,
      uuid: "6b6b0879-2b0b-47fb-805d-9da240b43845",
    };
    store.dispatch(initHeaderState(header));
    // mock the startGame function
    let gameStarted = false;
    function startGame() {
      gameStarted = true;
    }

    render(
      <Provider store={store}>
        <Header startGame={startGame} />
      </Provider>
    );
    fireEvent.click(screen.getByText("Game Start"));
    expect(gameStarted).toBeTruthy();
  });
});
