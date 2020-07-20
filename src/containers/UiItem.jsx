import '../assets/css/App.css';
import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import { Context } from '../context/MyProvider.js';

const UiItem = (props) => {
	// console.log("image: ", props.image);
	const [ url, setUrl ] = useState('');
	const { globalState, dispatch } = React.useContext(Context);

	// NO NEEDE WHEN USING PROMISE.ALL from uiLibrary
	// useEffect(() => {
	// 	console.log(props.file_name);
	// 	try {
	// 		const fetchUrl = async () => {
	// 			const url = await Storage.get(`${props.file_name}.jpg`);
	// 			setUrl(url);
	// 			dispatch({
	// 				type: 'update_url',
	// 				payload: {
	// 					id: props.id,
	// 					url
	// 				}
	// 			});
	// 		};

	// 		fetchUrl();
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }, []);

	return (
		<div className="oneUIBox">
			<img src={props.url} alt={props.file_name} width="150" height="150" />
			<h2>{props.file_name}</h2>
			<h2>{props.type}</h2>
			<h2>{props.id}</h2>
			<h2>{props.description}</h2>
			<button id={props.id} onClick={props.onClick}>
				Details
			</button>
		</div>
	);
};

export default UiItem;
