import { useMemo } from "react";

import type { IProduct } from "@/types/products";

interface DashboardKpiResult {
  totalInventoryValue: number;
  lowStockItems: number;
  averageRating: number;
}

export const getDashboardKpis = (
  products: IProduct[],
): DashboardKpiResult => {
  const totalInventoryValue =
    products.reduce(
      (total, product) =>
        total +
        product.price * product.stock,
      0,
    );

  const lowStockItems =
    products.filter(
      (product) => product.stock < 10,
    ).length;

  const ratedProducts =
    products.filter((product) =>
      Number.isFinite(product.rating),
    );

  const averageRating =
    ratedProducts.length > 0
      ? ratedProducts.reduce(
          (total, product) =>
            total + product.rating,
          0,
        ) / ratedProducts.length
      : 0;

  return {
    totalInventoryValue:
      Number.isFinite(
        totalInventoryValue,
      )
        ? totalInventoryValue
        : 0,

    lowStockItems,

    averageRating:
      Number.isFinite(averageRating)
        ? averageRating
        : 0,
  };
};

export const useDashboardKpis = (
  products: IProduct[],
) => {
  return useMemo(
    () => getDashboardKpis(products),
    [products],
  );
};