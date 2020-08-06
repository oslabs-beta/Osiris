import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
const cloneDeep = require('lodash.clonedeep');
let counter = 0;
let toggle = false;
export const Context = React.createContext();

function findIndex(array, id) {
	let index;

	for (let i = 0; i < array.length; i++) {
		if (Array.isArray(array[i])) {
			let nestedIndex = findIndex(array[i], id);
			if (nestedIndex !== undefined) {
				index = [ i, nestedIndex ];
				break;
			}
		} else {
			if (array[i].buildId === id) {
				index = i;
	
				break;
			}
		}
	}
	return index;
}

function shoveItIn(buildUiItems, itemToMove) {
	if (Array.isArray(buildUiItems)) {
		buildUiItems.push(itemToMove);
		itemToMove.level += 1;
		return buildUiItems;
	} else {
		if (buildUiItems.type === 'div') {
			// if itemsToMove is an array
			itemToMove.level += 1;
			if (Array.isArray(itemToMove)) {
				return [ buildUiItems ].concat(itemToMove);
			} else {
				return [ buildUiItems, itemToMove ];
			}
		} else {
			alert('This element is not nestable.');
			return buildUiItems;
		}
	}
}

function pullOut(arr, targetIndex) {
	// pull out target and return updated nested arr
	if (targetIndex === 0) return arr;
	return arr.filter((el, index) => {
		if (index === targetIndex) el.level--;
		return index !== targetIndex;
	});

	// [[{div}, {button}, {input}, {input2}]] => [[{div}, {input}, {input2}], {button}] // return [{div}, {input}, {input2}]
	// {div} index1
	// index1& index2 ({button}) => index1+1 (1)
	// if there was anything in buildUiItemsCopy at index 1 and onwards, just add it to the back
}

export const MyProvider = (props) => {
	// uiItems = all items
	// details = latest item's details from generator
	const initialState = {
		uiItems: [],
		details: {},
		buildUiItems: [],
		showPopup: false,
		clickedItem: {},
		language: 'react'
	};

	const [ globalState, dispatch ] = React.useReducer(reducer, initialState);

	function reducer(state, action) {
		let index;
		let buildUiItemsCopy;
		let temp;
		let uiItemsCopy;

		switch (action.type) {
			case 'add_uis':
				return {
					...state,
					uiItems: action.payload
				};
			case 'generator_add_details':
				const { item } = action.payload; //uiItems = data.rows from generator
				let copy = [ ...state.uiItems, item ];
				return {
					...state,
					details: item,
					uiItems: [ ...copy ]
				};
			case 'uiLibrary_details':
				return {
					...state,
					details: action.payload
				};
			case 'update_url':
				// updating the url for specific uiItem
				uiItemsCopy = [ ...state.uiItems ];
				const uiItem = uiItemsCopy.filter((item) => item.id === parseInt(action.payload.id));
				uiItem[0].url = action.payload.url;
				return {
					...state,
					uiItems: uiItemsCopy
				};
			case 'clearCode':
				return {
					...state,
					language: 'react',
					buildUiItems: []
				};
			case 'updateBuildUiItems':
				uiItemsCopy = cloneDeep(state.uiItems);
				const newItemsCopy = action.payload;

				// update popup if true to hide left container
				// clear clickedItem
				let popup = state.showPopup;
				let clickedItem = state.clickedItem;
				if(state.showPopup) {
					popup = false;
					clickedItem = {};
				}

				newItemsCopy.level = 0;
				newItemsCopy.buildId = Math.floor(Math.random() * 1000);
				counter++;
				buildUiItemsCopy = [ ...state.buildUiItems ];
				if (counter === 2 && !toggle) {
					toggle = true;
					buildUiItemsCopy.push(newItemsCopy);
					counter = 0;
					console.log('line 139: buildUiItems: ', state.buildUiItems)
					return {
						...state,
						buildUiItems: buildUiItemsCopy,
						showPopup: popup,
						clickedItem: clickedItem
					};
				} else if (counter === 1 && toggle) {
					buildUiItemsCopy.push(newItemsCopy);
					counter = 0;
					console.log('line 149: buildUiItems: ', state.buildUiItems)
					return {
						...state,
						buildUiItems: buildUiItemsCopy,
						showPopup: popup,
						clickedItem: clickedItem
					};
				} else {
					return { ...state };
				}
			case 'upClick':
				buildUiItemsCopy = [ ...state.buildUiItems ];
				index = findIndex(buildUiItemsCopy, action.payload.buildId);
				// when index is arr (nested)
				if (Array.isArray(index)) {
					// index = [1,0]
					const [ index1, index2 ] = index;
					if (index1 !== 0) {
						temp = buildUiItemsCopy[index1];
						buildUiItemsCopy[index1] = buildUiItemsCopy[index1 - 1];
						buildUiItemsCopy[index1 - 1] = temp;
					}
					// don't let nested arr move! Already first item
				} else {
					// when index is num (not nested)
					if (index !== 0) {
						temp = buildUiItemsCopy[index];
						buildUiItemsCopy[index] = buildUiItemsCopy[index - 1];
						buildUiItemsCopy[index - 1] = temp;
					}
				}
				return {
					...state,
					buildUiItems: buildUiItemsCopy
				};
			case 'downClick':
				buildUiItemsCopy = [ ...state.buildUiItems ];
				index = findIndex(buildUiItemsCopy, action.payload.buildId);
				if (Array.isArray(index)) {
					// index = [1,0]
					const [ index1, index2 ] = index; 
					if (index1 !== buildUiItemsCopy.length - 1) {
						// make sure item is not last
						temp = buildUiItemsCopy[index1 + 1];
						buildUiItemsCopy[index1 + 1] = buildUiItemsCopy[index1];
						buildUiItemsCopy[index1] = temp;
					}
				} else {
					if (index !== buildUiItemsCopy.length - 1) {
						temp = buildUiItemsCopy[index];
						buildUiItemsCopy[index] = buildUiItemsCopy[index + 1];
						buildUiItemsCopy[index + 1] = temp;
					}
				}
				return {
					...state,
					buildUiItems: buildUiItemsCopy
				};
			case 'leftClick':
				buildUiItemsCopy = cloneDeep(state.buildUiItems);

				// Edge Cases
				// case 1: NO: [[{div}, {button}]] 
					 // don't want [[[{div}, {button}]]] button wanting to shove into div again
				// case 2: YES: [{div}, [{div2}, {button}], {button2}] => [[{div}, {div2}, {button}], {button2}]

				index = findIndex(buildUiItemsCopy, action.payload.buildId);
				let updatedBuildState;

				// case 1 & 2 if index === number
				// case 2: index = 1
				if (typeof index === 'number') {
					let temp = shoveItIn(buildUiItemsCopy[index - 1], buildUiItemsCopy[index]);
					// if no error, then modify, otherwise leave alone
					if (temp !== state.buildUiItems[index - 1]) {
						updatedBuildState = temp;

						buildUiItemsCopy[index - 1] = updatedBuildState;
						buildUiItemsCopy = buildUiItemsCopy.slice(0, index).concat(buildUiItemsCopy.slice(index + 1));
					}
				} else {
					let [ index1, index2 ] = index;

					if (index2 > 0) {
						// if already nested, dont next another level
						return { ...state };
					} else if (index2 === 0) {
						// moving a nested array into a div (above the nested array)
						updatedBuildState = shoveItIn(buildUiItemsCopy[index1 - 1], buildUiItemsCopy[index1]);

						const afterIndex1 = buildUiItemsCopy.slice(index1 + 1); // [{}, {}]
						const beforeIndex1 = buildUiItemsCopy.slice(0, index1 - 1); // [[{div}, {input}]]
						buildUiItemsCopy = [ ...beforeIndex1, updatedBuildState, ...afterIndex1 ];
					} else {
						// General Case: pushing a button/input into a nested array above it     [[{div},{button}], {button}, [{div}, {input}]] => [[{div},{button}, {button}]]
						const itemToMove = buildUiItemsCopy[index1][index2]; // [[{div}, [{div}, {button}]] {button}] <div></div><div><button/></div><button/>
						const toMoveInto = buildUiItemsCopy[index1][index2 - 1];

						updatedBuildState = shoveItIn(toMoveInto, itemToMove);
						buildUiItemsCopy[index1][index2 - 1] = updatedBuildState;

						let temp = buildUiItemsCopy[index1];
						let newTemp = temp.slice(0, index2).concat(temp.slice(index2 + 1));

						buildUiItemsCopy[index1] = newTemp;
					}
				}
				return { ...state, buildUiItems: buildUiItemsCopy };
			case 'rightClick':
				// To fix:
				// unnest again

				// case 1 [[{div}, {button}]] => [{div}, {button}]
				// case 1.25 [[{div}, {button}], {input}] => [{div}, {button}, {input}]
				// case 1.5 [{input},[{div}, {button}], {input2}] => [{input},{div}, {button}, {input2}]
				// case 2 [[[{div}, {button}]]] => case 1 [[{div}, {button}]] => [{div}, {button}]
				// case 3: [{div}, [{div}, {input}]]
				// case 4: [[{div},{button},{input}]] => [[{div},{input}], {button}]
				// case 5: [[{div},{button},{input}]] => [[{div},{button}], {input}]
				buildUiItemsCopy = [ ...state.buildUiItems ];
				let id = action.payload.buildId;
				index = findIndex(buildUiItemsCopy, id); // case 1 [0,1] // case 1.5 [1,1]
				if (typeof index === 'number') {
					return { ...state };
				}

				// if nested
				let [ index1, index2 ] = index;

				if (index1 === 0) {
					// return concated version
					let temp = buildUiItemsCopy.slice(1); // stuff afterwards to add back later
					let pulledOut = buildUiItemsCopy[index1][index2];
					let nestedArray = buildUiItemsCopy[index1];
					// case 1.25 [[{div}, {button}], {input}] => [{div}, {button}, {input}]
					if (nestedArray.length === 2) {
						buildUiItemsCopy = buildUiItemsCopy[index1].concat(temp);
					} else if (nestedArray.length > 2) {
						// case 4 & 5 [[{div}, {button}, {input}], {}, {}] => [[{div}, {input}], {button},{},{}] 
						const updatedNestedArray = pullOut(nestedArray, index2); // [{div}, [input]]
						// replace old nested array with new one without the pulled out object
						buildUiItemsCopy[index1] = updatedNestedArray;
						// put pulledOut into the index1 + 1
						const afterIndex1 = buildUiItemsCopy.slice(index1 + 1); // [{}, {}]
						const beforeIndex1 = buildUiItemsCopy.slice(0, index1); // [[{div}, {input}]]

						buildUiItemsCopy = [ ...beforeIndex1, buildUiItemsCopy[index1], pulledOut, ...afterIndex1 ];
					}
					// {div} index1
					// index1& index2 ({button}) => index1+1 (1)
					// if there was anything in buildUiItemsCopy at index 1 and onwards, just add it to the back
				}
				return { ...state, buildUiItems: buildUiItemsCopy };
			case 'change_language':
				return { ...state, language: action.payload };
			case 'showPopup':
				return {...state, showPopup: true, clickedItem: action.payload };
			default:
				return state;
		}
	}

	return (
		<Context.Provider
			value={{
				globalState,
				dispatch
			}}
		>
			{' '}
			{props.children}{' '}
		</Context.Provider>
	);
};
