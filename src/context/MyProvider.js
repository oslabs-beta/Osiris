import React, { useState } from 'react';
export const Context = React.createContext();

export const MyProvider = (props) => {
	// uiItems = all items
	// details = latest item's details from generator
	const initialState = {
		uiItems: [],
		details: {}
	};

	const [ globalState, dispatch ] = React.useReducer(reducer, initialState);

	function reducer(state, action) {
		switch (action.type) {
			case 'add_uis':
				return { ...state, uiItems: action.payload };
			case 'generator_add_details':
				const { uiItems } = action.payload; //uiItems = data.rows from generator
				return { ...state, details: uiItems[uiItems.length - 1], uiItems };

			case 'uiLibrary_details':
				const detail = state.uiItems.filter((item) => item.id === parseInt(action.payload));
				return { ...state, details: detail[0] };
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
