// Third-Party =====> redux
import { useAppSelector } from "@redux/hooks";
import { selectIsAdmin } from "@redux/slices/auth/authSlice";
import { selectCurrenTUserPermissions } from "@redux/slices/permissions/permissionsSlice";
// Types
import {
  TPermissionNames,
  TPermissionActions,
} from "@customTypes/permission/permission";

type TCanProps = {
  name: TPermissionNames;
  action: TPermissionActions;
  children: React.ReactNode;
};

const Can = ({ name, action, children }: TCanProps) => {
  // ################### REDUX HOOKS ###################
  const isAdmin = useAppSelector(selectIsAdmin);
  const permission = useAppSelector(selectCurrenTUserPermissions);

  if (isAdmin || permission[action]?.[name]) {
    return children;
  } else {
    return null;
  }
};

export default Can;
