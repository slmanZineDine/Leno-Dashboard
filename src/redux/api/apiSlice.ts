// Third-Party ====> Redux
import { RootState } from "@redux/store";
import {
  createApi,
  BaseQueryFn,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// Libs
import handleApiError from "@libs/reactToolkitQuery/handleAPIError";
// Data
import { BASE_URL } from "@redux/api/endpoints";
import { REDUX_TAGS } from "constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("Accept", "application/json");

    return headers;
  },
});

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, {
    ...extraOptions,
  });
  if (result?.error) {
    handleApiError(result, api);
  }

  return result;
};

// ################### MAIN API SLICE ###################
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: REDUX_TAGS,
  endpoints: () => ({}),
});
