import "../assets/css/bottomContainer.css";
import React from "react";
import { Context } from "../context/MyProvider.js";
import UiLibrary from "./UiLibrary.js";

const BottomContainer = (props) => {
  const { globalState } = React.useContext(Context);

  return <div className="BottomContainer"></div>;
};

export default BottomContainer;
