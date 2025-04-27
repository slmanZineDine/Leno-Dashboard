// =================== ROOTS ===================
const ROOTS = {
  AUTH: "/login",
  CHANGE_PASSWORD: "change-password",
  HOME: "/",
  NOT_FOUND: "/not-found",
  ERROR: "/error",

  // ===== PROFILE =====
  ADMIN_PROFILE: "/admin-profile",
  SUPERVISOR_PROFILE: "/supervisor-profile",
  COMPANY_PROFILE: "/company-profile",

  // ===== USERS =====
  CUSTOMERS: "/customers",
  EMPLOYEES: "/employees",
  SUPERVISORS: "/supervisors",

  ORDERS: "/orders",
  CALENDAR: "/calendar",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  COMPLAINTS: "/complaints",
  STATISTICS: "/statistics",
  ROLES: "/roles",
  SETTINGS: "/settings",
};

// =================== PATHS ===================
export const paths = {
  // ===== AUTH =====
  auth: ROOTS.AUTH,
  changePassword: ROOTS.CHANGE_PASSWORD,

  // ===== HOME =====
  home: { root: ROOTS.HOME },

  // ===== ADMIN PROFILE =====
  adminProfile: {
    root: ROOTS.ADMIN_PROFILE,
    editProfile: `${ROOTS.ADMIN_PROFILE}/edit-profile`,
  },

  // ===== SUPERVISOR PROFILE =====
  supervisorProfile: {
    root: ROOTS.SUPERVISOR_PROFILE,
    editProfile: `${ROOTS.SUPERVISOR_PROFILE}/edit-profile`,
  },

  // ===== CUSTOMERS =====
  customers: {
    root: ROOTS.CUSTOMERS,
    addCustomer: `${ROOTS.CUSTOMERS}/add-customer`,
    editCustomer: `${ROOTS.CUSTOMERS}/edit-customer`,
  },

  // ===== ORDER =====
  orders: { root: ROOTS.ORDERS },

  // ===== CALENDAR =====
  calendar: { root: ROOTS.CALENDAR },

  // ===== CATEGORIES =====
  categories: {
    root: ROOTS.CATEGORIES,
  },

  // ===== PRODUCTS =====
  products: {
    root: ROOTS.PRODUCTS,
    addProduct: `${ROOTS.PRODUCTS}/add-product`,
    editProduct: `${ROOTS.PRODUCTS}/edit-product`,
  },

  // ===== COMPLAINTS =====
  complaints: { root: ROOTS.COMPLAINTS },

  // ===== STATISTICS =====
  statistics: { root: ROOTS.STATISTICS },

  // ===== SUPERVISORS =====
  supervisors: {
    root: ROOTS.SUPERVISORS,
    addSupervisor: `${ROOTS.SUPERVISORS}/add-supervisor`,
    editSupervisor: `${ROOTS.SUPERVISORS}/edit-supervisor`,
  },

  // ===== ROLES =====
  roles: {
    root: ROOTS.ROLES,
    addRole: `${ROOTS.ROLES}/add-role`,
    editRole: `${ROOTS.ROLES}/edit-role`,
  },

  // ===== SETTINGS =====
  settings: {
    root: ROOTS.SETTINGS,
    appSettings: `${ROOTS.SETTINGS}/app-settings`,
  },

  // ===== NOT FOUND =====
  notFound: ROOTS.NOT_FOUND,

  // ===== ERROR =====
  error: ROOTS.ERROR,
};
