// Enums
import { ComplaintStatus, OrderStatus } from "./enums";
// Types
import type { TPermissionActions } from "@customTypes/permission/permission";

// ################### NUMBERS ###################
export const SYRIA_COUNTRY_CODE = "963";
export const SYRIA_ID = 168;

// ################### RANGE AND UNITS ###################
export const HEIGHT_UNIT = "cm";
export const MIN_HEIGHT = 1;
export const MAX_HEIGHT = 300;

export const WIDTH_UNIT = "cm";
export const MIN_WIDTH = 1;
export const MAX_WIDTH = 200;

export const WEIGHT_UNIT = "grams";
export const MIN_WEIGHT = 1;
export const MAX_WEIGHT = 100000;

export const DEPTH_UNIT = "cm";
export const MIN_DEPTH = 1;
export const MAX_DEPTH = 100;

export const MIN_PRICE = 0;
export const MAX_PRICE = 1_000_000;

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10_000;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 24;

// ################### LENGTH ###################
export const AGE_LIMIT = 16;
export const PHONE_LENGTH = 12;
export const VERIFICATION_CODE = 4;
export const NAME_MAX_LENGTH = 24;
export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 500;

// ################### REGEX ###################
export const pwdRegexp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const urlRegexp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

// ################### IMAGES ###################
export const MAX_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

// ################### LOCALY PAGINATION ###################
export const PAGE_SIZE = 10;

// ################### OTHERS ###################
export const CURRENCY = "$";
export const WAITING_TIME = 180; // Seconds

// ################### CREDENTIALS ###################
export const ADMIN_INFO = {
  username: "emilys",
  password: "emilyspass",
};
export const SUPERVISOR_INFO = {
  username: "jacksone",
  password: "jacksonepass",
};

// ################### REDUX TAGS ###################
export const REDUX_TAGS = ["Admin", "Product", "Customer", "Supervisor"];

// ################### BOOKING STATUS ###################
export const BOOKING_STATUS = {
  REQUESTED: "requested",
  PENDING: "pending",
  READY: "ready",
  APPROVED: "approved",
  IN_PROGRESS: "in_progress",
  REJECTED: "rejected",
  CANCELED: "canceled",
  COMPLETED: "completed",
};

// ################### ACCOUNT STATUS ###################
export const ACCOUNT_STATUS_COLORS: { [key: string]: string } = {
  pending: "yellow-status",
  active: "green-status",
  suspended: "orange-status",
  banned: "red-status",
};

// ################### PERMISSION OPERACTION ###################
export const MAIN_OPERATION: TPermissionActions[] = [
  "view",
  "create",
  "update",
  "delete",
];

// ################### PERMISSIONS ###################
export const permissions = {
  admin: [
    { id: 1, name: "create_supervisors" },
    { id: 2, name: "delete_supervisors" },
    { id: 3, name: "view_supervisors" },
    { id: 4, name: "update_supervisors" },
    { id: 5, name: "delete_customers" },
    { id: 6, name: "view_customers" },
    { id: 7, name: "update_customers" },
    { id: 8, name: "create_customers" },
    { id: 9, name: "view_statistics" },
    { id: 10, name: "create_roles" },
    { id: 11, name: "delete_roles" },
    { id: 12, name: "view_roles" },
    { id: 13, name: "update_roles" },
    { id: 14, name: "create_companies" },
    { id: 15, name: "delete_companies" },
    { id: 16, name: "view_companies" },
    { id: 17, name: "update_companies" },
    { id: 18, name: "create_products" },
    { id: 19, name: "delete_products" },
    { id: 20, name: "view_products" },
    { id: 21, name: "update_products" },
    { id: 22, name: "create_orders" },
    { id: 23, name: "update_orders" },
    { id: 24, name: "delete_orders" },
    { id: 25, name: "view_orders" },
    { id: 26, name: "view_complaints" },
    { id: 27, name: "update_complaints" },
    { id: 28, name: "view_ratings" },
    { id: 29, name: "view_settings" },
    { id: 30, name: "view_settings" },
    { id: 31, name: "update_settings" },
  ],
  supervisor: [
    { id: 1, name: "create_products" },
    { id: 2, name: "delete_products" },
    { id: 3, name: "view_products" },
    { id: 4, name: "update_products" },
    { id: 5, name: "create_orders" },
    { id: 6, name: "update_orders" },
    { id: 7, name: "delete_orders" },
    { id: 8, name: "view_orders" },
    { id: 9, name: "view_customers" },
    { id: 10, name: "update_customers" },
    { id: 11, name: "create_customers" },
    { id: 12, name: "view_statistics" },
    { id: 13, name: "view_complints" },
    { id: 14, name: "view_settings" },
  ],
  customer: [
    { id: 1, name: "view_products" },
    { id: 2, name: "view_orders" },
    { id: 3, name: "create_orders" },
    { id: 4, name: "update_orders" },
    { id: 5, name: "view_ratings" },
    { id: 6, name: "create_ratings" },
    { id: 7, name: "update_ratings" },
    { id: 8, name: "delete_ratings" },
  ],
};

// ################### COMPLAINT STATUS ###################
export const complaintStatusBorderColor = {
  [ComplaintStatus.Open]: "border-s-red-700",
  [ComplaintStatus.InProgress]: "border-s-yellow-700",
  [ComplaintStatus.Resolved]: "border-s-green-700",
};

export const complaintStatusBadges = {
  [ComplaintStatus.Open]: "red-status",
  [ComplaintStatus.InProgress]: "yellow-status",
  [ComplaintStatus.Resolved]: "green-status",
};

// ################### ORDER STATUS ###################
export const orderStatusColors = {
  [OrderStatus.Pending]: "yellow-status",
  [OrderStatus.Shipped]: "orange-status",
  [OrderStatus.Delivered]: "green-status",
  [OrderStatus.Canceled]: "red-status",
};
