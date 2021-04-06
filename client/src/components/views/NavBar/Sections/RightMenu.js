import React from "react";

import { Link, withRouter } from "react-router-dom";

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
          <Link to="/login">Sign In <Icon type="login"/></Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Sign Up <Icon type="rocket"/></Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <Link to="/" onClick={logoutHandler}>Logout <Icon type="logout"/></Link>
        </Menu.Item>
      </Menu>
    );
  };
};

export default withRouter(RightMenu);