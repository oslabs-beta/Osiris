import React, { useState } from "react";
export const Context = React.createContext();

export const MyProvider = (props) => {
  const initialState = {
    uiItems: [],
  };

  // not using 21 - 23 until stretch
  //const [UiItems, setUiItems] = useState("");
  //const [user, setUser] = useState("");
  //const [organization, setOrganization] = useState("");
  const [globalState, dispatch] = React.useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "add_uis":
        //setUiItems(action.payload);
        return { ...state, uiItems: action.payload };
      default:
        return state;
    }
  };
  
  
  return (
    <Context.Provider value={{ globalState, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
