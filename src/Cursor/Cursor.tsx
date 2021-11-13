import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./Cursor.scss";
import useFollowCursor from "../hooks/useFollowCursor";
import { CursorChildrenType, hoverStyle, IStyles } from "./types";
import ReactDOM from "react-dom";

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
 * @param  props.children elements that you want to get the cursor shape usually at top level
 * @param  props.hoverClasses an array of objects that accept 2 property on the name of class that you want while hovering having an action an another the style class name that you want to set on dotElement
 * @param  props.borderClassName this class name will pass to cursor-border
 * @param  props.dotClassName this class name will pass to cursor-dot
 *
 * @returns  JSX.Element
 *
 * @example <Cursor>{restOfYourSite}</Cursor>
 */

export default function Cursor({
  children,
  borderClassName,
  dotClassName,
  hoverClasses = [],
}: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [classes, setClasses] = useState<
    {
      elements: NodeListOf<Element>;
      className: string;
      cursorChildren: CursorChildrenType;
    }[]
  >([]);
  useState<Element | null>();

  // get The cursor wrapper also cursorDotElement
  const cursorWrapperElement = useRef<HTMLDivElement>(null);
  const cursorDotElement = useRef<HTMLDivElement>(null);

  // get a
  useEffect(() => {
    if (hoverClasses.length) {
      hoverClasses.forEach(hoverClass => {
        const elements = document.querySelectorAll(
          `.${hoverClass.classNameOfTargetElement}`
        );
        setClasses(current => {
          const cl = {
            elements,
            className: hoverClass.classNameOfStyle,
            cursorChildren: hoverClass.cursorChildren,
          };

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
            cursorWrapperElement.current?.classList.add(className.className);

            if (className?.cursorChildren) {
              cursorDotElement.current?.classList.add("transition-none");
              if (
                (typeof className.cursorChildren === "string" ||
                  typeof className.cursorChildren === "number") &&
                cursorDotElement.current
              ) {
                cursorDotElement.current.textContent = String(
                  className.cursorChildren
                );
              } else if (
                typeof className?.cursorChildren !== "string" &&
                cursorDotElement &&
                typeof className?.cursorChildren !== "number"
              ) {
                ReactDOM.render(
                  className?.cursorChildren,
                  cursorDotElement.current
                );
              }
            }
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
            cursorWrapperElement.current?.classList.remove(className.className);

            if (className.cursorChildren && cursorDotElement.current) {
              cursorDotElement.current?.classList.remove("transition-none");
              cursorDotElement.current.textContent = "";
              ReactDOM.unmountComponentAtNode(cursorDotElement.current);
            }
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

    // function again only when hoverClasses has changed
  }, [classes]);

  return (
    <div
      ref={cursorWrapperElement}
      className="cursor-wrapper"
      data-testid="cursor">
      {/* cursor outer border element */}
      <div
        className={classNames("cursor-border", borderClassName, {
          "smaller-cursor-border": isMouseDown,
        })}
        style={styles.cursorBorder}></div>

      {/* cursor inner dot */}
      <div
        style={styles.innerDot}
        ref={cursorDotElement}
        className={classNames("cursor-dot", dotClassName)}></div>

      {/* rest of your app that will get the cursor shape */}
      {children}
    </div>
  );
}
