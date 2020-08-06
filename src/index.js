import React from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { render } from "react-dom";
import App from "./components/App";
import { MyProvider } from "./context/MyProvider.js";

Amplify.configure(awsExports);
// create a script tag for our favicons and append the head. 
const favicons = document.createElement("script");
favicons.setAttribute("src" , "https://kit.fontawesome.com/ff1e868718.js");
favicons.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(favicons);



// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);





render(
  <MyProvider>
    <App />
  </MyProvider>,
  document.getElementById("root")
);
