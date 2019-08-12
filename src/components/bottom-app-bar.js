import React, { Component } from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import { CenterInput } from "./authorization";
import { socket } from "../constants";

class BottomAppBar extends Component {
  state = {
    login: this.props.login,
    input: ""
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  handleClick = () => {
    if (this.state.input !== undefined) {
      socket.emit("sendMessage", {
        login: this.state.login,
        message: this.state.input
      });
      this.setState({ input: "" });
    }
  };

  componentDidMount = () => {
    window.addEventListener("keydown", event => {
      if (event.which === 13 && event.shiftKey == false) {
        this.handleClick();
      }
    });
  };

  render() {
    return (
      <StyledAppBar position="fixed">
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <CenterInput
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="Введите сообщение"
            />
          </Grid>
          <Grid item xs={1}>
            <StyledButton variant="contained" onClick={this.handleClick}>
              <Icon>send</Icon>
            </StyledButton>
          </Grid>
        </Grid>
      </StyledAppBar>
    );
  }
}

export default BottomAppBar;

export const StyledAppBar = styled(AppBar)`
  && {
    background-color: #fff;
    color: #000;
    top: auto;
    bottom: 0px;
  }
`;
export const StyledButton = styled(Button)`
  && {
    background-color: #fff;
    color: #000;
    margin-top: 25px;
  }
`;
