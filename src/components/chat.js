import React, { Component } from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { DEFAULT_MESSAGE, socket } from "../constants";
import UserAvatar from "./user-avatar";

class Chat extends Component {
  state = {
    chat: DEFAULT_MESSAGE
  };

  componentDidMount = () => {
    socket.on("output", data => {
      let mess = [];
      data.map(({ login, message }) => {
        if (login !== undefined && message !== undefined) {
          mess.push({ login: login, message: message });
        }
        this.setState({ chat: mess });
      });
    });

    socket.on("singleOutput", data => {
      let mess = DEFAULT_MESSAGE;
      const { login, message } = data;
      if (login !== undefined && message !== undefined) {
        mess.push({ login: login, message: message });
      }
      this.setState({ chat: mess });
    });
  };

  render() {
    return (
      <StyledList>
        {this.state.chat.map(({ login, message }) => (
          <ListItem button>
            <ListItemAvatar>
              <UserAvatar login={login} />
            </ListItemAvatar>
            <ListItemText primary={login} secondary={message} />
          </ListItem>
        ))}
      </StyledList>
    );
  }
}

export default Chat;

export const StyledList = styled(List)`
  && {
    padding-bottom: 70px;
  }
`;
