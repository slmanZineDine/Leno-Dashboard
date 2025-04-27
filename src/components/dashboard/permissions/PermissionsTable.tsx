// React
import { ChangeEvent, useEffect, useState } from "react";
// My-Components
import Table from "@components/common/tables/Table";
// Utils
import groupingPermissions from "@utils/permissions/groupingPermissions";
// Data
import { MAIN_OPERATION, permissions } from "constants/constants";
// Types
import type { TUserTypes } from "@customTypes/user/user";
import { TPermissionActions } from "@customTypes/permission/permission";

type TPermissionsTable = {
  roleName: TUserTypes;
  rolePermissions: number[]; // Contains All Permission (Role's Permissinos And Additional Permissions)
  defaultPermissions?: number[]; // If Exist, Contains only Permission Related to Role, So Fixed Permision user can't changed
  selectedPermissions: number[];
  setSelectedPermissions: (data: number[]) => void;
};

const PermissionsTable = ({
  roleName,
  rolePermissions,
  defaultPermissions = [],
  selectedPermissions,
  setSelectedPermissions,
}: TPermissionsTable) => {
  // ################### REACT HOOKS ###################
  const [permissionsTable, setPermissionsTable] = useState<{
    [key: string]: { [key: string]: number | string | boolean };
  }>({});
  const [currentActions, setCurrentActions] = useState<Set<TPermissionActions>>(
    new Set(),
  );

  // ################### HANDLER ###################
  // ========== Check If Permission Id Has Been Selected
  const isPermissionExist = (permissinoId: number, data: number[]) =>
    data.includes(permissinoId);

  // ========== Change Checkbox Value
  const handleChangeCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    // To Prevent User Chagne Roles's Permissions
    if (
      defaultPermissions.length > 0 &&
      isPermissionExist(id, defaultPermissions)
    ) {
      event.preventDefault();
    } else {
      event.target.checked
        ? handleChangePermissions(id, "add")
        : handleChangePermissions(id, "remove");
    }
  };

  // ========== Add / Remove Editable Permission
  const handleChangePermissions = (
    permissinoId: number,
    operation: "add" | "remove",
  ) => {
    // ===== Add =====
    if (operation === "add") {
      setSelectedPermissions([...selectedPermissions, permissinoId]);
    }

    // ===== Delete =====
    else if (operation === "remove") {
      const data = selectedPermissions.filter((id) => id !== permissinoId);

      setSelectedPermissions(data);
    }
  };
  // ################### SIDE EFFECT ###################
  useEffect(() => {
    const [permissionsTable, currentActions] = groupingPermissions(
      permissions[roleName],
    );
    setPermissionsTable(permissionsTable);
    setCurrentActions(currentActions);
  }, [permissions]);

  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: "Name", isShow: true },
    { id: 2, title: "View", isShow: currentActions.has("view") },
    { id: 3, title: "Create", isShow: currentActions.has("create") },
    { id: 4, title: "Updae", isShow: currentActions.has("update") },
    { id: 5, title: "Delete", isShow: currentActions.has("delete") },
  ];

  return (
    <Table
      tableHeader={tableHeader}
      minWidth="min-w-[600px]"
      coverClassName="mt-6"
      isLoading={false}
      noDataMsg="There are no permissions."
    >
      {Object.entries(permissionsTable).map(([, permissions], rowIndex) => {
        return (
          permissions?.isShow && (
            <tr key={rowIndex}>
              <td className="font-bold">{permissions.enName}</td>
              {MAIN_OPERATION.map((operation, colIndex) => {
                if (!currentActions.has(operation)) return;
                let permissionsId = permissions[operation] as number;

                return (
                  <td key={colIndex}>
                    {permissionsId && (
                      <input
                        type="checkbox"
                        checked={isPermissionExist(
                          permissionsId,
                          rolePermissions,
                        )}
                        onChange={(event) => {
                          handleChangeCheckbox(event, permissionsId);
                        }}
                        className={`checkbox-info checkbox checkbox-sm mr-2 leading-tight ${
                          isPermissionExist(permissionsId, defaultPermissions)
                            ? "!checkbox-error"
                            : ""
                        } `}
                        readOnly={true}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          )
        );
      })}
    </Table>
  );
};

export default PermissionsTable;
