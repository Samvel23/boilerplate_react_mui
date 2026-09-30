import { useEffect, useMemo, useState } from "react";

import { getProduct } from "@/api/products/getProduct";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import { mergeProductChanges } from "@/utils/products/mergeProductChanges";

import type { IProduct } from "@/types/products";

export const useProductDetails = (id?: string) => {
  const [fetchedProduct, setFetchedProduct] = useState<IProduct | null>(null);

  const [fetchError, setFetchError] = useState(false);

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  const createdProducts = useProductChangesStore(
    (state) => state.createdProducts,
  );

  const deletedProducts = useProductChangesStore(
    (state) => state.deletedProducts,
  );

  const deletedProductIds = useMemo(
    () => deletedProducts.map((product) => product.id),
    [deletedProducts],
  );

  const productId = Number(id);

  const isValidProductId = Number.isInteger(productId) && productId > 0;

  const isDeleted = isValidProductId
    ? deletedProductIds.includes(productId)
    : false;

  const localProduct =
    isValidProductId && !isDeleted
      ? (createdProducts.find((item) => item.id === productId) ?? null)
      : null;

  const shouldFetch = isValidProductId && !isDeleted && !localProduct;

  const [loading, setLoading] = useState(shouldFetch);

  useEffect(() => {
    if (!shouldFetch) {
      setLoading(false);
      setFetchedProduct(null);
      setFetchError(false);

      return;
    }

    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setFetchError(false);

        const response = await getProduct({
          id: productId,
          signal: controller.signal,
        });

        if (controller.signal.aborted) {
          return;
        }

        setFetchedProduct(response.data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Error getting product", error);

        setFetchedProduct(null);
        setFetchError(true);
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
  }, [productId, shouldFetch]);

  const product = localProduct ?? fetchedProduct;

  const effectiveProduct = product
    ? mergeProductChanges(product, productChanges[product.id] ?? {})
    : null;

  const error =
    !isValidProductId ||
    isDeleted ||
    (!localProduct && !fetchedProduct && fetchError);

  return {
    product,
    effectiveProduct,
    loading: shouldFetch && !fetchedProduct ? loading : false,
    error,
  };
};
