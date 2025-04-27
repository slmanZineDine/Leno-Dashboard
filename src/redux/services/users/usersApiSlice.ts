import { apiSlice } from "@redux/api/apiSlice";
import { endpoints } from "@redux/api/endpoints";
// Types
import type { TCustomerRes } from "@customTypes/response/response";
import type { TUser } from "@customTypes/user/user";
import { PAGE_SIZE } from "constants/constants";
import { TAddCustomerForm } from "@validation/user/customer/addCustomerSchema";
import { TUpdateAdminForm } from "@validation/user/admin/updateAdminSchema";
import { TUpdateSupervisorForm } from "@validation/user/supervisor/updateSupervisorSchema";

// ################### USERS API SLICE ###################
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =================== Admin ===================
    getAdminProfile: builder.query<TUser, void>({
      query: () => endpoints.users.admin,
      providesTags: ["Admin"],
    }),
    updateAdminProfile: builder.mutation<any, Partial<TUpdateAdminForm>>({
      query: (data) => ({
        url: endpoints.users.admin,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // =================== Supervisor ===================
    getSupervisorProfile: builder.query<TUser, void>({
      query: () => endpoints.users.supervisor,
      providesTags: ["Supervisor"],
    }),
    updateSupervisorProfile: builder.mutation<
      any,
      Partial<TUpdateSupervisorForm>
    >({
      query: (data) => ({
        url: endpoints.users.supervisor,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Supervisor"],
    }),

    // =================== Customers ===================
    getAllCustomers: builder.query<TCustomerRes, number>({
      query: (page) =>
        `${endpoints.users.customers}?limit=${PAGE_SIZE}&skip=${(page - 1) * 10}`,
      providesTags: ["Customer"],
    }),
    searchCustomers: builder.query<
      TCustomerRes,
      { page: number; searchValue: string }
    >({
      query: ({ page, searchValue }) =>
        `${endpoints.users.customerSearch}?q=${searchValue}&limit=${PAGE_SIZE}&skip=${(page - 1) * 10}`,
      providesTags: ["Customer"],
    }),
    getCustomer: builder.query<TUser, string>({
      query: (customerId) => `${endpoints.users.customers}/${customerId}`,
      providesTags: ["Customer"],
    }),
    addCustomer: builder.mutation<any, Partial<TAddCustomerForm>>({
      query: (data) => ({
        url: endpoints.users.addCutomer,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<
      any,
      { data: Partial<TAddCustomerForm>; customerId: string }
    >({
      query: ({ data, customerId }) => ({
        url: `${endpoints.users.customers}/${customerId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation<any, number>({
      query: (customerId) => ({
        url: `${endpoints.users.customers}/${customerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  // =================== Admin ===================
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,

  // =================== Supervisor ===================
  useGetSupervisorProfileQuery,
  useUpdateSupervisorProfileMutation,

  // =================== Customers ===================
  useGetAllCustomersQuery,
  useSearchCustomersQuery,
  useGetCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = usersApiSlice;
