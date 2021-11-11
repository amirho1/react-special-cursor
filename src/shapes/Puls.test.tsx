import { screen, cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Puls from "./Puls";

describe("Puls", () => {
  let element: HTMLElement;
  let childrenTextContext = "Hello world";
  let children = <p className="children">{childrenTextContext}</p>;
  let cursorTestClassName = "cursor-test-class-name";

  // do some initialization before each test
  beforeEach(() => {
    // clean the dom
    cleanup();

    //render the Component
    render(<Puls children={children} cursorClassName={cursorTestClassName} />);

    // get the element
    element = screen.getByTestId("Puls");
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

  it("should get puls-cursor-border element", () => {
    const pulsCursor = element.querySelector(".puls-cursor");
    expect(pulsCursor).toBeInTheDocument();
  });

  it("should use given cursorClassName", () => {
    const pulsCursor = element.querySelector(`.${cursorTestClassName}`);
    expect(pulsCursor).toBeInTheDocument();
  });
});
