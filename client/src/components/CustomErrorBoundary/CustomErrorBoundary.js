import React from "react";

import { Icon } from "antd";

class CustomErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.log("Error from getDerivedStateFromError: ", error);
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error from componentDidCatch: ", error);
    console.log("ErrorInfo from componentDidCatch: ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
          <p
            style={{
              width: "100%",
              fontSize: "2rem",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Unexpected Errors Occured...<Icon type="alert" />
            Please be patient, we are working on a fix solution...<Icon type="tool" />
          </p>
        </div>
      );
    }

    return this.props.children;
  }
};

export default CustomErrorBoundary;