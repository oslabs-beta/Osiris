import "../assets/css/App.css";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDom from "react-dom";
import { Pool } from "pg";
import { PG_URI } from "../pgKeys";
import Generator from "../containers/Generator.jsx";
import UiLibrary from "../containers/UiLibrary.jsx";
import DetailPage from "../containers/DetailPage.jsx";
import { Context } from "../context/MyProvider.js";

const pool = new Pool({ connectionString: PG_URI });
function App() {
  // const [state, dispatch] = useReducer(reducer, initialArg, init);
  const { globalState, dispatch } = React.useContext(Context);

  useEffect(() => {
    pool.query("SELECT * FROM individual_ui").then((data) => {
      dispatch({ type: "add_uis", payload: data.rows });
      console.log("App: ", globalState);
    });
  }, []);

  return (
    <Context.Consumer>
      {({ globalState }) => (
        <Router>
          <div className="navbar">
            <ul>
              <li>
                <Link to="/">UI Library</Link>
              </li>
              <li>
                <Link to="/generator">UI Generator</Link>
              </li>
              <li>
                <Link to="/detailPage">Detail Page</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route exact path="/">
              <UiLibrary />
            </Route>
            <Route exact path="/generator">
              <Generator />
            </Route>
            <Route exact path="/detailPage">
              <DetailPage />
            </Route>
          </Switch>
        </Router>
      )}
    </Context.Consumer>
  );
}
export default App;
