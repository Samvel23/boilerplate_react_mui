import { apiClient } from "@/api/client";

import type { ICategory } from "@/types/products";

export const getCategories = () => {
  return apiClient.get<ICategory[]>("/products/categories");
};
