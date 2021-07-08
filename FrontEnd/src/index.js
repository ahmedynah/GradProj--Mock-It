import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import "./assets/css/App.css";
import SignInSignUpPage from "./layouts/SignInSignUp/SignInSignUpPage";
import UserMain from "./layouts/User Main/UserMain";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";
import Account from "./layouts/Account/Account";
import test from "./test";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <div className="App"> 
        <Switch>
          <PublicRoute
            exact
            path="/"
            redirectionPath="/account"
            component={SignInSignUpPage}
          />
          <PrivateRoute
            path="/account"
            redirectionPath="/"
            component={Account}
          />
          <PrivateRoute
            path="/dashboard"
            redirectionPath="/"
            invalidRedirectionPath="/account"
            component={UserMain}
          />
          <Route path="/test" component={test} />
        </Switch>
      </div>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
