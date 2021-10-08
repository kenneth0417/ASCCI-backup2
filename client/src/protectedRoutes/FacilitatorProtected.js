import React from "react";
import { Route } from "react-router-dom";
import { getUser } from "../actions/user";
import { useDispatch } from "react-redux";

const FacilitatorProtected = ({
  email,
  role,
  component: Component,
  ...rest
}) => {
  const dispatch = useDispatch();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (email && role.includes("Facilitator")) {
          return <Component />;
        } else {
          dispatch(getUser());
        }
      }}
    />
  );
};

export default FacilitatorProtected;
