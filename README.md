<div style="text-align:justify;">

# custom-react-cursor

A [React](https://reactjs.org) Custom able cursor that can decorate your site also your hand is open to manipulate the cursor with css

## [Demo live](https://amirho1.github.io/react-special-cursor/)

## Installing

```
  npm i react-special-cursor
```

## Running Demo

```
npm i
```

```
npm run serve
```

## Build

```
npm run build
```

## Test

it's on watch mode you can change it through [package.json](./package.json)

```
npm run test
```

## Usage

```javascript
import Cursor from "react-special-cursor";

function App() {
  return (
    <Cursor>
      <App>...</App>
    </Cursor>
  );
}
```

if you want to put something beside App component you should put them inside a **Fragment** like this

```javascript
import Cursor from "react-special-cursor";

function App() {
  return (
    <Cursor>
      <React.Fragment>
        <App>...</App>
        <AnotherComponent></AnotherComponent>
        ...
      </React.Fragment>
    </Cursor>
  );
}

// or

function App() {
  return (
    <Cursor>
      <>
        <App>...</App>
        <AnotherComponent>...</AnotherComponent>
        ...
      </>
    </Cursor>
  );
}

// also you can do this

function App() {
  return <Cursor children={<App>...</App>} />;
}
```

# Example file

```javascript
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
      </div>
    </Cursor>
  );
}

const container = document.getElementById("root");
const root = container && createRoot(container);

root?.render(<App />);


}
```

### css example

cursor-dot is default the className for dot and for border is cursor-border

```css
body {
  background-color: #333;
  color: white;
  margin: 0;
  padding: 0;
  height: 1000px;
}

a {
  color: rgb(0, 166, 216);
  text-decoration: none;
}

.wrapper {
  margin: auto;
  width: 60%;
  text-align: center;
  line-height: 2em;
}

.hover .cursor-dot {
  width: 100px;
  height: 100px;
  z-index: -1;
  background-color: lightblue;
}

.hover .cursor-border {
  z-index: -1;
}

.link {
  padding: 1em;
}

.react-hover .cursor-border {
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 0;
  z-index: -1;
}

.react-hover .cursor-dot {
  z-index: -3;
}

.author {
  color: orange;
  font-weight: 800;
  font-size: 1.3em;
}

.author-on-hover .cursor-dot {
  width: 100px;
  height: 100px;
  background-color: gray;
  z-index: -1;
}

.author-on-hover .cursor-border {
  z-index: -1;
}

.head {
  color: bisque;
}

.head-hover .cursor-border {
  border: 5px dotted darkorange;
}

.head-hover .cursor-dot {
  background-color: purple;
  width: 20px;
  height: 20px;
}

.children {
  color: rgb(114, 253, 0);
}

.children-hover .cursor-dot {
  width: 600px;
  height: 600px;
  background-color: white;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}

.children-hover .cursor-border {
  z-index: -1;
}

.h3 {
  color: #333;
  padding: 2em;
}

.react-icon {
  width: 200px;
  position: absolute;
  top: 2em;
  right: 10.5em;
}
```

## Properties

| Name            | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children        | JSX.Element | the rest of your application i should be App component                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| borderClassName | string      | className of cursor border                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| dotClassName    | string      | className of cursor inner dot                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| turnOffOnPhone  | boolean     | turns off special cursor when user device is phone                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| hoverClasses    | object      | an array of objects that each object accepts 2 string one with name of classNameOfTargetElement that accepts the className of the elements that you want to have some styles on hover second is classNameOfStyle the className that will passed to the cursor-wrapper element from that you have access to modify cursor-dot and cursor-border on each hover also in version 1.1.0 it has a third property that you can display HTMLElement or text inside the cursor-dot you can check the Demo |

## hoverClasses Object Type

```typescript
[
  {
    classNameOfTargetElement: string;
    classNameOfStyle: string;
    cursorChildren: JSX.Element | string | undefined | number
  }
]
```

## detecting phone devices

it's detecting phone devices so u can turn it off on phone devices (it's off by default) but u cant turn it on by setting turnOffOnPhone to false

## Author

[**AmirHossein Salighedar**](https://github.com/amirho1)

## License

[MIT](./LICENSE)

</div>
