import { screen, cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Puls from "./Puls";

describe("Puls", () => {
  let element: HTMLElement;
  beforeEach(() => {
    // clean the dom
    cleanup();

    //render the Component
    render(<Puls />);

    // get the element
    element = screen.getByTestId("Puls");
  });

  it("should mount on document", () => {
    expect(element).toBeInTheDocument();
  });
});
