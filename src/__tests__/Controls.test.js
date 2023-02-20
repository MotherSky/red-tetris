import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Controls from "../components/MainGame/Controls";
import { gameStarted } from "../Slice/GameSlice";
import store from "../store";

describe("Controls", () => {
  beforeAll(() => {
    store.dispatch(gameStarted());
  });
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <Controls />
      </Provider>
    );
  });

  let ret = "";
  /*socket prop mock*/
  const socket = {
    emit(event) {
      ret = event;
    },
  };

  /* Test if checkKey works correctly and emits the correct event */

  it("should go left", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.keyDown(document, {
      keyCode: 37,
    });
    expect(ret).toEqual("goLeft");
  });

  it("should rotate", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.keyDown(document, {
      keyCode: 38,
    });
    expect(ret).toEqual("rotate");
  });

  it("should go right", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.keyDown(document, {
      keyCode: 39,
    });
    expect(ret).toEqual("goRight");
  });

  it("should go down", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.keyDown(document, {
      keyCode: 40,
    });
    expect(ret).toEqual("goDown");
  });

  /* Test if clicking the arrow keys work correctly and emits event */

  it("should show emoji", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.click(screen.getByText("😀"));
    expect(ret).toEqual("chat");
  });

  it("should show emoji", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.click(screen.getByText("😂"));
    expect(ret).toEqual("chat");
  });

  it("should show emoji", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.click(screen.getByText("💩"));
    expect(ret).toEqual("chat");
  });

  it("should show emoji", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.click(screen.getByText("😱"));
    expect(ret).toEqual("chat");
  });

  it("should show emoji", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.click(screen.getByText("🤬"));
    expect(ret).toEqual("chat");
  });
  it("should show emoji", () => {
    render(
      <Provider store={store}>
        <Controls socket={socket} />
      </Provider>
    );
    fireEvent.click(screen.getByText("😈"));
    expect(ret).toEqual("chat");
  });
});
