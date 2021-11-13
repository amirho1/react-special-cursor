import React from "react";
import ReactDOM from "react-dom";
import Cursor from "./Cursor/Cursor";
import "./demo.scss";

const welcome = (
  <h3 className="h3">
    Welcome to Demo of React-special-cursor from version 1.1.0 u will have the
    ability to show texts, elements ... on hover inside the cursor-dot by only
    adding a cursorChildren to hoverClass object
    <span style={{ color: "red" }}> Click to see documentation</span>
    <img
      className="react-icon"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
      alt="react img "
    />
  </h3>
);

export default function App() {
  return (
    <Cursor
      hoverClasses={[
        { classNameOfTargetElement: "head", classNameOfStyle: "head-hover" },
        { classNameOfTargetElement: "link", classNameOfStyle: "hover" },
        { classNameOfTargetElement: "react", classNameOfStyle: "react-hover" },
        {
          classNameOfTargetElement: "author",
          classNameOfStyle: "author-on-hover",
        },
        {
          classNameOfTargetElement: "children",
          classNameOfStyle: "children-hover",
          cursorChildren: welcome,
        },
      ]}>
      <div className="wrapper">
        <h1>
          <a
            className="head"
            href="https://github.com/amirho1/react-cursors.git"
            target="_blank">
            React-cursors
          </a>
        </h1>
        <p>
          A custom animated cursor for{" "}
          <a className="react" target="_blank" href="https://reactjs.org/">
            React
          </a>{" "}
          also supports{" "}
          <a
            className="link"
            target="_blank"
            href="https://www.typescriptlang.org/download">
            {" "}
            Typescript
          </a>
        </p>
        <p>You can hover over the links and click to see animations</p>
        Author:{" "}
        <a href="https://github.com/amirho1" target="_blank" className="author">
          {" "}
          AmirHossein Salighedar
        </a>
        <a
          href="https://github.com/amirho1/react-special-cursor"
          style={{ marginTop: "3em", fontSize: "2rem", display: "block" }}>
          <span className="children">HoverMe</span>
        </a>
        <a
          href="https://github.com/amirho1/react-special-cursor"
          style={{ marginTop: "3em", fontSize: "2rem", display: "block" }}>
          <span className="children">HoverMe</span>
        </a>
      </div>
    </Cursor>
  );
}

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
