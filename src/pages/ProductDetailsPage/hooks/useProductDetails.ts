import { useEffect, useState } from "react";

import { getProduct } from "@/api/products/getProduct";
import { useProductChangesStore } from "@/stores/productChangesStore";
import { mergeProductChanges } from "@/utils/products/mergeProductChanges";

import type { IProduct } from "@/types/products";

export const useProductDetails = (id?: string) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  useEffect(() => {
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
      setError(true);
      return;
    }

    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await getProduct({
          id: productId,
          signal: controller.signal,
        });

        setProduct(response.data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setError(true);
        console.error("Error getting product", error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [id]);

  const effectiveProduct = product
    ? mergeProductChanges(product, productChanges[product.id] ?? {})
    : null;

  return {
    product,
    effectiveProduct,
    loading,
    error,
  };
};
