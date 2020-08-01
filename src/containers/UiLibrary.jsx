import '../assets/css/UiLibrary.css';
import React, { useEffect, useState } from 'react';
import { Context } from '../context/MyProvider.js';
import UiItem from './UiItem.jsx';
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';

import TopContainer from './TopContainer.jsx';

const UiLibrary = (props) => {
	const { globalState, dispatch } = React.useContext(Context);

	const renderItems = () => {
		return globalState.uiItems.map((item) => {
			// item = {id: 1, file_name: '', description: '', react_code: ''}
			const { id, name, file_name, type, description, url } = item;

			return (
				<UiItem
					key={id}
					file_name={file_name}
					type={type}
					id={id}
					url={url}
					description={description}
					page={props.page}
					buttonText={props.buttonText}
				/>
			);
		});
	};

	return (
		<div className="libraryContainer">
			<div className="libraryHeader">
				<h1>UiLibrary</h1>
			</div>
			<div className="ui-library">{renderItems()}</div>
		</div>
	);
};

export default withRouter(UiLibrary);
