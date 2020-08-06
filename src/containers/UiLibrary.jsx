import '../assets/css/UiLibrary.css';
import React, { useEffect, useState } from 'react';
import { Context } from '../context/MyProvider.js';
import UiItem from './UiItem.jsx';
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';

const UiLibrary = (props) => {
	const { globalState, dispatch } = React.useContext(Context);

	const renderItems = () => {
		return globalState.uiItems.map((item) => {
			const { id, name, file_name, type, description, url } = item;

			return (
				<UiItem
					item={item}
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
