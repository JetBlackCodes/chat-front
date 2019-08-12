import React, { Component } from "react";
import Authorization from "./components/authorization";
import TopAppBar from "./components/top-app-bar";
import BottomAppBar from "./components/bottom-app-bar";
import Chat from "./components/chat";

class App extends Component {
  state = {
    activePage: "auth",
    login: ''
  };

  getStepContent = page => {
    switch (page) {
      case "auth":
        return <Authorization updateData={this.updatePage} />;
      case "chat":
        return (
          <>
            <TopAppBar />
            <Chat />
            <BottomAppBar login={this.state.login} />
          </>
        );
      default:
        throw new Error("Unknown step");
    }
  };

  updatePage = (login) => {
    this.setState({
      activePage: "chat",
      login: login
    });
  };

  render() {
    return <>{this.getStepContent(this.state.activePage)}</>;
  }
}

export default App;
