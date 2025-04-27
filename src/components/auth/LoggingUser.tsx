// Third-Party ====> redux
import { useAppSelector } from "@redux/hooks";
import { selectCurrentToken } from "@redux/slices/auth/authSlice";
// Third-Party ====> react-router-dom
import { Navigate, Outlet, useLocation } from "react-router-dom";

const LoggingUser = () => {
  // ################### REDUX HOOKS ###################
  const isLogging = useAppSelector(selectCurrentToken);

  // ################### REACT-ROUTER HOOKS ###################
  const { state } = useLocation();
  const to = state?.from || "/"; // Redirect user to page has coming from

  return isLogging ? <Navigate to={to} replace /> : <Outlet />;
};

export default LoggingUser;
