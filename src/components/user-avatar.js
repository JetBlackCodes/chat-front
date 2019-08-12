import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import { socket } from "../constants";

class UserAvatar extends Component {
  state = {
    login: this.props.login,
    res: ""
  };

  componentDidMount = () => {
    const { login } = this.state;
    
    if (login !== "Добро пожаловать в чат!") {
      socket.emit("getUserAvatar", login);

      socket.on("setUserAvatar", file => {
        this.setState({ res: file });
      });
    }
  };

  render() {
    const { res } = this.state;
    return <Avatar src={res} />;
  }
}

export default UserAvatar;
