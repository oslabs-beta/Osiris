import React, { useState } from "react";
import { Storage } from "aws-amplify";

export const Context = React.createContext();

function findIndex(array, id) {
  // [  [ {}, {} ],       {} ]
  let index;
  array.forEach((item, i) => {
    if (Array.isArray(item)) {
      let nestedIndex = findIndex(item, id);
      index = [i, nestedIndex];
      console.log("item: ", item);
      console.log("i: ", i);
      console.log("nested index: ", nestedIndex);
    } else {
      if (item.id === id) index = i;
    }
  });

  return index;
}

function handleLeftClick(buildUiItems, itemToMove) {
  if (Array.isArray(buildUiItems)) {
    buildUiItems.push(itemToMove);
    return buildUiItems;
  } else {
    return [buildUiItems, itemToMove];
  }
}

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
        return {
          ...state,
          uiItems: action.payload,
        };
      case "generator_add_details":
        const { item } = action.payload; //uiItems = data.rows from generator
        let copy = [...state.uiItems, item];
        console.log("generator_add_details: ", copy);
        return {
          ...state,
          details: item,
          uiItems: [...copy],
        };
      case "uiLibrary_details":
        const detail = state.uiItems.filter(
          (item) => item.id === parseInt(action.payload)
        );
        return {
          ...state,
          details: detail[0],
        };
      case "update_url":
        // updating the url for specific uiItem
        let uiItemsCopy = [...state.uiItems];
        const uiItem = uiItemsCopy.filter(
          (item) => item.id === parseInt(action.payload.id)
        );
        uiItem[0].url = action.payload.url;
        return {
          ...state,
          uiItems: uiItemsCopy,
        };
      case "updateBuildUiItems":
        const newItem = state.uiItems.filter(
          (item) => item.id === parseInt(action.payload)
        )[0];

        newItem.level = 0;

        return {
          ...state,
          buildUiItems: [...state.buildUiItems, newItem],
        };
      case "upClick":
        buildUiItemsCopy = [...state.buildUiItems];
        index = buildUiItemsCopy.indexOf(action.payload);

        if (index !== 0) {
          temp = buildUiItemsCopy[index];
          buildUiItemsCopy[index] = buildUiItemsCopy[index - 1];
          buildUiItemsCopy[index - 1] = temp;
        }
        return {
          ...state,
          buildUiItems: buildUiItemsCopy,
        };

      case "downClick":
        buildUiItemsCopy = [...state.buildUiItems];
        index = buildUiItemsCopy.indexOf(action.payload);

        if (index !== state.buildUiItems.length - 1) {
          temp = buildUiItemsCopy[index];
          buildUiItemsCopy[index] = buildUiItemsCopy[index + 1];
          buildUiItemsCopy[index + 1] = temp;
        }
        return {
          ...state,
          buildUiItems: buildUiItemsCopy,
        };
      case "leftClick":
        buildUiItemsCopy = [...state.buildUiItems];
        // index = buildUiItemsCopy.indexOf(action.payload);

        // <3 case 1: [ {div}, {button} ] => index: 1 => [[{div}, {button}]]
        // handleLeftClick => [{div}, {button}] at index 0
        // case 2: [[{div}, {button}], {button2}] => 2 => [ [ {div}, {button}, {button2} ] ]
        // case 3: [ [{div}, {input}, {button}] ] => [0, 1] ==> [ [ [{div}, {input}], {button}] ]

        index = findIndex(buildUiItemsCopy, action.payload.id);
        let updatedBuildState;

        // case 1 & 2 if index === number
        if (typeof index === "number") {
          updatedBuildState = handleLeftClick(
            buildUiItemsCopy[index - 1],
            buildUiItemsCopy[index]
          );
          console.log(updatedBuildState);

          buildUiItemsCopy[index - 1] = updatedBuildState;
          buildUiItemsCopy = buildUiItemsCopy
            .slice(0, index)
            .concat(buildUiItemsCopy.slice(index + 1));
        } else {
          // case 3: [ [{div}, {input}, {button}] ]
          let [index1, index2] = index;
          updatedBuildState = handleLeftClick(
            buildUiItemsCopy[index1][index2 - 1],
            buildUiItemsCopy[index1][index2]
          ); // [{div}, {input}]
          // case 3: {div} = [{div}, {input}] index === array
          buildUiItemsCopy[index1][index2 - 1] = updatedBuildState; // [ [ [{div}, {input}], {input}, {button}] ]

          let temp = buildUiItemsCopy[index1];

          let newTemp = temp.slice(0, index2).concat(temp.slice(index2 + 1));
          buildUiItemsCopy[index1] = newTemp;
        }
        console.log("updated buildUiItemsCopy: ", buildUiItemsCopy);

        return { ...state, buildUiItems: buildUiItemsCopy };
      case "rightClick":
        buildUiItemsCopy = [...state.buildUiItems];
        // index = buildUiItemsCopy.indexOf(action.payload);
        let id = action.payload.id;
        index = findIndex(buildUiItemsCopy, id);
        console.log("rightclick index: ", index);
        return { ...state };
      // if (buildUiItemsCopy[index - 1].type === "div") {
      //   buildUiItemsCopy.pop();
      //   console.log("buildUiItems: ", buildUiItemsCopy);
      //   return {
      //     ...state,
      //     buildUiItems: buildUiItemsCopy,
      //   };
      // }
      default:
        return state;
    }
  }

  // not using 21 - 23 until stretch
  // const [UiItems, setUiItems] = useState("");
  // const [user, setUser] = useState("");
  // const [organization, setOrganization] = useState("");

  return (
    <Context.Provider
      value={{
        globalState,
        dispatch,
      }}
    >
      {" "}
      {props.children}{" "}
    </Context.Provider>
  );
};
