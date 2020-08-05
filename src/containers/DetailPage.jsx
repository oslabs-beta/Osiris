import "../assets/css/DetailPage.css";
import React from "react";
import { Context } from "../context/MyProvider.js";
const detailPage = (props) => {
  const { globalState } = React.useContext(Context);
  // destructured global state for latest component from generator

  const {
    // id,
    organization_id,
    tags,
    react_code,
    vue_code,
    file_name,
    type,
    description,
    url,
  } = globalState.details;
  return (
    <div className="detailpage">
      <div className="detailHead">
        <h1>DETAIL PAGE</h1>
      </div>
      {/* <div className="oneDetail">
        <div className="image-container">
          <img src={url} alt={file_name} className="detail-img" width="150" height="150" />
          </div>
          <ul className ='detailList'>
          <li>Type: {type}</li>
          <li>Tags: {tags}</li>
          <li>Description: {description}</li>
          <li>React Code: {react_code}</li>
        </ul> */}
      <div className="oneUIBox">
        <img
          src={url}
          alt={file_name}
          // className="detail-img"
          width="150"
          height="150"
        />
        <h2>Type: {type}</h2>
        <h2>Tags: {tags}</h2>
        <h2>Description: {description}</h2>
        <h2>React Code: {react_code}</h2>
      </div>
    </div>
  );
};

export default detailPage;
