import React, { Component } from "react";
import Authorization from "./components/authorization";
import TopAppBar from "./components/top-app-bar";
import BottomAppBar from "./components/bottom-app-bar";

const getStepContent = page => {
  switch (page) {
    case "auth":
      return <Authorization />;
    case "chat":
      return (
        <>
          <TopAppBar />
          <BottomAppBar />
        </>
      );
    default:
      throw new Error("Unknown step");
  }
};

class App extends Component {
  state = {
    activePage: "auth"
  };

  handleChange = value => event => {
    this.setState({
      activePage: value
    });
  };

  render() {
    const { activePage } = this.state;
    return <>{getStepContent(activePage)}</>;
  }
}

export default App;
