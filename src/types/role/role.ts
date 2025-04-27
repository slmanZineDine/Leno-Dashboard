import { TUserTypes } from "@customTypes/user/user";

export type TPermission = {
  id: number;
  name: string;
  display_name: string;
};
export type TRole = {
  id: number;
  name: TUserTypes;
  permissions?: TPermission[];
};
