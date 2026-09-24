import type { IProductsResponse } from "@/types/products";
import { apiClient } from "../client";

interface ISearchProductsParams {
  query: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const searchProducts = ({
  query,
  limit = 10,
  skip = 0,
  sortBy,
  order,
}: ISearchProductsParams) => {
  return apiClient.get<IProductsResponse>("/products/search", {
    params: {
      q: query,
      limit,
      skip,
      ...(sortBy && { sortBy }),
      ...(order && { order }),
    },
  });
};
