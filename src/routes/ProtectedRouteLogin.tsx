import { Navigate, Outlet, useLocation } from "react-router-dom";
import useGetProfile from "../api/useGetProfile";
import { Loading } from "../components";

export function ProtectedRouteLogin() {
  const { data: user, isLoading } = useGetProfile();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (user?.email_verified === false) {
    return <Navigate to="/Login-verify" replace state={{ from: location }} />;
  }

  if (user?.email_verified) {
    return <Navigate to="/my-board" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
