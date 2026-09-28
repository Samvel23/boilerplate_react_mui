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

const FIRST_LOCAL_PRODUCT_ID = 100000;

const getNextLocalProductId = (products: IProduct[]) => {
  return (
    products.reduce(
      (highest, product) =>
        product.id >= FIRST_LOCAL_PRODUCT_ID
          ? Math.max(highest, product.id)
          : highest,
      FIRST_LOCAL_PRODUCT_ID,
    ) + 1
  );
};

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
        set((state) => {
          const nextId = getNextLocalProductId(state.createdProducts);

          const normalizedProduct = {
            ...product,
            id: product.id >= FIRST_LOCAL_PRODUCT_ID ? product.id : nextId,
          };

          return {
            createdProducts: [...state.createdProducts, normalizedProduct],
          };
        });
      },

      deleteProductLocally: (productId) => {
        set((state) => ({
          deletedProductIds: [...state.deletedProductIds, productId],
        }));
      },

      discardProductChanges: (productId) => {
        set((state) => {
          const remainingChanges = Object.fromEntries(
            Object.entries(state.productChanges).filter(
              ([id]) => Number(id) !== productId,
            ),
          );

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
      version: 2,

      migrate: (persistedState) => {
        if (!persistedState) {
          return persistedState;
        }

        const state = persistedState as ProductChangesState;

        let nextId = getNextLocalProductId(state.createdProducts);

        const idMap = new Map<number, number>();

        const migratedProducts = state.createdProducts.map((product) => {
          if (product.id >= FIRST_LOCAL_PRODUCT_ID) {
            return product;
          }

          const newId = nextId;

          nextId += 1;

          idMap.set(product.id, newId);

          return {
            ...product,
            id: newId,
          };
        });

        const migratedChanges = Object.fromEntries(
          Object.entries(state.productChanges).map(([id, changes]) => {
            const oldId = Number(id);

            const newId = idMap.get(oldId) ?? oldId;

            return [String(newId), changes];
          }),
        );

        const migratedDeletedIds = state.deletedProductIds.map(
          (id) => idMap.get(id) ?? id,
        );

        return {
          ...state,
          createdProducts: migratedProducts,
          productChanges: migratedChanges,
          deletedProductIds: migratedDeletedIds,
        };
      },
    },
  ),
);
