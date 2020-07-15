import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { MyProvider } from "./context/MyProvider.js";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

// Now we can render our application into it
render(
  <MyProvider>
    <App />
  </MyProvider>,
  document.getElementById("root")
);
