// =================== BASE URL ===================
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// =================== ROOTS ===================
const ROOTS = {
  // Auth ===================
  LOGIN: `/auth/login`,

  // Users ===================
  ADMIN: `/auth/me`,
  CUSTOMERS: `/users`,

  // Products ===================
  PRODUCTS: `/products`,
};

// =================== ENDPOINTS ===================
export const endpoints = {
  // Auth ===================
  login: ROOTS.LOGIN,

  // Users ===================
  users: {
    // ===== Admin
    admin: ROOTS.ADMIN,

    // ===== Supervisor
    supervisor: ROOTS.ADMIN,

    // ===== Customer
    customers: ROOTS.CUSTOMERS,
    customerSearch: `${ROOTS.CUSTOMERS}/search`,
    addCutomer: `${ROOTS.CUSTOMERS}/add`,
  },

  // Products ===================
  products: {
    root: ROOTS.PRODUCTS,
    categories: `${ROOTS.PRODUCTS}/categories`,
    searchProduct: `${ROOTS.PRODUCTS}/search`,
    addProduct: `${ROOTS.PRODUCTS}/add`,
  },
};
