import '../assets/css/App.css';
import React, { Component } from 'react';

export default class Generator extends Component {
	render() {
		return (
			<div className="generator-container">
				<div className="top-container">
					<button>Upload Image</button>
					<div className="image-container" />
				</div>
				<div className="bottom-container">
					{/* <select id="cars" name="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>*/}
					<select id="type">
						<option value="div">Div</option>
						<option value="button">Button</option>
						<option value="input">Input</option>
					</select>
					<input name="tags" placeholder="Tag Name" />
					<input name="filename" placeholder="File Name" />
					<button>Submit</button>
				</div>
			</div>
		);
	}
}
