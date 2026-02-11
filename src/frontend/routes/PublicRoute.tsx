import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";

export function PublicRoute() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
}
