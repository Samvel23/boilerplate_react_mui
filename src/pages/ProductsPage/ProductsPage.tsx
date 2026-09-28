import { useEffect, useMemo, useRef, useState } from "react";

import { Box, Button, Paper, TableContainer, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/api/products";

import type { ICategory, IProduct } from "@/types/products";

import { useDebounce } from "@/hooks/useDebounce";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

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

  const deletedProductIds = useProductChangesStore(
    (state) => state.deletedProductIds,
  );

  const handleCreateProduct = () => {
    navigate("/products/new");
  };

  /*
   * Keep the search input synchronized with
   * the URL only when the URL changes from
   * outside the input itself.
   */
  useEffect(() => {
    if (debouncedSearch === previousSearch.current) {
      return;
    }

    previousSearch.current = debouncedSearch;

    const params = new URLSearchParams(searchParams);

    params.set("page", "0");

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
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

  /*
   * Add locally-created products to the
   * API products shown in the table.
   *
   * Local products are shown on the first
   * page because the API doesn't know about
   * them and therefore cannot paginate them.
   */
  const visibleProducts = useMemo(() => {
    const apiProducts = products.filter(
      (product) => !deletedProductIds.includes(product.id),
    );

    const localProducts =
      page === 0
        ? createdProducts.filter((product) => {
            if (deletedProductIds.includes(product.id)) {
              return false;
            }

            if (category && product.category !== category) {
              return false;
            }

            if (search) {
              const normalizedSearch = search.toLowerCase();

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
          })
        : [];

    /*
     * Prevent a locally-created product from
     * being duplicated if it somehow already
     * exists in the API response.
     */
    const apiProductIds = new Set(apiProducts.map((product) => product.id));

    const uniqueLocalProducts = localProducts.filter(
      (product) => !apiProductIds.has(product.id),
    );

    return [...uniqueLocalProducts, ...apiProducts];
  }, [products, createdProducts, deletedProductIds, page, category, search]);

  const visibleTotal = useMemo(() => {
    const deletedApiProducts = products.filter((product) =>
      deletedProductIds.includes(product.id),
    ).length;

    const matchingLocalProducts =
      page === 0
        ? createdProducts.filter((product) => {
            if (deletedProductIds.includes(product.id)) {
              return false;
            }

            if (category && product.category !== category) {
              return false;
            }

            if (search) {
              const normalizedSearch = search.toLowerCase();

              return (
                product.title.toLowerCase().includes(normalizedSearch) ||
                product.description.toLowerCase().includes(normalizedSearch)
              );
            }

            return true;
          }).length
        : 0;

    return total - deletedApiProducts + matchingLocalProducts;
  }, [
    total,
    products,
    deletedProductIds,
    createdProducts,
    page,
    category,
    search,
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
              Products
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.subtitle}
            >
              Browse and manage products
            </Typography>
          </Box>

          <Button variant="contained" onClick={handleCreateProduct}>
            Create product
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
