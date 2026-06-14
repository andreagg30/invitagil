import { Navigate, Outlet, useLocation } from "react-router-dom";
import useGetProfile from "../api/useGetProfile";

export function ProtectedRouteOtp() {
  const { data: user, isLoading } = useGetProfile();
  const location = useLocation();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

   if (user.email_verified) {
    return <Navigate to="/my-board" replace state={{ from: location }} />;
  }

  return <Outlet />;
}