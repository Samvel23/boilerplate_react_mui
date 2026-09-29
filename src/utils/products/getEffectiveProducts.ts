import type { IProduct } from "@/types/products";

import { mergeProductChanges } from "./mergeProductChanges";

interface IGetEffectiveProductsParams {
  products: IProduct[];
  createdProducts: IProduct[];
  deletedProductIds: number[];
  productChanges: Record<
    number,
    Partial<IProduct>
  >;
}

export const getEffectiveProducts = ({
  products,
  createdProducts,
  deletedProductIds,
  productChanges,
}: IGetEffectiveProductsParams): IProduct[] => {
  const deletedIds = new Set(
    deletedProductIds,
  );

  const apiProducts = products
    .filter(
      (product) =>
        !deletedIds.has(product.id),
    )
    .map((product) =>
      mergeProductChanges(
        product,
        productChanges[product.id] ?? {},
      ),
    );

  const apiProductIds = new Set(
    apiProducts.map(
      (product) => product.id,
    ),
  );

  const localProducts = createdProducts
    .filter(
      (product) =>
        !deletedIds.has(product.id) &&
        !apiProductIds.has(product.id),
    )
    .map((product) =>
      mergeProductChanges(
        product,
        productChanges[product.id] ?? {},
      ),
    );

  return [
    ...localProducts,
    ...apiProducts,
  ];
};