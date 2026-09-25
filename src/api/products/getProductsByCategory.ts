import type { IProductsResponse } from "@/types/products";
import { apiClient } from "../client";

interface IGetProductsByCategoryParams {
  category: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  signal?: AbortSignal;
}

export const getProductsByCategory = ({
  category,
  limit = 10,       
  skip = 0,
  sortBy,
  order,
  signal,
}: IGetProductsByCategoryParams) => {
  return apiClient.get<IProductsResponse>(`/products/category/${category}`, {
    params: {
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(order && { order }),
      signal,
    },
  });
};
