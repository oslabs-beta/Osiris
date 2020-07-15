<<<<<<< HEAD
import MyContext from './MyContext';
import React, { Component } from 'react';

class MyProvider extends Component {
	constructor() {
		super();
		this.state = {
			uiItems: [],
			user: [],
			organization: []
		};
	}

	render() {
		return <MyContext.Provider value={this.state}>{this.props.children}</MyContext.Provider>;
	}
}

export default MyProvider;
=======
import MyContext from "./MyContext";
import React, { useState } from "react";
export const Context = React.createContext();

export const MyProvider = (props) => {
  const initialState = {
    list: [
      {
        itemId: 1,
        task: "Add the delete functionality",
        completed: false,
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "add_uis":
        console.log(action);
        setUiItems(action.payload);
        return state;
      default:
        return state;
    }
  };

  const [UiItems, setUiItems] = useState("");
  const [user, setUser] = useState("");
  const [organization, setOrganization] = useState("");
  const [globalState, dispatch] = React.useReducer(reducer, initialState);
  console.log(globalState);
  return (
    <Context.Provider value={{ globalState, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
>>>>>>> 6a74f9a8f75e39dc7b0203a033d023017dd60f64
