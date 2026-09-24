import type { IProductsResponse } from "@/types/products";
import { apiClient } from "../client";

interface IGetProductsByCategoryParams {
  category: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const getProductsByCategory = ({
  category,
  limit = 10,
  skip = 0,
  sortBy,
  order,
}: IGetProductsByCategoryParams) => {
  return apiClient.get<IProductsResponse>(`/products/category/${category}`, {
    params: {
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(order && { order }),
    },
  });
};
