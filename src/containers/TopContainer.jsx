import "../assets/css/TopContainer.css";
import React, { useState, useEffect } from "react";
import BuildItem from "../components/BuildItem.jsx";
import createFiles from "../utils/createFiles.js";

const IPC = require('electron').ipcRenderer;

const TopContainer = (props) => {
  const [DLFileName, setDLFileName] = useState('');
  const [selectedState, setSelectedState] = useState('noState');
  const [path, setPath] = useState('');

    const { items } = props;

    function handleDownload() {
      console.log('handleDownload')
      createFiles(items, path, DLFileName, selectedState)
  }

  function onChangeDL(e) {
    setDLFileName(e.target.value);
  }

  function handleDropDown(e) {
    setSelectedState(e.target.value)
  }

  function pickDirectory(e) {
    IPC.on('app_dir_selected', (event, path) => {
      console.log(`event ${event}`)
      console.log(path)

      setPath(path)
      // createFiles(items, path, DLFileName, selectedState)
    })
    IPC.send('choose_app_dir')
  }

  return (
    <div className="topContainer">
      TOP CONTAINER
      {items &&
        items.map((item) => (
          <BuildItem id={item.id} key={item.id} item={item} />
        ))}
        <div className="downloadButton">
          <select name="stateSelection" id="stateOptions" onChange={handleDropDown} default="noState">
            <option value="noState">No State</option>
            <option value="classState">Class</option>
            <option value="hooksState">Hooks</option>
          </select>
          <input type='text' value={DLFileName} placeholder='File Name' onChange={onChangeDL}/>
          <button onClick={pickDirectory} >Pick Directory</button>
          <button onClick={handleDownload} >Download</button>
        </div>
    </div>
  );
};

export default TopContainer;
