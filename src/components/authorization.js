import React, { Component } from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { socket } from "../constants";

export const CenterPaper = styled(Card)`
  && {
    width: 400px;
    height: 220px;
    padding: 30px;
    margin-top: 150px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
`;
export const CenterInput = styled(Input)`
  && {
    display: block;
    padding: 5px;
    margin: 20px;
  }
`;
export const CenterLoadFile = styled.input`
  && {    
    padding: 10px;
    padding-left: 25px;    
    margin-left: auto;
    margin-right: auto;
  }
`;
export const CenterButton = styled(Button)`
  && {
    display: block;
    width: 180px;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 90%;
    margin-top: -50px;
  }
`;

class Authorization extends Component {
  state = {
    login: "",
    file: ""
  };

  handleChange = event => {
    switch (event.target.id) {
      case "login":
        this.setState({ login: event.target.value });
        break;
      default:
        alert("Unknown id in authorization.js/handleChange");
    }
  };

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  singInClick = () => {
    const { login, file } = this.state;
    if (login !== undefined ) {
      socket.emit("singIn", {
        login: login,
        file: file
      });
      console.log("singIn with login: " + login);          
      this.props.updateData(login);
    }
  };

  render() {
    let { file } = this.state;
    let _file = null;
    if (file) {
      _file = <img src={file} height="70px" width="70px" />;
    }
    return (
      <>
        <CenterPaper>
          <CenterInput
            id="login"
            placeholder="Логин"
            value={this.state.login}
            onChange={this.handleChange}
          />
          <CenterLoadFile type="file" onChange={e => this.handleImageChange(e)} />
          <div>{_file}</div>
          <CenterButton
            id="singIn"
            variant="outlined"
            onClick={this.singInClick}
          >
            Войти
          </CenterButton>
        </CenterPaper>
      </>
    );
  }
}

export default Authorization;
