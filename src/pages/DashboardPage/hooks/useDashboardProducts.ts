import { useEffect, useMemo, useState } from "react";

import { getProducts } from "@/api/products";

import type { IProduct } from "@/types/products";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import { getEffectiveProducts } from "@/utils/products/getEffectiveProducts";

export const useDashboardProducts = (retryCount = 0) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const createdProducts = useProductChangesStore(
    (state) => state.createdProducts,
  );

  const deletedProducts = useProductChangesStore(
    (state) => state.deletedProducts,
  );

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const initialResponse = await getProducts({
          limit: 1,
          skip: 0,
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        const total = initialResponse.data.total;

        if (total === 0) {
          setProducts([]);
          return;
        }

        const response = await getProducts({
          limit: total,
          skip: 0,
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        setProducts(response.data.products);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Fetching dashboard products failed", error);

        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const effectiveProducts = useMemo(() => {
    return getEffectiveProducts({
      products,
      createdProducts,
      deletedProducts,
      productChanges,
    });
  }, [products, createdProducts, deletedProducts, productChanges]);

  return {
    products: effectiveProducts,
    loading,
    error,
  };
};
