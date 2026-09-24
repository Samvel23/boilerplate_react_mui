import type { IProductsResponse } from "@/types/products";
import { apiClient } from "../client";

interface IGetProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const getProducts = ({
  limit = 10,
  skip = 0,
  sortBy,
  order,
}: IGetProductsParams = {}) => {
  return apiClient.get<IProductsResponse>("/products", {
    params: {
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(order && { order }),
    },
  });
};
