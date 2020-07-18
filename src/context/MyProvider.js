import React, { useState } from 'react';
export const Context = React.createContext();

export const MyProvider = (props) => {
	const initialState = {
		uiItems: [],
		details: {}
	};

	const [ globalState, dispatch ] = React.useReducer(reducer, initialState);

	function reducer(state, action) {
		switch (action.type) {
			case 'add_uis':
				// setUiItems(action.payload);
				console.log('add_uis state: ', { ...state, uiItems: action.payload });
				return { ...state, uiItems: action.payload };
			case 'add_details':
				console.log('add_details state:', { ...state, details: action.payload });
				return { ...state, details: action.payload };
			default:
				return state;
		}
	}
	// not using 21 - 23 until stretch
	// const [UiItems, setUiItems] = useState("");
	// const [user, setUser] = useState("");
	// const [organization, setOrganization] = useState("");

	return <Context.Provider value={{ globalState, dispatch }}>{props.children}</Context.Provider>;
};
