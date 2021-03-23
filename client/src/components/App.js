import React, { Suspense } from "react";
// Routing for the application
import { Route, Switch } from "react-router-dom";
// Authentication for the application
import Auth from "../hoc/auth";
// Main pages for the application
import NavBar from "../components/views/NavBar/NavBar";
import LandingPage from "../components/views/LandingPage/LandingPage";
import LoginPage from "../components/views/LoginPage/LoginPage";
import RegisterPage from "../components/views/RegisterPage/RegisterPage";
import Footer from "../components/views/Footer/Footer";
//Additional features of the application
import MovieDetailPage from "./views/MovieDetailPage/MovieDetailPage";
import Scroller from "../components/Scroller/ScrollToTop";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <NavBar/>

      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, true)} />
        </Switch>
      </div>
      <Scroller/>
      <Footer />

    </Suspense>
  );
}

export default App;
