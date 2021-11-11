import React from "react";
import ReactDOM from "react-dom";
import Puls from "./shapes/Puls";

export default function App() {
  return (
    <Puls>
      <p>Hello World</p>
    </Puls>
  );
}

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
