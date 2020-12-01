import React, { Suspense, lazy } from "react";
import { Router } from "react-router-dom";
import { history } from "./browserHistory";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

const Graphic = lazy(() => import("./scenes/Graphic"));
const Totter = lazy(() => import("./scenes/Totter"));
const Authenticator = lazy(() => import("./scenes/Authenticator"));

const App = () => (
  <Router history={history}>
    <div className="App">
      <Suspense fallback={"loading..."}>
        <Switch>
          <Redirect exact from="/" to="/authenticator" />
          <Route path="/graphic" component={Graphic} />
          <Route path="/totter" component={Totter} />
          <Route path="/authenticator" component={Authenticator} />
          <Route component={"Not Found"} />
        </Switch>
      </Suspense>
    </div>
  </Router>
);

export default App;
