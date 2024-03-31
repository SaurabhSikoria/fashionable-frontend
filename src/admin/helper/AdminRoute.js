import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authenticate = useSelector((state) => state.auth);
  const { isAuthenticated, user } = authenticate;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
