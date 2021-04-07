import ThemeContext from "./ThemeContext";

import { Button, Icon } from "antd";

function ButtonContext({ buttonClickHandler }) {
  return (
    <ThemeContext.Consumer>
      {(values) => (
        <Button className="button-context" onClick={buttonClickHandler} style={{ backgroundColor: values.theme === "dark" ? "black" : "white" }}>
          <Icon style={{color:"#40A9ff"}} type="skin" />
        </Button>
      )}
    </ThemeContext.Consumer>
  );
};

export default ButtonContext;