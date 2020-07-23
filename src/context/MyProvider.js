import React, { useState } from 'react';
import { Storage } from 'aws-amplify';

export const Context = React.createContext();

export const MyProvider = (props) => {
	// uiItems = all items
	// details = latest item's details from generator
	const initialState = {
		uiItems: [],
		details: {},
		buildUiItems: []
	};

	const [ globalState, dispatch ] = React.useReducer(reducer, initialState);

	function reducer(state, action) {
		switch (action.type) {
			case 'add_uis':
				console.log('payload', action.payload);
				return { ...state, uiItems: action.payload };
			case 'generator_add_details':
				const { item } = action.payload; //uiItems = data.rows from generator

				return { ...state, details: item, uiItems: [...state.uiitems, item] };
			case 'uiLibrary_details':
				const detail = state.uiItems.filter((item) => item.id === parseInt(action.payload));
				return { ...state, details: detail[0] };
			case 'update_url':
				// updating the url for specific uiItem
				let uiItemsCopy = [ ...state.uiItems ];
				const uiItem = uiItemsCopy.filter((item) => item.id === parseInt(action.payload.id));
				uiItem[0].url = action.payload.url;
				return { ...state, uiItems: uiItemsCopy };
			case 'updateBuildUiItems':
				const newItem = state.uiItems.filter(item => item.id === parseInt(action.payload))[0];
				console.log(newItem)
				return {...state, buildUiItems:[...state.buildUiItems, newItem ]}
			case 'upClick':
				const index = state.buildUiItems.indexOf(action.payload)
				if(index !== 0){
					const temp = state.buildUiItems[index]
					state.buildUiItems[index] = state.buildUiItems[index-1]
					state.buildUiItems[index-1] = temp;
				}
				return {...state, buildUiItems:[...state.buildUiItems ]}
				
				case 'downClick':
					const downIndex = state.buildUiItems.indexOf(action.payload)
					if(downIndex !== state.buildUiItems.length-1){
						const tempDown = state.buildUiItems[downIndex]
						state.buildUiItems[downIndex] = state.buildUiItems[downIndex+1]
						state.buildUiItems[downIndex+1] = tempDown;
					}
					return {...state, buildUiItems:[...state.buildUiItems ]}
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
