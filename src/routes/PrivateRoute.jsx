import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex items-centen justify-center h-screen"><span className="loading loading-spinner text-warning"></span></div>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth-form"}></Navigate>;
};

export default PrivateRoute;
