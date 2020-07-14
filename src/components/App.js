import '../assets/css/App.css';
import React, { Component } from 'react';
import { Pool } from 'pg';
import { PG_URI } from '../pgKeys';

const pool = new Pool({ connectionString: PG_URI });

class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, Electron!</h1>

				<p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
				<button
					onClick={() => {
						pool.query('SELECT * FROM individual_ui').then((data) => {
							console.log(`data rows ${data.rows[0].image}`);
							// // console.log(`data id ${data.id}`);
						});
					}}
				>
					CLICK MEEEE
				</button>
			</div>
		);
	}
}

export default App;
