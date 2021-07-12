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
import Connections from "./layouts/Connections/Connections";
import LandingPage from "./layouts/Landing Page/LandingPage";

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute path="/" component={LandingPage}/>
          <PublicRoute path="/login" component={SignInSignUpPage} />
          <PrivateRoute path="/dashboard" component={UserMain} />
          <PrivateRoute path="/connections" component={Connections}/>
          <PrivateRoute path="/account" component={Account} />
          <Route path="/test" component={test}/>
     
        </Switch>
      </div>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
