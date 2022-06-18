import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Cursor.css";
import useFollowCursor from "../hooks/useFollowCursor";
import { CursorChildrenType, hoverStyle, IStyles } from "./types";
import PropTypes from "prop-types";
import IsDevice from "../helpers/isDevice";

interface Props {
  children: JSX.Element;
  borderClassName?: string;
  dotClassName?: string;
  hoverClasses?: hoverStyle[];
  turnOffOnPhone?: boolean;
}

/**
 *
 * @author AmirHossein Salighedar (https://github.com/amirho1)
 * @component Customable cursor
 *
 * @param  props
 * @param  props.children elements that you want to get the cursor shape usually at top level
 * @param  props.hoverClasses an array of objects that accept 2 property on the name of class that you want while hovering having an action an another the style class name that you want to set on dotElement
 * @param  props.borderClassName this class name will pass to cursor-border
 * @param  props.dotClassName this class name will pass to cursor-dot
 * @param  props.turnOffOnPhone boolean that makes it off on phone by default true
 * @returns  JSX.Element
 *
 * @example <Cursor>{restOfYourSite}</Cursor>
 */

function Cursor({
  children,
  borderClassName,
  dotClassName,
  hoverClasses = [],
  turnOffOnPhone = true,
}: Props) {
  const [dotChild, setDotChild] = useState<
    string | null | number | JSX.Element
  >(null);

  // remove default cursor
  useEffect(() => {
    if (!turnOffOnPhone || !IsDevice?.any()) {
      document.body.classList.add("cursor-none");
    } else {
      document.body.classList.add("initial-body");
    }
  }, [turnOffOnPhone]);

  const [classes, setClasses] = useState<
    {
      elements: NodeListOf<Element>;
      className: string;
      cursorChildren: CursorChildrenType;
    }[]
  >([]);

  // get The cursor wrapper also cursorDotElement
  const cursorWrapperElement = useRef<HTMLDivElement>(null);
  const cursorDotElement = useRef<HTMLDivElement>(null);
  const cursorBorderElement = useRef<HTMLDivElement>(null);

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
    // redo on changing hoverClasses
  }, [hoverClasses]);

  // get mouse x and y coordinate
  const { mouseX, mouseY } = useFollowCursor();

  // styles
  const styles: IStyles = useMemo(
    () => ({
      cursorBorder: {
        top: mouseY,
        left: mouseX,
      },
      innerDot: {
        top: mouseY,
        left: mouseX,
      },
    }),
    [mouseX, mouseY]
  );

  // mousedown handler
  const mouseDownHandler = useCallback(() => {
    if (cursorBorderElement.current && cursorBorderElement.current.classList)
      cursorBorderElement.current.classList.add("smaller-cursor-border");
  }, []);

  //mouseup handler

  const mouseUpHandler = useCallback(() => {
    if (cursorBorderElement.current && cursorBorderElement.current.classList)
      cursorBorderElement.current.classList.remove("smaller-cursor-border");
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
              setDotChild(className?.cursorChildren);
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

            if (className.cursorChildren) {
              cursorDotElement.current?.classList.remove("transition-none");
              setDotChild(null);
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
  }, [mouseDownHandler, mouseOutHandler, mouseOverHandler, mouseUpHandler]);

  // if device is phone and turnOffOnPhone is true return only children
  if (IsDevice?.any() && turnOffOnPhone)
    return <React.Fragment>{children}</React.Fragment>;

  return (
    <div
      ref={cursorWrapperElement}
      className="cursor-wrapper"
      data-testid="cursor">
      {/* cursor outer border element */}
      <div
        className={`cursor-border ${borderClassName}`}
        style={styles.cursorBorder}
        ref={cursorBorderElement}></div>

      {/* cursor inner dot */}
      <div
        style={styles.innerDot}
        ref={cursorDotElement}
        className={`cursor-dot ${dotClassName}`}>
        {dotChild}
      </div>

      {/* rest of your app that will get the cursor shape */}
      {children}
    </div>
  );
}

Cursor.propTypes = {
  children: PropTypes.element.isRequired,
  borderClassName: PropTypes.string,
  dotClassName: PropTypes.string,
  hoverClasses: PropTypes.arrayOf(
    PropTypes.shape({
      classNameOfTargetElement: PropTypes.string.isRequired,
      classNameOfStyle: PropTypes.string.isRequired,
      cursorChildren: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
      ]),
    })
  ),
  turnOffOnPhone: PropTypes.bool,
};

export default Cursor;
