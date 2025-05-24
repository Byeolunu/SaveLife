import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../services/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;