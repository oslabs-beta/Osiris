import "../assets/css/UiItem.css";
import React from "react";
import { Context } from "../context/MyProvider.js";
import { withRouter } from "react-router-dom";
const cloneDeep = require("lodash.clonedeep");

const UiItem = (props) => {
  const { globalState, dispatch } = React.useContext(Context);

  const onClick = (e) => {
    if (props.page === "uilibrary") {
      dispatch({
        type: "uiLibrary_details",
        payload: cloneDeep(props.item),
      });
      props.history.push("/detailPage");
    } else if (props.page === "buildpage") {
      if (props.type === "div") {
        dispatch({
          type: "updateBuildUiItems",
          payload: cloneDeep(props.item),
        });
      } else {
        dispatch({ type: "showPopup", payload: cloneDeep(props.item) });
      }
    }
  };

  return (
    <div className="oneUIBox">
      <img src={props.url} alt={props.file_name} width="150" height="150" />
      <h2>{props.file_name}</h2>
      <h2>{props.type}</h2>
      <h2>{props.id}</h2>
      <h2>{props.description}</h2>
      <button id={props.id} onClick={onClick}>
        {props.buttonText}
      </button>
    </div>
  );
};

export default withRouter(UiItem);
