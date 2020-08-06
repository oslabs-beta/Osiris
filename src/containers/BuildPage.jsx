import "../assets/css/BuildPage.css";
import React, { useState } from "react";
import { Context } from "../context/MyProvider.js";
import UiLibrary from "./UiLibrary.jsx";
import HierarchyContainer from "./HierarchyContainer.jsx";
import CodeDisplayContainer from "./CodeDisplayContainer.jsx";
import StyleContainer from "./StyleContainer.jsx";

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
      <div className="buildPageTop">
        <div className="codeDisplay">
          <CodeDisplayContainer items={globalState.buildUiItems} />
        </div>
          <div className="hierarchy-container">
            <HierarchyContainer items={globalState.buildUiItems}/>
          </div>
      </div>
      <div className='main-style'>
      {globalState.showPopup === true && (
						<StyleContainer  />
          )}
      </div>
      <div className="bottom-container">
        <UiLibrary page="buildpage" buttonText="Add to Build" />
      </div>
    </div>
  );
};

export default BuildPage;
