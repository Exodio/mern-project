import React from "react";

import Toolbar from "./Toolbar";
import ThemeContext from "./ThemeContext";

class AboutApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: "dark",
    };
  };

  onChangeThemeClickHandler() {
    this.setState((oldState) => ({
      currentTheme: oldState.currentTheme === "dark" ? "light" : "dark",
    }));
  };

  render() {
    const contextValue = {
      theme: this.state.currentTheme,
      onChangeThemeClickHandler: this.onChangeThemeClickHandler.bind(this),
    };

    return (
      <ThemeContext.Provider value={contextValue}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  };
};

export default AboutApp;