import '../assets/css/App.css';
import React from 'react';

const UiItem = (props) => {
	// console.log('uiitem props: ', props);
	return (
		<div className="oneUIBox">
			<img src={props.image} alt={props.file_name} width="150" height="150" />
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
