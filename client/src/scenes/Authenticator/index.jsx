import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { getUser } from "./utils/helpers";

const Login = lazy(() => import("./Login"));
const MainPage = lazy(() => import("./MainPage"));
const Reset = lazy(() => import("./Reset"));
const SetPassword = lazy(() => import("./SetPassword"));

const Authenticator = () => {
  return getUser() ? (
    <Container>
      <Suspense fallback={"loading..."}>
        <Switch>
          <Route exact path="/authenticator" component={MainPage} />
          <Route path="/authenticator/reset" component={Reset} />
          <Route render={() => "Not Found"} />
        </Switch>
      </Suspense>
    </Container>
  ) : (
    <Container>
      <Suspense fallback={"loading..."}>
        <Switch>
          <Route
            exact
            path="/authenticator"
            render={() => (
              <a href={`/authenticator/set_password/${Math.random()}`}>
                Set New Password
              </a>
            )}
          />
          <Route
            path="/authenticator/set_password/:user_id"
            component={SetPassword}
          />
          <Route path="/authenticator/login" component={Login} />
          <Route render={() => "Not Found"} />
        </Switch>
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 5vh auto;
  font-size: 16px;
`;

Authenticator.uiName = "Authenticator";
Authenticator.displayName = "Authenticator";

export default Authenticator;
