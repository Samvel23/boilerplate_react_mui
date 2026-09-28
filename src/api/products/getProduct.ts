import { apiClient } from "@/api/client";
import type { IProduct } from "@/types/products";

interface IGetProductParams {
  id: number;
  signal?: AbortSignal;
}

export const getProduct = ({ id, signal }: IGetProductParams) => {
  return apiClient.get<IProduct>(`/products/${id}`, {
    signal,
  });
};
