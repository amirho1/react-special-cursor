import { screen, cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dot from "./Cursor";

describe("Dot", () => {
  let element: HTMLElement;
  let childrenTextContext = "Hello world";
  let children = <p className="children">{childrenTextContext}</p>;
  let cursorTestClassName = "cursor-test-class-name";

  // do some initialization before each test
  beforeEach(() => {
    // clean the dom
    cleanup();

    //render the Component
    render(<Dot children={children} borderClassName={cursorTestClassName} />);

    // get the element
    element = screen.getByTestId("Dot");
  });

  it("should mount on document", () => {
    expect(element).toBeInTheDocument();
  });

  it("render the given children", () => {
    expect(element.querySelector(".children")).toBeInTheDocument();
    expect(element.querySelector(".children")?.textContent).toMatch(
      childrenTextContext
    );
  });

  it("should get dot-in-circle-cursor element", () => {
    const pulsCursor = element.querySelector(".cursor-border");
    expect(pulsCursor).toBeInTheDocument();
  });

  it("should use given cursorClassName", () => {
    const pulsCursor = element.querySelector(`.${cursorTestClassName}`);
    expect(pulsCursor).toBeInTheDocument();
  });
});
