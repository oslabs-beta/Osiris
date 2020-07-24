import "../assets/css/buildPage.css";
import React, { useState } from "react";
import { Context } from "../context/MyProvider.js";
import UiLibrary from "./UiLibrary.jsx";
import LeftContainer from "./LeftContainer.jsx";
import TopContainer from "./TopContainer.jsx";

const BuildPage = (props) => {
  const { globalState, dispatch } = React.useContext(Context);

  const onClick = (e) => {
    dispatch({
      type: "updateBuildUiItems",
      payload: e.target.id,
    });
  };

  return (
    <div className="buildPage">
      <div className="buildPageHeader">
        <h1>Page Builder</h1>
      </div>
      <div className="left-container">
        <LeftContainer />
      </div>
      <div className="top-container">
        <TopContainer items={globalState.buildUiItems} />
      </div>
      <div className="bottom-container">
        <UiLibrary page="buildpage" buttonText="Add to Build" />
      </div>
    </div>
  );
};

export default BuildPage;
