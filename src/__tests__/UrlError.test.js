import { render } from "@testing-library/react";
import UrlError from "../components/Pages/UrlError";

describe("UrlError", () => {
  it("should render without crashing", () => {
    render(<UrlError />);
  });
});
