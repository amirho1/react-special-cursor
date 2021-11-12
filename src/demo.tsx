import React from "react";
import ReactDOM from "react-dom";
import Cursor from "./Cursor/Cursor";
import "./demo.scss";

export default function App() {
  return (
    <Cursor
      color="orange"
      hoverClasses={[
        { classNameOfTargetElement: "head", classNameOfStyle: "head-hover" },
        { classNameOfTargetElement: "link", classNameOfStyle: "hover" },
        { classNameOfTargetElement: "react", classNameOfStyle: "react-hover" },
        {
          classNameOfTargetElement: "author",
          classNameOfStyle: "author-on-hover",
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
      </div>
    </Cursor>
  );
}

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
