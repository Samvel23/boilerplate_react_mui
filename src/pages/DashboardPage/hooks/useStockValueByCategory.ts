import { useMemo } from "react";

import type { IProduct } from "@/types/products";

export interface IStockValueByCategory {
  category: string;
  value: number;
}

export const useStockValueByCategory = (products: IProduct[]) => {
  return useMemo(() => {
    const categoryValues = new Map<string, number>();

    products.forEach((product) => {
      const currentValue = categoryValues.get(product.category) ?? 0;

      categoryValues.set(
        product.category,
        currentValue + product.price * product.stock,
      );
    });

    return Array.from(categoryValues.entries())
      .map(([category, value]) => ({
        category,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [products]);
};
