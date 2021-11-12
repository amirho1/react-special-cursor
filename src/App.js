import "./App.css";
import Cursor from "react-special-cursor";

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
      ]}>
      <div className="wrapper">
        <h1>
          <a
            className="head"
            rel="noreferrer"
            href="https://github.com/amirho1/react-cursors.git"
            target="_blank">
            React-special-cursors
          </a>
        </h1>
        <p>
          A custom animated cursor for{" "}
          <a
            rel="noreferrer"
            className="react"
            target="_blank"
            href="https://reactjs.org/">
            React
          </a>{" "}
          also supports{" "}
          <a
            className="link"
            rel="noreferrer"
            target="_blank"
            href="https://www.typescriptlang.org/download">
            {" "}
            Typescript
          </a>
        </p>
        <p>You can hover over the links and click to see animations</p>
        Author:{" "}
        <a
          rel="noreferrer"
          href="https://github.com/amirho1"
          target="_blank"
          className="author">
          {" "}
          AmirHossein Salighedar
        </a>
      </div>
    </Cursor>
  );
}
