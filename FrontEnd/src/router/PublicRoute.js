import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

function PublicRoute({ component, exact, path, redirectionPath }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <Redirect to={redirectionPath} />
      ) : (
        <Route path={path} exact={exact} component={component} />
      )}
    </>
  );
}

PublicRoute.propTypes = {
  exact: PropTypes.bool,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  redirectionPath: PropTypes.string.isRequired,
};

export default PublicRoute;
