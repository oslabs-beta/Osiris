import "../assets/css/App.css";
import React from "react";
import { Context } from "../context/MyProvider.js";

const UiLibrary = (props) => {
  const { globalContext, dispatch } = React.useContext(Context);

  console.log(globalContext);

  const UiItems = [];

  globalContext.uiItems.map((item) => {
    return <UiItem itemData={item} />;
  });
  return (
    <div className="libraryContainer">
      UiLibrary
      {globalContext.uiItems.map((item) => {
        // item = {id: 1, file_name: '', description: '', react_code: ''}
        const { id, name, file_name, type, description } = item;

        return (
          <UiItem
            key={id}
            image={image}
            file_name={file_name}
            type={type}
            id={id}
            description={description}
          />
        );
      })}
    </div>
  );
};

export default UiLibrary;
