import React from "react";

import { Link } from "react-router-dom";

import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <SubMenu title={<span>Menu <Icon type="menu"/></span>}> 
          <Menu.Item key="favorite">
            <Link to="/favorite">Favorites <Icon type="heart"/></Link>
          </Menu.Item>
          <Menu.Item key="location">
            <Link to="/location">Location <Icon type="environment"/></Link>
          </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default LeftMenu;