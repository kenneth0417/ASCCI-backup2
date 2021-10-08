import React from "react";
import { Route } from "react-router-dom";
import { getUser } from "../actions/user";
import { useDispatch } from "react-redux";

const ReceiverProtected = ({ email, role, component: Component, ...rest }) => {
  const dispatch = useDispatch();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (email && (role.includes("SWDC") || role.includes("Guidance"))) {
          return <Component />;
        } else {
          dispatch(getUser());
        }
      }}
    />
  );
};

export default ReceiverProtected;
