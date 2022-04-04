import React from "react";
import { Navigate, Outlet } from "react-router-dom";
//contexts
import { useAuth } from "../context";

export function PrivateRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
