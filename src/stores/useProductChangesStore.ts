import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IProduct } from "@/types/products";

type ProductChanges = Partial<IProduct>;

interface ProductChangesState {
  productChanges: Record<number, ProductChanges>;
  createdProducts: IProduct[];
  deletedProducts: IProduct[];

  setProductChanges: (productId: number, changes: ProductChanges) => void;

  addCreatedProduct: (product: IProduct) => void;

  deleteProductLocally: (product: IProduct) => void;

  discardProductChanges: (productId: number) => void;

  hasLocalChanges: (productId: number) => boolean;

  clearProductChanges: () => void;
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
      deletedProducts: [],

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

      deleteProductLocally: (product) => {
        set((state) => {
          const alreadyDeleted = state.deletedProducts.some(
            (deletedProduct) => deletedProduct.id === product.id,
          );

          if (alreadyDeleted) {
            return state;
          }

          return {
            deletedProducts: [...state.deletedProducts, product],
          };
        });
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

      clearProductChanges: () => {
        set({
          productChanges: {},
          createdProducts: [],
          deletedProducts: [],
        });
      },
    }),
    {
      name: "product-changes",
      version: 4,

      migrate: (persistedState) => {
        if (!persistedState) {
          return persistedState;
        }

        const state = persistedState as Partial<ProductChangesState> & {
          deletedProductIds?: number[];
          deletedProducts?: IProduct[];
        };

        const createdProducts = state.createdProducts ?? [];

        let nextId = getNextLocalProductId(createdProducts);

        const idMap = new Map<number, number>();

        const usedIds = new Set<number>();

        const migratedProducts = createdProducts.map((product) => {
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
          Object.entries(state.productChanges ?? {}).map(([id, changes]) => {
            const oldId = Number(id);
            const newId = idMap.get(oldId) ?? oldId;

            return [String(newId), changes];
          }),
        );

        /*
         * Version 3 stored only deleted product IDs.
         *
         * We cannot reconstruct the full product from those IDs,
         * so preserve them as lightweight deleted products.
         *
         * Products that are encountered and deleted from now on
         * will contain their complete product data.
         */
        const migratedDeletedProducts: IProduct[] = (
          state.deletedProducts ??
          (state.deletedProductIds ?? []).map(
            (id) =>
              ({
                id,
              }) as IProduct,
          )
        ).map((product) => ({
          ...product,
          id: idMap.get(product.id) ?? product.id,
        }));

        return {
          productChanges: migratedChanges,
          createdProducts: migratedProducts,
          deletedProducts: migratedDeletedProducts,
        };
      },
    },
  ),
);
