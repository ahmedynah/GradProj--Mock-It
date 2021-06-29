import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { AuthContext } from "../contexts/Auth";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
  var { currentUser } = useContext(AuthContext) || "Loading...";
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser !== "Loading..." ? (
          currentUser ? (
            <Redirect to={"/profile"} />
          ) : (
            <RouteComponent {...routeProps} />
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

export default PublicRoute;
