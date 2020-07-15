import "../assets/css/App.css";
import React, { Component } from "react";

export default class Generator extends Component {
  handleFileChange(e) {
    const file = e.target.files[0];
    console.log(file);
  }

  render() {
    return (
      <div className="generator-container">
        <div className="top-container">
          <input type="file" onChange={this.handleFileChange} />
          <div className="image-container" />
        </div>
        <div className="bottom-container">
          <select id="type">
            <option value="div">Div</option>
            <option value="button">Button</option>
            <option value="input">Input</option>
          </select>
          <input name="tags" placeholder="Tag Name" />
          <input name="filename" placeholder="File Name" />
          <input name="description" placeholder="Description" />
          <button>Submit</button>
        </div>
      </div>
    );
  }
}
