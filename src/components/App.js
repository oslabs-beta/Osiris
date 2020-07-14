import "../assets/css/App.css";
import React, { Component } from "react";
import { Pool } from 'pg'; 

const PG_URI = 'postgres://auekcibn:M-_mKOoauktn8ClBeOsqCHWnX30_gF5M@ruby.db.elephantsql.com:5432/auekcibn';

const pool = new Pool({connectionString: PG_URI})

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>

        <p>
          I hope you enjoy using basic-electron-react-boilerplate to start your
          dev off right!
        </p>
        <button onClick={() => {pool.query('SELECT * FROM individual_ui' ).then((data)=> {
          console.log(`data rows ${data.rows[0].image}`);
          // // console.log(`data id ${data.id}`);
        })}}>CLICK MEEEE</button>
      </div>
    );
  }
}

export default App;

