import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import MainRoute from "../Router/MainRoute";
import store from "../store";
import "setimmediate";

/* simple render test */

describe("MainRoute", () => {
  it("should render", () => {
    render(<MainRoute />, { wrapper: BrowserRouter });
  });

  /* simulate http://localhost:3000/ as url */

  it("should render homepage when the pathname is '/' and hash is empty", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", hash: "" }]}>
        <MainRoute />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to Red Tetris/i)).toBeInTheDocument();
  });

  /* simulate http://localhost:3000/#room[username] as url, here the gamepage needs the store that's why is wrapped by <Provider>*/

  it("should render gamepage when the pathname is '/' and the hash matches the regexp", () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/", hash: "#room[username]" }]}
        >
          <MainRoute />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/ROOM X/i)).toBeInTheDocument();
  });

  /* simulate an error in url http://localhost:3000/x */

  it("should render the UrlError component when there is an error in url", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/x", hash: "" }]}>
        <MainRoute />
      </MemoryRouter>
    );
    expect(screen.getByText("Error in Url")).toBeInTheDocument();
  });
});
