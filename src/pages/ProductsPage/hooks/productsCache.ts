import type { IProductsResponse } from "@/types/products";

const productsCache = new Map<string, IProductsResponse>();

export const getProductsCacheKey = ({
  page,
  limit,
  sortBy,
  order,
  category,
  search,
}: {
  page: number;
  limit: number;
  sortBy: string;
  order: "asc" | "desc";
  category: string | null;
  search: string;
}) => {
  return JSON.stringify({
    page,
    limit,
    sortBy,
    order,
    category,
    search,
  });
};

export const getCachedProducts = (key: string) => {
  return productsCache.get(key);
};

export const setCachedProducts = (key: string, response: IProductsResponse) => {
  productsCache.set(key, response);
};

export const clearProductsCache = () => {
  productsCache.clear();
};
