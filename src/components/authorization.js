import React, { Component } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";

export const CenterPaper = styled(Card)`
  && {
    width: 400px;
    height: 220px;
    padding: 30px;
    margin-top: 150px;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const CenterInput = styled(Input)`
  && {
    display: block;
    padding: 5px;
    margin: 20px;
  }
`;
export const CenterButton = styled(Button)`
  && {
    display: block;
    width: 180px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
  }
`;

class Authorization extends Component {
  state = {
    login: "",
    password: ""
  };

  socket = io('http://localhost:8000');

  handleChange(event) {
    switch (event.target.id) {
      case "login":
        this.setState({ login: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;      
      default:
        alert("unknown id in auth");
    }
  }

  singInClick = () => {
    const { login, password } = this.state;
    if (login.value !== "" && password.value !== "" ) {         
      this.socket.emit("singIn", {
        login: login.value,
        password: password.value,
      });
    }
  };
  render() {
    return (
      <>
        <CenterPaper>
          <CenterInput
            id="login"
            placeholder="Логин"
            value={this.state.login}
            onChange={this.handleChange.bind(this)}
          />
          <CenterInput
            id="password"
            placeholder="Пароль"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
          <CenterButton
            id="singIn"
            variant="outlined"
            onClick={this.singInClick()}
          >
            Войти
          </CenterButton>
        </CenterPaper>
      </>
    );
  }
}

export default Authorization;
