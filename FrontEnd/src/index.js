import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/App.css';
import SignInSignUpPage from './layouts/SignInSignUp/SignInSignUpPage';
import Video from './Video';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider} from "./contexts/Auth";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
     <div className="App">
       <Switch>
       <PublicRoute  path="/login" component={SignInSignUpPage} />
       <PublicRoute  path="/video" component={Video} />
      </Switch>
    </div>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
