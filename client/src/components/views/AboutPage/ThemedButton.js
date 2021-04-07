import React from "react";

import AboutContext from "./AboutContext";
import ButtonContext from "./ButtonContext";
import ThemeContext from "./ThemeContext";

class ThemedButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ButtonContext
          buttonClickHandler={this.context.onChangeThemeClickHandler}
        />
        <AboutContext />
      </React.Fragment>
    );
  }
};

ThemedButton.contextType = ThemeContext;

export default ThemedButton;