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
  const highestId = products.reduce((highest, product) => {
    if (product.id >= FIRST_LOCAL_PRODUCT_ID) {
      return Math.max(highest, product.id);
    }

    return highest;
  }, FIRST_LOCAL_PRODUCT_ID);

  return highestId + 1;
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
          const usedIds = new Set(state.createdProducts.map((item) => item.id));

          let nextId = getNextLocalProductId(state.createdProducts);

          while (usedIds.has(nextId)) {
            nextId += 1;
          }

          const localProduct: IProduct = {
            ...product,
            id: nextId,
          };

          return {
            createdProducts: [...state.createdProducts, localProduct],
          };
        });
      },

      deleteProductLocally: (productId) => {
        set((state) => ({
          deletedProductIds: state.deletedProductIds.includes(productId)
            ? state.deletedProductIds
            : [...state.deletedProductIds, productId],
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
      version: 3,

      migrate: (persistedState) => {
        if (!persistedState) {
          return persistedState;
        }

        const state = persistedState as ProductChangesState;

        let nextId = getNextLocalProductId(state.createdProducts);

        const idMap = new Map<number, number>();

        const usedIds = new Set<number>();

        const migratedProducts = state.createdProducts.map((product) => {
          let newId = product.id;

          if (newId < FIRST_LOCAL_PRODUCT_ID || usedIds.has(newId)) {
            while (usedIds.has(nextId)) {
              nextId += 1;
            }

            newId = nextId;
            nextId += 1;
          }

          usedIds.add(newId);

          if (newId !== product.id) {
            idMap.set(product.id, newId);
          }

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
