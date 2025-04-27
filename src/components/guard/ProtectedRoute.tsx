// Third-Party =====> redux
import { useAppSelector } from "@redux/hooks";
import {
  selectIsAdmin,
  selectIsSupervisor,
} from "@redux/slices/auth/authSlice";
import { selectCurrenTUserPermissions } from "@redux/slices/permissions/permissionsSlice";
// Third-Party =====> react-router-dom
import { useLocation, Navigate } from "react-router-dom";
// Data
import { paths } from "@routes/paths";
// Types
import {
  TPermissionNames,
  TPermissionActions,
} from "@customTypes/permission/permission";

type TProtectedRouteProps = {
  name?: TPermissionNames | "";
  names?: TPermissionNames[];
  action?: TPermissionActions;
  children: React.ReactNode;
};

// Routes that are accessible only to admin users.
const ONLY_ADMIN = ["admin-profile", "supervisors", "roles"];

// Routes that are accessible only to supervisor users.
const ONLY_SUPERVISOR = ["supervisor-profile"];

// Routes that admin users are restricted from accessing.
const ADMIN_BLACKLIST = ["supervisor-profile"];

const ProtectedRoute = ({
  name = "",
  names,
  action,
  children,
}: TProtectedRouteProps) => {
  // ################### REDUX HOOKS ###################
  const isAdmin = useAppSelector(selectIsAdmin);
  const isSupervisor = useAppSelector(selectIsSupervisor);
  const permissions = useAppSelector(selectCurrenTUserPermissions);

  // ################### REACT-ROUTER HOOKS ###################
  const { pathname } = useLocation();
  const theRoute = pathname.split("/")[1];

  // ################### HANDLER ###################
  // ===== Checks If The User Has At Least One Of The Specified Permissions.
  const hasAtLeastOnePermission = (
    data: undefined | TPermissionNames[],
    action: TPermissionActions | undefined,
    permissions: Record<string, any>,
  ) => {
    return (
      Array.isArray(data) &&
      data.some((name) => action && permissions[action]?.[name])
    );
  };

  // ===== Checks If The User Is Allowed To Perform A Specific Action Based On The Given Permission Name.
  const isActionAllowed = (
    name: TPermissionNames | "",
    action: TPermissionActions | undefined,
    permissions: Record<string, any>,
  ) => {
    return action && permissions[action]?.[name];
  };

  // ===== Determines If The Current Route Is Blacklisted For Admin Users.
  const isAdminBlacklisted = (route: string) => {
    return isAdmin && ADMIN_BLACKLIST.includes(route);
  };

  // ===== Checks If The Current Route Is Restricted Based On Specific User Role Restrictions.
  const isRouteRestricted = (route: string, restrictions: string[]) => {
    return restrictions.includes(route);
  };

  // ################### CONTENT ###################
  if (isAdminBlacklisted(theRoute)) {
    return <Navigate to={paths.home.root} replace />;
  }
  // Allow Admin Access Anything Except BlackList
  if (isAdmin) {
    return children;
  }

  if (isRouteRestricted(theRoute, ONLY_ADMIN)) {
    return <Navigate to={paths.home.root} replace />;
  }

  if (isSupervisor && isRouteRestricted(theRoute, ONLY_SUPERVISOR)) {
    return children;
  }

  if (
    hasAtLeastOnePermission(names, action, permissions) ||
    isActionAllowed(name, action, permissions)
  ) {
    return children;
  }
  return <Navigate to={paths.home.root} replace />;
};

export default ProtectedRoute;
