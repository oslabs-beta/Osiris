import '../assets/css/App.css';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import { Context } from '../context/MyProvider.js';
import { Pool } from 'pg';
import { PG_URI } from '../pgKeys';
const pool = new Pool({ connectionString: PG_URI });

function Generator(props) {
	const { dispatch } = React.useContext(Context);
	// initial state for generator:
	// htmlTags, buttonText, placeholder - compiled into react code
	// file only for handleFileChange
	const [ userData, setUserData ] = useState({
		htmlTags: 'div',
		searchTags: '',
		reactCode: '',
		description: '',
		fileName: '',
		buttonText: '',
		placeholder: '',
		image: '',
		s3file: ''
	});

	// uploading files
	function handleFileChange(e) {
		const file = e.target.files[0];
		setUserData({
			...userData,
			s3file: file
		});
	}
	// typed input updating state
	function handleChange(e) {
		setUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	}

	//
	async function handleClick(e) {
		e.preventDefault();
		try {
			// puts info into bucket
			let image = await Storage.put(`${userData.fileName}.jpg`, userData.s3file);

			console.log(image);

			const { htmlTags, buttonText, placeholder, searchTags, description, fileName } = userData;

			// for react code
			let reactCode;
			switch (htmlTags) {
				case 'button':
					reactCode = `<${htmlTags}>${buttonText}</${htmlTags}>`;
					break;
				case 'input':
					reactCode = `<${htmlTags} placeholder=${placeholder}></${htmlTags}>`;
					break;
				default:
					reactCode = `<${htmlTags}></${htmlTags}>`;
					break;
			}
			// SQL Query individual_ui table: id(auto generated), organization_id, image, tags,react_code, vue_code, file_name, type, description
			// send new data to database
			pool
				.query(
					'INSERT INTO individual_ui(tags, react_code, file_name, type, description) VALUES($1, $2, $3, $4, $5 )',
					[ searchTags, reactCode, fileName, htmlTags, description ]
				)
				.then((data) => {
					// update the global state/Context
					pool.query('SELECT * FROM individual_ui').then((data) => {
						let item = data.rows[data.rows.length - 1]; // just added item
						Storage.get(`${item.file_name}.jpg`).then((url) => {
							item.url = url;
							dispatch({
								type: 'generator_add_details',
								payload: {
									uiItems: data.rows,
									item: item
								}
							});
							// redirect to detail page of component
							props.history.push('/detailPage');
						});
					});
				})
				.catch((err) => console.log(err));
		} catch (err) {
			console.warn(err);
		}
	}

	return (
		<div className="generator-container">
			<div className="top-container">
				<input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleFileChange} />
				<div className="image-container" />
			</div>
			<div className="bottom-container">
				<form onSubmit={handleClick}>
					<select id="type" onChange={handleChange} defaultValue="1" name="htmlTags">
						<option value="div">Div</option>
						<option value="button">Button</option>
						<option value="input">Input</option>
					</select>
					{userData.htmlTags === 'button' && (
						<input
							name="buttonText"
							placeholder="Button Text"
							onChange={handleChange}
							value={userData.innerText}
						/>
					)}
					{userData.htmlTags === 'input' && (
						<input
							name="placeholder"
							placeholder="Input Text"
							onChange={handleChange}
							value={userData.placeholder}
						/>
					)}
					<input
						name="searchTags"
						placeholder="Search Tag Name"
						onChange={handleChange}
						value={userData.searchTags}
					/>
					<input name="fileName" placeholder="File Name" onChange={handleChange} value={userData.fileName} />
					<input
						name="description"
						placeholder="Description"
						onChange={handleChange}
						value={userData.description}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default withRouter(Generator);
