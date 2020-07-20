import '../assets/css/App.css';
import React, { useEffect, useState } from 'react';
import { Context } from '../context/MyProvider.js';
import UiItem from './UiItem.jsx';
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';

const UiLibrary = (props) => {
	const { globalState, dispatch } = React.useContext(Context);
	const [ uiItems, setUiItems ] = useState([]);

	const onClick = (e) => {
		console.log(`e.target.id ${e.target.id}`);
		console.log(e.target);
		dispatch({
			type: 'uiLibrary_details',
			payload: e.target.id
		});
		props.history.push('/detailPage');
	};

	// const getURL = async (filename) => {
	//   const url = await Storage.get(filename);
	//   return url;
	// };

	return (
		<div className="libraryContainer">
			UiLibrary
			{globalState.uiItems.map((item) => {
				console.log(item);
				// item = {id: 1, file_name: '', description: '', react_code: ''}
				const { id, name, file_name, type, description } = item;

				return (
					<UiItem
						key={id}
						file_name={file_name}
						type={type}
						id={id}
						description={description}
						onClick={onClick}
					/>
				);
			})}
		</div>
	);
};

export default UiLibrary;
