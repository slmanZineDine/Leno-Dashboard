import { TAPIResponse } from "@customTypes/response/response";
import { apiSlice } from "@redux/api/apiSlice";
import { endpoints } from "@redux/api/endpoints";
// Types
import type { TLoginForm } from "@validation/auth/loginSchema";

// ################### AUTH API SLICE ###################
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =================== Login ===================
    login: builder.mutation<TAPIResponse<any>, TLoginForm>({
      query: (credentials) => ({
        url: endpoints.login,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  // =================== Login ===================
  useLoginMutation,
} = authApiSlice;
