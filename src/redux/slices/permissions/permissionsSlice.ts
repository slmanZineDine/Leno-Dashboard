import { RootState } from "@redux/store";
import { createSlice } from "@reduxjs/toolkit";
// Types
import type { TPermissionActions } from "@customTypes/permission/permission";

type TPermissions = {
  view: { [key: string]: boolean };
  create: { [key: string]: boolean };
  update: { [key: string]: boolean };
  delete: { [key: string]: boolean };
  approve: { [key: string]: boolean };
};

const initialState: TPermissions = {
  view: {},
  create: {},
  update: {},
  delete: {},
  approve: {},
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setCurrenTUserPermissions(state, { payload }) {
      payload.forEach((permission: string) => {
        const splitedName = permission.split("_");

        const operation = splitedName?.shift() as TPermissionActions;
        const permissionName = splitedName.join("_");

        state[operation] = {
          ...state[operation],
          [permissionName]: true,
        };
      });
    },
  },
});

// ========================== Users ==========================
export const selectCurrenTUserPermissions = (state: RootState) =>
  state.permissions;

// ========================== Permission Based On Operation ==========================
export const selectViewPermissions = (state: RootState) =>
  state.permissions.view;

export const { setCurrenTUserPermissions } = permissionsSlice.actions;

export default permissionsSlice.reducer;
