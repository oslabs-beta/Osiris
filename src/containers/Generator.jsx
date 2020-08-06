import '../assets/css/Generator.css';
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
		s3file: '',
		fontColor: '',
		fontWeight: '',
		fontFamily: '',
		fontStyle: '',
	});

	// uploading files
	function handleFileChange(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		const imgtag = document.getElementById('imageupload');
		imgtag.title = file.name;

		reader.onload = function(event) {
			imgtag.src = event.target.result;
		};

		reader.readAsDataURL(file);
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
			let image = await Storage.put(`${userData.fileName}.jpg`, userData.s3file);

			const { htmlTags, buttonText, placeholder, searchTags, description, fileName } = userData;

			let reactCode;

			switch (htmlTags) {
				case 'button':
					reactCode = `<${htmlTags} style={}></${htmlTags}>`;
					break;
				case 'input':
					reactCode = `<${htmlTags} placeholder=${placeholder}></${htmlTags}>`;
					break;
				case 'h1':
					reactCode = `<${htmlTags} style={}></${htmlTags}>`;
					break;
				case 'h2':
					reactCode = `<${htmlTags} style={}></${htmlTags}>`;
					break;
				case 'h3':
					reactCode = `<${htmlTags} style={}></${htmlTags}>`;
					break;
				case 'p':
					reactCode = `<${htmlTags} style={}></${htmlTags}>`;
					break;
				case 'ul':
					reactCode = `<${htmlTags} style={}></${htmlTags}>`;
					break;
				case 'li':
					reactCode = `<${htmlTags} style={}></${htmlTags}>`;
					break;
				case 'img':
					reactCode = `<${htmlTags} alt='' src='' style={}/>`;
					break;
				default:
					reactCode = `<${htmlTags}></${htmlTags}>`;
					break;
			}

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
									item: item
								}
							});
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
			<div className="genHead">
				<h1 className="heading-generator">UI Generator</h1>
			</div>
			<div className="top-container">
				<input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleFileChange} />
				<div className="image-container">
					<img id="imageupload" src="" />
				</div>
			</div>
			<div className="bottom-container">
				<form onSubmit={handleClick}>
					<select id="type" onChange={handleChange} defaultValue="1" name="htmlTags">
						<option value="div">Div</option>
						<option value="button">Button</option>
						<option value="input">Input</option>
						<option value="h1">H1</option>
						<option value="h2">H2</option>
						<option value="h3">H3</option>
						<option value="p">Paragraph</option>
						<option value="ul">Navbar</option>
						<option value="li">List Item</option>
						<option value="img">Image</option>
					</select>
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
					<button className="submitButton" type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default withRouter(Generator);
