import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

function PrivateRoute({
  component,
  exact,
  path,
  redirectionPath,
  invalidRedirectionPath,
}) {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        currentUser.emailVerified || !invalidRedirectionPath ? (
          <Route path={path} exact={exact} component={component} />
        ) : (
          <Redirect to={invalidRedirectionPath} />
        )
      ) : (
        <Redirect to={redirectionPath} />
      )}
    </>
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  redirectionPath: PropTypes.string.isRequired,
};

export default PrivateRoute;
