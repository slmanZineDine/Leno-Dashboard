// Third-Party ====> redux
import { useAppSelector } from "@redux/hooks";
import { selectCurrentToken } from "@redux/slices/auth/authSlice";
// Third-Party ====> react-router-dom
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  // ################### REDUX HOOKS ###################
  const isLogging = useAppSelector(selectCurrentToken);

  // ################### REACT-ROUTER HOOKS ###################
  const { pathname } = useLocation();

  return isLogging ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};
export default RequireAuth;
