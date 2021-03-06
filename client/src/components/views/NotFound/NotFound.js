import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./NotFound.css";

class NotFound extends Component {
  render() {
    return (
      <div>
        <p className="not-found">The page that you are looking for is not found !</p>
        <hr />
        <div className="tipsiz">
          <div className="tipsiz-body">
            <div className="left-arm arm"></div>
            <div className="face">
              <div className="upper-face">
                <div className="element">4</div>
                <div className="element">0</div>
                <div className="element">4</div>
              </div>
              <div className="mouth"></div>
            </div>
            <div className="right-arm arm"></div>
          </div>
        </div>
        <p className="tipsiz-text">
          maybe you want to go <Link to="/">back ?</Link>
        </p>
      </div>
    );
  }
};

export default NotFound;