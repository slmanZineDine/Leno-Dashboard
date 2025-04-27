export enum Directions {
  RTL = "rtl",
  LTR = "ltr",
}

export enum Languages {
  ENGLISH = "en",
  ARABIC = "ar",
}

export enum Environments {
  PROD = "production",
  DEV = "development",
}

// ################### ROLES ###################
export enum UserRoles {
  Admin = "admin",
  Supervisor = "supervisor",
  Customer = "customer",
}
export type TUserRolesValues = (typeof UserRoles)[keyof typeof UserRoles];

// ################### COMPLAINT STATUS ###################
export enum ComplaintStatus {
  Open = "open",
  InProgress = "inProgress",
  Resolved = "resolved",
}
export type TComplaintStatusValues =
  (typeof ComplaintStatus)[keyof typeof ComplaintStatus];

// ################### ORDER STATUS ###################
export enum OrderStatus {
  Pending = "pending",
  Shipped = "shipped",
  Delivered = "delivered",
  Canceled = "canceled",
}
export type TOrderStatusValues = (typeof OrderStatus)[keyof typeof OrderStatus];
