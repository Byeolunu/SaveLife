import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../services/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    // Redirect to homepage if the user does not have the required role
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;