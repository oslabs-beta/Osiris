import '../assets/css/App.css';
import React, { useEffect, useState } from 'react';
import { Context } from '../context/MyProvider.js';
import UiItem from './UiItem.jsx';
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';

const UiLibrary = async (props) => {
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

	const renderItems = () => {
		const url = [];
		globalState.uiItems.forEach(async (item) => {
			const image = await Storage.get(item.file_name);
			url.push(image);
		});

		return globalState.uiItems.map((item, index) => {
			// item = {id: 1, file_name: '', description: '', react_code: ''}
			const { id, name, file_name, type, description } = item;
			return (
				<UiItem
					key={id}
					image={url[index]}
					file_name={file_name}
					type={type}
					id={id}
					description={description}
					onClick={onClick}
				/>
			);
		});
	};
	return (
		<div className="libraryContainer">
			UiLibrary
			{renderItems()}
		</div>
	);
};

export default withRouter(UiLibrary);
