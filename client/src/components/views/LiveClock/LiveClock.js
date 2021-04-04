import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date().toLocaleString(),
    };
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  };

  tick() {
    this.setState({
      time: new Date().toLocaleString(),
    });
  };

  render() {
    return (
      <p
        style={{
          fontFamily: "cursive",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid #e0e4f6",
        }}
      >
        {this.state.time}.
      </p>
    );
  };
};

export default Clock;
