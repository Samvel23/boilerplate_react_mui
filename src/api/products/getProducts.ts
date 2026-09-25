import type { IProductsResponse } from "@/types/products";
import { apiClient } from "../client";

interface IGetProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  signal?: AbortSignal;
}

export const getProducts = ({
  limit = 10,
  skip = 0,
  sortBy,
  order,
  signal,
}: IGetProductsParams = {}) => {
  return apiClient.get<IProductsResponse>("/products", {
    params: {
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(order && { order }),
      signal,
    },
  });
};
