import React, { Component } from "react";

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function () {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { is_visible } = this.state;

    return (
      <div
        style={{
          position: "fixed",
          bottom: "5px",
          right: "5px",
          width: "80px",
          height: "80px",
          backgroundSize: "15px",
          backgroundPosition: "center",
          cursor: "pointer",
          zIndex: "1",
        }}
      >
        {is_visible && (
          <div onClick={() => this.scrollToTop()}>
            <img
              src="https://i.postimg.cc/jSRG8YGV/scroll-to-top-icon.png"
              alt="scroll-to-top-icon"
            />
          </div>
        )}
      </div>
    );
  }
}

export default ScrollToTop;