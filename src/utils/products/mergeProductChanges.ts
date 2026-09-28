import type { IProduct } from "@/types/products";

export const mergeProductChanges = (
  product: IProduct,
  changes: Partial<IProduct>,
) => ({
  ...product,
  ...changes,
});
