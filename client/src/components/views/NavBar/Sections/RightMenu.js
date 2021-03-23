import React from "react";

import axios from "axios";

import { Icon } from "antd";

import { useSelector } from "react-redux";

import { USER_SERVER } from "../../../Config";

import { Menu } from "antd";

import { withRouter } from "react-router-dom";

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
          <a href="/login" onClick={logoutHandler}>Logout <Icon type="logout"/></a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
