import { Navigate, Outlet, useLocation } from "react-router-dom";
import useGetProfile from "../api/useGetProfile";
import { Loading } from "../components";

export function ProtectedRouteOtp() {
  const { data: user, isLoading } = useGetProfile();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.email_verified) {
    return <Navigate to="/my-board" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
