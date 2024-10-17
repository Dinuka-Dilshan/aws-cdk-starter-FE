import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { ROUTES } from "../constants/Routes";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
