import React from "react";
import ReactDOM from "react-dom";
import Login from "./login";
import Profile from "./profile";
import List from "./list";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
const history=createBrowserHistory();
const routes = (
  <Router history={history} >
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/list" component={List}/>
      <Route exact path="/profile" component={Profile}/>
    </Switch>
  </Router>
);

ReactDOM.render(routes, document.getElementById("root"));
