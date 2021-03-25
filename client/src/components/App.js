import React, { useState, useEffect } from "react";
// Routing of the application
import { Route, Switch } from "react-router-dom";
// Authentication of the application
import Auth from "../hoc/auth";
import NavBar from "./views/NavBar/NavBar";
// Main pages of the application
import LandingPage from "../components/views/LandingPage/LandingPage";
import LoginPage from "../components/views/LoginPage/LoginPage";
import RegisterPage from "../components/views/RegisterPage/RegisterPage";
import Footer from "../components/views/Footer/Footer";
import NotFound from "../components/views/NotFound/NotFound";
// Special pages of the application
import MovieDetailPage from "./views/MovieDetailPage/MovieDetailPage";
// Additional features of the application
import LoadingScreen from "./views/LoadingScreen/LoadingScreen";
import Scroller from "../components/Scroller/ScrollToTop";

function App() {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      {Loading === false ? (
        <React.Fragment>
          <NavBar />
          <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)}/>
              <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, true)}/>
              <Route component={Auth(NotFound, false)} />
            </Switch>
          </div>
          <Scroller />
          <Footer />
        </React.Fragment>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default App;
