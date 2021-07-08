import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { AuthContext } from "../contexts/Auth";

import Account from "../layouts/Account/Account";
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  var { currentUser } = useContext(AuthContext) || "Loading...";
  return (
    <Route 
      {...rest}
      render={(routeProps) =>
        currentUser !== "Loading..." ? (
          currentUser ? (
            // <RouteComponent {...routeProps} />
            currentUser.emailVerified ?  <RouteComponent {...routeProps} />: (
            <Redirect to={"/account"} />,
            <Account/>
            )
          ) : (
            <Redirect to={"/login"} />
          )
        ) : (
          <div style={{ textAlign: "center", marginTop: 330 }}>
            <ClipLoader size={250} color={"#303238"} loading={true} />
          </div>
        )
      }
    />
  );
};

export default PrivateRoute;
