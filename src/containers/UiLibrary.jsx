import "../assets/css/App.css";
import React, { useEffect, useState } from "react";
import { Context } from "../context/MyProvider.js";
import UiItem from "./UiItem.jsx";
import { withRouter } from "react-router-dom";
import { Storage } from "aws-amplify";

const UiLibrary = (props) => {
  const { globalState, dispatch } = React.useContext(Context);

  const handlePromises = () => {
    // map uiItem => [promises]
    const uiItemsPromises = globalState.uiItems.map((obj) => {
      return Storage.get(`${obj.file_name}.jpg`);
    });
    Promise.all(uiItemsPromises).then((results) => {
      for (let i = 0; i < results.length; i += 1) {
        dispatch({
          type: "update_url",
          payload: {
            url: results[i],
            id: globalState.uiItems[i].id,
          },
        });
      }
    });
  };

  useEffect(() => {
    handlePromises();
  }, []);

  const onClick = (e) => {
    dispatch({
      type: "uiLibrary_details",
      payload: e.target.id,
    });
    props.history.push("/detailPage");
  };

  const renderItems = () => {
    return globalState.uiItems.map((item) => {
      // item = {id: 1, file_name: '', description: '', react_code: ''}
      const { id, name, file_name, type, description, url } = item;

      return (
        <UiItem
          key={id}
          file_name={file_name}
          type={type}
          id={id}
          url={url}
          description={description}
          onClick={onClick}
        />
      );
    });
  };

  return (
    <div className="libraryContainer">
      UiLibrary
      {renderItems()}
    </div>
  );
};

export default withRouter(UiLibrary);
