import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IProduct } from "@/types/products";

type ProductChanges = Partial<IProduct>;

interface ProductChangesState {
  productChanges: Record<number, ProductChanges>;
  createdProducts: IProduct[];
  deletedProductIds: number[];

  setProductChanges: (productId: number, changes: ProductChanges) => void;

  addCreatedProduct: (product: IProduct) => void;

  deleteProductLocally: (productId: number) => void;

  discardProductChanges: (productId: number) => void;

  hasLocalChanges: (productId: number) => boolean;
}

export const useProductChangesStore = create<ProductChangesState>()(
  persist(
    (set, get) => ({
      productChanges: {},
      createdProducts: [],
      deletedProductIds: [],

      setProductChanges: (productId, changes) => {
        set((state) => ({
          productChanges: {
            ...state.productChanges,
            [productId]: {
              ...state.productChanges[productId],
              ...changes,
            },
          },
        }));
      },

      addCreatedProduct: (product) => {
        set((state) => ({
          createdProducts: [...state.createdProducts, product],
        }));
      },

      deleteProductLocally: (productId) => {
        set((state) => ({
          deletedProductIds: [...state.deletedProductIds, productId],
        }));
      },

      discardProductChanges: (productId) => {
        set((state) => {
          const { [productId]: _, ...remainingChanges } = state.productChanges;

          return {
            productChanges: remainingChanges,
          };
        });
      },

      hasLocalChanges: (productId) => {
        return Boolean(get().productChanges[productId]);
      },
    }),
    {
      name: "product-changes",
    },
  ),
);
