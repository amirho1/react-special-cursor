/* eslint-disable react/no-children-prop */
import React from "react"
import { screen, cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Cursor from "./Cursor";
import userEvent from "@testing-library/user-event";

describe("Dot", () => {
  let element: HTMLElement;
  const childrenTextContext = "Hello world";
  const children = (
    <p className="children">
      {childrenTextContext}
      <button className="btn">button</button>
    </p>
  );
  const cursorTestClassName = "cursor-test-class-name";
  const dotTestClassName = "dot-test-class-name";

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
        hoverClasses={[
          {
            cursorChildren: <p className="child">child</p>,
            classNameOfTargetElement: "btn",
            classNameOfStyle: "btn-hover",
          },
        ]}
      />
    );

    // get the element
    element = screen.getByTestId("cursor");
  });

  it("should mount on document", () => {
    expect(element).toBeInTheDocument();
  });

  it("render the given children", () => {
    expect(element.querySelector(".children")).toBeInTheDocument();
    expect(element.querySelector(".children")?.textContent).toMatch(
      childrenTextContext
    );
    expect(element.querySelector(".children")?.children.length).toBe(1);
    expect(element?.querySelector(".btn")).toBeInTheDocument();
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

  it("should render given cursorChild while hovering on target element in to cursorDot", () => {
    const btn = element.querySelector(".btn");
    const cursorDot = element.querySelector(".cursor-dot");
    expect(btn).toBeInTheDocument();
    expect(cursorDot).toBeInTheDocument();

    if (btn) {
      fireEvent.mouseOver(btn);
      userEvent.hover(btn);
    }
    expect(element.className).toMatch("btn-hover");
    expect(cursorDot?.children.length).toBe(1);
    expect(cursorDot?.querySelector(".child")).toBeInTheDocument();

    if (btn) {
      fireEvent.mouseOut(btn);
      userEvent.unhover(btn);
    }
    expect(element.className).not.toMatch("btn-hover");
    expect(cursorDot?.children.length).not.toBe(1);
    expect(cursorDot?.querySelector(".child")).not.toBeInTheDocument();
  });
});
