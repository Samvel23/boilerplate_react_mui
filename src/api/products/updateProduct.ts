import { apiClient } from "@/api/client";
import type { IProduct } from "@/types/products";

interface IUpdateProductParams {
  id: number;
  data: Partial<
    Pick<
      IProduct,
      "title" | "description" | "category" | "price" | "stock" | "brand"
    >
  >;
  signal?: AbortSignal;
}

export const updateProduct = ({ id, data, signal }: IUpdateProductParams) =>
  apiClient.put<IProduct>(`/products/${id}`, data, { signal });
