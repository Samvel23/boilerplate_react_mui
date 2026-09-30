import { useEffect, useMemo, useRef, useState } from "react";

import { Box, Button, Paper, TableContainer, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { isLocalProductId } from "@/utils/products/isLocalProductId";

import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/api/products";

import type { ICategory, IProduct } from "@/types/products";

import { useDebounce } from "@/hooks/useDebounce";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import { getEffectiveProducts } from "@/utils/products/getEffectiveProducts";

import {
  ProductCategoryFilter,
  ProductPagination,
  ProductSearch,
  ProductTable,
} from "./elements";

import { useProductParams } from "./hooks";

import {
  getCachedProducts,
  getProductsCacheKey,
  setCachedProducts,
} from "./hooks/productsCache";

import styles from "./ProductsPage.module.scss";

export const ProductsPage = () => {
  const { t } = useTranslation();

  const {
    page,
    limit,
    sortBy,
    order,
    category,
    search,
    searchParams,
    setSearchParams,
    handleSort,
    handlePageChange,
    handleCategoryChange,
    handleRowsPerPageChange,
  } = useProductParams();

  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = useDebounce(searchInput, 500);
  const previousSearch = useRef(search);

  const createdProducts = useProductChangesStore(
    (state) => state.createdProducts,
  );

  const deletedProducts = useProductChangesStore(
    (state) => state.deletedProducts,
  );

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  const handleCreateProduct = () => {
    navigate("/products/new");
  };

  useEffect(() => {
    if (debouncedSearch === previousSearch.current) {
      return;
    }

    previousSearch.current = debouncedSearch;

    const params = new URLSearchParams(searchParams);

    params.set("page", "0");

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
      params.delete("category");
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }, [debouncedSearch, searchParams, setSearchParams]);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    const cacheKey = getProductsCacheKey({
      page,
      limit,
      sortBy,
      order,
      category,
      search,
    });

    const cachedResponse = getCachedProducts(cacheKey);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        if (cachedResponse) {
          await Promise.resolve();

          if (!isCurrent) {
            return;
          }

          setProducts(cachedResponse.products);
          setTotal(cachedResponse.total);
          setLoading(false);

          return;
        }

        const skip = page * limit;

        let response;

        if (search) {
          response = await searchProducts({
            query: search,
            limit,
            skip,
            sortBy,
            order,
            signal: controller.signal,
          });
        } else if (category) {
          response = await getProductsByCategory({
            category,
            limit,
            skip,
            sortBy,
            order,
            signal: controller.signal,
          });
        } else {
          response = await getProducts({
            limit,
            skip,
            sortBy,
            order,
            signal: controller.signal,
          });
        }

        if (!isCurrent) {
          return;
        }

        setCachedProducts(cacheKey, response.data);
        setProducts(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        if (!isCurrent) {
          return;
        }

        setError(true);

        console.error("Fetching products failed", error);
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [page, limit, sortBy, order, category, search, retryCount]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        setCategories(response.data);
      } catch (error) {
        console.error("Fetching categories failed", error);
      }
    };

    fetchCategories();
  }, []);

  const effectiveProducts = useMemo(() => {
    return getEffectiveProducts({
      products,
      createdProducts,
      deletedProducts,
      productChanges,
    });
  }, [products, createdProducts, deletedProducts, productChanges]);

  const visibleApiProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return effectiveProducts.filter((product) => {
      if (
        createdProducts.some(
          (createdProduct) => createdProduct.id === product.id,
        )
      ) {
        return false;
      }

      if (category && product.category !== category) {
        return false;
      }

      if (normalizedSearch) {
        const matchesTitle = product.title
          .toLowerCase()
          .includes(normalizedSearch);

        const matchesDescription = product.description
          .toLowerCase()
          .includes(normalizedSearch);

        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [effectiveProducts, createdProducts, category, search]);

  const visibleCreatedProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return createdProducts.filter((product) => {
      const isDeleted = deletedProducts.some(
        (deletedProduct) => deletedProduct.id === product.id,
      );

      if (isDeleted) {
        return false;
      }

      if (category && product.category !== category) {
        return false;
      }

      if (normalizedSearch) {
        const matchesTitle = product.title
          .toLowerCase()
          .includes(normalizedSearch);

        const matchesDescription = product.description
          .toLowerCase()
          .includes(normalizedSearch);

        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [createdProducts, deletedProducts, category, search]);

  const deletedApiProductsCount = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return deletedProducts.filter((product) => {
      /*
       * Locally-created products are part of the local dataset,
       * not the API dataset, so they must not reduce the API total.
       */
      if (isLocalProductId(product.id)) {
        return false;
      }

      /*
       * Old persisted deleted records may contain only an ID.
       * Without product information, we cannot safely determine
       * whether they belong to the current category/search filter.
       */
      if (!product.category || !product.title || !product.description) {
        return false;
      }

      if (category && product.category !== category) {
        return false;
      }

      if (normalizedSearch) {
        const matchesTitle = product.title
          .toLowerCase()
          .includes(normalizedSearch);

        const matchesDescription = product.description
          .toLowerCase()
          .includes(normalizedSearch);

        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      return true;
    }).length;
  }, [deletedProducts, category, search]);

  const visibleApiTotal = Math.max(total - deletedApiProductsCount, 0);

  const visibleTotal = visibleApiTotal + visibleCreatedProducts.length;

  const visibleProducts = useMemo(() => {
    /*
     * API products occupy the first part of the effective dataset.
     * Created products are appended after the API dataset.
     */
    const pageStart = page * limit;
    const pageEnd = pageStart + limit;

    const createdStart = Math.max(pageStart - visibleApiTotal, 0);

    const createdEnd = Math.max(pageEnd - visibleApiTotal, 0);

    const createdProductsForPage = visibleCreatedProducts.slice(
      createdStart,
      createdEnd,
    );

    return [...visibleApiProducts, ...createdProductsForPage];
  }, [
    page,
    limit,
    visibleApiTotal,
    visibleApiProducts,
    visibleCreatedProducts,
  ]);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.header}>
          <Box>
            <Typography variant="h4" className={styles.title}>
              {t("productsPage.title")}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.subtitle}
            >
              {t("productsPage.subtitle")}
            </Typography>
          </Box>

          <Button
            type="button"
            variant="contained"
            onClick={handleCreateProduct}
          >
            {t("productsPage.createProduct")}
          </Button>
        </Box>

        <Box className={styles.searchSection}>
          <ProductSearch value={searchInput} onChange={setSearchInput} />
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          className={styles.tableCard}
        >
          <Box className={styles.categorySection}>
            <ProductCategoryFilter
              value={category ?? ""}
              categories={categories}
              onChange={handleCategoryChange}
              disabled={Boolean(search.trim())}
            />
          </Box>

          <ProductTable
            products={visibleProducts}
            loading={loading}
            error={error}
            sortBy={sortBy}
            order={order}
            onSort={handleSort}
            onRetry={handleRetry}
          />

          <Box className={styles.paginationSection}>
            <ProductPagination
              page={page}
              limit={limit}
              total={visibleTotal}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
};
