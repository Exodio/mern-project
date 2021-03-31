import React from "react";

import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <SubMenu title={<span>Menu <Icon type="menu"/></span>}> 
          <Menu.Item key="favorite">
            <a href="/favorite">Favorites <Icon type="heart"/></a>
          </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default LeftMenu;