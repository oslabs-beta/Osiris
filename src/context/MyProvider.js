import MyContext from "./MyContext";
import React, { Component } from "react";

class MyProvider extends Component {
  constructor() {
    super();
    this.state = {
      uiItems: [],
      user: [],
      organization: [],
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
