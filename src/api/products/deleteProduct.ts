import { apiClient } from "@/api/client";
import type { IProduct } from "@/types/products";

interface IDeleteProductParams {
  id: number;
  signal?: AbortSignal;
}

export const deleteProduct = ({ id, signal }: IDeleteProductParams) =>
  apiClient.delete<IProduct>(`/products/${id}`, { signal });
