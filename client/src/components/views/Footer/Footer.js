import React, { Component } from "react";

import LiveClock from "../LiveClock/LiveClock";

import { Icon } from "antd";

class Footer extends Component {
  render() {
    return (
      <div
        style={{
          fontFamily: "cursive",
          height: "90px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          backgroundColor: "#f8fafc",
          borderTop: "1px solid #e0e4f6"
        }}
      >
        <div>
          <p>
          &copy; <a href="https://github.com/Exodio" alt="github-profile"><Icon type="github"/>exodio</a> | All Rights Reserved. 
          </p>
          {/* Live Clock */}
          <p>
          <LiveClock />
          </p>
        </div>
      </div>
    );
  }
};

export default Footer;