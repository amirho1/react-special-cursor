import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import "./Cursor.scss";
import useFollowCursor from "../hooks/useFollowCursor";
import { hoverStyle, IStyles } from "./types";

interface Props {
  children: JSX.Element;
  borderClassName?: string;
  dotClassName?: string;
  hoverClasses?: hoverStyle[];
}

/**
 *
 * @author AmirHossein Salighedar (https://github.com/amirho1)
 * @component Customable cursor
 *
 * @param  props
 * @param  color color of border and dot
 * @param  props.wrapperClassName class Name of wrapper
 * @param  props.children elements that you want to get the cursor shape usually at top level
 * @param  props.hoverClasses an array of objects that accept 2 property on the name of class that you want while hovering having an action an another the style class name that you want to set on dotElement
 *
 * @returns  JSX.Element
 *
 * @example <Cursor color={"orange"}>{restOfYourSite}</Cursor>
 */

export default function Cursor({
  children,
  borderClassName,
  dotClassName,
  hoverClasses = [],
}: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [classes, setClasses] = useState<
    { elements: NodeListOf<Element>; className: string }[]
  >([]);

  const [cursorWrapperElement, setCursorWrapperElement] =
    useState<Element | null>();

  // get The cursor wrapper
  useEffect(() => {
    setCursorWrapperElement(document.querySelector(".cursor-wrapper"));
  }, []);

  // get a
  useEffect(() => {
    if (hoverClasses.length) {
      hoverClasses.forEach(className => {
        const elements = document.querySelectorAll(
          `.${className.classNameOfTargetElement}`
        );
        setClasses(current => {
          const cl = { elements, className: className.classNameOfStyle };

          return [...current, cl];
        });
      });
    }
  }, []);

  // get mouse x and y coordinate
  const { mouseX, mouseY } = useFollowCursor();

  // styles
  const styles: IStyles = {
    cursorBorder: {
      top: mouseY,
      left: mouseX,
    },
    innerDot: {
      top: mouseY,
      left: mouseX,
    },
  };

  // remove default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
  }, []);

  // mousedown handler
  const mouseDownHandler = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  //mouseup handler
  const mouseUpHandler = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  // mouseup handler
  const mouseOverHandler = useCallback(() => {
    if (classes.length) {
      classes.forEach(className => {
        for (let i = 0; i < className.elements.length; i++) {
          className.elements[i].addEventListener("mouseover", () => {
            cursorWrapperElement?.classList.add(className.className);
          });
        }
      });
    }
  }, [classes]);

  // mouse out handler
  const mouseOutHandler = useCallback(() => {
    if (classes.length)
      classes.forEach(className => {
        for (let i = 0; i < className.elements.length; i++) {
          className.elements[i].addEventListener("mouseout", () => {
            cursorWrapperElement?.classList.remove(className.className);
          });
        }
      });
  }, [classes]);

  // add event listeners
  useEffect(() => {
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mouseover", mouseOverHandler);
    window.addEventListener("mouseout", mouseOutHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mouseover", mouseOverHandler);
      window.removeEventListener("mouseout", mouseOutHandler);
    };

    // function again only when classes has changed
  }, [classes]);

  return (
    <div className="cursor-wrapper" data-testid="Dot">
      {/* cursor outer border element */}
      <div
        className={classNames("cursor-border", borderClassName, {
          "smaller-cursor-border": isMouseDown,
        })}
        style={styles.cursorBorder}></div>

      {/* cursor inner dot */}
      <div
        style={styles.innerDot}
        className={classNames("cursor-dot", dotClassName)}></div>

      {/* rest of your app that will get the cursor shape */}
      {children}
    </div>
  );
}
