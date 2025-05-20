import { Navigate, Outlet } from "react-router";
import { useUser } from "../redux/slices/user.slice";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
