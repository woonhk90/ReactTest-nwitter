import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = (props) => {
  return (
    <Router>
      {props.isLoggedIn && <Navigation />}
      <Switch>
        {props.isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={props.userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={props.userObj} />
            </Route>
            {/* 위 Route를 제외한 나머지(*)는 to(/)로 넘겨라 */}
            {/* <Redirect from="*" to="/" /> */}
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
