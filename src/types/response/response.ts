import { TProduct } from "@customTypes/product";
import { TUser } from "@customTypes/user/user";

export type TMetaPagination = {
  total: number;
  limit: number;
  skip: number;
};

export type TCustomerRes = { users: TUser[] } & TMetaPagination;
export type TProductRes = { products: TProduct[] } & TMetaPagination;

export type TSuccessResponse<T> = {
  status: number;
  success: boolean;
  errors: null;
  data: T;
  meta?: TMetaPagination;
};
export type TErrorResponse = {
  status?: number;
  success: boolean;
  message?: string;
  errors?: string;
  data?: {
    errors?: { [key: string]: string[] };
    message?: string;
  };
};

export type TAPIResponse<T> = TSuccessResponse<T> | TErrorResponse;
