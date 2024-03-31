import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const UserRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
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

export default UserRoute;
