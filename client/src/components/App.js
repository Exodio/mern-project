import React, { useState, useEffect } from "react";
// Routing of the application
import { Route, Switch } from "react-router-dom";
// Authentication of the application
import Auth from "../hoc/Auth";
import NavBar from "./views/NavBar/NavBar";
// Main pages of the application
import LandingPage from "../components/views/LandingPage/LandingPage";
import LoginPage from "../components/views/LoginPage/LoginPage";
import RegisterPage from "../components/views/RegisterPage/RegisterPage";
import Footer from "../components/views/Footer/Footer";
// Additional pages of the application
import MovieDetailsPage from "./views/MovieDetailsPage/MovieDetailsPage";
import FavoritePage from "./views/FavoritePage/FavoritePage";
import LocationPage from "./views/LocationPage/LocationPage";
import NotFound from "../components/views/NotFound/NotFound";
// Additional features of the application
import LoadingScreen from "./views/LoadingScreenPage/LoadingScreenPage";
import Scroller from "../components/Scroller/ScrollToTop";

function App() {
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, []);

  return (
    <>
      {Loading === true ? (
        <React.Fragment>
          <NavBar />
          <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route path="/login" component={Auth(LoginPage, false)} />
              <Route path="/register" component={Auth(RegisterPage, false)}/>
              <Route path="/movie/:movieId" component={Auth(MovieDetailsPage, true)}/>
              <Route path="/favorite" component={Auth(FavoritePage, true)}/>
              <Route path="/location" component={Auth(LocationPage, true)}/>
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
};

export default App;