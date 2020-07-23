import React, { useState } from "react";
import { Storage } from "aws-amplify";

export const Context = React.createContext();

export const MyProvider = (props) => {
  // uiItems = all items
  // details = latest item's details from generator
  const initialState = {
    uiItems: [],
    details: {},
    buildUiItems: [],
  };

  const [globalState, dispatch] = React.useReducer(reducer, initialState);

  function reducer(state, action) {
    let index;
    let buildUiItemsCopy;
    let temp;

    switch (action.type) {
      case "add_uis":
        console.log("payload", action.payload);
        return { ...state, uiItems: action.payload };
      case "generator_add_details":
        const { item } = action.payload; //uiItems = data.rows from generator
        let copy = [...state.uiItems, item];
        console.log("generator_add_details: ", copy);
        return { ...state, details: item, uiItems: [...copy] };
      case "uiLibrary_details":
        const detail = state.uiItems.filter(
          (item) => item.id === parseInt(action.payload)
        );
        return { ...state, details: detail[0] };
      case "update_url":
        // updating the url for specific uiItem
        let uiItemsCopy = [...state.uiItems];
        const uiItem = uiItemsCopy.filter(
          (item) => item.id === parseInt(action.payload.id)
        );
        uiItem[0].url = action.payload.url;
        return { ...state, uiItems: uiItemsCopy };
      case "updateBuildUiItems":
        const newItem = state.uiItems.filter(
          (item) => item.id === parseInt(action.payload)
        )[0];
        return { ...state, buildUiItems: [...state.buildUiItems, newItem] };
      case "upClick":
        buildUiItemsCopy = [...state.buildUiItems];
        index = buildUiItemsCopy.indexOf(action.payload);

        if (index !== 0) {
          temp = buildUiItemsCopy[index];
          buildUiItemsCopy[index] = buildUiItemsCopy[index - 1];
          buildUiItemsCopy[index - 1] = temp;
        }
        return { ...state, buildUiItems: buildUiItemsCopy };

      case "downClick":
        buildUiItemsCopy = [...state.buildUiItems];
        index = buildUiItemsCopy.indexOf(action.payload);

        if (index !== state.buildUiItems.length - 1) {
          temp = buildUiItemsCopy[index];
          buildUiItemsCopy[index] = buildUiItemsCopy[index + 1];
          buildUiItemsCopy[index + 1] = temp;
        }
        return { ...state, buildUiItems: buildUiItemsCopy };
      default:
        return state;
    }
  }
  // not using 21 - 23 until stretch
  // const [UiItems, setUiItems] = useState("");
  // const [user, setUser] = useState("");
  // const [organization, setOrganization] = useState("");

  return (
    <Context.Provider value={{ globalState, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
