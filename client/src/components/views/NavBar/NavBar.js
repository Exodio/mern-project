import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Drawer, Button, Icon } from "antd";

import LeftMenu from "./Sections/LeftMenu";

import RightMenu from "./Sections/RightMenu";

import "./NavBar.css";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <div className="menu__logo">
      <Link to="/"><img src="https://i.postimg.cc/NGzrbXSH/navbar-main-logo.png" alt="home-logo-icon" style={{ width: '100%', marginTop:"-25px" }} /></Link>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;