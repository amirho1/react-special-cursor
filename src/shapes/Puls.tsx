import React, { useEffect } from "react";
import classNames from "classnames";
import "./Puls.scss";
import useFollowCursor from "../hooks/useFollowCursor";
import { IStyles } from "./types";

interface Props {
  children: JSX.Element;
  borderSize?: string;
  borderColor?: string;
  cursorClassName?: string;
}

/**
 *
 * @author AmirHossein Salighedar (https://github.com/amirho1)
 * @param  props
 * @param  props.wrapperClassName class Name of wrapper
 * @param  param.children elements that you want to get the cursor shape usually at top level
 */

export default function Puls({ children, cursorClassName }: Props) {
  const cursorWidth = 35;
  const cursorHeight = 35;

  // get mouse x and y coordinate
  const { mouseX, mouseY } = useFollowCursor();

  // styles
  const styles: IStyles = {
    cursor: {
      top: mouseY - Number(cursorHeight) / 2,
      left: mouseX - Number(cursorWidth) / 2,
      width: `${cursorWidth}px`,
      height: `${cursorHeight}px`,
    },
  };

  return (
    <div className="puls-wrapper" data-testid="Puls">
      {/* cursor  element */}
      <div
        className={classNames("puls-cursor", cursorClassName)}
        style={styles.cursor}></div>

      {/* rest of your app that will get the cursor shape */}
      {children}
    </div>
  );
}
