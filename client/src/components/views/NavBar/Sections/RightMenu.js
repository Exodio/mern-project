import React from "react";

import { withRouter } from "react-router-dom";

import { Menu, Icon } from "antd";

import axios from "axios";

import { useSelector } from "react-redux";

import { USER_SERVER } from "../../../Config";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign In <Icon type="login"/></a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Sign Up <Icon type="rocket"/></a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a href="/" onClick={logoutHandler}>Logout <Icon type="logout"/></a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);