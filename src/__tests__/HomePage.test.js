import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../components/Pages/HomePage";

/* simple render test */

describe("HomePage", () => {
  it("should render without crashing", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
  });

  /* simulate a joinRoom button click with username and room*/
  it("should render the gamepage when we fire the joinRoom event", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    const form = screen.getByTestId("form");
    fireEvent.submit(form, {
      target: {
        username: { value: "user" },
        room: { value: "room" },
      },
    });
    //to edit
  });

  /* simulate a joinRoom button click with empty username*/
  it("should render the gamepage when we fire the joinRoom event", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    const form = screen.getByTestId("form");
    fireEvent.submit(form, {
      target: {
        username: { value: "" },
        room: { value: "room" },
      },
    });
    // to edit
  });

  it("should render the homepage", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Welcome to Red Tetris/i)).toBeInTheDocument();
  });
});
