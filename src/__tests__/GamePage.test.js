import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import GamePage from "../components/Pages/GamePage";
import store from "../store";

describe("GamePage", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );
  });
});
