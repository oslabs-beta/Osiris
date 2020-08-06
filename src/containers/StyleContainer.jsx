// import "../assets/css/LeftContainer.css";
import React, { useState } from "react";
import { Context } from "../context/MyProvider.js";
const cloneDeep = require("lodash.clonedeep");
import UiLibrary from "./UiLibrary.jsx";

const StyleContainer = (props) => {
  const { globalState, dispatch } = React.useContext(Context);
  const [innerHTML, setInnerHTML] = useState("");
  const [navName, setNavName] = useState("");
  const [navColor, setNavColor] = useState("");
  const [buttonStyle, setButtonStyle] = useState({
    width: "",
    height: "",
    borderRadius: "",
    border: "",
    backgroundColor: "",
    boxShadow: "",
    color: "",
  });
  const [imgSource, setImageSource] = useState({
    src: "",
  });
  const [input, setInput] = useState({
    fontColor: "",
    fontWeight: "",
    fontFamily: "",
    fontStyle: "",
  });

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleInnerHTML(e) {
    setInnerHTML(e.target.value);
  }

  function handleImageSource(e) {
    setImageSource({ ...imgSource, [e.target.name]: e.target.value });
  }

  function handleNavColor(e) {
    setNavColor(e.target.value);
  }
  function handleNavName(e) {
    setNavName(e.target.value);
  }

  function handleButtonStyle(e) {
    setButtonStyle({ ...buttonStyle, [e.target.name]: e.target.value });
  }

  function handleClick(e) {
    e.preventDefault();
    
    let code = cloneDeep(globalState.clickedItem.react_code);
    let style;
    let splitCode;
    if (
      globalState.clickedItem.type !== "img" &&
      globalState.clickedItem.type !== "ul" &&
      globalState.clickedItem.type !== "button"
    ) {
      splitCode = code.split("{}>");
      style = `{{fontColor: '${input.fontColor}', fontWeight: '${input.fontWeight}', fontFamily: '${input.fontFamily}' }}>${innerHTML}`;
    } else if (globalState.clickedItem.type === "img") {
      (splitCode = code.split("' src='' style={")),
        (style = `${imgSource.src.split(".")[0]}' src='${
          imgSource.src
        }' style={{height: '${imgSource.height}', width: '${
          imgSource.width
        }'}`);
    } else if (globalState.clickedItem.type === "ul") {
      splitCode = code.split("{}>");
      style = `{{listStyleType: 'none', margin: 0, overflow: 'hidden', backgroundColor: '${navColor}'}}>${navName}`;
    } else if (globalState.clickedItem.type === "button") {
      splitCode = code.split("{}>");
      style = `{{width: '${buttonStyle.width}', height: '${buttonStyle.height}', borderRadius: '${buttonStyle.borderRadius}', border: '${buttonStyle.border}', backgroundColor: '${buttonStyle.backgroundColor}', boxShadow:'${buttonStyle.boxShadow}', fontWeight: '${input.fontWeight}', fontFamily: '${input.fontFamily}', fontColor: '${input.fontColor}', fontStyle: '${input.fontStyle}'}}>${innerHTML}`;
    }

    globalState.clickedItem.react_code = splitCode[0] + style + splitCode[1];
    console.log(globalState.clickedItem)
    dispatch({
      type: "updateBuildUiItems",
      payload: globalState.clickedItem,
    });
  }

  return (
    <div className="StyleContainer">
        <h1>Styling</h1>
      <form onSubmit={handleClick}>
        {globalState.clickedItem.type === "img" && (
          <>
            <input
              name="src"
              placeholder="Source Link"
              onChange={handleImageSource}
              value={imgSource.src}
            />
            <input
              name="width"
              placeholder="width"
              onChange={handleImageSource}
              value={imgSource.width}
            />
            <input
              name="height"
              placeholder="height"
              onChange={handleImageSource}
              value={imgSource.height}
            />
          </>
        )}
        {globalState.clickedItem.type === "ul" && (
          <>
            <input
              name="background-color"
              placeholder="background-color"
              onChange={handleNavColor}
              value={navColor}
            />
            <input
              name="navName"
              placeholder="NavName"
              onChange={handleNavName}
              value={navName}
            />
          </>
        )}
        {globalState.clickedItem.type === "button" && (
          <>
            <input
              name="width"
              placeholder="width"
              onChange={handleButtonStyle}
              value={buttonStyle.width}
            />
            <input
              name="height"
              placeholder="height"
              onChange={handleButtonStyle}
              value={buttonStyle.height}
            />
            <input
              name="borderRadius"
              placeholder="border radius"
              onChange={handleButtonStyle}
              value={buttonStyle.borderRadius}
            />
            <input
              name="border"
              placeholder="border"
              onChange={handleButtonStyle}
              value={buttonStyle.border}
            />
            <input
              name="backgroundColor"
              placeholder="backgroundColor"
              onChange={handleButtonStyle}
              value={buttonStyle.backgroundColor}
            />
            <input
              name="boxShadow"
              placeholder="box shadow: 0px 1px 0px 0px grey"
              onChange={handleButtonStyle}
              value={buttonStyle.boxShadow}
            />
          </>
        )}
        {globalState.clickedItem.type !== "img" &&
          globalState.clickedItem.type !== "ul" && (
            <>
              <input
                name="innerHTML"
                placeholder="innerHTML"
                onChange={handleInnerHTML}
                value={innerHTML}
              />
              <input
                name="fontColor"
                placeholder="color"
                onChange={handleChange}
                value={input.fontColor}
              />
              <input
                name="fontWeight"
                placeholder="weight"
                onChange={handleChange}
                value={input.fontWeight}
              />
              <input
                name="fontStyle"
                placeholder="font style"
                onChange={handleChange}
                value={input.fontStyle}
              />
              <input
                name="fontFamily"
                placeholder="font family"
                onChange={handleChange}
                value={input.fontFamily}
              />
            </>
          )}
        <button className="submitHierarchy" type="submit">
          Add To Hierarchy
        </button>
      </form>
    </div>
  );
};

export default StyleContainer;
