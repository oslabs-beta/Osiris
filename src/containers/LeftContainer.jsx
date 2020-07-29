import "../assets/css/LeftContainer.css";
import React from "react";
import { Context } from "../context/MyProvider.js";
import UiLibrary from "./UiLibrary.jsx";

const LeftContainer = (props) => {
  const { globalState } = React.useContext(Context);

  return (
    <div className="leftContainer">
      <h1>Hierarchy</h1>
    </div>
  );
};

export default LeftContainer;
