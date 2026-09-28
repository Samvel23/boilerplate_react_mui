import type { ICategory } from "@/types/products";

import { apiClient } from "../client";

interface IGetCategoriesParams {
  signal?: AbortSignal;
}

export const getCategories = ({ signal }: IGetCategoriesParams = {}) => {
  return apiClient.get<ICategory[]>("/products/categories", {
    signal,
  });
};
