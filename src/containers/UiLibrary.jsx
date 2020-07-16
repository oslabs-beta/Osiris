import "../assets/css/App.css";
import React, { useEffect, useState } from "react";
import { Context } from "../context/MyProvider.js";
import UiItem from "./UiItem.jsx";

const UiLibrary = (props) => {
  const { globalState, dispatch } = React.useContext(Context);
  const [uiItems, setUiItems] = useState([]);
  useEffect(() => {
    setUiItems(globalState.uiItems);
  }, []);

  return (
    <Context.Consumer>
      {({ globalState }) => (
        <div className="libraryContainer">
          UiLibrary
          {globalState.uiItems.map((item) => {
            // item = {id: 1, file_name: '', description: '', react_code: ''}
            const { id, name, file_name, type, description, image } = item;

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
      )}
    </Context.Consumer>
  );
};

export default UiLibrary;
