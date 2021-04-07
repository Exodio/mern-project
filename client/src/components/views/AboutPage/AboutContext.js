import { useContext } from "react";

import { Link } from "react-router-dom";

import { Icon } from "antd";

import ThemeContext from "./ThemeContext";

import "./AboutContext.css";

const AboutContext = ({}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="about-page-main">
      <h2 style={{ color: theme === "dark" ? "black" : "white" }}>
        What is <Link to="/login" style={{ fontWeight: "bold", fontSize:"33px" }}>exodioMovies</Link><Icon type="question" />
        <br />
        <br />
        <p style={{ color: theme === "dark" ? "black" : "white" }}>
        This application is similar to a movies browser website, throughout which you can review, rate and comment different productions, via the included up to date listing in the main <Link to="/" style={{ fontWeight:"bold" }}>exodioMovies</Link> page. 
        As you browse and review the selected movies of your choice, you can participate in a rating systems, express your opinions and interact with other people.
        </p>
        <br />
      </h2>
      <br />
        <h3 className="about-page-header-redirect" style={{ color: theme === "dark" ? "black" : "white" }}>Sounds Exciting ? <Link to="/register">Join Us</Link>, if you haven't already done it <Icon type="smile" /> !</h3>
    </div>
  );
};

export default AboutContext;