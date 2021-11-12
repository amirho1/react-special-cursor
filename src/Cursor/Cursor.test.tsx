import { screen, cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Cursor from "./Cursor";

describe("Dot", () => {
  let element: HTMLElement;
  let childrenTextContext = "Hello world";
  let children = <p className="children">{childrenTextContext}</p>;
  let cursorTestClassName = "cursor-test-class-name";
  let dotTestClassName = "dot-test-class-name";

  // do some initialization before each test
  beforeEach(() => {
    // clean the dom
    cleanup();

    //render the Component
    render(
      <Cursor
        children={children}
        borderClassName={cursorTestClassName}
        dotClassName={dotTestClassName}
      />
    );

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

  it("cursor-border should be in dom", () => {
    const cursorBorder = element.querySelector(".cursor-border");
    expect(cursorBorder).toBeInTheDocument();
  });

  it("should use given borderClassName from properties", () => {
    const cursorBorder = element.querySelector(`.${cursorTestClassName}`);
    expect(cursorBorder).toBeInTheDocument();
    expect(cursorBorder?.className).toMatch("cursor-border");
  });

  it("cursor-dot should be in the dom", () => {
    const cursorDot = element.querySelector(`.cursor-dot`);
    expect(cursorDot).toBeInTheDocument();
  });

  it("should use given dotClassName from properties", () => {
    const cursorDot = element.querySelector(`.${dotTestClassName}`);
    expect(cursorDot).toBeInTheDocument();
    expect(cursorDot?.className).toMatch("cursor-dot");
  });
});
