// import '../assets/css/TopContainer.css';
import React, { useState, useEffect } from "react";
import BuildItem from "../components/BuildItem.jsx";
import createFiles from "../utils/createFiles.js";
import componentRender from "../utils/componentRender.js";
const IPC = require("electron").ipcRenderer;

const CodeDisplayContainer = (props) => {
  const [DLFileName, setDLFileName] = useState("");
  const [selectedState, setSelectedState] = useState("noState");
  const [path, setPath] = useState("");
  const [codeStr, setCodeStr] = useState("");

  let { items } = props;

  useEffect(() => {
    console.log("useEffect props: ", props);
    console.log("useEffect renderCode", props.items);
    if (props.items !== undefined) {
      console.log("rendercode");
      renderCode(props.items);
    }
  }, [props.items]);

  function handleDownload() {
    console.log(`codeStr `, codeStr);
    createFiles(codeStr, path, DLFileName, selectedState);
  }

  function onChangeDL(e) {
    setDLFileName(e.target.value);
  }

  function handleDropDown(e) {
    setSelectedState(e.target.value);
  }

  function pickDirectory(e) {
    IPC.on("app_dir_selected", (event, path) => {
      setPath(path);
      // createFiles(items, path, DLFileName, selectedState)
    });
    IPC.send("choose_app_dir");
  }

  function renderCode(items) {
    let code = "";

    items.forEach((item) => {
      //base case, not nested
      if (Array.isArray(item)) {
        // if nested [[{div},{button}]]
        code += handleNested(item, code);
      } else {
        //close type tag
        code += `\n\t\t${item.react_code}`;
      }
    });

    console.log("selectedState ", selectedState);
    console.log("DLFileName ", DLFileName);
    const reactCode = componentRender(code, selectedState, DLFileName);
    // setCodeStr(reactCode);
    setCodeStr(reactCode);
    console.log("componetRenderer result: ", reactCode);
    return componentRender(code, selectedState, DLFileName);
  }

  function handleNested(items) {
    let openingHalf = "\n\t\t<div>";
    let closingHalf = "\n\t\t</div'>";
    let counter = 0;
    // loop through each item
    for (let i = 1; i < items.length; i += 1) {
      if (items[i].type === "div") {
        openingHalf += "\n\t\t\t<div>";
        closingHalf = "\n\t\t\t</div>" + closingHalf;
        counter ++;
      } else {
        if (counter === 0) {
          openingHalf += `\n\t\t\t${items[i].react_code}`;
        } else {
          openingHalf += `\n\t\t\t\t${items[i].react_code}`;
        }
      }
    }

    return openingHalf + closingHalf;
  }

  return (
    <div className="codeDisplay">
      <div className="codeDisplayContainer">
        <h1>CODE DISPLAY</h1>
        <pre>
          <code>{codeStr}</code>
        </pre>
      </div>
      <div className="downloadButton">
        <select
          name="stateSelection"
          id="stateOptions"
          onChange={handleDropDown}
          default="noState"
        >
          <option value="noState">No State</option>
          <option value="classState">Class</option>
          <option value="hooksState">Hooks</option>
        </select>
        <input
          type="text"
          value={DLFileName}
          placeholder="e.g. Button, Div"
          onChange={onChangeDL}
        />
        <button onClick={pickDirectory}>Pick Directory</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default CodeDisplayContainer;
