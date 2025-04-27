// Redux
import { apiSlice } from "@redux/api/apiSlice";
import { endpoints } from "@redux/api/endpoints";
// Data
import { PAGE_SIZE } from "constants/constants";
// Types
import type { TCategory, TProduct } from "@customTypes/product";
import type { TProductRes } from "@customTypes/response/response";
import type { TAddProductForm } from "@validation/product/addProductSchema";

// ################### PRODUCTS API SLICE ###################
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // =================== Category ===================
    getCategories: builder.query<TCategory[], void>({
      query: () => endpoints.products.categories,
      providesTags: ["Product"],
    }),

    // =================== Product ===================
    getProducts: builder.query<TProductRes, number>({
      query: (page) =>
        `${endpoints.products.root}?limit=${PAGE_SIZE}&skip=${(page - 1) * 10}`,
      providesTags: ["Product"],
    }),
    searchProduct: builder.query<
      TProductRes,
      { page: number; searchValue: string }
    >({
      query: ({ page, searchValue }) =>
        `${endpoints.products.searchProduct}?q=${searchValue}&limit=${PAGE_SIZE}&skip=${(page - 1) * 10}`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<TProduct, string>({
      query: (productId) => `${endpoints.products.root}/${productId}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<any, Partial<TAddProductForm>>({
      query: (data) => ({
        url: endpoints.products.addProduct,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      any,
      { data: Partial<TAddProductForm>; productId: string }
    >({
      query: ({ data, productId }) => ({
        url: `${endpoints.products.root}/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<any, number>({
      query: (productId) => ({
        url: `${endpoints.products.root}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  // =================== Category ===================
  useGetCategoriesQuery,

  // =================== Products ===================
  useGetProductsQuery,
  useSearchProductQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
