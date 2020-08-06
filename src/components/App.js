import "../assets/css/App.css";
import React, { useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ReactDom from "react-dom";
import { Pool } from "pg";
import { PG_URI } from "../pgKeys";
import Generator from "../containers/Generator.jsx";
import UiLibrary from "../containers/UiLibrary.jsx";
import DetailPage from "../containers/DetailPage.jsx";
import BuildPage from "../containers/BuildPage.jsx";
import { Context } from "../context/MyProvider.js";
import { Storage } from "aws-amplify";

const pool = new Pool({ connectionString: PG_URI});
function App() {
  const { globalState, dispatch } = React.useContext(Context);

  const handlePromises = (itemsFromDB) => {
    const uiItemsPromises = itemsFromDB.map((obj) => {
      return Storage.get(`${obj.file_name}.jpg`);
    });
    Promise.all(uiItemsPromises).then((results) => {
      // combining itemsFromDB with their appropriate urls
      const updateUiItems = itemsFromDB.map((item, index) => {
        item.url = results[index];
        return item;
      });

      dispatch({ type: "add_uis", payload: updateUiItems });
    });
  };

  useEffect(() => {
    pool.query("SELECT * FROM individual_ui").then((data) => {
      handlePromises(data.rows);
    });
  }, []);

  return (
    <Context.Consumer>
      {({ globalState }) => (
        <Router>
          <div className="navbar">
            <img
              src="https://i.imgur.com/HM3EwJ5.jpg"
              className="logo"
              alt="osiris"
              width="180"
              height="180"
            />
            <ul>
              <li>
                <Link to="/">UI Library</Link>
              </li>
              <li>
                <Link to="/generator">UI Generator</Link>
              </li>
              <li>
                <Link to="/buildpage">Build Page</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route exact path="/">
              <UiLibrary page="uilibrary" buttonText="Details" />
            </Route>
            <Route exact path="/generator">
              <Generator />
            </Route>
            <Route exact path="/detailPage">
              <DetailPage />
            </Route>
            <Route exact path="/buildpage">
              <BuildPage />
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      )}
    </Context.Consumer>
  );
}
export default App;
