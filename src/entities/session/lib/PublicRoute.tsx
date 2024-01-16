import { Navigate, Outlet } from "react-router-dom";
import { useIsAuth } from "../model";

export const PublicRoute = () => {
  const isAuth = useIsAuth();
  return isAuth ? <Navigate to="/tasks_front/" /> : <Outlet />;
};