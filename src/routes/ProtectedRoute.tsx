// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useGetProfile from "../api/useGetProfile";

export function ProtectedRoute() {
  const { data: user, isLoading } = useGetProfile();
  const location = useLocation();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  console.log(user, 'user');
  

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}