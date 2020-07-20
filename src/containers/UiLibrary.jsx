import '../assets/css/App.css';
import React, { useEffect, useState } from 'react';
import { Context } from '../context/MyProvider.js';
import UiItem from './UiItem.jsx';
import { withRouter } from 'react-router-dom';

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

	return (
		<div className="libraryContainer">
			UiLibrary
			{globalState.uiItems.map((item) => {
				// item = {id: 1, file_name: '', description: '', react_code: ''}
				const { id, name, file_name, type, description, image } = item;

				return (
					<UiItem
						key={id}
						image={image}
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

export default withRouter(UiLibrary);
