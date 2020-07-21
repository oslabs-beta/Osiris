import '../assets/css/DetailPage.css';
import React from 'react';
import { Context } from '../context/MyProvider.js';
const detailPage = (props) => {
	const { globalState } = React.useContext(Context);
	// destructured global state for latest component from generator
	console.log(globalState.details);

	const {
		// id,
		organization_id,
		tags,
		react_code,
		vue_code,
		file_name,
		type,
		description,
		url
	} = globalState.details;
	return (
		<div className="detailpage">
			DETAIL PAGE
			<div className="image-container">
				<img src={url} alt={file_name} className="detail-img" width="150" height="150" />
			</div>
			<ul>
				<li>
					TYPE:
					{type}
				</li>
				<li>TAGS: {tags}</li>
				<li>DESCRIPTION: {description}</li>
				<li>React Code: {react_code}</li>
			</ul>
			<div className="button-container">
				<button>Download Code</button>
			</div>
		</div>
	);
};

export default detailPage;
