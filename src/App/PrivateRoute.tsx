import { Navigate, Outlet } from "react-router"
import { useAuth } from "../contexts/CurrentUserContext"

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />
};

export default PrivateRoute;