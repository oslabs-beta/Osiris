import "../assets/css/TopContainer.css";
import React from "react";
import BuildItem from "../components/BuildItem.jsx";
import createFiles from "../utils/createFiles.js";

const IPC = require('electron').ipcRenderer;

const TopContainer = (props) => {
  IPC.on('app_dir_selected', (event, path) => {
    console.log(`event ${event}`)
    console.log(path)

    // call createFiles(components, path)
  });

  const { items } = props;

  function handleDownload() {
    console.log('handleDownload')
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
          <button onClick={handleDownload} >Download</button>
        </div>
    </div>
  );
};

export default TopContainer;
