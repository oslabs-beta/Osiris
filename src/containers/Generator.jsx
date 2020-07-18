import "../assets/css/App.css";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Storage } from "aws-amplify";
import { Context } from "../context/MyProvider.js";
import { Pool } from "pg";
import { PG_URI } from "../pgKeys";
const pool = new Pool({ connectionString: PG_URI });

// configure Storage

function Generator(props) {
  // const [imageFile, changeImageFile] = useState('');
  // const [tags, setTags] = useState('');
  // const [reactCode, changeReactCode] = useState('');
  // const [description, changeDescription] = useState('');
  // const [fileName, changeFileName] = useState('');
  const { globalState, dispatch } = React.useContext(Context);

  const [userData, setUserData] = useState({
    htmlTags: "",
    searchTags: "",
    reactCode: "",
    description: "",
    fileName: "",
    buttonText: "",
    placeholder: "",
    image: "",
    file: "",
  });

  function handleFileChange(e) {
    const file = e.target.files[0];
    setUserData({
      ...userData,
      file,
    });
    console.log("File...", file);
  }

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }
  // setUserData({ ...userData, [name]: value });

  async function handleClick() {
    console.log("state: ", userData);

    try {
      const result = await Storage.put(userData.file.name, userData.file);
      console.log("Result...", result);

      const url = await Storage.get(userData.file.name);

      console.log(`url ${url}`);

      let reactCode;
      const {
        htmlTags,
        buttonText,
        placeholder,
        searchTags,
        description,
        fileName,
      } = userData;
      switch (htmlTags) {
        case "button":
          reactCode = `<${htmlTags}>${buttonText}</${htmlTags}>`;
          break;
        case "input":
          reactCode = `<${htmlTags} placeholder=${placeholder}></${htmlTags}>`;
          break;
        default:
          reactCode = `<${htmlTags}></${htmlTags}>`;
          break;
      }
      // SQL Query individual_ui table: id(auto generated), organization_id, image, tags,react_code, vue_code, file_name, type, description
      console.log("reactCode: ", reactCode);

      // send data to database
      pool
        .query(
          "INSERT INTO individual_ui(image, tags, react_code, file_name, type, description) VALUES($1, $2, $3, $4, $5, $6 )",
          [url, searchTags, reactCode, fileName, htmlTags, description]
        )
        .then((data) => {
          console.log(data.rows);

          // update the global state/Context
          pool.query("SELECT * FROM individual_ui").then((data) => {
            dispatch({ type: "add_uis", payload: data.rows });
            dispatch({
              type: "add_details",
              payload: data.rows[data.rows.length - 1],
            });
            // console.log("App: ", globalState);
            // redirect to detail page of component
            props.history.push("/detailPage");
          });
        });
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <div className="generator-container">
      <div className="top-container">
        <input type="file" onChange={handleFileChange} />
        <div className="image-container" />
      </div>
      <div className="bottom-container">
        <select
          id="type"
          onChange={handleChange}
          defaultValue="1"
          name="htmlTags"
        >
          <option value="div">Div</option>
          <option value="button">Button</option>
          <option value="input">Input</option>
        </select>
        {userData.htmlTags === "button" && (
          <input
            name="buttonText"
            placeholder="Button Text"
            onChange={handleChange}
            value={userData.innerText}
          />
        )}
        {userData.htmlTags === "input" && (
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
        <input
          name="fileName"
          placeholder="File Name"
          onChange={handleChange}
          value={userData.fileName}
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={userData.description}
        />
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}

export default withRouter(Generator);
