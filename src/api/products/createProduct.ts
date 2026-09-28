import { apiClient } from "@/api/client";
import type { IProduct } from "@/types/products";

interface ICreateProductData {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
}

export const createProduct = (data: ICreateProductData) =>
  apiClient.post<IProduct>("/products/add", data);
