import { TPermissionActions } from "@customTypes/permission/permission";

// ========================== Format Permissions ==========================
const groupingPermissions = (
  data: { id: number; name: string }[],
): [
  {
    [key: string]: { [key: string]: number | string | boolean };
  },
  Set<TPermissionActions>,
] => {
  const currentActions: Set<TPermissionActions> = new Set();

  const permissionsTable: {
    [key: string]: { [key: string]: number | string | boolean };
  } = {
    customers: {
      enName: "Customers",
    },
    supervisors: {
      enName: "Supervisors",
    },
    products: {
      enName: "Products",
    },
    orders: {
      enName: "Orders",
    },
    statistics: {
      enName: "Statistics",
    },
    complaints: {
      enName: "Complaints",
    },
    companies: {
      enName: "Companies",
    },
    settings: {
      enName: "Settings",
    },
  };

  data.forEach((permission) => {
    const splitedName = permission.name.split("_");
    const operation = splitedName?.shift() as TPermissionActions;
    const permissionName = splitedName.join("_") as TPermissionActions;

    currentActions.add(operation);

    if (permissionsTable[permissionName]) {
      permissionsTable[permissionName] = {
        ...permissionsTable[permissionName],
        [operation]: permission.id,
        isShow: true,
      };
    }
  });

  return [permissionsTable, currentActions];
};

export default groupingPermissions;
